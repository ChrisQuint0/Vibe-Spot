"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

const MESSAGES = [
  "Exploring Pasig...",
  "Finding hidden gems...",
  "Matching your vibe...",
  "Comparing locations...",
  "Preparing recommendations...",
];

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setIndex((prev) => {
        if (prev === MESSAGES.length - 1) return prev; // Stop at last message
        return prev + 1;
      });
    }, 1500); // Change text every 1.5s

    // Simulate total network time
    const completeTimeout = setTimeout(() => {
      onComplete();
    }, 4500);

    return () => {
      clearInterval(messageInterval);
      clearTimeout(completeTimeout);
    };
  }, [onComplete]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full min-h-[60vh]">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="mb-8 text-emerald-500 relative"
      >
        <div className="absolute inset-0 bg-emerald-400 blur-xl opacity-20 rounded-full" />
        <Sparkles size={48} />
      </motion.div>

      <div className="h-8 overflow-hidden relative w-full text-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="text-lg font-medium text-stone-600 font-sans absolute w-full"
          >
            {MESSAGES[index]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
