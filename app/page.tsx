"use client";

import React, { useState, useEffect, useRef } from "react";
import Header from "@/components/landing/Header";
import MapBackground from "@/components/landing/MapBackground";
import HeroSection from "@/components/landing/HeroSection";
import AboutDrawer from "@/components/landing/AboutDrawer";
import SignupModal from "@/components/landing/SignupModal";
import Toast from "@/components/landing/Toast";
import { spotsOrder } from "@/components/landing/constants";
import "@/components/landing/landing.css";
import LoadingScreen from "@/components/landing/LoadingScreen";

export default function VibeSpotLanding() {
  const [isLoading, setIsLoading] = useState(true); //Loading screen
  const [aboutOpen, setAboutOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const [activeSpotId, setActiveSpotId] = useState<number | null>(1);
  const [hoveredSpotId, setHoveredSpotId] = useState<number | null>(null);
  const [toast, setToast] = useState({ visible: false, message: "", icon: "" });

  const hoveredSpotIdRef = useRef(hoveredSpotId);
  const slideshowIndexRef = useRef(0);
  const hideBufferTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    hoveredSpotIdRef.current = hoveredSpotId;
  }, [hoveredSpotId]);

  // Inject external dependencies (Fonts + Tabler Icons CDN) at runtime
  useEffect(() => {
    if (!document.getElementById("google-fonts-dm")) {
      const p1 = document.createElement("link");
      p1.rel = "preconnect";
      p1.href = "https://fonts.googleapis.com";
      document.head.appendChild(p1);

      const p2 = document.createElement("link");
      p2.rel = "preconnect";
      p2.href = "https://fonts.gstatic.com";
      p2.crossOrigin = "anonymous";
      document.head.appendChild(p2);

      const linkFont = document.createElement("link");
      linkFont.id = "google-fonts-dm";
      linkFont.rel = "stylesheet";
      linkFont.href =
        "https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400&family=DM+Mono:wght@400;500&display=swap";
      document.head.appendChild(linkFont);
    }

    if (!document.getElementById("tabler-icons-cdn")) {
      const linkIcons = document.createElement("link");
      linkIcons.id = "tabler-icons-cdn";
      linkIcons.rel = "stylesheet";
      linkIcons.href =
        "https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3.19.0/dist/tabler-icons.min.css";
      document.head.appendChild(linkIcons);
    }
  }, []);

  // 1. Add an exiting tracking state near your other states
  const [isExiting, setIsExiting] = useState(false);

  // Automated Slideshow Sequencer loop
  useEffect(() => {
    const interval = setInterval(() => {
      if (hoveredSpotIdRef.current === null) {
        // Trigger the exit animation phase
        setIsExiting(true);

        // Wait exactly for the 350ms CSS animation to conclude before swapping data
        setTimeout(() => {
          slideshowIndexRef.current =
            (slideshowIndexRef.current + 1) % spotsOrder.length;
          setActiveSpotId(spotsOrder[slideshowIndexRef.current]);
          setIsExiting(false); // Reset for the next bubble's pop-in
        }, 350);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const showToast = (message: string, iconClass = "ti-circle-check-filled") => {
    setToast({ visible: true, message, icon: iconClass });
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 4000);
  };

  const clearHideBuffer = (spotId: number) => {
    setHoveredSpotId(spotId);
    if (hideBufferTimeoutRef.current)
      clearTimeout(hideBufferTimeoutRef.current);
    setActiveSpotId(spotId);
    const idx = spotsOrder.indexOf(spotId);
    if (idx !== -1) slideshowIndexRef.current = idx;
  };

  const startHideBuffer = () => {
    setHoveredSpotId(null);
    if (hideBufferTimeoutRef.current)
      clearTimeout(hideBufferTimeoutRef.current);
    hideBufferTimeoutRef.current = setTimeout(() => {
      if (hoveredSpotIdRef.current === null) {
        setActiveSpotId(null);
      }
    }, 1200);
  };

  return (
    <div className="app-viewport">
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      <Header
        onAboutOpen={() => setAboutOpen(true)}
        onSignupOpen={() => setSignupOpen(true)}
      />

      <MapBackground
        activeSpotId={activeSpotId}
        isExiting={isExiting}
        clearHideBuffer={clearHideBuffer}
        startHideBuffer={startHideBuffer}
        setHoveredSpotId={setHoveredSpotId}
      />

      <HeroSection onFindSpotClick={showToast} activeSpotId={activeSpotId} />

      <AboutDrawer isOpen={aboutOpen} onClose={() => setAboutOpen(false)} />

      <SignupModal
        isOpen={signupOpen}
        onClose={() => setSignupOpen(false)}
        onSubmitSuccess={showToast}
      />

      <Toast
        visible={toast.visible}
        message={toast.message}
        icon={toast.icon}
      />
    </div>
  );
}
