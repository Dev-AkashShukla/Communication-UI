"use client";

import { Badge, Button, ResizablePanel } from "@indi-com/ui";
import { Search, Plus, CheckCircle2, Clock } from "lucide-react";

export function TemplateList({ 
  templates, 
  selectedId, 
  onSelect, 
  onNew 
}) {
  return (
    <ResizablePanel minWidth={280} maxWidth={400} defaultWidth={320}>
      <div className="h-full flex flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        
        {/* Header */}
        <div className="h-14 px-4 flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0">
          <h3 className="font-semibold text-sm text-slate-800 dark:text-slate-100">Message Templates</h3>
          <Button size="sm" variant="ghost" onClick={onNew} className="h-8 px-2 text-blue-600 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/30">
            <Plus className="w-4 h-4 mr-1.5" />
            <span className="text-xs font-semibold">CREATE</span>
          </Button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-2">
          {templates.map((t) => (
            <div
              key={t.id}
              onClick={() => onSelect(t.id)}
              className={`p-3 rounded-lg cursor-pointer transition-all border ${
                selectedId === t.id
                  ? "bg-slate-50 border-blue-200 ring-1 ring-blue-200 dark:bg-slate-800 dark:border-slate-700"
                  : "bg-transparent border-transparent hover:bg-slate-50 dark:hover:bg-slate-800"
              }`}
            >
              <div className="flex justify-between items-start mb-1">
                <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200">{t.name}</h4>
                {t.status === 'APPROVED' ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                ) : (
                  <Clock className="w-3.5 h-3.5 text-yellow-500" />
                )}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-2">
                {t.components.body.text}
              </p>
              <div className="flex gap-2">
                <Badge variant="outline" className="text-[10px] h-5 px-1.5 bg-slate-100 dark:bg-slate-800 text-slate-500">
                  {t.category}
                </Badge>
                <Badge variant="outline" className="text-[10px] h-5 px-1.5 bg-slate-100 dark:bg-slate-800 text-slate-500">
                  {t.language}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ResizablePanel>
  );
}