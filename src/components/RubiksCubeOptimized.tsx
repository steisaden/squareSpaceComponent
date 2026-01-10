import { useRef, useState, useMemo, Suspense } from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import { RoundedBox, Html } from "@react-three/drei";
import * as THREE from "three";
import { Venue } from "../config";
import {
  getOptimalCubeSize,
  getOptimalAnimationDuration,
  shouldReduceQuality,
  isMobile
} from "../utils/performanceOptimizer";

interface RubiksCubeProps {
  onHover: (venue: Venue | null) => void;
  venues: Venue[];
  logoTextureUrl: string;
}

interface GridPosition {
  x: number;
  y: number;
  gridX: number;
  gridY: number;
}

// Dynamic configuration based on device
const GRID_SIZE = 2;
const GAP = 0.005;

export function RubiksCubeOptimized({ onHover, venues, logoTextureUrl }: RubiksCubeProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [hoveredCorner, setHoveredCorner] = useState<string | null>(null);
  const [animationProgress, setAnimationProgress] = useState(0);
  const animationStartTime = useRef<number | null>(null);

  // Optimize for device
  const CUBE_SIZE = useMemo(() => getOptimalCubeSize(), []);
  const ANIMATION_DURATION = useMemo(() => getOptimalAnimationDuration(), []);
  const reduceQuality = useMemo(() => shouldReduceQuality(), []);

  // Load texture with optimization
  const texture = useLoader(THREE.TextureLoader, logoTextureUrl);

  // Optimize texture settings
  useMemo(() => {
    if (texture) {
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.generateMipmaps = false;
      texture.anisotropy = reduceQuality ? 1 : 4;
    }
  }, [texture, reduceQuality]);

  // Memoize positions to avoid recalculation
  const positions = useMemo(() => generateGridPositions(CUBE_SIZE), [CUBE_SIZE]);

  // Animation frame - optimized
  useFrame((state) => {
    if (animationProgress >= 1) return; // Stop updating when complete

    if (animationStartTime.current === null) {
      animationStartTime.current = state.clock.elapsedTime;
    }

    const elapsed = state.clock.elapsedTime - animationStartTime.current;
    const progress = Math.min(elapsed / ANIMATION_DURATION, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    setAnimationProgress(eased);
  });

  // Generate positions for 2x2 flat grid
  function generateGridPositions(cubeSize: number): GridPosition[] {
    const positions: GridPosition[] = [];
    const offset = ((GRID_SIZE - 1) * (cubeSize + GAP)) / 2;

    for (let gridX = 0; gridX < GRID_SIZE; gridX++) {
      for (let gridY = 0; gridY < GRID_SIZE; gridY++) {
        positions.push({
          x: gridX * (cubeSize + GAP) - offset,
          y: gridY * (cubeSize + GAP) - offset,
          gridX,
          gridY
        });
      }
    }
    return positions;
  }

  const getVenueForPosition = (gridX: number, gridY: number): Venue | null => {
    if (gridX === 0 && gridY === 1) return venues.find(v => v.position === "top-left") || null;
    if (gridX === 1 && gridY === 1) return venues.find(v => v.position === "top-right") || null;
    if (gridX === 0 && gridY === 0) return venues.find(v => v.position === "bottom-left") || null;
    if (gridX === 1 && gridY === 0) return venues.find(v => v.position === "bottom-right") || null;
    return null;
  };

  const handlePointerOver = (venue: Venue | null) => {
    if (venue) {
      setHoveredCorner(venue.id);
      onHover(venue);
      document.body.style.cursor = 'pointer';
    }
  };

  const handlePointerOut = () => {
    setHoveredCorner(null);
    onHover(null);
    document.body.style.cursor = 'default';
  };

  // Memoized texture creation for each cell
  const createCellTexture = useMemo(() => {
    const cache: { [key: string]: THREE.Texture } = {};

    return (gridX: number, gridY: number): THREE.Texture => {
      const key = `${gridX}-${gridY}`;
      if (cache[key]) return cache[key];

      const canvas = document.createElement('canvas');
      const size = reduceQuality ? 256 : 512;
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d', { alpha: true, willReadFrequently: false })!;

      if (!texture.image || !texture.image.complete) {
        return texture;
      }

      const img = texture.image;
      const cellWidth = img.width / GRID_SIZE;
      const cellHeight = img.height / GRID_SIZE;

      const u = gridX * cellWidth;
      const v = (GRID_SIZE - 1 - gridY) * cellHeight;

      ctx.drawImage(img, u, v, cellWidth, cellHeight, 0, 0, size, size);

      const cellTexture = new THREE.CanvasTexture(canvas);
      cellTexture.needsUpdate = true;
      cellTexture.minFilter = THREE.LinearFilter;
      cellTexture.magFilter = THREE.LinearFilter;
      cellTexture.generateMipmaps = false;

      cache[key] = cellTexture;
      return cellTexture;
    };
  }, [texture, reduceQuality]);

  return (
    <group ref={groupRef}>
      {positions.map((pos, index) => {
        const venue = getVenueForPosition(pos.gridX, pos.gridY);
        const isHovered = venue && hoveredCorner === venue.id;
        const baseColor = venue ? venue.color : "#1a1a1a";
        const animatedX = pos.x * animationProgress;
        const animatedY = pos.y * animationProgress;

        return (
          <group key={index} position={[animatedX, animatedY, 0]}>
            <RoundedBox
              args={[CUBE_SIZE, CUBE_SIZE, CUBE_SIZE * 0.2]}
              radius={0.1}
              smoothness={reduceQuality ? 2 : 4}
              castShadow={!reduceQuality}
              receiveShadow={!reduceQuality}
              onPointerOver={() => handlePointerOver(venue)}
              onPointerOut={handlePointerOut}
              scale={isHovered ? 1.05 : 1}
            >
              <meshStandardMaterial
                color={isHovered ? baseColor : "#1a1a1a"}
                metalness={0.3}
                roughness={0.4}
                emissive={venue ? venue.color : "#000000"}
                emissiveIntensity={isHovered ? 0.5 : 0.2}
              />
            </RoundedBox>

            {/* Front face with UV-mapped portion */}
            <mesh position={[0, 0, (CUBE_SIZE * 0.2) / 2 + 0.01]}>
              <planeGeometry args={[CUBE_SIZE * 0.95, CUBE_SIZE * 0.95]} />
              <meshBasicMaterial
                map={createCellTexture(pos.gridX, pos.gridY)}
                transparent
                opacity={0.95}
              />
            </mesh>

            {/* Clickable area - only after animation */}
            {venue && animationProgress === 1 && !isMobile() && (
              <Html
                position={[0, 0, CUBE_SIZE * 0.2]}
                center
                distanceFactor={8}
                style={{ pointerEvents: 'auto' }}
              >
                <a
                  href={venue.link}
                  className="block w-full h-full"
                  title={venue.name}
                  style={{
                    width: '200px',
                    height: '200px',
                    opacity: 0
                  }}
                  aria-label={venue.name}
                  target="_top"
                />
              </Html>
            )}

            {/* Edge lines - skip on mobile for performance */}
            {!reduceQuality && (
              <lineSegments>
                <edgesGeometry args={[new THREE.BoxGeometry(CUBE_SIZE, CUBE_SIZE, CUBE_SIZE * 0.2)]} />
                <lineBasicMaterial color="#000000" linewidth={1} opacity={0.5} transparent />
              </lineSegments>
            )}
          </group>
        );
      })}
    </group>
  );
}
