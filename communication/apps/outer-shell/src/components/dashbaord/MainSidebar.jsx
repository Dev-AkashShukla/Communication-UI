"use client";

import { usePathname, useRouter } from "next/navigation";
import { User, MessageCircle, Send, Smartphone, LayoutGrid, LogOut } from "lucide-react"; // LogOut icon import kiya
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@indi-com/ui";
import { Button } from "@indi-com/ui";

const mainMenuItems = [
  { id: "master", name: "Contacts", path: "/dashboard/contact-book", icon: User },
  { id: "whatsapp", name: "WhatsApp", path: "/dashboard/whatsapp", icon: MessageCircle },
  // { id: "telegram", name: "Telegram", path: "/dashboard/contact-book", icon: Send },
  // { id: "sms", name: "SMS", path: "/dashboard/contact-book", icon: Smartphone },
];

export function MainSidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    // Add your logout logic here
    console.log("Logging out...");
    router.push("/auth/login"); 
  };

  return (
    // WIDTH CHANGE: w-[60px] -> w-12 (48px)
    <div className="flex flex-col items-center py-3 w-12 bg-slate-50 dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 h-screen z-30">
      
      {/* App Launcher */}
      <div className="mb-4">
         <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:bg-transparent hover:text-blue-600">
            <LayoutGrid className="h-5 w-5" />
         </Button>
      </div>

      {/* Navigation Icons */}
      <TooltipProvider delayDuration={0}>
        <div className="flex flex-col gap-2 w-full px-1">
          {mainMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path || (item.path !== '/dashboard' && pathname.startsWith(item.path));
            
            return (
              <Tooltip key={item.id}>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    onClick={() => router.push(item.path)}
                    // Button styling adjusted for narrower sidebar
                    className={`h-9 w-full p-0 rounded-md transition-all ${
                      isActive
                        ? "bg-white dark:bg-slate-800 text-blue-600 shadow-sm border border-slate-200 dark:border-slate-700" 
                        : "text-slate-500 hover:bg-slate-200/50 dark:hover:bg-slate-800"
                    }`}
                  >
                    <Icon className="h-4 w-4" /> {/* Icon size slightly smaller */}
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right" className="bg-slate-900 text-white border-0 text-xs">
                  {item.name}
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      </TooltipProvider>

      {/* LOGOUT SECTION: Added at the bottom */}
      <div className="mt-auto mb-2 w-full px-1 flex flex-col items-center">
         <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  onClick={handleLogout}
                  className="h-9 w-full p-0 text-slate-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:text-red-400 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" className="bg-slate-900 text-white border-0 text-xs">
                Logout
              </TooltipContent>
            </Tooltip>
         </TooltipProvider>
      </div>
    </div>
  );
}