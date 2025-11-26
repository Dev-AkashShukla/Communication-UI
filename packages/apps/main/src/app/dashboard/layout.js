//packages/apps/main/src/app/dashboard/layout.js
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MainSidebar } from "@/components/MainSidebar"; // Adjust path if needed
import { Header } from "@/components/Header"; // Adjust path if needed

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  useEffect(() => {
    // Auth check logic
    const auth = localStorage.getItem("isAuthenticated");
    if (!auth) {
      router.push("/auth/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  if (!isAuthenticated) {
    return null; // Or a loading spinner
  }

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-950">
      {/* 1. Global Sidebar (Left) */}
      <MainSidebar collapsed={false} />

      {/* 2. Main Content Area (Right) */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Top Header (Optional: agar tum chahte ho har page pe header dikhe) */}
        <Header onMenuToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />

        {/* Page Content (Scrollable) */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}