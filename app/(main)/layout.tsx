import { SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppSidebar } from "@/components/layout/app-sidebar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <TooltipProvider>
        <AppSidebar />
        <main className="flex-1 h-screen overflow-y-auto bg-surface-page/95 backdrop-blur-md relative">
          {children}
        </main>
      </TooltipProvider>
    </SidebarProvider>
  );
}
