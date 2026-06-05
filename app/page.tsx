"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [dynamicWord, setDynamicWord] = useState("Weekend Plans");

  // The shifting words requested by the Vibe_Spot_Capstone_1_Product_Scope.pdf
  const phrases = [
    "Weekend Plans",
    "Coffee Spot",
    "Study Place",
    "Date Night",
    "Food Adventure",
    "Barkada Hangout",
  ];

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % phrases.length;
      setDynamicWord(phrases[index]);
    }, 3000); // Transitions smoothly every few seconds

    return () => clearInterval(interval);
  }, []);

  const handleStartDiscovery = () => {
    console.log("Transition to AI preference collection flow...");
    // This is where you will trigger your conversational AI UI
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white px-6 text-black selection:bg-indigo-100">
      <div className="max-w-3xl text-center space-y-6">
        {/* Dynamic Hero Headline */}
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl text-gray-900 transition-all duration-500">
          Find Your{" "}
          <span className="text-indigo-600 block sm:inline">{dynamicWord}</span>
        </h1>

        {/* Product Scope Description */}
        <p className="mx-auto max-w-xl text-lg text-gray-600 leading-relaxed">
          Discover hidden gems and authentic local spots across Pasig City,
          curated by AI based on your preferences and ready to share with your
          friends.
        </p>

        {/* Primary Call-To-Action */}
        <div className="pt-4">
          <button
            onClick={handleStartDiscovery}
            className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
          >
            Find a Spot
          </button>
        </div>
      </div>
    </main>
  );
}
