import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ContentCards } from "@/components/cards/content-cards";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full px-10">
        <SidebarTrigger />
        <ContentCards />
        <div className="flex-col w-full pb-4">{children}</div>
      </main>
    </SidebarProvider>
  );
}
