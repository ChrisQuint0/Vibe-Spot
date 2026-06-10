"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { LoadingScreen } from "@/components/recommendations/loading-screen";
import { ShowcaseView } from "@/components/recommendations/showcase";
import { useRecommendations } from "@/store/recommendation-context";

export default function RecommendationIdPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  
  const id = params.id as string;
  const isNew = searchParams.get("new") === "true";

  const {
    recentRecommendations,
    activeRecommendation,
    setActiveRecommendation,
  } = useRecommendations();

  // Internal state to track if we should show loading
  const [showLoading, setShowLoading] = useState(isNew);

  useEffect(() => {
    // If the active recommendation is already correct, we are good.
    if (activeRecommendation?.id === id) return;

    // Otherwise, try to find it in the recents list
    const found = recentRecommendations.find((rec) => rec.id === id);
    if (found) {
      setActiveRecommendation(found);
    } else {
      // Not found (e.g. user refreshed the page and lost memory state). 
      // Redirect back to discover.
      router.replace("/discover");
    }
  }, [id, activeRecommendation, recentRecommendations, setActiveRecommendation, router]);

  const handleLoadingComplete = () => {
    setShowLoading(false);
    // Remove the ?new=true from the URL cleanly
    router.replace(`/recommendations/${id}`);
  };

  // If we are currently loading
  if (showLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  // If we haven't set the active recommendation yet
  if (activeRecommendation?.id !== id) {
    return null; // Or a simple skeleton loader
  }

  return <ShowcaseView />;
}
