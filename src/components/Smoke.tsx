import { useRef, useMemo } from "react";
import { shaderMaterial } from "@react-three/drei";
import { extend, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const SmokeMaterial = shaderMaterial(
  {
    uTime: 0,
    uColor: new THREE.Color("#ffffff"),
    uOpacity: 0.16
  },
  /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      vec3 displaced = position;
      displaced.z += sin((position.x + position.y) * 0.2 + uTime * 0.4) * 0.08;
      displaced.y += sin((position.x - position.y) * 0.3 + uTime * 0.3) * 0.06;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
    }
  `,
  /* glsl */ `
    precision highp float;
    varying vec2 vUv;
    uniform float uTime;
    uniform vec3 uColor;
    uniform float uOpacity;

    // Simple 2D noise
    float hash(vec2 p) {
      return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
    }

    float noise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      float a = hash(i);
      float b = hash(i + vec2(1.0, 0.0));
      float c = hash(i + vec2(0.0, 1.0));
      float d = hash(i + vec2(1.0, 1.0));
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
    }

    float fbm(vec2 p) {
      float value = 0.0;
      float amp = 0.5;
      float freq = 1.0;
      for (int i = 0; i < 5; i++) {
        value += amp * noise(p * freq);
        freq *= 2.0;
        amp *= 0.5;
      }
      return value;
    }

    void main() {
      vec2 uv = vUv * 2.0 - 1.0;
      float t = uTime * 0.06;
      float n = fbm(uv * 2.8 + t);
      float mask = smoothstep(0.2, 0.7, n);
      float alpha = mask * uOpacity;
      gl_FragColor = vec4(uColor, alpha);
    }
  `
);

extend({ SmokeMaterial });

type SmokeMaterialImpl = THREE.ShaderMaterial & {
  uTime: number;
  uColor: THREE.Color;
  uOpacity: number;
};

export function Smoke() {
  const materialRef = useRef<SmokeMaterialImpl>(null);
  const planes = useMemo(
    () => [
      { z: -0.6, scale: 8, opacity: 0.18, blend: THREE.AdditiveBlending },
      { z: -0.2, scale: 6, opacity: 0.12, blend: THREE.NormalBlending }
    ],
    []
  );

  useFrame((_, delta) => {
    if (!materialRef.current) return;
    materialRef.current.uTime += delta;
  });

  return (
    <group>
      {planes.map((plane, idx) => (
        <mesh
          key={idx}
          position={[0, 0, plane.z]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={plane.scale}
          renderOrder={-5 + idx}
        >
          <planeGeometry args={[2, 2, 64, 64]} />
          {/* @ts-ignore */}
          <smokeMaterial
            ref={idx === 0 ? materialRef : undefined}
            transparent
            depthWrite={false}
            blending={plane.blend}
            uOpacity={plane.opacity}
          />
        </mesh>
      ))}
    </group>
  );
}
