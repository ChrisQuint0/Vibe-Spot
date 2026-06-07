"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { MOCK_RECOMMENDATIONS } from "@/lib/mock-data";
import { useRecommendations } from "@/store/recommendation-context";
import {
  MapPin,
  CreditCard,
  ChevronRight,
  ChevronLeft,
  Bookmark,
  Share,
  Maximize,
  Minimize,
  Phone,
  Star,
  Compass,
} from "lucide-react";

// Dynamically import Leaflet
const MapWrapper = dynamic(() => import("../maps/leaflet-map"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-stone-100 animate-pulse" />,
});

export function ShowcaseView() {
  const { activeRecommendation, setActiveRecommendation } =
    useRecommendations();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showMoreList, setShowMoreList] = useState(false);

  const locations = activeRecommendation?.locations || [];
  const currentLocation = locations[activeIndex];

  // Auto-advance logic
  useEffect(() => {
    if (!isPlaying || locations.length === 0 || showMoreList) return;

    const timer = setTimeout(() => {
      if (activeIndex < locations.length - 1) {
        setActiveIndex((prev) => prev + 1);
      } else {
        setIsPlaying(false);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [activeIndex, isPlaying, locations.length, showMoreList]);

  // Handle clicking a map marker
  const handleMarkerClick = (index: number) => {
    setIsPlaying(false);
    setActiveIndex(index);
    if (showMoreList) setShowMoreList(false);
  };

  if (!activeRecommendation || !currentLocation) return null;

  return (
    <div className="flex flex-col-reverse md:flex-row h-screen w-full bg-surface-page overflow-hidden">
      {/* LEFT PANEL - Information */}
      <div
        className={`w-full md:w-[45%] lg:w-[40%] h-[50vh] md:h-full overflow-y-auto minimal-scrollbar bg-white shadow-xl z-10 flex flex-col relative ${isFullscreen ? "hidden" : "block"}`}
      >
        <AnimatePresence mode="wait">
          {showMoreList ? (
            /* --- EXPLORE MORE LIST VIEW --- */
            <motion.div
              key="more-list"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="p-6 pb-12"
            >
              <button
                onClick={() => setShowMoreList(false)}
                className="flex items-center gap-2 text-emerald-600 font-bold text-xl mb-8 hover:-translate-x-1 transition-transform"
              >
                <ChevronLeft size={24} strokeWidth={3} /> More Recommendations
              </button>

              <div className="flex flex-col gap-8">
                {MOCK_RECOMMENDATIONS.filter(
                  (r) => r.id !== activeRecommendation.id,
                ).map((rec) => {
                  // Use the first location of the recommendation to represent the card
                  const repLocation = rec.locations[0];
                  return (
                    <div
                      key={rec.id}
                      onClick={() => {
                        setActiveRecommendation(rec);
                        setActiveIndex(0);
                        setShowMoreList(false);
                        setIsPlaying(true);
                      }}
                      className="group cursor-pointer"
                    >
                      <div className="w-full h-48 rounded-xl overflow-hidden mb-4 relative shadow-sm">
                        <img
                          src={repLocation.images[0]}
                          alt={repLocation.name}
                          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-emerald-600 group-hover:text-emerald-700 transition-colors">
                          {rec.title}
                        </h3>
                        <div className="flex items-center">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              size={12}
                              className="fill-amber-400 text-amber-400"
                            />
                          ))}
                          <span className="font-bold text-xs ml-1.5 text-stone-800">
                            4.7
                          </span>
                          <span className="text-[10px] text-stone-400 ml-1">
                            (589 reviews)
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-stone-500 leading-relaxed line-clamp-3">
                        {repLocation.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            /* --- SINGLE LOCATION VIEW --- */
            <motion.div
              key={currentLocation.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="flex-1 pb-8"
            >
              {/* Image Carousel */}
              <div className="w-full h-64 md:h-72 mb-6 relative">
                <img
                  src={currentLocation.images[0]}
                  alt={currentLocation.name}
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />

                <button className="absolute left-4 top-1/2 -translate-y-1/2 text-white/90 hover:text-white drop-shadow-md hover:scale-110 transition">
                  <ChevronLeft size={36} strokeWidth={2} />
                </button>
                <button className="absolute right-4 top-1/2 -translate-y-1/2 text-white/90 hover:text-white drop-shadow-md hover:scale-110 transition">
                  <ChevronRight size={36} strokeWidth={2} />
                </button>
              </div>

              <div className="px-6">
                {/* Header */}
                <div className="flex justify-between items-start mb-3">
                  <h2 className="text-2xl font-bold text-stone-900 leading-tight pr-4">
                    {currentLocation.name}
                  </h2>
                  <div className="flex gap-2 shrink-0 mt-1">
                    <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition shadow-[0_2px_8px_rgba(16,185,129,0.3)]">
                      <Bookmark size={14} fill="currentColor" /> Save
                    </button>
                    <button className="bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-200 px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition">
                      <Share size={14} /> Share
                    </button>
                  </div>
                </div>

                {/* Category & Rating */}
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-md">
                    {currentLocation.category}
                  </span>
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={14}
                        className="fill-amber-400 text-amber-400"
                      />
                    ))}
                    <span className="font-bold text-sm ml-1.5 text-stone-800">
                      4.7
                    </span>
                    <span className="text-xs text-stone-400 ml-1">
                      (589 reviews)
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-stone-600 leading-relaxed mb-6 bg-stone-50/80 border border-stone-100 p-4 rounded-xl">
                  {currentLocation.description}
                </p>

                {/* Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                  <div className="bg-stone-50 border border-stone-100 p-3.5 rounded-xl col-span-1 md:col-span-2 flex items-start gap-3">
                    <MapPin
                      size={18}
                      className="text-stone-400 shrink-0 mt-0.5"
                    />
                    <div>
                      <div className="text-[10px] font-bold uppercase text-stone-400 mb-1 tracking-wider">
                        Address
                      </div>
                      <div className="text-sm font-semibold text-stone-800">
                        {currentLocation.address}
                      </div>
                    </div>
                  </div>
                  <div className="bg-stone-50 border border-stone-100 p-3.5 rounded-xl flex items-start gap-3">
                    <CreditCard
                      size={18}
                      className="text-stone-400 shrink-0 mt-0.5"
                    />
                    <div>
                      <div className="text-[10px] font-bold uppercase text-stone-400 mb-1 tracking-wider">
                        Price Range
                      </div>
                      <div className="text-sm font-semibold text-stone-800">
                        {currentLocation.price}
                      </div>
                    </div>
                  </div>
                  <div className="bg-stone-50 border border-stone-100 p-3.5 rounded-xl flex items-start gap-3">
                    <Phone
                      size={18}
                      className="text-stone-400 shrink-0 mt-0.5"
                    />
                    <div>
                      <div className="text-[10px] font-bold uppercase text-stone-400 mb-1 tracking-wider">
                        Phone
                      </div>
                      <div className="text-sm font-semibold text-stone-800">
                        +63 63 111 1234
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="mb-8">
                  <div className="text-[10px] font-bold uppercase text-stone-400 mb-3 tracking-wider">
                    Tags
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {currentLocation.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-white border border-stone-200 text-stone-500 text-[11px] font-medium px-3 py-1.5 rounded-full shadow-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Hours */}
                <div className="mb-10">
                  <div className="text-[10px] font-bold uppercase text-stone-400 mb-3 tracking-wider">
                    Hours
                  </div>
                  <div className="text-sm border border-stone-100 rounded-xl p-1 bg-white">
                    <div className="flex justify-between py-2.5 px-3 border-b border-stone-50">
                      <span className="text-stone-500 font-medium">Mon</span>
                      <span className="text-stone-400">
                        {currentLocation.hours}
                      </span>
                    </div>
                    <div className="flex justify-between py-2.5 px-3 border-b border-stone-50 font-bold text-emerald-600 bg-emerald-50/50 rounded-md">
                      <span>Tue</span>
                      <span>{currentLocation.hours}</span>
                    </div>
                    <div className="flex justify-between py-2.5 px-3">
                      <span className="text-stone-500 font-medium">Wed</span>
                      <span className="text-stone-400">
                        {currentLocation.hours}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Explore More Button */}
                <button
                  onClick={() => setShowMoreList(true)}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(16,185,129,0.3)] transition-all hover:shadow-[0_6px_20px_rgba(16,185,129,0.4)] active:scale-[0.98]"
                >
                  <Compass size={20} /> Explore More Recommendations
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* RIGHT PANEL - Map */}
      <div
        className={`transition-all duration-300 ease-in-out relative ${
          isFullscreen
            ? "fixed inset-0 z-[100] w-full h-full bg-white"
            : "w-full md:w-[55%] lg:w-[60%] h-[50vh] md:h-full"
        }`}
      >
        <MapWrapper
          locations={locations}
          activeIndex={activeIndex}
          onMarkerClick={handleMarkerClick}
        />

        {/* Map Overlay: Top Navigation Controls */}
        <div className="absolute top-5 left-5 z-[1000] flex gap-3">
          <button
            onClick={() => {
              setIsPlaying(false);
              setActiveIndex((prev) => Math.max(0, prev - 1));
            }}
            disabled={activeIndex === 0}
            className="bg-white/90 backdrop-blur-md border border-stone-100 hover:border-emerald-200 hover:text-emerald-600 text-stone-700 disabled:opacity-50 disabled:cursor-not-allowed px-5 py-2.5 rounded-full font-bold text-sm shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-all flex items-center gap-1.5"
          >
            <ChevronLeft size={18} /> Prev
          </button>

          <button
            onClick={() => {
              setIsPlaying(false);
              setActiveIndex((prev) =>
                Math.min(locations.length - 1, prev + 1),
              );
            }}
            disabled={activeIndex === locations.length - 1}
            className="bg-white/90 backdrop-blur-md border border-stone-100 hover:border-emerald-200 hover:text-emerald-600 text-stone-700 disabled:opacity-50 disabled:cursor-not-allowed px-5 py-2.5 rounded-full font-bold text-sm shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-all flex items-center gap-1.5"
          >
            Next <ChevronRight size={18} />
          </button>
        </div>

        {/* Map Overlay: Full Screen Toggle */}
        <div className="absolute bottom-6 right-6 z-[1000]">
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="bg-emerald-500/95 backdrop-blur-md hover:bg-emerald-600 text-white px-5 py-3 rounded-full font-bold text-sm shadow-[0_8px_16px_rgba(16,185,129,0.3)] hover:shadow-[0_8px_24px_rgba(16,185,129,0.4)] hover:-translate-y-0.5 transition-all flex items-center gap-2"
          >
            {isFullscreen ? (
              <>
                <Minimize size={18} /> Exit Full Screen
              </>
            ) : (
              <>
                <Maximize size={18} /> Full Screen
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
