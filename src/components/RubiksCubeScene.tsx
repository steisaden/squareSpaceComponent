import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { RubiksCube } from "./RubiksCube";
import { VenueOverlay } from "./VenueOverlay";
import { useEffect, useState } from "react";
import { ResolvedConfig, Venue } from "../config";
import { Smoke } from "./Smoke";

interface RubiksCubeSceneProps {
  config: ResolvedConfig;
}

export function RubiksCubeScene({ config }: RubiksCubeSceneProps) {
  const [hoveredVenue, setHoveredVenue] = useState<Venue | null>(null);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!hoveredVenue) return;
      const target = event.target as HTMLElement | null;
      const isOnOverlay = target?.closest("[data-venue-overlay]");
      const isOnTrigger = target?.closest("[data-venue-trigger]");
      if (!isOnOverlay && !isOnTrigger) {
        setHoveredVenue(null);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown, true);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown, true);
    };
  }, [hoveredVenue]);

  return (
    <>
      {/* 3D Canvas - 60% of viewport */}
      <div className="w-full h-[60vh] relative" role="img" aria-label="Interactive 3D Rubik's cube showing venue options">
        <Canvas
          shadows
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
          onPointerMissed={() => setHoveredVenue(null)}
        >
          {/* Camera - positioned to view flat grid from front */}
          <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
          
          {/* Lighting */}
          <ambientLight intensity={0.6} />
          <directionalLight
            position={[5, 5, 10]}
            intensity={1}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          <pointLight position={[0, 0, 5]} intensity={0.5} />

          {/* Ambient smoke layer */}
          <Smoke />
          
          {/* 4x4x1 Grid */}
          <RubiksCube
            onHover={setHoveredVenue}
            venues={config.venues}
            logoTextureUrl={config.logoTextureUrl}
          />
          
          {/* Controls - disabled rotation, only zoom */}
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableRotate={false}
            minDistance={4}
            maxDistance={12}
          />
        </Canvas>
      </div>

      {/* Venue Overlay */}
      <VenueOverlay
        venue={hoveredVenue}
        primaryCtaLabel={config.primaryCtaLabel}
        secondaryCtaLabel={config.secondaryCtaLabel}
      />
    </>
  );
}
