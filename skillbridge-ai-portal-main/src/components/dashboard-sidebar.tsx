import { Link, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, Map, Rocket, Brain, FileCheck, User, Settings, Bot,GraduationCap } from "lucide-react";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarHeader, SidebarFooter,
} from "@/components/ui/sidebar";

const items = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Career Roadmap", url: "/dashboard/roadmap", icon: Map },
  { title: "Projects", url: "/dashboard/projects", icon: Rocket },
  { title: "Interview Prep", url: "/dashboard/interview", icon: Brain },
  { title: "Resume Review", url: "/dashboard/resume", icon: FileCheck },
  { title: "Profile", url: "/dashboard/profile", icon: User },
  { title: "Settings", url: "/dashboard/settings", icon: Settings },
  { title: "AI career Assistant",url: "/dashboard/ai",icon:Bot}
];

export function DashboardSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border">
        <Link to="/" className="flex items-center gap-2 px-2 py-2">
          <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-gradient-hero shadow-elegant">
            <GraduationCap className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="truncate text-sm font-bold group-data-[collapsible=icon]:hidden">
            SkillBridge <span className="text-primary">AI</span>
          </span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const active = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={active} tooltip={item.title}>
                      <Link to={item.url}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border p-3">
        <div className="flex items-center gap-2 group-data-[collapsible=icon]:hidden">
          <div className="grid h-8 w-8 place-items-center rounded-full bg-gradient-hero text-xs font-semibold text-primary-foreground">P</div>
          <div className="min-w-0">
            <div className="truncate text-xs font-semibold">Prernaa S.</div>
            <div className="truncate text-[10px] text-muted-foreground">Sitrc</div>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
