// Performance optimization utilities for mobile-first design

export const isMobile = (): boolean => {
  return window.innerWidth < 768;
};

export const isTablet = (): boolean => {
  return window.innerWidth >= 768 && window.innerWidth < 1024;
};

export const isSlowConnection = (): boolean => {
  if ('connection' in navigator) {
    const conn = (navigator as any).connection;
    return conn && (conn.effectiveType === 'slow-2g' || conn.effectiveType === '2g' || conn.saveData);
  }
  return false;
};

export const getOptimalTextureSize = (): number => {
  if (isMobile()) return 512;
  if (isTablet()) return 1024;
  return 2048;
};

export const getOptimalPixelRatio = (): number => {
  const dpr = window.devicePixelRatio || 1;
  if (isMobile() || isSlowConnection()) return Math.min(dpr, 1.5);
  return Math.min(dpr, 2);
};

export const shouldReduceQuality = (): boolean => {
  return isMobile() || isSlowConnection();
};

export const getOptimalCubeSize = (): number => {
  if (isMobile()) return 1.5;
  if (isTablet()) return 1.8;
  return 2.0;
};

export const getOptimalAnimationDuration = (): number => {
  if (shouldReduceQuality()) return 1.0; // Faster on mobile
  return 1.5;
};

// Debounce utility for resize events
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Lazy load images
export const preloadImage = (url: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = url;
  });
};
