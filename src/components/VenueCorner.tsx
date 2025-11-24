import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface Venue {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  color: string;
}

interface VenueCornerProps {
  venue: Venue;
}

export function VenueCorner({ venue }: VenueCornerProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Position configurations for each corner
  const positionConfig = {
    "top-left": {
      corner: "top-0 left-0",
      transform: { x: -20, y: -20 },
      origin: "top-left",
      clipPath: "polygon(0 0, 100% 0, 0 100%)",
      contentAlign: "items-start justify-start",
      textAlign: "text-left"
    },
    "top-right": {
      corner: "top-0 right-0",
      transform: { x: 20, y: -20 },
      origin: "top-right",
      clipPath: "polygon(100% 0, 100% 100%, 0 0)",
      contentAlign: "items-start justify-end",
      textAlign: "text-right"
    },
    "bottom-left": {
      corner: "bottom-0 left-0",
      transform: { x: -20, y: 20 },
      origin: "bottom-left",
      clipPath: "polygon(0 0, 0 100%, 100% 100%)",
      contentAlign: "items-end justify-start",
      textAlign: "text-left"
    },
    "bottom-right": {
      corner: "bottom-0 right-0",
      transform: { x: 20, y: 20 },
      origin: "bottom-right",
      clipPath: "polygon(100% 0, 100% 100%, 0 100%)",
      contentAlign: "items-end justify-end",
      textAlign: "text-right"
    }
  };

  const config = positionConfig[venue.position];

  return (
    <motion.div
      className={`absolute ${config.corner} w-48 h-48 cursor-pointer`}
      style={{ transformOrigin: config.origin }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      animate={{
        x: isHovered ? config.transform.x : 0,
        y: isHovered ? config.transform.y : 0,
        scale: isHovered ? 1.1 : 1
      }}
      transition={{
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1]
      }}
    >
      {/* Base triangle shape */}
      <div
        className="absolute inset-0 transition-all duration-400"
        style={{
          clipPath: config.clipPath,
          backgroundColor: venue.color,
          opacity: isHovered ? 0 : 0.8
        }}
      />

      {/* Hover state with image and content */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            {/* Background image */}
            <div className="absolute inset-0">
              <img
                src={venue.imageUrl}
                alt={venue.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/50 to-black/70" />
            </div>

            {/* Content */}
            <div className={`relative h-full p-6 flex flex-col ${config.contentAlign}`}>
              <div className={`${config.textAlign} max-w-full`}>
                <motion.h3
                  className="text-white mb-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                >
                  {venue.name}
                </motion.h3>
                <motion.p
                  className="text-white/90 text-sm"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                >
                  {venue.description}
                </motion.p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hover indicator - small dot */}
      {!isHovered && (
        <motion.div
          className={`absolute ${config.corner} w-3 h-3 bg-white rounded-full shadow-md m-4`}
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
    </motion.div>
  );
}
