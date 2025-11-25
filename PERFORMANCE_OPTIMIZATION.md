# Performance Optimization Guide

## Mobile-First Optimizations Implemented

### 1. **Adaptive Quality Settings**
- Automatically detects device type (mobile/tablet/desktop)
- Reduces texture quality on mobile (512px vs 2048px)
- Disables shadows and complex lighting on mobile
- Reduces geometry smoothness on slower devices

### 2. **Connection Speed Detection**
- Detects slow 2G/3G connections
- Reduces quality automatically for data saver mode
- Optimizes texture loading for slow connections

### 3. **Lazy Loading**
- Iframe loads with `loading="lazy"` attribute
- Textures are loaded on-demand
- Components use React Suspense for code splitting

### 4. **Optimized Rendering**
- Frame loop set to "demand" (only renders when needed)
- Memoized calculations to prevent re-renders
- Texture caching to avoid recreation
- Disabled mipmaps for faster loading

### 5. **Code Splitting**
- Vendor chunks separated (React, Three.js, React Three Fiber)
- Reduces initial bundle size
- Faster first contentful paint

### 6. **Mobile-Specific Features**
- Smaller cube size on mobile (1.5 vs 2.0)
- Faster animation (1.0s vs 1.5s)
- Bottom sheet UI instead of overlay
- Touch-optimized controls
- Disabled zoom on mobile for better UX

### 7. **CSS Optimizations**
- Mobile-first CSS approach
- GPU-accelerated animations
- Reduced motion support
- Touch action optimization

## Performance Metrics

### Target Performance:
- **Mobile**: 30+ FPS, < 3s load time
- **Tablet**: 45+ FPS, < 2s load time
- **Desktop**: 60 FPS, < 1.5s load time

### Bundle Size Optimization:
- Code splitting reduces initial load
- Terser minification removes console logs
- Tree shaking removes unused code

## Usage

### Use Optimized Components:

```typescript
import { RubiksCubeSceneOptimized } from './components/RubiksCubeSceneOptimized';

// Instead of RubiksCubeScene, use:
<RubiksCubeSceneOptimized 
  venues={venues}
  logoTextureUrl={logoUrl}
/>
```

### Performance Monitoring:

```typescript
import { PerformanceMonitor } from './components/PerformanceMonitor';

<Canvas>
  <PerformanceMonitor onPerformanceChange={(fps) => {
    console.log('Current FPS:', fps);
  }} />
  {/* Your scene */}
</Canvas>
```

## Testing Performance

### Test on Different Devices:
1. Chrome DevTools → Performance tab
2. Lighthouse audit (aim for 90+ score)
3. Network throttling (Fast 3G, Slow 3G)
4. CPU throttling (4x slowdown)

### Key Metrics to Monitor:
- First Contentful Paint (FCP): < 1.8s
- Largest Contentful Paint (LCP): < 2.5s
- Time to Interactive (TTI): < 3.8s
- Cumulative Layout Shift (CLS): < 0.1
- First Input Delay (FID): < 100ms

## Further Optimizations

### If Performance Issues Persist:

1. **Reduce Texture Size**:
   ```typescript
   // In performanceOptimizer.ts
   export const getOptimalTextureSize = (): number => {
     if (isMobile()) return 256; // Even smaller
     return 512;
   };
   ```

2. **Disable Animations on Slow Devices**:
   ```typescript
   const ANIMATION_DURATION = shouldReduceQuality() ? 0 : 1.5;
   ```

3. **Use Lower Poly Models**:
   ```typescript
   smoothness={reduceQuality ? 1 : 2} // Even lower
   ```

4. **Preload Critical Assets**:
   ```html
   <link rel="preload" as="image" href="/hireslogo.png">
   ```

## Browser Support

Optimized for:
- ✅ Chrome/Edge 90+
- ✅ Safari 14+
- ✅ Firefox 88+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Accessibility

- Reduced motion support
- Touch target sizes (44x44px minimum)
- Keyboard navigation
- Screen reader labels
- High contrast mode support

## Monitoring in Production

Add performance tracking:

```javascript
// Track load time
window.addEventListener('load', () => {
  const perfData = performance.getEntriesByType('navigation')[0];
  console.log('Load time:', perfData.loadEventEnd - perfData.fetchStart);
});

// Track FPS
let lastTime = performance.now();
let frames = 0;
function trackFPS() {
  frames++;
  const currentTime = performance.now();
  if (currentTime >= lastTime + 1000) {
    console.log('FPS:', frames);
    frames = 0;
    lastTime = currentTime;
  }
  requestAnimationFrame(trackFPS);
}
trackFPS();
```

## Deployment Checklist

- [ ] Run `npm run build` with optimizations
- [ ] Test on real mobile devices
- [ ] Run Lighthouse audit
- [ ] Test on slow 3G connection
- [ ] Verify lazy loading works
- [ ] Check bundle size (< 500KB gzipped)
- [ ] Test touch interactions
- [ ] Verify reduced motion works
- [ ] Test on different screen sizes
- [ ] Monitor real user metrics

---

**Result**: Fast, smooth experience on all devices, even on slow connections! 🚀
