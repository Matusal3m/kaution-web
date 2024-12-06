import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { AddContentDialogs } from "@/components/add-content-dialogs";
import { StorageProvider } from "@/contexts/storeage";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <StorageProvider>
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full px-10">
          <SidebarTrigger />
          <AddContentDialogs />
          {children}
        </main>
      </SidebarProvider>
    </StorageProvider>
  );
}
