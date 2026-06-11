// components/recommendations/showcase.tsx
"use client";

import type { PlaceData } from "@/components/chat/types";
import ShareToChatModal from "@/components/chat/share-to-chat-modal";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import {
  MORE_COFFEE_SHOPS,
  USER_LOCATION,
  type Location,
} from "@/lib/mock-data";
import { useRecommendations } from "@/store/recommendation-context";
import { MobileTrigger } from "@/components/layout/mobile-trigger";
import { useSidebar } from "@/components/ui/sidebar";
import { useSearchParams } from "next/navigation";
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
  PlaySquare,
  Clock,
  X,
} from "lucide-react";

// Dynamically import Leaflet
const MapWrapper = dynamic(() => import("../maps/leaflet-map"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-stone-100 animate-pulse" />,
});

export function ShowcaseView() {
  const { activeRecommendation, setActiveRecommendation, toggleSavePlace, isPlaceSaved } =
    useRecommendations();
  const { openMobile } = useSidebar();
  const searchParams = useSearchParams();
  const isNew = searchParams.get("new") === "true";

  const [activeIndex, setActiveIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0); // index within currentLocation.images
  const [isPlaying, setIsPlaying] = useState(isNew);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showMoreList, setShowMoreList] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showSaveFeedback, setShowSaveFeedback] = useState(false);

  const locations = activeRecommendation?.locations || [];
  const currentLocation = locations[activeIndex];

  const handleSaveToggle = () => {
    if (!currentLocation) return;
    const isNowSaved = !isPlaceSaved(currentLocation.id);
    toggleSavePlace(currentLocation);
    if (isNowSaved) {
      setShowSaveFeedback(true);
      setTimeout(() => setShowSaveFeedback(false), 3000);
    }
  };

  const dummyReviews = [
    { id: 1, author: "Alex D.", rating: 5, date: "2 weeks ago", text: `Absolutely love ${currentLocation?.name}! The atmosphere is perfect and the service is top-notch. Will definitely come back.` },
    { id: 2, author: "Maria S.", rating: 4, date: "1 month ago", text: "Great spot for a quick break. The coffee is quite good, though it can get a bit crowded during peak hours." },
    { id: 3, author: "John Doe", rating: 5, date: "3 months ago", text: "One of my favorite places in the city. The staff is always friendly and the quality is consistent." },
    { id: 4, author: "Emma W.", rating: 5, date: "4 months ago", text: "Fantastic experience. I highly recommend checking out their specials. The ambiance is exactly what I was looking for." },
    { id: 5, author: "Chris T.", rating: 4, date: "5 months ago", text: "Very nice place. A bit on the pricey side, but you definitely get what you pay for. Good vibes overall." },
  ];

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

  // Reset image index whenever the active location changes
  useEffect(() => {
    setImageIndex(0);
  }, [activeIndex]);

  // Handle clicking a map marker
  const handleMarkerClick = (index: number) => {
    setIsPlaying(false);
    setActiveIndex(index);
    if (showMoreList) setShowMoreList(false);
  };

  // Promote a "more" card into the main showcase (appended at the end)
  const handlePromoteToShowcase = (shop: Location) => {
    if (!activeRecommendation) return;

    // Append so existing positions are undisturbed
    const updatedLocations = [...activeRecommendation.locations, shop];

    setActiveRecommendation({
      ...activeRecommendation,
      locations: updatedLocations,
    });

    // Jump to the newly appended shop (last index), stop auto-play, close panel
    setActiveIndex(updatedLocations.length - 1);
    setIsPlaying(false);
    setShowMoreList(false);
  };

  if (!activeRecommendation || !currentLocation) return null;

  // "More" shops = full pool minus any already in the current showcase
  const currentIds = new Set(locations.map((l) => l.id));
  const availableMoreShops = MORE_COFFEE_SHOPS.filter(
    (s) => !currentIds.has(s.id),
  );

  return (
    <div className="flex flex-col-reverse md:flex-row h-screen w-full bg-surface-page overflow-hidden relative">
      {/* REVIEWS MODAL */}
      <AnimatePresence>
        {showReviews && (
          <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm"
              onClick={() => setShowReviews(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-white rounded-2xl shadow-2xl z-10 w-full max-w-md max-h-[80vh] flex flex-col overflow-hidden relative"
            >
              <div className="flex items-center justify-between p-4 border-b border-stone-100">
                <div>
                  <h3 className="font-bold text-lg text-stone-900">{currentLocation.name} Reviews</h3>
                  <div className="flex items-center mt-1">
                    <Star size={14} className="fill-amber-400 text-amber-400" />
                    <span className="font-bold text-sm ml-1 text-stone-800">4.7</span>
                    <span className="text-xs text-stone-500 ml-1">(589 reviews)</span>
                  </div>
                </div>
                <button 
                  onClick={() => setShowReviews(false)}
                  className="p-2 bg-stone-50 hover:bg-stone-100 text-stone-500 rounded-full transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
              
              <div className="overflow-y-auto p-4 space-y-4 minimal-scrollbar">
                {dummyReviews.map((review) => (
                  <div key={review.id} className="border-b border-stone-50 last:border-0 pb-4 last:pb-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center font-bold text-xs">
                          {review.author.charAt(0)}
                        </div>
                        <div>
                          <div className="text-sm font-bold text-stone-800">{review.author}</div>
                          <div className="text-[10px] text-stone-400">{review.date}</div>
                        </div>
                      </div>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={12} 
                            className={i < review.rating ? "fill-amber-400 text-amber-400" : "fill-stone-200 text-stone-200"} 
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-stone-600 leading-relaxed">
                      {review.text}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* INTERACTION BLOCKER & PRESENTING LABEL */}
      {isPlaying && (
        <>
          {/* Invisible overlay preventing clicks on the map and left panel */}
          <div
            className="absolute inset-0 z-[1500] pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Presenting Banner */}
          <div
            className={`absolute inset-x-0 top-0 z-[1600] pointer-events-none flex justify-center mt-6 ${openMobile ? "hidden md:flex" : "flex"}`}
          >
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-emerald-600/95 backdrop-blur-md text-white pl-6 pr-3 py-2.5 rounded-full shadow-2xl flex items-center gap-4 pointer-events-auto border border-emerald-400/50"
            >
              <div className="flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                </span>
                <span className="font-semibold tracking-wide text-sm">
                  Presenting recommendations...
                </span>
              </div>
              <div className="w-px h-5 bg-emerald-500 mx-1"></div>
              <button
                onClick={() => setIsPlaying(false)}
                className="text-sm font-bold bg-white text-emerald-700 px-4 py-1.5 rounded-full hover:bg-emerald-50 transition-colors active:scale-95 flex items-center gap-1.5"
              >
                <PlaySquare size={14} className="fill-emerald-700" /> Skip
              </button>
            </motion.div>
          </div>
        </>
      )}

      {/* MOBILE SIDEBAR TRIGGER */}
      {!openMobile && (
        <div className="md:hidden absolute top-4 left-4 z-[1000]">
          <MobileTrigger />
        </div>
      )}

      {/* LEFT PANEL - Information */}
      <div
        className={`w-full md:w-[45%] lg:w-[40%] h-[50vh] md:h-full overflow-y-auto minimal-scrollbar bg-white shadow-xl z-10 flex flex-col relative ${isFullscreen ? "hidden" : "block"}`}
      >
        <AnimatePresence mode="wait">
          {showMoreList ? (
            /* --- MORE RECOMMENDATIONS PANEL --- */
            <motion.div
              key="more-list"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="p-6 pb-12 pt-16 md:pt-6"
            >
              <button
                onClick={() => setShowMoreList(false)}
                className="flex items-center gap-1.5 text-emerald-600 font-semibold text-sm mb-4 hover:-translate-x-1 transition-transform"
              >
                <ChevronLeft size={16} strokeWidth={2.5} /> Back
              </button>
              <h2 className="text-xl font-bold text-stone-900 mb-1">
                Explore More Recommendations
              </h2>
              <p className="text-sm text-stone-400 mb-8">
                Click any card to feature it in your showcase
              </p>

              {availableMoreShops.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mb-4">
                    <Compass size={28} className="text-emerald-400" />
                  </div>
                  <p className="text-stone-500 font-semibold">
                    You've explored them all!
                  </p>
                  <p className="text-stone-400 text-sm mt-1">
                    All recommendations have been added to your showcase.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {availableMoreShops.map((shop) => (
                    <motion.div
                      key={shop.id}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handlePromoteToShowcase(shop)}
                      className="group cursor-pointer bg-stone-50 border border-transparent hover:border-emerald-200 hover:bg-white rounded-2xl overflow-hidden transition-all shadow-sm hover:shadow-md"
                    >
                      {/* Card image */}
                      <div className="w-full h-40 relative overflow-hidden">
                        <img
                          src={shop.images[0]}
                          alt={shop.name}
                          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                        {/* Category badge */}
                        <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wide">
                          {shop.category}
                        </div>

                        {/* Shop name on image */}
                        <div className="absolute bottom-3 left-3 right-3">
                          <h3 className="text-white font-bold text-base leading-tight drop-shadow">
                            {shop.name}
                          </h3>
                          <p className="text-white/80 text-xs mt-0.5 flex items-center gap-1">
                            <MapPin size={10} />
                            {shop.address}
                          </p>
                        </div>
                      </div>

                      {/* Card body */}
                      <div className="p-3.5">
                        <p className="text-xs text-stone-500 leading-relaxed line-clamp-2 mb-3">
                          {shop.description}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {shop.tags.map((tag) => (
                            <span
                              key={tag}
                              className="bg-white border border-stone-200 text-stone-500 text-[10px] font-medium px-2 py-0.5 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Hours + CTA row */}
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-1 text-[10px] text-stone-400 font-medium">
                            <Clock size={10} />
                            {shop.hours}
                          </span>
                          <span className="text-xs font-bold text-emerald-600 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            Feature this <ChevronRight size={13} />
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
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
              {/* Image Carousel (cycles through this location's photos) */}
              <div className="w-full h-64 md:h-72 mb-6 relative">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={`${currentLocation.id}-img-${imageIndex}`}
                    src={currentLocation.images[imageIndex]}
                    alt={currentLocation.name}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="object-cover w-full h-full absolute inset-0"
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />

                {/* Location counter out of total showcase */}
                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full">
                  {activeIndex + 1} / {locations.length}
                </div>

                {/* Photo counter — only shown when there are multiple images */}
                {currentLocation.images.length > 1 && (
                  <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full">
                    {imageIndex + 1} / {currentLocation.images.length}
                  </div>
                )}

                {/* Photo prev/next — only shown when there are multiple images */}
                {currentLocation.images.length > 1 && (
                  <>
                    <button
                      onClick={() => setImageIndex((prev) => Math.max(0, prev - 1))}
                      disabled={imageIndex === 0}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-white/90 hover:text-white drop-shadow-md hover:scale-110 transition disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft size={36} strokeWidth={2} />
                    </button>
                    <button
                      onClick={() =>
                        setImageIndex((prev) =>
                          Math.min(currentLocation.images.length - 1, prev + 1),
                        )
                      }
                      disabled={imageIndex === currentLocation.images.length - 1}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/90 hover:text-white drop-shadow-md hover:scale-110 transition disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <ChevronRight size={36} strokeWidth={2} />
                    </button>
                  </>
                )}
              </div>

              <div className="px-6">
                {/* Header */}
                <div className="flex justify-between items-start mb-3">
                  <h2 className="text-2xl font-bold text-stone-900 leading-tight pr-4">
                    {currentLocation.name}
                  </h2>
                  <div className="flex gap-2 shrink-0 mt-1 relative">
                    <AnimatePresence>
                      {showSaveFeedback && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="absolute -top-10 right-16 bg-stone-900 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap z-50 flex items-center gap-1.5"
                        >
                          Saved! Check your Saved Places
                          <div className="absolute -bottom-1 right-6 w-2 h-2 bg-stone-900 rotate-45" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <button 
                      onClick={handleSaveToggle}
                      className={`${isPlaceSaved(currentLocation.id) ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200" : "bg-emerald-500 hover:bg-emerald-600 text-white"} px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition shadow-[0_2px_8px_rgba(16,185,129,0.3)]`}
                    >
                      <Bookmark size={14} fill={isPlaceSaved(currentLocation.id) ? "currentColor" : "none"} /> 
                      {isPlaceSaved(currentLocation.id) ? "Saved" : "Save"}
                    </button>
                    <button
                      onClick={() => setShowShareModal(true)}
                      className="bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-200 px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition"
                    >
                      <Share size={14} /> Share
                    </button>
                  </div>
                </div>

                {/* Category & Rating */}
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-md">
                    {currentLocation.category}
                  </span>
                  <div 
                    className="flex items-center cursor-pointer hover:bg-stone-100 p-1.5 -ml-1.5 rounded-md transition-colors"
                    onClick={() => setShowReviews(true)}
                  >
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
                    <span className="text-xs text-stone-400 ml-1 hover:underline">
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

                {/* Explore More Recommendations Button */}
                {availableMoreShops.length > 0 && (
                  <button
                    onClick={() => setShowMoreList(true)}
                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(16,185,129,0.3)] transition-all hover:shadow-[0_6px_20px_rgba(16,185,129,0.4)] active:scale-[0.98]"
                  >
                    <Compass size={20} /> Explore More Recommendations
                    <span className="ml-1 bg-white/20 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      {availableMoreShops.length}
                    </span>
                  </button>
                )}
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
          radiusKm={activeRecommendation.mode === "near" ? 7.5 : undefined}
          userLocation={
            activeRecommendation.mode === "near" ? USER_LOCATION : undefined
          }
        />

        {/* Map Overlay: Top Navigation Controls */}
        <div
          className={`absolute top-5 right-5 md:left-5 md:right-auto z-[1000] gap-3 ${openMobile ? "hidden md:flex" : "flex"}`}
        >
          <button
            onClick={() => {
              setIsPlaying(false);
              setActiveIndex((prev) => Math.max(0, prev - 1));
            }}
            disabled={activeIndex === 0}
            className="bg-white/90 backdrop-blur-md border border-stone-100 hover:border-emerald-200 hover:text-emerald-600 text-stone-700 disabled:opacity-50 disabled:cursor-not-allowed px-4 md:px-5 py-2.5 rounded-full font-bold text-sm shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-all flex items-center gap-1.5"
          >
            <ChevronLeft size={18} />{" "}
            <span className="hidden md:inline">Prev</span>
          </button>

          <button
            onClick={() => {
              setIsPlaying(false);
              setActiveIndex((prev) =>
                Math.min(locations.length - 1, prev + 1),
              );
            }}
            disabled={activeIndex === locations.length - 1}
            className="bg-white/90 backdrop-blur-md border border-stone-100 hover:border-emerald-200 hover:text-emerald-600 text-stone-700 disabled:opacity-50 disabled:cursor-not-allowed px-4 md:px-5 py-2.5 rounded-full font-bold text-sm shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-all flex items-center gap-1.5"
          >
            <span className="hidden md:inline">Next</span>{" "}
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Map Overlay: Full Screen Toggle */}
        <div
          className={`absolute bottom-6 right-6 z-[1000] ${openMobile ? "hidden md:block" : "block"}`}
        >
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
      {/* SHARE TO CHAT MODAL */}
      <AnimatePresence>
        {showShareModal && currentLocation && (
          <ShareToChatModal
            place={{
              name: currentLocation.name,
              category: currentLocation.category,
              description: currentLocation.description,
              image: currentLocation.images[0],
              price: currentLocation.price,
              distance: "",
              address: currentLocation.address,
              tags: currentLocation.tags,
              hours: currentLocation.hours,
            }}
            onClose={() => setShowShareModal(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
