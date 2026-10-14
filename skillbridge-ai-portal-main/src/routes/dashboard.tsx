import { createFileRoute, Outlet } from "@tanstack/react-router";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — SkillBridge AI" },
      { name: "description", content: "Your placement prep dashboard." },
      { property: "og:title", content: "Dashboard — SkillBridge AI" },
      { property: "og:description", content: "Track skills, projects, and progress." },
    ],
  }),
  component: DashboardLayout,
});

function DashboardLayout() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-muted/30">
        <DashboardSidebar />
        <div className="flex flex-1 flex-col">
          <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border/60 bg-background/80 px-4 backdrop-blur-lg sm:px-6">
            <SidebarTrigger />
            <div className="relative hidden max-w-md flex-1 sm:block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search skills, projects, topics…" className="pl-9" />
            </div>
            <div className="ml-auto flex items-center gap-2">
              <button className="grid h-9 w-9 place-items-center rounded-lg border border-border hover:bg-accent">
                <Bell className="h-4 w-4" />
              </button>
              <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-hero text-sm font-semibold text-primary-foreground">A</div>
            </div>
          </header>
          <main className="flex-1 p-4 sm:p-6 lg:p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
