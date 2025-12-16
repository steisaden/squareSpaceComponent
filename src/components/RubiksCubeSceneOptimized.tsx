import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Suspense, useState, useMemo } from "react";
import { RubiksCubeOptimized } from "./RubiksCubeOptimized";
import { VenueOverlay } from "./VenueOverlay";
import { Venue } from "../config";
import { getOptimalPixelRatio, isMobile } from "../utils/performanceOptimizer";

interface RubiksCubeSceneOptimizedProps {
  venues: Venue[];
  logoTextureUrl: string;
}

// Loading fallback component
function LoadingFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900">
      <div className="text-center">
        <div className="inline-block w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin mb-4"></div>
        <p className="text-white/60 text-sm">Loading 3D Experience...</p>
      </div>
    </div>
  );
}

export function RubiksCubeSceneOptimized({ venues, logoTextureUrl }: RubiksCubeSceneOptimizedProps) {
  const [hoveredVenue, setHoveredVenue] = useState<Venue | null>(null);
  
  // Optimize pixel ratio for device
  const dpr = useMemo(() => getOptimalPixelRatio(), []);
  const mobile = useMemo(() => isMobile(), []);

  return (
    <>
      {/* 3D Canvas - responsive height */}
      <div 
        className={`w-full ${mobile ? 'h-[50vh]' : 'h-[60vh]'} relative`} 
        role="img" 
        aria-label="Interactive 3D venue selector"
      >
        <Suspense fallback={<LoadingFallback />}>
          <Canvas
            shadows={!mobile}
            dpr={[1, dpr]}
            gl={{ 
              antialias: !mobile,
              alpha: true,
              powerPreference: mobile ? 'low-power' : 'high-performance',
              stencil: false,
              depth: true
            }}
            performance={{ min: 0.5 }}
            frameloop="demand" // Only render when needed
          >
            {/* Camera - optimized position */}
            <PerspectiveCamera 
              makeDefault 
              position={mobile ? [0, 0, 6] : [0, 0, 8]} 
              fov={mobile ? 60 : 50} 
            />
            
            {/* Lighting - simplified for mobile */}
            <ambientLight intensity={mobile ? 0.8 : 0.6} />
            {!mobile && (
              <>
                <directionalLight
                  position={[5, 5, 10]}
                  intensity={1}
                  castShadow
                  shadow-mapSize-width={1024}
                  shadow-mapSize-height={1024}
                />
                <pointLight position={[0, 0, 5]} intensity={0.5} />
              </>
            )}
            
            {/* 2x2 Grid */}
            <RubiksCubeOptimized 
              onHover={setHoveredVenue} 
              venues={venues}
              logoTextureUrl={logoTextureUrl}
            />
            
            {/* Controls - disabled rotation, only zoom */}
            <OrbitControls
              enableZoom={!mobile}
              enablePan={false}
              enableRotate={false}
              minDistance={mobile ? 4 : 4}
              maxDistance={mobile ? 10 : 12}
              enableDamping={!mobile}
              dampingFactor={0.05}
            />
          </Canvas>
        </Suspense>
      </div>

      {/* Venue Overlay - only on desktop */}
      {!mobile && <VenueOverlay venue={hoveredVenue} />}
      
      {/* Mobile: Show venue info as bottom sheet */}
      {mobile && hoveredVenue && (
        <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl p-6 animate-slide-up z-50">
          <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4"></div>
          <h3 className="text-xl font-bold mb-2">{hoveredVenue.name}</h3>
          <p className="text-gray-600 text-sm mb-4">{hoveredVenue.description}</p>
          <a 
            href={hoveredVenue.link}
            className="block w-full bg-black text-white text-center py-3 rounded-lg font-medium"
          >
            Learn More
          </a>
        </div>
      )}
    </>
  );
}
