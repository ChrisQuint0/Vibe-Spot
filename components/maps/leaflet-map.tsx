"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface LeafletMapProps {
  locations: Array<{ id: string; lat: number; lng: number; name: string }>;
  activeIndex: number;
  onMarkerClick?: (index: number) => void;
  radiusKm?: number;
  userLocation?: { lat: number; lng: number };
}

export default function LeafletMap({
  locations,
  activeIndex,
  onMarkerClick,
  radiusKm,
  userLocation,
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

      // Fix blank tiles when map is inside a modal or dynamically shown container.
      // Leaflet can't calculate the container size if it isn't fully rendered yet.
      const map = mapInstance.current;
      setTimeout(() => map.invalidateSize(), 200);
      setTimeout(() => map.invalidateSize(), 500);
    }

    const map = mapInstance.current;

    // Clear old markers and circles
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    // Optional: Draw User Location & Radius Circle if provided
    if (userLocation) {
      // User Location Marker
      const userIcon = L.divIcon({
        className: "custom-user-pin",
        html: `<div style="width: 20px; height: 20px; background: #3b82f6; border: 3px solid white; border-radius: 50%; box-shadow: 0 3px 6px rgba(0,0,0,0.3);"></div>`,
        iconSize: [20, 20],
        iconAnchor: [10, 10],
      });
      const userMarker = L.marker([userLocation.lat, userLocation.lng], {
        icon: userIcon,
        zIndexOffset: 500, // keep below active, above default
      }).addTo(map);
      markersRef.current.push(userMarker);

      // Radius Circle
      if (radiusKm) {
        const radiusCircle = L.circle([userLocation.lat, userLocation.lng], {
          color: "#10b981", // Emerald 500
          fillColor: "#10b981",
          fillOpacity: 0.1,
          weight: 2,
          dashArray: "5, 10",
          radius: radiusKm * 1000, // convert km to meters
          interactive: false, // let clicks pass through to map
        }).addTo(map);
        markersRef.current.push(radiusCircle as unknown as L.Marker); // store so it gets cleared next render
      }
    }

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
      // Do not destroy the map instance on cleanup since Next.js StrictMode causes issues
      // mapInstance.current.remove() is unsafe here
    };
  }, [locations, activeIndex, onMarkerClick, radiusKm, userLocation]);

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
