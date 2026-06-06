import { SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { MobileTrigger } from "@/components/layout/mobile-trigger";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider defaultOpen={false}>
      <TooltipProvider>
        <AppSidebar />
        <main className="flex-1 h-screen overflow-y-auto bg-surface-page/95 backdrop-blur-md relative">
          <div className="md:hidden absolute top-4 left-4 z-50">
            <MobileTrigger />
          </div>
          {children}
        </main>
      </TooltipProvider>
    </SidebarProvider>
  );
}
