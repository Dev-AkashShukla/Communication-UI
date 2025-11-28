"use client";

import { CheckCheck } from "lucide-react";

export function MobilePreview({ data }) {
  const { header, body, footer, buttons } = data.components || {};

  return (
    <div className="flex flex-col items-center justify-center h-full p-4 bg-slate-100 dark:bg-slate-950">
      
      {/* Phone Frame */}
      <div className="w-[300px] h-[600px] bg-white dark:bg-black rounded-[3rem] border-8 border-slate-900 dark:border-slate-700 shadow-2xl overflow-hidden relative">
        
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-900 rounded-b-xl z-10"></div>

        {/* WhatsApp Header Mockup */}
        <div className="h-16 bg-[#075E54] flex items-end pb-3 px-4 shadow-sm z-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white/20"></div>
            <div className="text-white text-sm font-medium">Finnotia Business</div>
          </div>
        </div>

        {/* Chat Background */}
        <div className="flex-1 bg-[#E5DDD5] dark:bg-[#0b141a] p-3 overflow-y-auto" 
             style={{ backgroundImage: "url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')", backgroundBlendMode: 'overlay' }}>
          
          {/* The Message Bubble */}
          <div className="bg-white dark:bg-[#202c33] rounded-lg p-1 shadow-sm max-w-[90%] mb-2">
            
            {/* Header Component */}
            {header?.type === 'IMAGE' && (
              <div className="rounded-md overflow-hidden mb-1">
                <img src={header.url} alt="Header" className="w-full h-36 object-cover" />
              </div>
            )}
            {header?.type === 'TEXT' && (
              <div className="px-2 pt-2 font-bold text-slate-800 dark:text-slate-100">
                {header.text}
              </div>
            )}

            {/* Body Component */}
            <div className="px-2 py-1 text-sm text-slate-800 dark:text-slate-200 whitespace-pre-wrap">
              {body?.text || "Enter body text..."}
            </div>

            {/* Footer Component */}
            {footer?.text && (
              <div className="px-2 pb-1 text-[10px] text-slate-400 dark:text-slate-500">
                {footer.text}
              </div>
            )}

            {/* Metadata (Time) */}
            <div className="flex justify-end px-2 pb-1 gap-1">
              <span className="text-[10px] text-slate-400">10:42 AM</span>
              {/* <CheckCheck className="w-3 h-3 text-blue-500" /> */}
            </div>
          </div>

          {/* Interactive Buttons */}
          {buttons && buttons.length > 0 && (
            <div className="flex flex-col gap-1 mt-1 max-w-[90%]">
              {buttons.map((btn, idx) => (
                <div key={idx} className="bg-white dark:bg-[#202c33] rounded-lg p-2.5 shadow-sm text-center">
                  <span className="text-[#00A884] text-sm font-medium flex items-center justify-center gap-2">
                    {btn.type === 'URL' && "🔗"} 
                    {btn.text}
                  </span>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
      <p className="mt-4 text-xs text-slate-400 uppercase tracking-wide font-medium">Live Preview</p>
    </div>
  );
}