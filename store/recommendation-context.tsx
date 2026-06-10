"use client";

import React, { createContext, useContext, useState } from "react";
import { MOCK_RECOMMENDATIONS, type Recommendation } from "@/lib/mock-data";

interface RecContextType {
  recentRecommendations: Recommendation[];
  activeRecommendation: Recommendation | null;
  generateNewRecommendation: (scope: "anywhere" | "near") => Promise<string>;
  setActiveRecommendation: (rec: Recommendation | null) => void;
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

  const generateNewRecommendation = async (scope: "anywhere" | "near") => {
    // Pick the right base recommendation based on the wizard scope
    const base =
      scope === "near" ? MOCK_RECOMMENDATIONS[1] : MOCK_RECOMMENDATIONS[0];
    const newRec: Recommendation = { ...base, id: `session-${Date.now()}` };

    // Push to recents immediately (ChatGPT-style: shows up as soon as session starts)
    setRecentRecommendations((prev) => [newRec, ...prev]);
    setActiveRecommendation(newRec);
    
    return newRec.id;
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
