import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { AddContentDialogs } from "@/components/add-content-dialogs";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full px-10">
        <SidebarTrigger />
        <AddContentDialogs />
        {children}
      </main>
    </SidebarProvider>
  );
}
