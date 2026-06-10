// components/recommendations/loading-screen.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const MESSAGES = [
  "Exploring Pasig...",
  "Finding hidden gems...",
  "Matching your vibe...",
  "Comparing locations...",
  "Preparing recommendations...",
];

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [index, setIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Change text every 1s (5 messages over 5 seconds)
    const messageInterval = setInterval(() => {
      setIndex((prev) => {
        if (prev === MESSAGES.length - 1) return prev;
        return prev + 1;
      });
    }, 1000);

    // Keep loading screen alive for exactly 5 seconds before exiting
    const completeTimeout = setTimeout(() => {
      setIsExiting(true);
      // Wait for exit animation to finish before unmounting
      setTimeout(() => {
        onComplete();
      }, 500);
    }, 5000);

    return () => {
      clearInterval(messageInterval);
      clearTimeout(completeTimeout);
    };
  }, [onComplete]);

  // Split word to animate individually
  const letters = "vibespot".split("");

  return (
    <motion.div
      animate={isExiting ? { opacity: 0, y: -20 } : { opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="absolute inset-0 z-[2000] flex flex-col items-center justify-center w-full h-full bg-brand-primary"
    >
      <div className="flex flex-col items-center">
        {/* Brand Container */}
        <div className="flex items-center gap-3 mb-12">
          {/* Logo (Pops in once) */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", bounce: 0.5, delay: 0.1 }}
            className="w-10 h-10 md:w-12 md:h-12"
          >
            <img
              src="/vibespot_logo_white_nobg.png"
              alt="VibeSpot Logo"
              className="w-full h-full object-contain drop-shadow-lg"
            />
          </motion.div>

          {/* Animated Lettering (Wave, Pause, Wave) */}
          <div className="flex text-3xl md:text-4xl font-bold tracking-tight drop-shadow-md">
            {letters.map((letter, i) => {
              const isAccent = i >= 4;
              return (
                <motion.span
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    y: [0, -12, 0], // Keyframes for the bounce
                  }}
                  transition={{
                    opacity: { duration: 0.4, delay: i * 0.05 },
                    y: {
                      duration: 1.2, // Time it takes for one full wave
                      repeat: Infinity, // Loops forever
                      repeatDelay: 2, // Pauses for 2 seconds before the next wave
                      ease: "easeInOut", // Smooth curve instead of spring
                      delay: i * 0.08, // Staggers the bounce for the wave effect
                    },
                  }}
                  className={isAccent ? "text-[#f5a623]" : "text-white"}
                >
                  {letter}
                </motion.span>
              );
            })}
          </div>
        </div>

        {/* Changing Text */}
        <div className="h-6 mb-5 overflow-hidden relative w-full text-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={index}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-sm md:text-base font-medium text-emerald-100/90 font-sans absolute w-full tracking-wide"
            >
              {MESSAGES[index]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Progress Bar Container */}
        <div className="w-56 md:w-64 h-1.5 bg-black/30 rounded-full overflow-hidden shadow-inner">
          <motion.div
            className="h-full bg-[#f5a623] rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 5, ease: "linear" }}
          />
        </div>
      </div>
    </motion.div>
  );
}
