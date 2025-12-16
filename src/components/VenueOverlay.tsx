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
    // Base styles: fixed centered, but we'll use margins/transforms to move it to a quadrant
    // We anchor to center (top-1/2 left-1/2) and offset.
    // Assuming the cube region is roughly 250px-300px square, we want to start outside that.

    switch (position) {
      case "top-left":
        return {
          container: "bottom-1/2 right-1/2 mb-24 mr-24", // Push up and left
          arrow: "bottom-[-6px] right-24 translate-x-1/2 rotate-45", // Point down-right towards center (approx)
          initial: { opacity: 0, x: 20, y: 20, scale: 0.9 }, // Grow from center
          exit: { opacity: 0, x: 20, y: 20, scale: 0.9 }
        };
      case "top-right":
        return {
          container: "bottom-1/2 left-1/2 mb-24 ml-24", // Push up and right
          arrow: "bottom-[-6px] left-24 -translate-x-1/2 rotate-45", // Point down-left
          initial: { opacity: 0, x: -20, y: 20, scale: 0.9 },
          exit: { opacity: 0, x: -20, y: 20, scale: 0.9 }
        };
      case "bottom-left":
        return {
          container: "top-1/2 right-1/2 mt-24 mr-24", // Push down and left
          arrow: "top-[-6px] right-24 translate-x-1/2 rotate-45", // Point up-right
          initial: { opacity: 0, x: 20, y: -20, scale: 0.9 },
          exit: { opacity: 0, x: 20, y: -20, scale: 0.9 }
        };
      case "bottom-right":
        return {
          container: "top-1/2 left-1/2 mt-24 ml-24", // Push down and right
          arrow: "top-[-6px] left-24 -translate-x-1/2 rotate-45", // Point up-left
          initial: { opacity: 0, x: -20, y: -20, scale: 0.9 },
          exit: { opacity: 0, x: -20, y: -20, scale: 0.9 }
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
            "fixed z-20 pointer-events-none flex justify-center items-center", // Base
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
          {/* Width constraint wrapper */}
          <div className="relative w-[360px] sm:w-[400px]">
            {/* Card container */}
            <div
              className="relative bg-white rounded-2xl shadow-2xl overflow-hidden pointer-events-auto"
              data-venue-overlay
            >
              <div className="flex flex-col">
                {/* Image section - Top for compact card */}
                <div className="relative w-full h-32 overflow-hidden">
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
                <div className="p-5 flex flex-col">
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: venue.color }}
                      aria-hidden="true"
                    />
                    <h2 className="text-lg font-bold text-neutral-900 leading-tight">
                      {venue.name}
                    </h2>
                  </div>

                  <p className="text-sm text-neutral-600 mb-4 line-clamp-3">
                    {venue.description}
                  </p>

                  {/* Call to action */}
                  <div className="flex gap-2 mt-auto">
                    <button
                      onClick={() => onLearnMore?.(venue)}
                      className="flex-1 px-4 py-2 bg-neutral-900 text-white text-sm rounded-lg hover:bg-neutral-800 transition-colors duration-200 cursor-pointer"
                    >
                      {primaryCtaLabel}
                    </button>
                    <button
                      onClick={() => onBookNow?.(venue)}
                      className="flex-1 px-4 py-2 border border-neutral-200 text-neutral-700 text-sm rounded-lg hover:bg-neutral-50 transition-colors duration-200 cursor-pointer"
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

            {/* Tooltip arrow - Positioned pointing towards center */}
            <div
              className={clsx(
                "absolute w-4 h-4 bg-white shadow-sm z-[-1]",
                posStyles.arrow
              )}
              aria-hidden="true"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
