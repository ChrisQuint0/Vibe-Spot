"use client";

import React, { createContext, useContext, useState } from "react";
import { MOCK_RECOMMENDATIONS } from "@/lib/mock-data";

type Recommendation = (typeof MOCK_RECOMMENDATIONS)[0];

interface RecContextType {
  recentRecommendations: Recommendation[];
  activeRecommendation: Recommendation | null;
  generateNewRecommendation: () => Promise<void>;
  setActiveRecommendation: (rec: Recommendation) => void;
}

const RecContext = createContext<RecContextType | undefined>(undefined);

export function RecommendationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [recentRecommendations, setRecentRecommendations] = useState<
    Recommendation[]
  >([]);
  const [activeRecommendation, setActiveRecommendation] =
    useState<Recommendation | null>(null);

  const generateNewRecommendation = async () => {
    // Randomly pick one of our mock itineraries to simulate AI generation
    const randomRec =
      MOCK_RECOMMENDATIONS[
        Math.floor(Math.random() * MOCK_RECOMMENDATIONS.length)
      ];
    const newRec = { ...randomRec, id: `session-${Date.now()}` };

    setRecentRecommendations((prev) => [newRec, ...prev]);
    setActiveRecommendation(newRec);
  };

  return (
    <RecContext.Provider
      value={{
        recentRecommendations,
        activeRecommendation,
        generateNewRecommendation,
        setActiveRecommendation,
      }}
    >
      {children}
    </RecContext.Provider>
  );
}

export const useRecommendations = () => {
  const context = useContext(RecContext);
  if (!context)
    throw new Error(
      "useRecommendations must be used within RecommendationProvider",
    );
  return context;
};
