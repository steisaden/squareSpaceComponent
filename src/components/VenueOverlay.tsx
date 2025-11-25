import { motion, AnimatePresence } from "motion/react";
import { Venue } from "../config";

interface VenueOverlayProps {
  venue: Venue | null;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  onLearnMore?: (venue: Venue) => void;
  onBookNow?: (venue: Venue) => void;
  onOverlayHover?: (isHovered: boolean) => void;
}

export function VenueOverlay({ venue, primaryCtaLabel, secondaryCtaLabel, onLearnMore, onBookNow, onOverlayHover }: VenueOverlayProps) {
  return (
    <AnimatePresence mode="wait">
      {venue && (
        <motion.div
          key={venue.id}
          className="fixed inset-x-0 bottom-24 flex justify-center items-center px-4 z-20 pointer-events-none"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onMouseEnter={() => onOverlayHover?.(true)}
          onMouseLeave={() => onOverlayHover?.(false)}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          role="region"
          aria-live="polite"
          aria-label={`Venue information: ${venue.name}`}
        >
          <div className="relative max-w-2xl w-full">
            {/* Card container */}
            <motion.div
              className="relative bg-white rounded-2xl shadow-2xl overflow-hidden"
              data-venue-overlay
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <div className="flex flex-col sm:flex-row">
                {/* Image section */}
                <motion.div
                  className="relative w-full sm:w-2/5 h-48 sm:h-auto overflow-hidden"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  <img
                    src={venue.imageUrl}
                    alt={`${venue.name} venue space`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20" />
                </motion.div>

                {/* Content section */}
                <motion.div
                  className="flex-1 p-6 sm:p-8 flex flex-col justify-center"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.25 }}
                >
                  {/* Color indicator */}
                  <div
                    className="w-12 h-1 rounded-full mb-4"
                    style={{ backgroundColor: venue.color }}
                    aria-hidden="true"
                  />

                  <h2 className="text-neutral-900 mb-3">
                    {venue.name}
                  </h2>

                  <p className="text-neutral-600 mb-4">
                    {venue.description}
                  </p>

                  {/* Call to action */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => onLearnMore?.(venue)}
                      className="px-6 py-2 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors duration-200 pointer-events-auto cursor-pointer"
                      aria-label={`Learn more about ${venue.name}`}
                    >
                      {primaryCtaLabel}
                    </button>
                    <button
                      onClick={() => onBookNow?.(venue)}
                      className="px-6 py-2 border-2 border-neutral-300 text-neutral-700 rounded-lg hover:border-neutral-400 hover:bg-neutral-50 transition-all duration-200 pointer-events-auto cursor-pointer"
                      aria-label={`Book ${venue.name}`}
                    >
                      {secondaryCtaLabel}
                    </button>
                  </div>
                </motion.div>
              </div>

              {/* Animated border accent */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                  boxShadow: `inset 0 0 0 2px ${venue.color}40`
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              />
            </motion.div>

            {/* Tooltip arrow */}
            <motion.div
              className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-white rotate-45 shadow-lg"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, delay: 0.15 }}
              aria-hidden="true"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
