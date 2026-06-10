"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { PreferenceWizard } from "@/components/recommendations/preference-wizard";
import { useRecommendations } from "@/store/recommendation-context";

export default function DiscoverPage() {
  const router = useRouter();
  const { generateNewRecommendation, setActiveRecommendation } = useRecommendations();

  useEffect(() => {
    setActiveRecommendation(null);
  }, [setActiveRecommendation]);

  const handleWizardComplete = async (scope: "anywhere" | "near") => {
    // Generate the recommendation and get its ID
    const newId = await generateNewRecommendation(scope);
    
    // Redirect to the new recommendation's URL with the ?new=true flag 
    // to trigger the loading screen on the destination page
    router.push(`/recommendations/${newId}?new=true`);
  };

  return <PreferenceWizard onComplete={handleWizardComplete} />;
}
