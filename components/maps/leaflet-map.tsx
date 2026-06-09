"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface LeafletMapProps {
  locations: Array<{ id: string; lat: number; lng: number; name: string }>;
  activeIndex: number;
  onMarkerClick?: (index: number) => void;
}

export default function LeafletMap({
  locations,
  activeIndex,
  onMarkerClick,
}: LeafletMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize map
    if (!mapInstance.current) {
      mapInstance.current = L.map(mapRef.current, {
        zoomControl: false, // Hide default to match sleek UI
      }).setView([14.5764, 121.0596], 13); // Default Pasig Center

      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
        {
          attribution: "&copy; OpenStreetMap contributors",
        },
      ).addTo(mapInstance.current);
    }

    const map = mapInstance.current;

    // Clear old markers
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    // Custom Icons
    const defaultIcon = L.divIcon({
      className: "custom-pin",
      html: `<div style="width: 22px; height: 22px; background: #1b8f6e; border: 3px solid white; border-radius: 50%; box-shadow: 0 3px 6px rgba(0,0,0,0.2); transition: all 0.2s ease;"></div>`,
      iconSize: [22, 22],
      iconAnchor: [11, 11],
    });

    const activeIcon = L.divIcon({
      className: "custom-pin-active",
      html: `<div style="width: 32px; height: 32px; background: #f5a623; border: 3px solid white; border-radius: 50%; box-shadow: 0 4px 12px rgba(245, 166, 35, 0.4);"></div>`,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    });

    // Add new markers
    locations.forEach((loc, index) => {
      const isSelected = index === activeIndex;
      const marker = L.marker([loc.lat, loc.lng], {
        icon: isSelected ? activeIcon : defaultIcon,
        zIndexOffset: isSelected ? 1000 : 0,
      }).addTo(map);

      if (onMarkerClick) {
        marker.on("click", () => onMarkerClick(index));
      }

      markersRef.current.push(marker);
    });

    // Fly to active location
    if (locations[activeIndex]) {
      const target = locations[activeIndex];
      map.flyTo([target.lat, target.lng], 16, {
        animate: true,
        duration: 1.5,
      });
    }

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [locations, activeIndex, onMarkerClick]);

  return (
    <>
      {/* Injecting CSS for the active marker pulse effect */}
      <style>{`
        @keyframes pinPulse {
          0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(245, 166, 35, 0.7); }
          70% { transform: scale(1.05); box-shadow: 0 0 0 16px rgba(245, 166, 35, 0); }
          100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(245, 166, 35, 0); }
        }
        .custom-pin-active > div {
          animation: pinPulse 2s infinite cubic-bezier(0.66, 0, 0, 1);
          cursor: pointer;
        }
        .custom-pin > div {
          cursor: pointer;
        }
        .custom-pin > div:hover {
          transform: scale(1.2);
          background: #137055;
        }
      `}</style>
      <div ref={mapRef} className="w-full h-full z-0" />
    </>
  );
}
