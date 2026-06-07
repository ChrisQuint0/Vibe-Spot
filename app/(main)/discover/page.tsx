"use client";

import { useState } from "react";
import { PreferenceWizard } from "@/components/recommendations/preference-wizard";
import { LoadingScreen } from "@/components/recommendations/loading-screen";
import { ShowcaseView } from "@/components/recommendations/showcase";
import { useRecommendations } from "@/store/recommendation-context";

export default function DiscoverPage() {
  const [view, setView] = useState<"wizard" | "loading" | "showcase">("wizard");
  const { generateNewRecommendation } = useRecommendations();

  const handleWizardComplete = () => {
    setView("loading");
    // Trigger the context to begin generating in the background
    generateNewRecommendation();
  };

  const handleLoadingComplete = () => {
    setView("showcase");
  };

  if (view === "loading") {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  if (view === "showcase") {
    return <ShowcaseView />;
  }

  // Default: Wizard
  return <PreferenceWizard onComplete={handleWizardComplete} />;
}
