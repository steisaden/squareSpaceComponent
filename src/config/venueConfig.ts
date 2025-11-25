// Venue Configuration File
// Edit this file to customize your venue information

export interface VenueConfig {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  color: string;
  link: string;
}

// EDIT THESE VALUES TO CUSTOMIZE YOUR VENUES
export const venueConfig: VenueConfig[] = [
  {
    id: "wedding",
    name: "The Grand Ballroom",
    description: "Best for elegant weddings and milestone celebrations with timeless sophistication",
    imageUrl: "https://images.unsplash.com/photo-1674970538959-e7475d8d376f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwd2VkZGluZyUyMHZlbnVlfGVufDF8fHx8MTc2MzkwMDQzM3ww&ixlib=rb-4.1.0&q=80&w=1080",
    position: "top-left",
    color: "#E8D5C4", // Beige/Cream
    link: "/spaces/wedding"
  },
  {
    id: "corporate",
    name: "Executive Center",
    description: "Best for corporate events, conferences, and professional gatherings with cutting-edge technology",
    imageUrl: "https://images.unsplash.com/photo-1758285477208-2300ae0c668d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjb3Jwb3JhdGUlMjBldmVudCUyMHNwYWNlfGVufDF8fHx8MTc2MzkwODY3M3ww&ixlib=rb-4.1.0&q=80&w=1080",
    position: "top-right",
    color: "#C4D5E8", // Light Blue
    link: "/spaces/corporate"
  },
  {
    id: "dining",
    name: "The Garden Terrace",
    description: "Best for intimate dining experiences, cocktail receptions, and culinary showcases",
    imageUrl: "https://images.unsplash.com/photo-1726533765356-2608b035ff6b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1cHNjYWxlJTIwcmVzdGF1cmFudCUyMGRpbmluZ3xlbnwxfHx8fDE3NjM5MDg2NzR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    position: "bottom-left",
    color: "#D4E8C4", // Light Green
    link: "/spaces/dining"
  },
  {
    id: "gallery",
    name: "The Atrium Gallery",
    description: "Best for art exhibitions, product launches, and creative showcases with natural lighting",
    imageUrl: "https://images.unsplash.com/photo-1761386001767-4bc6f2648077?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBnYWxsZXJ5JTIwZXhoaWJpdGlvbiUyMHNwYWNlfGVufDF8fHx8MTc2MzkwODY3NHww&ixlib=rb-4.1.0&q=80&w=1080",
    position: "bottom-right",
    color: "#E8C4D5", // Light Pink
    link: "/spaces/gallery"
  }
];

// ANIMATION SETTINGS
export const animationConfig = {
  duration: 1.5, // seconds - how long the break-apart animation takes
  gap: 0.05, // spacing between squares (0.02 = tight, 0.1 = loose)
  cubeSize: 2.0 // size of each square
};

// COLOR PALETTE SUGGESTIONS
// Copy and paste these hex codes into the 'color' field above
export const colorPalette = {
  // Warm tones
  beige: "#E8D5C4",
  cream: "#F5E6D3",
  peach: "#FFD4B8",
  coral: "#FF9B85",
  
  // Cool tones
  lightBlue: "#C4D5E8",
  skyBlue: "#A8D8EA",
  mint: "#B8E6D5",
  lavender: "#D4C4E8",
  
  // Neutral tones
  lightGray: "#E0E0E0",
  warmGray: "#D5D0C8",
  coolGray: "#C8D0D5",
  
  // Vibrant tones
  pink: "#E8C4D5",
  rose: "#FFB6C1",
  sage: "#D4E8C4",
  gold: "#FFD700"
};
