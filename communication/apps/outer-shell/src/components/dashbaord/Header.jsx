"use client";

import { Input, Avatar, AvatarFallback, Button} from "@indi-com/ui";
import { Search, Bell, Settings, HelpCircle, Menu } from "lucide-react";

export function Header({ onMenuToggle }) {
  return (
    // HEIGHT CHANGE: h-14 -> h-12 (Compact)
    <header className="h-12 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-3 sticky top-0 z-20">
      
      {/* Left - Logo Section */}
      <div className="flex items-center gap-3 w-48 lg:w-64">
        {/* Mobile Toggle */}
        <Button variant="ghost" size="icon" onClick={onMenuToggle} className="lg:hidden h-8 w-8 text-slate-500">
          <Menu className="w-4 h-4" />
        </Button>
        
        {/* Brand Logo */}
        <div className="flex items-center gap-2">
          {/* Logo size reduced slightly */}
          <div className="w-7 h-7 bg-blue-600 rounded-md flex items-center justify-center shadow-sm">
            <span className="text-white font-bold text-xs">IC</span>
          </div>
          <span className="font-semibold text-slate-700 dark:text-slate-200 hidden sm:block text-sm">Indi Com</span>
        </div>
      </div>

      {/* Center - Search Bar */}
      <div className="flex-1 max-w-xl px-4">
        <div className="relative group">
          <div className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500">
            <Search className="w-3.5 h-3.5" />
          </div>
          {/* Input height reduced: h-9 -> h-8 */}
          <Input 
            placeholder="Search..." 
            className="w-full pl-8 h-8 text-sm bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus-visible:ring-1 focus-visible:ring-blue-500 focus-visible:bg-white transition-all shadow-sm rounded-md"
          />
        </div>
      </div>

      {/* Right - Actions & Profile */}
      <div className="flex items-center justify-end gap-1 w-48 lg:w-64">
        <Button variant="ghost" size="icon" className="h-7 w-7 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 hidden sm:flex">
          <HelpCircle className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-7 w-7 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800">
          <Settings className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-7 w-7 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 relative">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full border border-white dark:border-slate-950"></span>
        </Button>
        
        {/* User Profile */}
        <div className="ml-2 pl-2 border-l border-slate-200 dark:border-slate-800">
            {/* Avatar slightly smaller: h-8 -> h-7 */}
            <Avatar className="h-7 w-7 cursor-pointer hover:ring-2 hover:ring-slate-200 transition-all">
                <AvatarFallback className="bg-blue-600 text-white text-[10px]">AK</AvatarFallback>
            </Avatar>
        </div>
      </div>
    </header>
  );
}