"use client";

import { useEffect, useState } from "react";

export default function FrameGuard({ children }) {
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    // Check: Kya current window hi top window hai?
    // Agar window.self === window.top hai, iska matlab app direct khula hai (Not in Iframe).
    if (window.self !== window.top) {
      // Iframe ke andar hai -> Allow access
      setIsAllowed(true);
    } else {
      // Direct access hai -> Block access aur redirect kar do Outer Shell pe
      // Aap chaho to redirect kar sakte ho ya bas "Access Denied" dikha sakte ho.
      
      // Option A: Redirect to Main App (Recommended)
      // Note: Hardcoded IP/Port avoid karne ke liye environment variables use kar sakte ho
      window.location.href = "http://192.168.1.202:3033/dashboard/contact-book";
      
      // Option B: Sirf Block karna hai to ye line uncomment karein aur redirect hata dein:
       //setIsAllowed(false); 
    }
  }, []);

  if (!isAllowed) {
    // Jab tak check chal raha hai ya agar blocked hai, tab tak loading ya error dikhayein
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-100 text-gray-800">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Direct Access Restricted</h1>
          <p>Please access this module through the main dashboard.</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}