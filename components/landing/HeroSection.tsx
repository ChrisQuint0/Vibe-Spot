import React, { useState, useEffect, useRef } from "react";
import { phrases } from "./constants";

interface HeroSectionProps {
  onFindSpotClick: (msg: string, iconClass: string) => void;
  activeSpotIds: number[];
}

export default function HeroSection({
  onFindSpotClick,
  activeSpotIds,
}: HeroSectionProps) {
  const [phraseOffset, setPhraseOffset] = useState(0);
  const [phraseHeight, setPhraseHeight] = useState(68);
  const phraseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseOffset((prev) => (prev + 1) % phrases.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (phraseRef.current) setPhraseHeight(phraseRef.current.clientHeight);
    const handleResize = () => {
      if (phraseRef.current) setPhraseHeight(phraseRef.current.clientHeight);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [activeSpotIds]);

  return (
    <main id="landing-overlay">
      <div className="hero-card">
        <h1 className="hero-title">
          The Spot Finder for Your Next
          <div className="vibe-phrase-container">
            <div
              className="phrase-slider-wrapper"
              style={{
                transform: `translateY(-${phraseOffset * phraseHeight}px)`,
              }}
            >
              {phrases.map((phrase, i) => (
                <div
                  key={i}
                  ref={i === 0 ? phraseRef : null}
                  className="vibe-phrase"
                >
                  {phrase}
                </div>
              ))}
            </div>
          </div>
        </h1>

        <p className="hero-description">
          Discover hidden gems and authentic local spots across Pasig City,
          curated by AI based on your preferences and ready to share with your
          friends.
        </p>

        <button
          className="cta-btn-primary"
          onClick={() =>
            onFindSpotClick(
              "Spot Finder integration coming soon! 🚀",
              "ti-info-circle",
            )
          }
        >
          <span>Find A Spot</span>
          <i className="ti ti-arrow-right"></i>
        </button>
      </div>
    </main>
  );
}
