import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { RubiksCube } from "./RubiksCube";
import { VenueOverlay } from "./VenueOverlay";
import { useEffect, useState } from "react";
import { ResolvedConfig, Venue } from "../config";
import { Smoke } from "./Smoke";

interface RubiksCubeSceneProps {
  config: ResolvedConfig;
  onLearnMore?: (venue: Venue) => void;
  onBookNow?: (venue: Venue) => void;
  hideOverlay?: boolean;
}

export function RubiksCubeScene({ config, onLearnMore, onBookNow, hideOverlay }: RubiksCubeSceneProps) {
  const [hoveredVenue, setHoveredVenue] = useState<Venue | null>(null);
  const [isOverlayHovered, setIsOverlayHovered] = useState(false);

  // Handle hover state - only change if hovering a different venue or if not hovering overlay
  const handleVenueHover = (venue: Venue | null) => {
    // If hovering a new venue, always update
    if (venue) {
      setHoveredVenue(venue);
    }
    // If leaving a venue (venue is null), only clear if not hovering overlay
    else if (!isOverlayHovered) {
      // Don't clear - let it stay visible
      // Only clear when clicking outside or clicking another square
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (!hoveredVenue) return;
      
      const target = event.target as HTMLElement | null;
      const isOnOverlay = target?.closest("[data-venue-overlay]");
      const isOnCanvas = target?.closest("canvas");
      
      // Only hide if clicking outside both the overlay and canvas
      // Or if clicking on canvas but not on a venue square (handled by venue hover)
      if (!isOnOverlay && !isOnCanvas) {
        setHoveredVenue(null);
        setIsOverlayHovered(false);
      }
    };

    // Listen for clicks/touches outside
    document.addEventListener("mousedown", handleClickOutside, true);
    document.addEventListener("touchstart", handleClickOutside, true);
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside, true);
      document.removeEventListener("touchstart", handleClickOutside, true);
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
            onHover={handleVenueHover}
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

      {/* Venue Overlay - hide when modal is open */}
      {!hideOverlay && (
        <VenueOverlay
          venue={hoveredVenue}
          primaryCtaLabel={config.primaryCtaLabel}
          secondaryCtaLabel={config.secondaryCtaLabel}
          onOverlayHover={setIsOverlayHovered}
          onLearnMore={onLearnMore}
          onBookNow={onBookNow}
        />
      )}
    </>
  );
}
