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
    // We anchor firmly to the screen corners
    switch (position) {
      case "top-left":
        return {
          container: "top-8 left-8 items-start justify-start",
          arrow: "top-8 -right-3 -translate-y-1/2 rotate-45 hidden", // Hide arrow for corner style or adjust? User said "fit their respective outer corner". 
          // Let's keep arrow but point it inwards?
          // Actually, if it's in the corner, it should probably expand OUT from the corner.
          initial: { opacity: 0, x: -20, y: -20, scale: 0.9 },
          exit: { opacity: 0, x: -20, y: -20, scale: 0.9 }
        };
      case "top-right":
        return {
          container: "top-8 right-8 items-start justify-end",
          arrow: "top-8 -left-3 -translate-y-1/2 rotate-45 hidden",
          initial: { opacity: 0, x: 20, y: -20, scale: 0.9 },
          exit: { opacity: 0, x: 20, y: -20, scale: 0.9 }
        };
      case "bottom-left":
        return {
          container: "bottom-8 left-8 items-end justify-start",
          arrow: "bottom-8 -right-3 translate-y-1/2 rotate-45 hidden",
          initial: { opacity: 0, x: -20, y: 20, scale: 0.9 },
          exit: { opacity: 0, x: -20, y: 20, scale: 0.9 }
        };
      case "bottom-right":
        return {
          container: "bottom-8 right-8 items-end justify-end",
          arrow: "bottom-8 -left-3 translate-y-1/2 rotate-45 hidden",
          initial: { opacity: 0, x: 20, y: 20, scale: 0.9 },
          exit: { opacity: 0, x: 20, y: 20, scale: 0.9 }
        };
      default:
        // Fallback to centered bottom if no position (shouldn't happen for corners)
        return {
          container: "bottom-24 left-1/2 -translate-x-1/2",
          arrow: "-top-3 left-1/2 -translate-x-1/2 rotate-45",
          initial: { opacity: 0, y: 20 },
          exit: { opacity: 0, y: 20 }
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
            "fixed z-20 pointer-events-none flex",
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
          {/* Width constraint wrapper - Smaller size */}
          <div className="relative w-[280px] sm:w-[320px]">
            {/* Card container */}
            <div
              className="relative bg-white rounded-2xl shadow-2xl overflow-hidden pointer-events-auto"
              data-venue-overlay
            >
              <div className="flex flex-col">
                {/* Image section */}
                <div className="relative w-full h-28 overflow-hidden">
                  <img
                    src={venue.imageUrl}
                    alt={`${venue.name} venue space`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                  {/* Position label overlay */}
                  <div className="absolute bottom-2 left-3 px-2 py-0.5 rounded-full bg-white/90 text-[10px] font-bold tracking-wider uppercase text-neutral-800">
                    {venue.position.replace("-", " ")}
                  </div>
                </div>

                {/* Content section */}
                <div className="p-4 flex flex-col">
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: venue.color }}
                      aria-hidden="true"
                    />
                    <h2 className="text-base font-bold text-neutral-900 leading-tight">
                      {venue.name}
                    </h2>
                  </div>

                  <p className="text-xs text-neutral-600 mb-3 line-clamp-3">
                    {venue.description}
                  </p>

                  {/* Call to action */}
                  <div className="flex gap-2 mt-auto">
                    <button
                      onClick={() => onLearnMore?.(venue)}
                      className="flex-1 px-3 py-1.5 bg-neutral-900 text-white text-xs rounded-lg hover:bg-neutral-800 transition-colors duration-200 cursor-pointer"
                    >
                      {primaryCtaLabel}
                    </button>
                    <button
                      onClick={() => onBookNow?.(venue)}
                      className="flex-1 px-3 py-1.5 border border-neutral-200 text-neutral-700 text-xs rounded-lg hover:bg-neutral-50 transition-colors duration-200 cursor-pointer"
                    >
                      {secondaryCtaLabel}
                    </button>
                  </div>
                </div>
              </div>

              {/* Animated border accent */}
              <div
                className="absolute inset-0 pointer-events-none border-2 border-transparent rounded-2xl"
                style={{ borderColor: `${venue.color}40` }}
              />
            </div>

            {/* Removed Arrow for corner styles as it complicates the clean corner look */}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
