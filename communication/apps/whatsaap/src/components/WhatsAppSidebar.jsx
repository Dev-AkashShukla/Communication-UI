"use client";

import { Button } from "@indi-com/ui";
import { LayoutTemplate, Send, BarChart3, Settings, ChevronLeft, ChevronRight, Plus } from "lucide-react";

export function WhatsAppSidebar({
  activeTab,
  onTabChange,
  isCollapsed,
  onToggleCollapse
}) {
  const menuItems = [
    { id: "templates", label: "Templates", icon: LayoutTemplate },
    { id: "campaigns", label: "Campaigns", icon: Send },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "settings", label: "Config", icon: Settings },
  ];

  if (isCollapsed) {
    return (
      <div className="w-14 bg-slate-50 dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 flex flex-col items-center h-full transition-all duration-300">
        <div className="h-14 flex items-center justify-center w-full border-b border-slate-200 dark:border-slate-800 shrink-0 bg-white dark:bg-slate-900">
           <Button size="icon" variant="ghost" onClick={onToggleCollapse}><ChevronRight className="w-4 h-4" /></Button>
        </div>
        <div className="flex-1 py-4 flex flex-col gap-2">
          {menuItems.map((item) => (
             <Button key={item.id} size="icon" variant={activeTab === item.id ? "secondary" : "ghost"} onClick={() => onTabChange(item.id)} title={item.label}>
               <item.icon className="w-4 h-4" />
             </Button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-64 bg-slate-50 dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 flex flex-col h-full transition-all duration-300">
      <div className="h-14 px-4 flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0">
        <h2 className="font-semibold text-sm text-slate-800 dark:text-slate-100">WhatsApp Marketing</h2>
        <Button size="icon" variant="ghost" onClick={onToggleCollapse} className="h-8 w-8"><ChevronLeft className="w-4 h-4" /></Button>
      </div>

      <div className="flex-1 py-4 px-2 space-y-1">
        <div className="px-3 mb-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Menu</div>
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium transition-colors rounded-md ${
              activeTab === item.id 
                ? "bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-slate-100" 
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            <item.icon className="w-4 h-4" />
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}