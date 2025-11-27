"use client";

import { Avatar, AvatarFallback, Input, Button } from "@indi-com/ui";
import { ResizablePanel } from "./ResizablePanel";
import { Search, Plus } from "lucide-react";

function getInitials(name) {
  return name ? name.substring(0, 2).toUpperCase() : "??";
}

export function ContactList({ 
  contacts, 
  selectedContactId, 
  onSelectContact, 
  groupName, 
  searchQuery, 
  onSearchChange,
  onNewContact
}) {
  return (
    <ResizablePanel minWidth={280} maxWidth={400} defaultWidth={320}>
      <div className="h-full flex flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        
        {/* 1. UNIFORM HEADER: Exactly h-14 to match Sidebar and Form */}
        <div className="h-14 px-4 flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-sm text-slate-800 dark:text-slate-100 truncate max-w-[120px]">
              {groupName}
            </h3>
            <span className="flex items-center justify-center h-5 min-w-[20px] px-1.5 text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-500 rounded-full">
              {contacts.length}
            </span>
          </div>
          
          <Button size="sm" variant="ghost" onClick={onNewContact} className="h-8 px-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50">
            <Plus className="w-4 h-4 mr-1.5" />
            <span className="text-xs font-semibold">ADD</span>
          </Button>
        </div>

        {/* 2. SEARCH BAR: Moved below header to prevent alignment issues */}
        <div className="p-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <Input 
              placeholder="Search contacts..." 
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-8 h-9 text-sm bg-white dark:bg-slate-900 border-slate-200 focus:border-blue-500 transition-all"
            />
          </div>
        </div>

        {/* List Content */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {contacts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-slate-400">
              <p className="text-sm">No contacts found</p>
            </div>
          ) : (
            contacts.map((contact) => (
              <div
                key={contact.id}
                onClick={() => onSelectContact(contact.id)}
                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all border ${
                  selectedContactId === contact.id
                    ? "bg-slate-50 border-blue-200 ring-1 ring-blue-200 dark:bg-slate-800 dark:border-slate-700"
                    : "bg-transparent border-transparent hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
              >
                <Avatar className="w-9 h-9 border border-slate-200/50">
                  <AvatarFallback className={`text-xs font-medium ${selectedContactId === contact.id ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600"}`}>
                    {getInitials(contact.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-0.5">
                    <h4 className={`text-sm font-medium truncate ${selectedContactId === contact.id ? "text-blue-700 dark:text-blue-400" : "text-slate-700 dark:text-slate-200"}`}>
                      {contact.name}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-500 truncate">
                    {contact.phone}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </ResizablePanel>
  );
}