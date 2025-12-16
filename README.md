
# Interactive Venue Square Element 🎨

An elegant 3D interactive venue selector featuring a 2x2 grid that animates from a single cube into four distinct venue spaces. Built with React, Three.js, and React Three Fiber.

![Interactive Venue Square](https://img.shields.io/badge/React-18.3.1-blue) ![Three.js](https://img.shields.io/badge/Three.js-0.160.0-green) ![Vite](https://img.shields.io/badge/Vite-6.3.5-purple)

## ✨ Features

### 🎬 Animated Break-Apart Effect
- Starts as a single unified cube displaying the complete logo
- Smoothly breaks apart into a 2x2 grid over 1.5 seconds
- Cubic ease-out animation for natural, fluid movement

### 🖼️ UV-Mapped Image
- High-resolution logo precisely split across all 4 squares
- Forms one cohesive image when viewed as a whole
- Seamless spacing between squares for a polished look

### 🏛️ Interactive Venue Spaces
Each square represents a unique venue with clickable links:
- **Top-left**: Wedding/Grand Ballroom (`/spaces/wedding`)
- **Top-right**: Corporate/Executive Center (`/spaces/corporate`)
- **Bottom-left**: Dining/Garden Terrace (`/spaces/dining`)
- **Bottom-right**: Gallery/Atrium Gallery (`/spaces/gallery`)

### 🎯 User Experience
- **Hover Effects**: Squares scale and glow when hovered
- **Static View**: No rotation - optimal straight-on viewing
- **Zoom Control**: Mouse wheel to zoom in/out
- **Responsive**: Adapts to different screen sizes

## 🚀 Quick Start

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Build

```bash
npm run build
```

### Preview Build

```bash
npm run preview
```

## 📦 Tech Stack

- **React 18.3.1** - UI framework
- **Three.js 0.160.0** - 3D graphics library
- **React Three Fiber 8.17.10** - React renderer for Three.js
- **React Three Drei 9.114.3** - Useful helpers for R3F
- **Vite 6.3.5** - Build tool and dev server
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Motion 11.15.0** - Animation library

## 🎨 Customization

### Update Venue Information

Edit `src/components/RubiksCubeScene.tsx` to modify venue details:

```typescript
export const venues: Venue[] = [
  {
    id: "wedding",
    name: "The Grand Ballroom",
    description: "Your description here",
    imageUrl: "your-image-url",
    position: "top-left",
    color: "#E8D5C4",
    link: "/spaces/wedding"
  },
  // ... more venues
];
```

### Change Animation Duration

In `src/components/RubiksCube.tsx`, adjust:

```typescript
const ANIMATION_DURATION = 1.5; // seconds
```

### Modify Grid Spacing

```typescript
const GAP = 0.05; // Adjust for more/less spacing
```

## 🧩 Squarespace Embed

1) Build and upload assets
- Run `npm run build` to generate `dist/assets/index-*.js`, `dist/assets/index-*.css`, and `dist/assets/hireslogo-*.png`.
- In Squarespace, open **Design → Custom CSS → Manage Custom Files** and upload those three files. Copy the URLs Squarespace returns (they look like `https://static1.squarespace.com/.../index-XXXX.js`).

2) Drop a Code Block where you want the element to appear and paste:

```html
<div id="interactive-venue-square" data-venue-square-root data-venue-config='{
  "headline": "Discover Your Perfect Venue",
  "subheadline": "Hover over squares to explore our premium spaces",
  "logoTextureUrl": "https://static1.squarespace.com/static/.../hireslogo-XXXX.png",
  "primaryCtaLabel": "Learn More",
  "secondaryCtaLabel": "Book Now",
  "venues": [
    {
      "id": "wedding",
      "name": "The Grand Ballroom",
      "description": "Elegant weddings and milestone celebrations",
      "imageUrl": "https://static1.squarespace.com/static/.../ballroom.jpg",
      "link": "/spaces/wedding",
      "color": "#E8D5C4"
    },
    {
      "id": "corporate",
      "name": "Executive Center",
      "description": "Conferences and professional gatherings",
      "imageUrl": "https://static1.squarespace.com/static/.../corporate.jpg",
      "link": "/spaces/corporate",
      "color": "#C4D5E8"
    },
    {
      "id": "dining",
      "name": "The Garden Terrace",
      "description": "Dining, receptions, and culinary showcases",
      "imageUrl": "https://static1.squarespace.com/static/.../dining.jpg",
      "link": "/spaces/dining",
      "color": "#D4E8C4"
    },
    {
      "id": "gallery",
      "name": "The Atrium Gallery",
      "description": "Art exhibitions and creative showcases",
      "imageUrl": "https://static1.squarespace.com/static/.../gallery.jpg",
      "link": "/spaces/gallery",
      "color": "#E8C4D5"
    }
  ]
}'></div>

<link rel="stylesheet" href="https://static1.squarespace.com/static/.../index-XXXX.css" />
<script type="module" src="https://static1.squarespace.com/static/.../index-XXXX.js"></script>
```

3) What is configurable
- `headline` and `subheadline` at the top of the embed
- `logoTextureUrl` (the image split across the 2x2 cube)
- Button labels (`primaryCtaLabel` / `secondaryCtaLabel`)
- Per-venue name, description, imageUrl, link, and accent color (match by `id` or by position)

4) Alternate configuration sources
- Instead of `data-venue-config`, you can drop a `<script type="application/json" data-venue-square-config>...</script>` inside the same Code Block, or set a global `window.INTERACTIVE_VENUE_SQUARE_CONFIG` object before the module script tag.

## 📁 Project Structure

```
InteractiveVenueSquareElement/
├── src/
│   ├── components/
│   │   ├── RubiksCube.tsx          # Main 2x2 grid component
│   │   ├── RubiksCubeScene.tsx     # 3D scene setup
│   │   ├── VenueOverlay.tsx        # Hover overlay
│   │   └── ui/                     # UI components
│   ├── assets/                     # Images and assets
│   ├── styles/                     # Global styles
│   ├── App.tsx                     # Main app component
│   └── main.tsx                    # Entry point
├── hireslogo.png                   # High-res logo for UV mapping
├── index.html
├── package.json
├── vite.config.ts
└── README.md
```

## 🌐 Deployment

See [GITHUB_SETUP.md](./GITHUB_SETUP.md) for detailed instructions on deploying to GitHub Pages.

Quick deploy:
```bash
npm install --save-dev gh-pages
npm run deploy
```

## 📝 License

This project is available for use under the MIT License.

## 🙏 Acknowledgments

- Original design from [Figma](https://www.figma.com/design/IBwYSqHvhDdAFtEW12caV3/Interactive-Venue-Square-Element)
- Built with [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- UI components from [shadcn/ui](https://ui.shadcn.com/)

---

Made with ❤️ using React and Three.js
  
