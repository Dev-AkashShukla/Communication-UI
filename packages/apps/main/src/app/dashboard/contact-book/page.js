// src/app/dashboard/contact-book/page.js
"use client";

import { useState } from "react";

export default function ContactBookPage() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="w-full h-full bg-slate-50 dark:bg-slate-950 relative">
      {/* Loading Spinner */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-10 bg-white dark:bg-slate-900">
           <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Contact Book App running on Port 3034 */}
      <iframe 
        src="http://localhost:3034" 
        className="w-full h-full border-none"
        title="Contact Book Module"
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
}