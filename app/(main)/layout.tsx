import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { RecommendationProvider } from "@/store/recommendation-context";
import { ChatProvider } from "@/store/chat-context";
import { TooltipProvider } from "@/components/ui/tooltip"; // 1. Import the provider

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RecommendationProvider>
      <ChatProvider>
        {/* 2. Wrap the Sidebar and main content with the TooltipProvider */}
        <TooltipProvider delayDuration={0}>
          <SidebarProvider>
            <AppSidebar />
            <main className="flex-1 w-full h-screen overflow-hidden bg-surface-page">
              {children}
            </main>
          </SidebarProvider>
        </TooltipProvider>
      </ChatProvider>
    </RecommendationProvider>
  );
}
