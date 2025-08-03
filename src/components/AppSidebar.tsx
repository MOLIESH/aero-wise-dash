import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  TrendingUp,
  Shield,
  MapPin,
  Database,
  Info,
  Leaf,
  Menu,
  X
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

const items = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Forecast", url: "/forecast", icon: TrendingUp },
  { title: "Green Score", url: "/green-score", icon: Shield },
  { title: "Recommender", url: "/recommender", icon: MapPin },
  { title: "Data Sources", url: "/data-sources", icon: Database },
  { title: "About", url: "/about", icon: Info },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-primary/10 text-primary font-medium border-r-2 border-primary" 
      : "hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors";

  return (
    <Sidebar
      className={`${collapsed ? "w-16" : "w-64"} border-r bg-card/50 backdrop-blur-sm`}
      collapsible="icon"
    >
      <SidebarContent className="p-0">
        {/* Logo Section */}
        <div className="p-6 border-b">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            {!collapsed && (
              <div>
                <h1 className="text-xl font-bold text-foreground">AeroWise</h1>
                <p className="text-xs text-muted-foreground">Environmental Intelligence</p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup className="px-3 py-4">
          <SidebarGroupLabel className={collapsed ? "sr-only" : "text-xs font-medium text-muted-foreground mb-2"}>
            Navigation
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="h-11">
                    <NavLink 
                      to={item.url} 
                      end 
                      className={getNavCls}
                      title={collapsed ? item.title : undefined}
                    >
                      <item.icon className={`h-5 w-5 ${collapsed ? "mx-auto" : "mr-3"} flex-shrink-0`} />
                      {!collapsed && <span className="truncate">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Footer */}
        {!collapsed && (
          <div className="mt-auto p-4 border-t">
            <div className="text-xs text-muted-foreground">
              <p>Data updated:</p>
              <p className="font-medium">{new Date().toLocaleDateString()}</p>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}