import React, { useEffect, useState } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Keep the loading screen alive for exactly 5 seconds
    const timer = setTimeout(() => {
      setIsExiting(true);

      // Wait 800ms for the CSS slide-up exit animation to finish before unmounting
      setTimeout(() => {
        onComplete();
      }, 800);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  // Split word to animate individually
  const letters = "vibespot".split("");

  return (
    <div className={`loading-screen-overlay ${isExiting ? "exiting" : ""}`}>
      <div className="loading-content">
        <div className="loading-brand">
          {/* Logo pops in first at 0.1s */}
          <div
            className="loading-logo bouncy-element"
            style={{ animationDelay: "0.1s" }}
          >
            <img src="vibespot_logo_white_nobg.png" alt="VibeSpot Logo" />
          </div>

          <div className="loading-text">
            {/* Letters domino in one by one (+0.1s increments) */}
            {letters.map((letter, i) => {
              // 'spot' (index 4+) gets the accent color
              const isAccent = i >= 4;
              return (
                <span
                  key={i}
                  className="bouncy-element"
                  style={{
                    animationDelay: `${0.2 + i * 0.1}s`,
                    color: isAccent ? "var(--color-accent-vibe)" : "#ffffff",
                  }}
                >
                  {letter}
                </span>
              );
            })}
          </div>
        </div>

        {/* The 5-second progress bar */}
        <div className="loading-bar-container">
          <div className="loading-bar-fill"></div>
        </div>
      </div>
    </div>
  );
}
