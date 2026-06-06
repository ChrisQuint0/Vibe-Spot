"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion"; // <-- Added framer-motion

import Header from "@/components/landing/Header";
import MapBackground from "@/components/landing/MapBackground";
import HeroSection from "@/components/landing/HeroSection";
import AboutDrawer from "@/components/landing/AboutDrawer";
import SignupModal from "@/components/landing/SignupModal";
import Toast from "@/components/landing/Toast";
import { spotsOrder } from "@/components/landing/constants";
import "@/components/landing/landing.css";
import LoadingScreen from "@/components/landing/LoadingScreen";
import { useRouter } from "next/navigation";

export default function VibeSpotLanding() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isNavigating, setIsNavigating] = useState(false);
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

  // Inject external dependencies
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

      // In page.tsx useEffect for fonts:
      const linkFont = document.createElement("link");
      linkFont.id = "google-fonts-jakarta";
      linkFont.rel = "stylesheet";
      linkFont.href =
        "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap";
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

  const [isExiting, setIsExiting] = useState(false);

  // Automated Slideshow Sequencer loop
  useEffect(() => {
    const interval = setInterval(() => {
      if (hoveredSpotIdRef.current === null) {
        setIsExiting(true);
        setTimeout(() => {
          slideshowIndexRef.current =
            (slideshowIndexRef.current + 1) % spotsOrder.length;
          setActiveSpotId(spotsOrder[slideshowIndexRef.current]);
          setIsExiting(false);
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

  // --- New Handlers for the App Flow ---
  const handleFindSpotClick = () => {
    // Trigger exit animation
    setIsNavigating(true);
    setTimeout(() => {
      router.push("/discover");
    }, 600); // Matches the AnimatePresence exit duration
  };

  return (
    <div className="app-viewport relative overflow-hidden h-screen w-full">
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      {/* MapBackground remains at the bottom layer. It adds ambiance. */}
      <MapBackground
        activeSpotId={activeSpotId}
        isExiting={isExiting}
        clearHideBuffer={clearHideBuffer}
        startHideBuffer={startHideBuffer}
        setHoveredSpotId={setHoveredSpotId}
      />

      <AnimatePresence mode="wait">
        {/* --- LANDING PAGE STATE --- */}
        {!isNavigating && (
          <motion.div
            key="landing-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -40, filter: "blur(8px)" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 z-10 flex flex-col pointer-events-none"
          >
            {/* Re-enable pointer events for interactive elements */}
            <div className="pointer-events-auto h-full flex flex-col">
              <Header
                onAboutOpen={() => setAboutOpen(true)}
                onSignupOpen={() => setSignupOpen(true)}
              />
              <HeroSection
                onFindSpotClick={handleFindSpotClick} // Changed from showToast to transition state
                activeSpotId={activeSpotId}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modals & Toasts (z-index naturally higher than absolute layers above if ordered correctly) */}
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
