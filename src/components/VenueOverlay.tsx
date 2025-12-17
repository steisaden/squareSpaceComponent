import { motion, AnimatePresence } from "motion/react";
import { Venue } from "../config";
import clsx from "clsx";

interface VenueOverlayProps {
  venue: Venue | null;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  onLearnMore?: (venue: Venue) => void;
  onBookNow?: (venue: Venue) => void;
  onOverlayHover?: (isHovered: boolean) => void;
}

export function VenueOverlay({ venue, primaryCtaLabel, secondaryCtaLabel, onLearnMore, onBookNow, onOverlayHover }: VenueOverlayProps) {

  // Helper to determine position styles based on venue position
  const getPositionStyles = (position: string) => {
    // We anchor to the corners of the 300x300 logo box using absolute positioning
    // We want them to "pop out" from the corners
    switch (position) {
      case "top-left":
        return {
          // Note: using negative margins to bridge the gap slightly so it doesn't float too far? 
          // Or strictly outer? User said "outer corners".
          // Let's try strictly anchored to corner first: bottom-full right-full.
          // Actually, let's use a small offset like translate to overlap just a tiny bit for continuity, or bridge gap.
          // Better: "bottom-[80%] right-[80%]"? 

          // Let's use: origin-bottom-right
          container: "absolute bottom-[85%] right-[85%] items-end justify-end origin-bottom-right",
          initial: { opacity: 0, scale: 0.8, x: 20, y: 20 },
          exit: { opacity: 0, scale: 0.8, x: 20, y: 20 }
        };
      case "top-right":
        return {
          container: "absolute bottom-[85%] left-[85%] items-end justify-start origin-bottom-left",
          initial: { opacity: 0, scale: 0.8, x: -20, y: 20 },
          exit: { opacity: 0, scale: 0.8, x: -20, y: 20 }
        };
      case "bottom-left":
        return {
          container: "absolute top-[85%] right-[85%] items-start justify-end origin-top-right",
          initial: { opacity: 0, scale: 0.8, x: 20, y: -20 },
          exit: { opacity: 0, scale: 0.8, x: 20, y: -20 }
        };
      case "bottom-right":
        return {
          container: "absolute top-[85%] left-[85%] items-start justify-start origin-top-left",
          initial: { opacity: 0, scale: 0.8, x: -20, y: -20 },
          exit: { opacity: 0, scale: 0.8, x: -20, y: -20 }
        };
      default:
        // Fallback
        return {
          container: "absolute bottom-full left-1/2 -translate-x-1/2 mb-4",
          initial: { opacity: 0, y: 10 },
          exit: { opacity: 0, y: 10 }
        };
    }
  };

  const posStyles = venue ? getPositionStyles(venue.position) : null;

  return (
    <AnimatePresence mode="wait">
      {venue && posStyles && (
        <motion.div
          key={venue.id}
          className={clsx(
            "z-50 pointer-events-none flex w-max", // w-max ensures it doesn't collapse
            posStyles.container
          )}
          initial={posStyles.initial}
          animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
          exit={posStyles.exit}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} // Spring-like ease
          onMouseEnter={() => onOverlayHover?.(true)}
          onMouseLeave={() => onOverlayHover?.(false)}
          role="region"
          aria-live="polite"
          aria-label={`Venue information: ${venue.name}`}
        >
          <div className="relative w-64 h-80 pointer-events-auto" data-venue-overlay>
            {/* Taller Split-Blur Card - Peruvian Lily Style */}
            <div
              className="group relative h-full w-full overflow-hidden rounded-[1.5rem] border border-white/10 bg-neutral-900 shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:shadow-black/60"
              role="button"
              tabIndex={0}
              onClick={() => onLearnMore?.(venue)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onLearnMore?.(venue);
                }
              }}
            >
              {/* Full Background Image */}
              <div className="absolute inset-0 z-0">
                <img
                  src={venue.imageUrl}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
              </div>

              {/* Bottom Glass Blur Panel */}
              <div className="absolute bottom-0 left-0 right-0 h-[60%] w-full overflow-hidden rounded-t-[1.5rem] rounded-b-[1.5rem] bg-gradient-to-b from-black/40 to-black/80 backdrop-blur-md border-t border-white/10 shadow-[0_-10px_40px_-10px_rgba(0,0,0,0.5)] transition-all duration-500 group-hover:h-[65%]">

                {/* Content Inside Glass Panel */}
                <div className="flex h-full flex-col p-5 text-left text-white">
                  {/* Title */}
                  <h2 className="font-serif text-[1.75rem] leading-none tracking-wide drop-shadow-md">
                    {venue.name}
                  </h2>

                  {/* Subtitle */}
                  <p className="mt-1 font-serif text-[12px] italic text-[#e0d0c0] opacity-90">
                    {venue.position.replace("-", " ")}
                  </p>

                  {/* Description */}
                  <p className="mt-3 text-[11px] leading-relaxed text-neutral-200 line-clamp-3 font-normal opacity-90">
                    {venue.description}
                  </p>

                  {/* Button */}
                  <div className="mt-auto pt-4">
                    <button
                      className="w-full rounded-full border border-white/20 bg-[#9D8452]/70 py-2.5 text-[11px] font-medium uppercase tracking-widest text-white shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-[#9D8452]/90 hover:border-white/40 active:scale-95"
                      onClick={(e) => {
                        e.stopPropagation();
                        onLearnMore?.(venue);
                      }}
                    >
                      {primaryCtaLabel}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
