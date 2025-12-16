import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { RubiksCube } from "./RubiksCube";
import { VenueOverlay } from "./VenueOverlay";
import { useEffect, useState } from "react";
import { ResolvedConfig, Venue } from "../config";

interface LogoCubeSceneProps {
    config: ResolvedConfig;
    onLearnMore?: (venue: Venue) => void;
    onBookNow?: (venue: Venue) => void;
    hideOverlay?: boolean;
}

export function LogoCubeScene({ config, onLearnMore, onBookNow, hideOverlay }: LogoCubeSceneProps) {
    const [hoveredVenue, setHoveredVenue] = useState<Venue | null>(null);
    const [isOverlayHovered, setIsOverlayHovered] = useState(false);

    const handleVenueHover = (venue: Venue | null) => {
        if (venue) {
            setHoveredVenue(venue);
        } else if (!isOverlayHovered) {
            // Don't clear immediately to allow moving to overlay
        }
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent | TouchEvent) => {
            if (!hoveredVenue) return;

            const target = event.target as HTMLElement | null;
            const isOnOverlay = target?.closest("[data-venue-overlay]");
            const isOnCanvas = target?.closest("canvas");

            if (!isOnOverlay && !isOnCanvas) {
                setHoveredVenue(null);
                setIsOverlayHovered(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside, true);
        document.addEventListener("touchstart", handleClickOutside, true);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside, true);
            document.removeEventListener("touchstart", handleClickOutside, true);
        };
    }, [hoveredVenue]);

    return (
        <>
            {/* 3D Canvas - constrained to logo area */}
            <div className="w-[300px] h-[300px] relative" role="img" aria-label="Interactive 3D Rubik's cube logo">
                <Canvas
                    shadows
                    dpr={[1, 2]}
                    gl={{ antialias: true, alpha: true }}
                >
                    {/* Camera - Zoomed in slightly more for logo feel */}
                    <PerspectiveCamera makeDefault position={[0, 0, 7]} fov={50} />

                    {/* Lighting - Standard setup without smoke/atmosphere */}
                    <ambientLight intensity={0.7} />
                    <directionalLight
                        position={[5, 5, 10]}
                        intensity={1.2}
                        castShadow
                    />
                    <pointLight position={[0, 0, 5]} intensity={0.5} />

                    {/* 4x4x1 Grid */}
                    <RubiksCube
                        onHover={handleVenueHover}
                        venues={config.venues}
                        logoTextureUrl={config.logoTextureUrl}
                    />

                    <OrbitControls
                        enableZoom={false}
                        enablePan={false}
                        enableRotate={false}
                    />
                </Canvas>
            </div>

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
