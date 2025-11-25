import { useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';

interface PerformanceMonitorProps {
  onPerformanceChange?: (fps: number) => void;
}

export function PerformanceMonitor({ onPerformanceChange }: PerformanceMonitorProps) {
  const { gl, scene } = useThree();
  let frames = 0;
  let lastTime = performance.now();

  useFrame(() => {
    frames++;
    const currentTime = performance.now();
    
    if (currentTime >= lastTime + 1000) {
      const fps = Math.round((frames * 1000) / (currentTime - lastTime));
      
      // Adjust quality based on FPS
      if (fps < 30 && onPerformanceChange) {
        onPerformanceChange(fps);
      }
      
      frames = 0;
      lastTime = currentTime;
    }
  });

  useEffect(() => {
    // Optimize renderer settings
    gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    gl.setClearColor(0x000000, 0);
    
    // Enable optimizations
    scene.matrixAutoUpdate = false;
    
    return () => {
      // Cleanup
      gl.dispose();
    };
  }, [gl, scene]);

  return null;
}
