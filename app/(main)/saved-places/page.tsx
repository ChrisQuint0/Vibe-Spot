"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { useRecommendations } from "@/store/recommendation-context";
import { type Location, USER_LOCATION } from "@/lib/mock-data";
import { MobileTrigger } from "@/components/layout/mobile-trigger";
import { useSidebar } from "@/components/ui/sidebar";
import ShareToChatModal from "@/components/chat/share-to-chat-modal";
import {
  MapPin,
  CreditCard,
  ChevronLeft,
  ChevronRight,
  Bookmark,
  Share,
  Maximize,
  Minimize,
  Phone,
  Star,
  Clock,
  HeartOff,
  X,
  Globe,
  Search,
  SlidersHorizontal,
} from "lucide-react";

const MapWrapper = dynamic(() => import("@/components/maps/leaflet-map"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-stone-100 animate-pulse" />,
});

export default function SavedPlacesPage() {
  const { savedPlaces, toggleSavePlace } = useRecommendations();
  const { openMobile } = useSidebar();

  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);
  const [imageIndex, setImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const selectedPlace = savedPlaces.find((p) => p.id === selectedPlaceId);

  // Derive unique categories from saved places
  const categories = useMemo(() => {
    const cats = Array.from(new Set(savedPlaces.map((p) => p.category)));
    return ["All", ...cats];
  }, [savedPlaces]);

  // Filtered places based on search and category
  const filteredPlaces = useMemo(() => {
    return savedPlaces.filter((p) => {
      const matchesCategory =
        activeCategory === "All" || p.category === activeCategory;
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [savedPlaces, searchQuery, activeCategory]);

  const dummyReviews = [
    {
      id: 1,
      author: "Alex D.",
      rating: 5,
      date: "2 weeks ago",
      text: `Absolutely love ${selectedPlace?.name}! The atmosphere is perfect and the service is top-notch. Will definitely come back.`,
    },
    {
      id: 2,
      author: "Maria S.",
      rating: 4,
      date: "1 month ago",
      text: "Great spot for a quick break. The coffee is quite good, though it can get a bit crowded during peak hours.",
    },
    {
      id: 3,
      author: "John Doe",
      rating: 5,
      date: "3 months ago",
      text: "One of my favorite places in the city. The staff is always friendly and the quality is consistent.",
    },
    {
      id: 4,
      author: "Emma W.",
      rating: 5,
      date: "4 months ago",
      text: "Fantastic experience. I highly recommend checking out their specials. The ambiance is exactly what I was looking for.",
    },
    {
      id: 5,
      author: "Chris T.",
      rating: 4,
      date: "5 months ago",
      text: "Very nice place. A bit on the pricey side, but you definitely get what you pay for. Good vibes overall.",
    },
  ];

  const handleUnsave = (place: Location) => {
    toggleSavePlace(place);
    if (selectedPlaceId === place.id) {
      setSelectedPlaceId(null);
    }
  };

  // ─── DETAIL VIEW ────────────────────────────────────────────────────────────
  if (selectedPlace) {
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
                    <h3 className="font-bold text-lg text-stone-900">
                      {selectedPlace.name} Reviews
                    </h3>
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
                    <div
                      key={review.id}
                      className="border-b border-stone-50 last:border-0 pb-4 last:pb-0"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center font-bold text-xs">
                            {review.author.charAt(0)}
                          </div>
                          <div>
                            <div className="text-sm font-bold text-stone-800">
                              {review.author}
                            </div>
                            <div className="text-[10px] text-stone-400">
                              {review.date}
                            </div>
                          </div>
                        </div>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={12}
                              className={
                                i < review.rating
                                  ? "fill-amber-400 text-amber-400"
                                  : "fill-stone-200 text-stone-200"
                              }
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

        {!openMobile && (
          <div className="md:hidden absolute top-4 left-4 z-[1000]">
            <MobileTrigger />
          </div>
        )}

        {/* LEFT PANEL - Information */}
        <div
          className={`w-full md:w-[45%] lg:w-[40%] h-[50vh] md:h-full overflow-y-auto minimal-scrollbar bg-white shadow-xl z-10 flex flex-col relative ${
            isFullscreen ? "hidden" : "block"
          }`}
        >
          <motion.div
            key={selectedPlace.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="flex-1 pb-8"
          >
            {/* Image Carousel */}
            <div className="w-full h-64 md:h-72 mb-6 relative">
              <button
                onClick={() => setSelectedPlaceId(null)}
                className="absolute top-4 left-4 z-10 bg-black/50 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 hover:bg-black/70 transition"
              >
                <ChevronLeft size={14} /> Back to Saved
              </button>

              <AnimatePresence mode="wait">
                <motion.img
                  key={`${selectedPlace.id}-img-${imageIndex}`}
                  src={selectedPlace.images[imageIndex]}
                  alt={selectedPlace.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="object-cover w-full h-full absolute inset-0"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />

              {selectedPlace.images.length > 1 && (
                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full">
                  {imageIndex + 1} / {selectedPlace.images.length}
                </div>
              )}

              {selectedPlace.images.length > 1 && (
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
                      setImageIndex((prev) => Math.min(selectedPlace.images.length - 1, prev + 1))
                    }
                    disabled={imageIndex === selectedPlace.images.length - 1}
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
                  {selectedPlace.name}
                </h2>
                <div className="flex gap-2 shrink-0 mt-1 relative">
                  <button
                    onClick={() => handleUnsave(selectedPlace)}
                    className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition shadow-sm"
                  >
                    <Bookmark size={14} fill="currentColor" /> Saved
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
                  {selectedPlace.category}
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
                {selectedPlace.description}
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
                      {selectedPlace.address}
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
                      {selectedPlace.price}
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
                  {selectedPlace.tags.map((tag) => (
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
                      {selectedPlace.hours}
                    </span>
                  </div>
                  <div className="flex justify-between py-2.5 px-3 border-b border-stone-50 font-bold text-emerald-600 bg-emerald-50/50 rounded-md">
                    <span>Tue</span>
                    <span>{selectedPlace.hours}</span>
                  </div>
                  <div className="flex justify-between py-2.5 px-3">
                    <span className="text-stone-500 font-medium">Wed</span>
                    <span className="text-stone-400">
                      {selectedPlace.hours}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
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
            locations={[selectedPlace]}
            activeIndex={0}
            onMarkerClick={() => {}}
            userLocation={USER_LOCATION}
          />

          <div className={`absolute bottom-6 right-6 z-[1000] ${openMobile ? "hidden md:block" : "block"}`}>
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
          {showShareModal && selectedPlace && (
            <ShareToChatModal
              place={{
                name: selectedPlace.name,
                category: selectedPlace.category,
                description: selectedPlace.description,
                image: selectedPlace.images[0],
                price: selectedPlace.price,
                distance: "",
                address: selectedPlace.address,
                tags: selectedPlace.tags,
                hours: selectedPlace.hours,
              }}
              onClose={() => setShowShareModal(false)}
            />
          )}
        </AnimatePresence>
      </div>
    );
  }

  // ─── GRID VIEW ──────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col h-screen w-full bg-surface-page overflow-hidden">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-surface-page/80 backdrop-blur-md border-b border-border-secondary px-4 md:px-6 py-4 md:py-5">
        <div className="flex items-start md:items-center justify-between gap-3 mb-4">
          <div className="flex items-start md:items-center gap-3 md:gap-4">
            {!openMobile && (
              <div className="md:hidden mt-1 md:mt-0">
                <MobileTrigger />
              </div>
            )}
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-stone-900 leading-tight">
                Saved places
              </h1>
              <p className="text-xs md:text-sm text-stone-500 mt-0.5">
                Your personal collection of favorite spots
              </p>
            </div>
          </div>
          <div className="bg-emerald-100 text-emerald-800 text-xs md:text-sm font-bold px-3 py-1 rounded-full whitespace-nowrap shrink-0">
            {savedPlaces.length} {savedPlaces.length === 1 ? "place" : "places"}
          </div>
        </div>

        {/* Search + filter row */}
        {savedPlaces.length > 0 && (
          <div className="flex items-center gap-2">
            <div className="relative flex-1 max-w-xs">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none"
              />
              <input
                type="text"
                placeholder="Search saved places…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-sm bg-white border border-stone-200 rounded-full focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-200 text-stone-700 placeholder:text-stone-400 transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                >
                  <X size={13} />
                </button>
              )}
            </div>

            {/* Category pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${
                    activeCategory === cat
                      ? "bg-emerald-500 text-white shadow-sm"
                      : "bg-white border border-stone-200 text-stone-500 hover:border-stone-300"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-y-auto minimal-scrollbar">
        <div className="p-6 md:p-8">
          {savedPlaces.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center">
              <div className="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center mb-6">
                <HeartOff size={32} className="text-stone-400" />
              </div>
              <h2 className="text-xl font-bold text-stone-900 mb-2">
                No saved places yet
              </h2>
              <p className="text-stone-500 max-w-md">
                Start exploring recommendations and save your favorite spots to
                build your personal collection.
              </p>
            </div>
          ) : filteredPlaces.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[50vh] text-center">
              <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mb-4">
                <Search size={24} className="text-stone-400" />
              </div>
              <h2 className="text-lg font-bold text-stone-900 mb-1">
                No matches found
              </h2>
              <p className="text-stone-500 text-sm max-w-xs">
                Try a different search term or category.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("All");
                }}
                className="mt-4 text-sm text-emerald-600 font-semibold hover:underline"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <AnimatePresence>
                {filteredPlaces.map((place) => (
                  <motion.div
                    key={place.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    whileHover={{ y: -4 }}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-stone-100 cursor-pointer flex flex-col group relative"
                    onClick={() => {
                      setImageIndex(0);
                      setSelectedPlaceId(place.id);
                    }}
                  >
                    {/* Unsave button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleUnsave(place);
                      }}
                      className="absolute top-3 right-3 z-10 bg-white/90 backdrop-blur-sm p-2 rounded-full text-emerald-600 hover:bg-red-50 hover:text-red-500 transition-colors shadow-sm opacity-0 group-hover:opacity-100 focus:opacity-100"
                      title="Remove from saved"
                    >
                      <Bookmark size={16} fill="currentColor" />
                    </button>

                    {/* Image */}
                    <div className="h-48 w-full relative overflow-hidden">
                      <img
                        src={place.images[0]}
                        alt={place.name}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wide">
                        {place.category}
                      </div>
                      <div className="absolute bottom-3 left-3 right-3">
                        <h3 className="text-white font-bold text-lg leading-tight drop-shadow">
                          {place.name}
                        </h3>
                        <div className="flex items-center text-white/90 text-xs mt-1 gap-1">
                          <MapPin size={12} />
                          <span className="truncate">{place.address}</span>
                        </div>
                      </div>
                    </div>

                    {/* Card body */}
                    <div className="p-4 flex flex-col flex-1">
                      {/* Rating + Price row */}
                      <div className="flex items-center gap-1.5 mb-2 min-w-0">
                        <div className="flex items-center gap-0.5 shrink-0">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star
                              key={s}
                              size={11}
                              className="fill-amber-400 text-amber-400"
                            />
                          ))}
                        </div>
                        <span className="text-xs font-bold text-stone-700 shrink-0">
                          4.7
                        </span>
                        <span className="text-[11px] text-stone-400 shrink-0">
                          (589)
                        </span>
                        <span className="text-stone-300 shrink-0">·</span>
                        <span className="text-[11px] text-stone-400 font-medium truncate">
                          {place.price}
                        </span>
                      </div>

                      <p className="text-sm text-stone-500 line-clamp-2 mb-4 flex-1">
                        {place.description}
                      </p>

                      <div className="flex items-center justify-between mt-auto pt-3 border-t border-stone-50">
                        <span className="text-xs font-bold text-emerald-600 group-hover:underline">
                          View details
                        </span>
                        <div className="flex items-center gap-1 text-xs text-stone-400 font-medium">
                          <Clock size={12} />
                          <span className="truncate max-w-[100px]">
                            {place.hours}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
