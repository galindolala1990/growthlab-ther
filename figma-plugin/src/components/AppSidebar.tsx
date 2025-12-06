import { LayoutDashboard, Calendar, Grid3x3, FlaskConical, TrendingUp, Settings, Sparkles, Palette, ExternalLink, FolderKanban, Wrench } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAISummarize } from "@/hooks/useAISummarize";
import { Loader2 } from "lucide-react";
import { Logo } from "@/components/Logo";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";

const workspaceItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Experiments",
    url: "/experiments",
    icon: FlaskConical,
  },
  {
    title: "Roadmap",
    url: "/roadmap",
    icon: Calendar,
    description: "Committed work & schedule",
  },
  {
    title: "Canvas",
    url: "/roadmap?view=canvas",
    icon: Grid3x3,
    description: "Ideas & strategic bets",
  },
  /* {
    title: "Insights",
    url: "/insights",
    icon: TrendingUp,
  },*/
];

const systemItems = [
  {
    title: "Design System",
    url: "/design-system",
    icon: Palette,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];
export function AppSidebar() {
  const { open } = useSidebar();
  const location = useLocation();
  const { summarize, isLoading } = useAISummarize();
  const [inputData, setInputData] = useState("");
  const [summary, setSummary] = useState("");
  const handleSummarize = async () => {
    if (!inputData.trim()) return;
    const result = await summarize({
      featureData: {
        description: inputData,
      },
      source: "manual",
    });
    if (result) {
      setSummary(result);
    }
  };
  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarHeader className="border-b border-sidebar-border px-4 py-[11px] pb-[12px]">
        <div className="flex items-center gap-3">
          <Logo className="w-8 h-8" />
          {open && (
            <div>
              <h2 className="font-display font-semibold text-sidebar-foreground">Growth Lab</h2>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        {/* Workspace Section */}
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center gap-2 px-2">
            <FolderKanban className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Workspace
            </span>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {workspaceItems.map((item) => {
                // Determine active state with mutual exclusivity for Roadmap/Canvas
                const isCanvasView = location.pathname === "/roadmap" && location.search.includes("view=canvas");
                
                let customActive: boolean | undefined;
                if (item.title === "Canvas") {
                  // Canvas is only active when on /roadmap with ?view=canvas
                  customActive = isCanvasView;
                } else if (item.title === "Roadmap") {
                  // Roadmap is only active when on /roadmap WITHOUT ?view=canvas
                  customActive = location.pathname === "/roadmap" && !isCanvasView;
                }
                
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={customActive ?? (item.url === "/" ? location.pathname === "/" : location.pathname === item.url)}
                      tooltip={item.title}
                      className="px-3 py-2 h-auto"
                    >
                      <NavLink to={item.url} end={item.url === "/"}>
                        <item.icon />
                        <span>{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* System Section */}
        <SidebarGroup className="mt-auto">
          <SidebarGroupLabel className="flex items-center gap-2 px-2">
            <Wrench className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              System
            </span>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {systemItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === item.url}
                    tooltip={item.title}
                    className="px-3 py-2 h-auto"
                  >
                    <NavLink to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {open}
    </Sidebar>
  );
}
