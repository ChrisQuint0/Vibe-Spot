"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  Search,
  Heart,
  MessageSquare,
  Clock,
  User,
  ChevronsUpDown,
  LogOut,
  Settings,
  ArrowLeftToLine,
  ArrowRightToLine,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// 1. IMPORT THE CONTEXT HOOK
import { useRecommendations } from "@/store/recommendation-context";

export function AppSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const { state, isMobile, toggleSidebar, setOpenMobile } = useSidebar();
  const [isLogoHovered, setIsLogoHovered] = useState(false);

  const handleNavigate = (path: string) => {
    router.push(path);
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  // 2. INITIALIZE THE HOOK TO GET DYNAMIC RECENTS
  const {
    recentRecommendations,
    activeRecommendation,
    setActiveRecommendation,
    savedPlaces,
  } = useRecommendations();

  // On mobile the sidebar renders as a Sheet drawer, so always treat it as expanded
  const isExpanded = isMobile || state === "expanded";

  const CollapseButton = () => (
    <button
      onClick={toggleSidebar}
      className="p-1.5 rounded-lg hover:bg-accent transition-colors text-text-secondary hover:text-text-primary"
    >
      {isExpanded && !isMobile ? (
        <PanelLeftClose size={17} />
      ) : !isMobile ? (
        <PanelLeftOpen size={17} />
      ) : (
        <PanelLeftClose size={17} />
      )}
    </button>
  );

  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-border-secondary bg-surface-card"
    >
      <SidebarHeader className="h-16 flex items-center justify-center border-b border-border-tertiary">
        {isExpanded ? (
          <div className="flex items-center justify-between w-full px-2">
            <div
              className="flex items-center gap-2 cursor-pointer transition-transform hover:scale-105"
              onClick={() => (window.location.href = "/")}
            >
              <img
                src="/vibe_spot_logo_landing.png"
                alt="VibeSpot Logo"
                className="h-8 w-auto object-contain"
              />
              <span className="text-xl font-bold text-text-primary tracking-tight">
                vibe<span className="text-accent-vibe">spot</span>
              </span>
            </div>
            <CollapseButton />
          </div>
        ) : (
          <div
            className="flex w-full h-full items-center justify-center"
            onMouseEnter={() => setIsLogoHovered(true)}
            onMouseLeave={() => setIsLogoHovered(false)}
          >
            {isLogoHovered ? (
              <CollapseButton />
            ) : (
              <div
                className="cursor-pointer transition-transform hover:scale-105"
                onClick={() => (window.location.href = "/")}
              >
                <img
                  src="/vibe_spot_logo_landing.png"
                  alt="VibeSpot Logo"
                  className="h-8 w-auto object-contain"
                />
              </div>
            )}
          </div>
        )}
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          {/* 1. Main Navigation Menu */}
          <SidebarMenu className="gap-2 mt-4">
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip="Discover"
                isActive={pathname === "/discover"}
                onClick={() => handleNavigate("/discover")}
              >
                <Search className="text-brand-primary" />
                <span>Discover</span>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip="Saved Places"
                isActive={pathname === "/saved-places"}
                onClick={() => handleNavigate("/saved-places")}
              >
                <Heart
                  className={
                    pathname === "/saved-places"
                      ? "text-brand-primary"
                      : "text-text-secondary"
                  }
                />
                <span className="flex-1 text-left">Saved Places</span>
                {savedPlaces.length > 0 && (
                  <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-1.5 py-0.5 rounded-full ml-auto">
                    {savedPlaces.length}
                  </span>
                )}
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip="Chat"
                isActive={pathname.startsWith("/chat")}
                onClick={() => handleNavigate("/chat/saturday-coffee-run")}
              >
                <MessageSquare
                  className={
                    pathname.startsWith("/chat")
                      ? "text-brand-primary"
                      : "text-text-secondary"
                  }
                />
                <span>Chat</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>{" "}
          {/* <--- CLOSE THE MAIN MENU HERE */}
          {/* 2. Recents Section (Moved OUTSIDE the first SidebarMenu) */}
          {isExpanded ? (
            <div className="mt-6 px-3">
              <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">
                Recents
              </h3>
              <div className="h-px bg-border-secondary w-full mb-3" />

              <ul className="space-y-3">
                {recentRecommendations.length === 0 ? (
                  <li className="text-xs text-text-secondary italic px-1">
                    No recent searches
                  </li>
                ) : (
                  recentRecommendations.map((rec) => {
                    const isActive = rec.id === activeRecommendation?.id;
                    return (
                      <li
                        key={rec.id}
                        onClick={() =>
                          handleNavigate(`/recommendations/${rec.id}`)
                        }
                        className={`text-sm cursor-pointer transition-colors truncate px-2 py-1.5 rounded-md ${
                          isActive
                            ? "bg-emerald-50 text-emerald-600 font-semibold"
                            : "text-text-secondary hover:bg-stone-50 hover:text-brand-primary"
                        }`}
                      >
                        {rec.title}
                      </li>
                    );
                  })
                )}
              </ul>
            </div>
          ) : (
            // 3. Wrap the collapsed popover in its own valid SidebarMenu
            <SidebarMenu>
              <SidebarMenuItem>
                <Popover>
                  <PopoverTrigger asChild>
                    <SidebarMenuButton tooltip="Recents">
                      <Clock className="text-text-secondary" />
                      <span>Recents</span>
                    </SidebarMenuButton>
                  </PopoverTrigger>
                  <PopoverContent
                    side="right"
                    align="start"
                    className="w-64 ml-2 rounded-xl shadow-lg border-border-secondary"
                  >
                    <h3 className="text-sm font-semibold text-text-primary mb-3">
                      Recent Recommendations
                    </h3>

                    <ul className="space-y-2">
                      {recentRecommendations.length === 0 ? (
                        <li className="text-xs text-text-secondary italic">
                          No recent searches
                        </li>
                      ) : (
                        recentRecommendations.map((rec) => {
                          const isActive = rec.id === activeRecommendation?.id;
                          return (
                            <li
                              key={rec.id}
                              onClick={() =>
                                handleNavigate(`/recommendations/${rec.id}`)
                              }
                              className={`text-sm cursor-pointer transition-colors truncate px-2 py-1.5 rounded-md ${
                                isActive
                                  ? "bg-emerald-50 text-emerald-600 font-semibold"
                                  : "text-text-secondary hover:bg-stone-50 hover:text-brand-primary"
                              }`}
                            >
                              {rec.title}
                            </li>
                          );
                        })
                      )}
                    </ul>
                  </PopoverContent>
                </Popover>
              </SidebarMenuItem>
            </SidebarMenu>
          )}
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  tooltip="Profile"
                  className={`data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground ${
                    !isExpanded ? "justify-center" : ""
                  }`}
                >
                  <User className="text-text-secondary" />
                  {isExpanded && (
                    <>
                      <span className="flex-1 text-left text-sm font-medium">
                        Profile
                      </span>
                      <ChevronsUpDown className="ml-auto size-4" />
                    </>
                  )}
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                align="start"
                className="w-48 rounded-xl shadow-lg"
              >
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
