import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { RubiksCube } from "./RubiksCube";
import { VenueOverlay } from "./VenueOverlay";
import { useState } from "react";

export interface Venue {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  color: string;
  link: string;
}

export const venues: Venue[] = [
  {
    id: "wedding",
    name: "The Grand Ballroom",
    description: "Best for elegant weddings and milestone celebrations with timeless sophistication",
    imageUrl: "https://images.unsplash.com/photo-1674970538959-e7475d8d376f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwd2VkZGluZyUyMHZlbnVlfGVufDF8fHx8MTc2MzkwMDQzM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    position: "top-left",
    color: "#E8D5C4",
    link: "/spaces/wedding"
  },
  {
    id: "corporate",
    name: "Executive Center",
    description: "Best for corporate events, conferences, and professional gatherings with cutting-edge technology",
    imageUrl: "https://images.unsplash.com/photo-1758285477208-2300ae0c668d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjb3Jwb3JhdGUlMjBldmVudCUyMHNwYWNlfGVufDF8fHx8MTc2MzkwODY3M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    position: "top-right",
    color: "#C4D5E8",
    link: "/spaces/corporate"
  },
  {
    id: "dining",
    name: "The Garden Terrace",
    description: "Best for intimate dining experiences, cocktail receptions, and culinary showcases",
    imageUrl: "https://images.unsplash.com/photo-1726533765356-2608b035ff6b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1cHNjYWxlJTIwcmVzdGF1cmFudCUyMGRpbmluZ3xlbnwxfHx8fDE3NjM5MDg2NzR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    position: "bottom-left",
    color: "#D4E8C4",
    link: "/spaces/dining"
  },
  {
    id: "gallery",
    name: "The Atrium Gallery",
    description: "Best for art exhibitions, product launches, and creative showcases with natural lighting",
    imageUrl: "https://images.unsplash.com/photo-1761386001767-4bc6f2648077?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBnYWxsZXJ5JTIwZXhoaWJpdGlvbiUyMHNwYWNlfGVufDF8fHx8MTc2MzkwODY3NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    position: "bottom-right",
    color: "#E8C4D5",
    link: "/spaces/gallery"
  }
];

export function RubiksCubeScene() {
  const [hoveredVenue, setHoveredVenue] = useState<Venue | null>(null);

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
          
          {/* 4x4x1 Grid */}
          <RubiksCube onHover={setHoveredVenue} venues={venues} />
          
          {/* Controls - disabled rotation, only zoom */}
          <OrbitControls
            enableZoom={true}
            enablePan={false}
            enableRotate={false}
            minDistance={4}
            maxDistance={12}
          />
        </Canvas>
      </div>

      {/* Venue Overlay */}
      <VenueOverlay venue={hoveredVenue} />
    </>
  );
}
