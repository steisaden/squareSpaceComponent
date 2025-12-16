import { VenueCorner } from "./VenueCorner";

interface Venue {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  color: string;
}

const venues: Venue[] = [
  {
    id: "wedding",
    name: "The Grand Ballroom",
    description: "Best for elegant weddings and milestone celebrations with timeless sophistication",
    imageUrl: "https://images.unsplash.com/photo-1674970538959-e7475d8d376f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwd2VkZGluZyUyMHZlbnVlfGVufDF8fHx8MTc2MzkwMDQzM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    position: "top-left",
    color: "#E8D5C4"
  },
  {
    id: "corporate",
    name: "Executive Center",
    description: "Best for corporate events, conferences, and professional gatherings with cutting-edge technology",
    imageUrl: "https://images.unsplash.com/photo-1758285477208-2300ae0c668d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjb3Jwb3JhdGUlMjBldmVudCUyMHNwYWNlfGVufDF8fHx8MTc2MzkwODY3M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    position: "top-right",
    color: "#C4D5E8"
  },
  {
    id: "dining",
    name: "The Garden Terrace",
    description: "Best for intimate dining experiences, cocktail receptions, and culinary showcases",
    imageUrl: "https://images.unsplash.com/photo-1726533765356-2608b035ff6b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1cHNjYWxlJTIwcmVzdGF1cmFudCUyMGRpbmluZ3xlbnwxfHx8fDE3NjM5MDg2NzR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    position: "bottom-left",
    color: "#D4E8C4"
  },
  {
    id: "gallery",
    name: "The Atrium Gallery",
    description: "Best for art exhibitions, product launches, and creative showcases with natural lighting",
    imageUrl: "https://images.unsplash.com/photo-1761386001767-4bc6f2648077?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBnYWxsZXJ5JTIwZXhoaWJpdGlvbiUyMHNwYWNlfGVufDF8fHx8MTc2MzkwODY3NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    position: "bottom-right",
    color: "#E8C4D5"
  }
];

export function VenueSquare() {
  return (
    <div className="relative w-full max-w-2xl aspect-square">
      {/* Center square with border */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-3/4 h-3/4 border-2 border-neutral-300 rounded-lg bg-white/50 backdrop-blur-sm flex items-center justify-center">
          <p className="text-neutral-400 text-center px-8">
            Explore each corner to discover our venue collection
          </p>
        </div>
      </div>
      
      {/* Venue corners */}
      {venues.map((venue) => (
        <VenueCorner
          key={venue.id}
          venue={venue}
        />
      ))}
    </div>
  );
}
