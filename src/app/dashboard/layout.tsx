import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { AddContentCard } from "@/components/add-content-cards"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full px-10">
        <SidebarTrigger/>
        <AddContentCard />
        {children}
      </main>
    </SidebarProvider>
  )
}
