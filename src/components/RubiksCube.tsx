import { useRef, useState, useEffect } from "react";
import { useLoader, useFrame, ThreeEvent } from "@react-three/fiber";
import { RoundedBox, Html } from "@react-three/drei";
import * as THREE from "three";
import { Venue } from "../config";

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

// 2x2 flat grid
const CUBE_SIZE = 2.0;
const GAP = 0.005; // Reduced gap for more seamless look
const GRID_SIZE = 2;
const ANIMATION_DURATION = 1.5; // seconds

export function RubiksCube({ onHover, venues, logoTextureUrl }: RubiksCubeProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [hoveredCorner, setHoveredCorner] = useState<string | null>(null);
  const [animationProgress, setAnimationProgress] = useState(0);
  const animationStartTime = useRef<number | null>(null);

  // Load the custom image texture
  const texture = useLoader(THREE.TextureLoader, logoTextureUrl, (loader) => {
    if (loader.setCrossOrigin) {
      loader.setCrossOrigin("anonymous");
    }
  });

  // Animation frame
  useFrame((state) => {
    if (animationStartTime.current === null) {
      animationStartTime.current = state.clock.elapsedTime;
    }

    const elapsed = state.clock.elapsedTime - animationStartTime.current;
    const progress = Math.min(elapsed / ANIMATION_DURATION, 1);

    // Ease out cubic for smooth animation
    const eased = 1 - Math.pow(1 - progress, 3);
    setAnimationProgress(eased);
  });

  // Generate positions for 2x2 flat grid
  const generateGridPositions = (): GridPosition[] => {
    const positions: GridPosition[] = [];
    const offset = ((GRID_SIZE - 1) * (CUBE_SIZE + GAP)) / 2;

    for (let gridX = 0; gridX < GRID_SIZE; gridX++) {
      for (let gridY = 0; gridY < GRID_SIZE; gridY++) {
        positions.push({
          x: gridX * (CUBE_SIZE + GAP) - offset,
          y: gridY * (CUBE_SIZE + GAP) - offset,
          gridX,
          gridY
        });
      }
    }
    return positions;
  };

  // Determine which venue a square belongs to based on grid position
  const getVenueForPosition = (gridX: number, gridY: number): Venue | null => {
    // Top-left (0, 1)
    if (gridX === 0 && gridY === 1) {
      return venues.find(v => v.position === "top-left") || null;
    }
    // Top-right (1, 1)
    if (gridX === 1 && gridY === 1) {
      return venues.find(v => v.position === "top-right") || null;
    }
    // Bottom-left (0, 0)
    if (gridX === 0 && gridY === 0) {
      return venues.find(v => v.position === "bottom-left") || null;
    }
    // Bottom-right (1, 0)
    if (gridX === 1 && gridY === 0) {
      return venues.find(v => v.position === "bottom-right") || null;
    }

    return null;
  };

  const positions = generateGridPositions();

  const setActiveVenue = (venue: Venue | null) => {
    setHoveredCorner(venue?.id ?? null);
    onHover(venue);
  };

  const handlePointerOver = (venue: Venue | null, event: ThreeEvent<PointerEvent>) => {
    if (!venue || event.pointerType === "touch") return;
    setActiveVenue(venue);
    document.body.style.cursor = "pointer";
  };

  const handlePointerOut = (event: ThreeEvent<PointerEvent>) => {
    if (event.pointerType === "touch") return;
    setActiveVenue(null);
    document.body.style.cursor = "default";
  };

  const handlePointerDown = (venue: Venue | null, event: ThreeEvent<PointerEvent>) => {
    if (!venue || event.pointerType !== "touch") return;
    event.stopPropagation();
    setActiveVenue(venue);
  };

  // All squares in 2x2 grid are interactive
  const isInteractive = (gridX: number, gridY: number): boolean => {
    return true; // All 4 squares are interactive
  };

  // Create UV-mapped texture for each grid cell
  const createCellTexture = (gridX: number, gridY: number): THREE.Texture => {
    const canvas = document.createElement('canvas');
    const size = 256;
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d')!;

    if (!texture.image || !texture.image.complete) {
      return texture;
    }

    const img = texture.image;
    const cellWidth = img.width / GRID_SIZE;
    const cellHeight = img.height / GRID_SIZE;

    // Calculate UV coordinates - flip Y to match screen coordinates
    const u = gridX * cellWidth;
    const v = (GRID_SIZE - 1 - gridY) * cellHeight;

    // Draw the specific portion of the image
    ctx.drawImage(
      img,
      u, v,
      cellWidth, cellHeight,
      0, 0,
      size, size
    );

    const cellTexture = new THREE.CanvasTexture(canvas);
    cellTexture.needsUpdate = true;
    return cellTexture;
  };



  return (
    <group ref={groupRef}>
      {positions.map((pos, index) => {
        const venue = getVenueForPosition(pos.gridX, pos.gridY);
        const isHovered = venue && hoveredCorner === venue.id;
        const baseColor = venue ? venue.color : "#1a1a1a";

        // Interpolate position from center (0,0) to final position
        const animatedX = pos.x * animationProgress;
        const animatedY = pos.y * animationProgress;

        return (
          <group key={index} position={[animatedX, animatedY, 0]}>
            <RoundedBox
              args={[CUBE_SIZE, CUBE_SIZE, CUBE_SIZE * 0.2]}
              radius={0.1}
              smoothness={4}
              castShadow
              receiveShadow
              onPointerOver={(event) => handlePointerOver(venue, event)}
              onPointerOut={handlePointerOut}
              onPointerDown={(event) => handlePointerDown(venue, event)}
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

            {/* Front face with UV-mapped portion of the image */}
            <mesh position={[0, 0, (CUBE_SIZE * 0.2) / 2 + 0.01]}>
              <planeGeometry args={[CUBE_SIZE * 0.95, CUBE_SIZE * 0.95]} />
              <meshBasicMaterial
                map={createCellTexture(pos.gridX, pos.gridY)}
                transparent
                opacity={0.95}
              />
            </mesh>

            {/* Invisible clickable area */}
            {venue && animationProgress === 1 && (
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
                  data-venue-trigger
                  style={{
                    width: '200px',
                    height: '200px',
                    opacity: 0
                  }}
                />
              </Html>
            )}

            {/* Edge lines */}
            <lineSegments>
              <edgesGeometry args={[new THREE.BoxGeometry(CUBE_SIZE, CUBE_SIZE, CUBE_SIZE * 0.2)]} />
              <lineBasicMaterial color="#000000" linewidth={1} opacity={0.5} transparent />
            </lineSegments>
          </group>
        );
      })}
    </group>
  );
}
