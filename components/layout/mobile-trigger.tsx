"use client";

import { PanelLeftOpen } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";

export function MobileTrigger() {
  const { toggleSidebar } = useSidebar();
  return (
    <button
      onClick={toggleSidebar}
      className="p-1.5 rounded-lg bg-white/50 backdrop-blur-md shadow-sm border border-white/40 hover:bg-white/80 transition-colors text-text-secondary hover:text-text-primary"
    >
      <PanelLeftOpen size={17} />
    </button>
  );
}
