// components/dashboard/app-sidebar.jsx
"use client";

import { Home, FolderKanban, Users, Settings, BarChart3, FileText, Calendar, Bell } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import Link from "next/link";

const menuItems = [
  { title: "Dashboard", icon: Home, url: "/dashboard" },
  { title: "Projects", icon: FolderKanban, url: "/dashboard/projects" },
  { title: "Tasks", icon: FileText, url: "/dashboard/tasks" },
  { title: "Calendar", icon: Calendar, url: "/dashboard/calendar" },
  { title: "Team", icon: Users, url: "/dashboard/team" },
  { title: "Analytics", icon: BarChart3, url: "/dashboard/analytics" },
  { title: "Notifications", icon: Bell, url: "/dashboard/notifications" },
  { title: "Settings", icon: Settings, url: "/dashboard/settings" },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="border-b px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-linear-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">IC</span>
          </div>
          <span className="font-bold text-lg">Indi Com</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t p-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-linear-to-br from-blue-600 to-blue-700 flex items-center justify-center">
            <span className="text-white text-sm font-medium">U</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">User Name</p>
            <p className="text-xs text-muted-foreground">user@example.com</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}