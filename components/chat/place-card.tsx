"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import {
  MapPin,
  Info,
  Map,
  X,
  CreditCard,
  Phone,
  Clock,
} from "lucide-react";
import type { Message, PlaceData } from "./types";

// ── Dynamic Leaflet import ──────────────────────────────────────────────────
const LeafletMap = dynamic(
  () =>
    import("@/components/maps/leaflet-map").catch(() => () => (
      <div className="w-full h-full bg-stone-100 flex flex-col items-center justify-center text-stone-400">
        <MapPin size={32} className="mb-2 text-emerald-400 opacity-50" />
        <span className="font-medium text-sm">Map loading failed</span>
      </div>
    )),
  {
    ssr: false,
    loading: () => <div className="w-full h-full bg-stone-100 animate-pulse" />,
  },
);

// ─── Place Mini Card (in-chat) ──────────────────────────────────────────────
interface PlaceMiniCardProps {
  message: Message;
  onExpand: (place: PlaceData) => void;
}

export function PlaceMiniCard({ message, onExpand }: PlaceMiniCardProps) {
  if (!message.place) return null;
  const place = message.place;

  return (
    <div
      onClick={() => onExpand(place)}
      className="bg-white border border-stone-200 p-3 rounded-2xl shadow-sm cursor-pointer hover:shadow-md transition-all group w-64 md:w-80"
      style={{
        borderBottomRightRadius: message.isMe ? "4px" : undefined,
        borderBottomLeftRadius: !message.isMe ? "4px" : undefined,
      }}
    >
      <div className="flex gap-3">
        <img
          src={place.image}
          alt={place.name}
          className="w-20 h-20 rounded-xl object-cover shrink-0 group-hover:scale-105 transition-transform"
        />
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-stone-900 truncate text-sm">
            {place.name}
          </h4>
          <p className="text-[11px] text-emerald-600 font-bold mb-1">
            {place.category}
          </p>
          <p className="text-[11px] text-stone-500 line-clamp-2 leading-relaxed">
            {place.description}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 mt-2 pt-2 border-t border-stone-100">
        <MapPin size={12} className="text-stone-400" />
        <span className="text-[11px] text-stone-400 truncate">{place.address}</span>
        <span className="text-[11px] text-emerald-600 font-semibold ml-auto shrink-0">
          {place.distance}
        </span>
      </div>
    </div>
  );
}

// ─── Place Expanded Modal ───────────────────────────────────────────────────
interface PlaceExpandedModalProps {
  place: PlaceData;
  onClose: () => void;
}

export function PlaceExpandedModal({ place, onClose }: PlaceExpandedModalProps) {
  const [tab, setTab] = useState<"info" | "location">("info");
  // Use a unique key to force Leaflet remount when modal opens
  const [mapKey] = useState(() => Date.now());

  return (
    <div
      className="fixed inset-0 z-[2000] flex items-center justify-center bg-stone-900/60 backdrop-blur-sm p-4 md:p-8 chat-modal-enter"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-3xl h-[85vh] md:h-[80vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Tabs */}
        <div className="flex items-center justify-between border-b border-stone-100 text-sm font-medium relative shrink-0 px-4">
          <div className="flex gap-2">
            <button
              onClick={() => setTab("info")}
              className={`py-4 px-4 text-center transition-colors border-b-2 ${
                tab === "info"
                  ? "text-emerald-600 border-emerald-500 bg-emerald-50/10"
                  : "text-stone-500 hover:text-stone-700 border-transparent"
              }`}
            >
              <Info size={16} className="inline mr-2 mb-0.5" /> Complete Info
            </button>
            <button
              onClick={() => setTab("location")}
              className={`py-4 px-4 text-center transition-colors border-b-2 ${
                tab === "location"
                  ? "text-emerald-600 border-emerald-500 bg-emerald-50/10"
                  : "text-stone-500 hover:text-stone-700 border-transparent"
              }`}
            >
              <Map size={16} className="inline mr-2 mb-0.5" /> Map Location
            </button>
          </div>
          <button
            onClick={onClose}
            className="p-2 bg-stone-100 text-stone-500 hover:bg-stone-200 rounded-full transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto minimal-scrollbar p-0 relative">
          {tab === "info" ? (
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-2/5 h-64 md:h-auto relative shrink-0">
                <img
                  src={place.image}
                  alt={place.name}
                  className="w-full h-full object-cover absolute inset-0"
                />
              </div>
              <div className="p-6 md:p-8 flex-1 bg-white">
                <span className="inline-block px-2.5 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded-md uppercase tracking-wide mb-3">
                  {place.category}
                </span>
                <h3 className="font-bold text-stone-900 text-2xl md:text-3xl mb-4 leading-tight">
                  {place.name}
                </h3>
                <p className="text-sm text-stone-600 leading-relaxed mb-6 bg-stone-50 border border-stone-100 p-4 rounded-xl">
                  {place.description}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  <div className="bg-stone-50 border border-stone-100 p-4 rounded-xl sm:col-span-2 flex gap-3">
                    <MapPin className="text-stone-400 shrink-0 mt-0.5" size={18} />
                    <div>
                      <div className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1">
                        Address
                      </div>
                      <div className="text-sm font-semibold text-stone-800">
                        {place.address}
                      </div>
                    </div>
                  </div>
                  <div className="bg-stone-50 border border-stone-100 p-4 rounded-xl flex gap-3">
                    <CreditCard className="text-stone-400 shrink-0 mt-0.5" size={18} />
                    <div>
                      <div className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1">
                        Price
                      </div>
                      <div className="text-sm font-semibold text-stone-800">
                        {place.price}
                      </div>
                    </div>
                  </div>
                  <div className="bg-stone-50 border border-stone-100 p-4 rounded-xl flex gap-3">
                    <Phone className="text-stone-400 shrink-0 mt-0.5" size={18} />
                    <div>
                      <div className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1">
                        Phone
                      </div>
                      <div className="text-sm font-semibold text-stone-800">
                        +63 63 111 1234
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="flex-1">
                    <div className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-3">
                      Tags
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {place.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-stone-100 border border-stone-200 text-stone-600 text-[11px] font-bold px-3 py-1.5 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-3">
                      Today&apos;s Hours
                    </div>
                    <div className="flex items-center gap-2 text-sm font-bold text-emerald-600 bg-emerald-50 px-3 py-2 rounded-lg">
                      <Clock size={16} /> {place.hours}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[400px] w-full relative z-0">
              <LeafletMap
                key={mapKey}
                locations={[
                  {
                    id: "shared-place-view",
                    name: place.name,
                    lat: 14.577,
                    lng: 121.061,
                  },
                ]}
                activeIndex={0}
              />
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-lg border border-stone-200 z-[1000] max-w-[200px] pointer-events-none">
                <h4 className="font-bold text-stone-900 text-sm mb-1">
                  {place.name}
                </h4>
                <p className="text-xs text-stone-500 flex items-center gap-1">
                  <MapPin size={12} /> {place.distance}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
