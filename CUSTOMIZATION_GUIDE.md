# Customization Guide

## Quick Customization

All venue information is stored in `src/config/venueConfig.ts`. Edit this file to customize:

### Change Venue Names & Descriptions

```typescript
{
  name: "Your Venue Name Here",
  description: "Your custom description here",
}
```

### Change Colors

```typescript
color: "#E8D5C4"  // Use any hex color code
```

**Color Suggestions:**
- Beige: `#E8D5C4`
- Light Blue: `#C4D5E8`
- Light Green: `#D4E8C4`
- Light Pink: `#E8C4D5`
- Gold: `#FFD700`
- Lavender: `#D4C4E8`

### Change Links

```typescript
link: "/your-page-url"  // Internal link
link: "https://example.com"  // External link
```

### Change Images

```typescript
imageUrl: "https://your-image-url.com/image.jpg"
```

## Animation Settings

Edit `src/config/venueConfig.ts`:

```typescript
export const animationConfig = {
  duration: 1.5,  // Animation speed (seconds)
  gap: 0.05,      // Space between squares
  cubeSize: 2.0   // Size of each square
};
```

## After Making Changes

1. Save your changes
2. Run: `npm run build`
3. Run: `npm run deploy`
4. Wait 2-3 minutes for GitHub Pages to update

Your changes will be live at: https://steisaden.github.io/squareSpaceComponent/
