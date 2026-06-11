"use client";

import React, { createContext, useContext, useState } from "react";
import { MOCK_RECOMMENDATIONS, type Recommendation, type Location } from "@/lib/mock-data";

interface RecContextType {
  recentRecommendations: Recommendation[];
  activeRecommendation: Recommendation | null;
  savedPlaces: Location[];
  generateNewRecommendation: (scope: "anywhere" | "near") => Promise<string>;
  setActiveRecommendation: (rec: Recommendation | null) => void;
  toggleSavePlace: (place: Location) => void;
  isPlaceSaved: (id: string) => boolean;
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
  const [savedPlaces, setSavedPlaces] = useState<Location[]>([]);

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

  const toggleSavePlace = (place: Location) => {
    setSavedPlaces((prev) => {
      const exists = prev.some((p) => p.id === place.id);
      if (exists) {
        return prev.filter((p) => p.id !== place.id);
      } else {
        return [...prev, place];
      }
    });
  };

  const isPlaceSaved = (id: string) => {
    return savedPlaces.some((place) => place.id === id);
  };

  return (
    <RecContext.Provider
      value={{
        recentRecommendations,
        activeRecommendation,
        savedPlaces,
        generateNewRecommendation,
        setActiveRecommendation,
        toggleSavePlace,
        isPlaceSaved,
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
