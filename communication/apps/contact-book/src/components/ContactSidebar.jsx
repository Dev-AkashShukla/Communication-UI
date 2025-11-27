"use client";

import { useState } from "react";
import { Button, Input } from "@indi-com/ui";
import { Plus, User, Star, Briefcase, Users, Hash, ChevronLeft, ChevronRight } from "lucide-react";

export function ContactSidebar({
  groups,
  selectedGroup,
  onGroupChange,
  isCollapsed,
  onToggleCollapse,
  onAddGroup
}) {
  const [newGroupInput, setNewGroupInput] = useState("");
  const [showGroupInput, setShowGroupInput] = useState(false);

  const handleAddGroupSubmit = (e) => {
    e.preventDefault();
    if (newGroupInput.trim()) {
      onAddGroup(newGroupInput.trim());
      setNewGroupInput("");
      setShowGroupInput(false);
    }
  };

  const getIcon = (id) => {
    if (id === 'favorites') return Star;
    if (id === 'Work') return Briefcase;
    if (id === 'Family') return Users;
    if (id === 'all') return User;
    return Hash;
  };

  // Collapsed View
  if (isCollapsed) {
    return (
      // REMOVED 'py-2' from here to fix alignment
      <div className="w-14 bg-slate-50 dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 flex flex-col items-center h-full transition-all duration-300">
        
        {/* Header - Perfectly aligned with h-14 */}
        <div className="h-14 flex items-center justify-center w-full border-b border-slate-200 dark:border-slate-800 shrink-0 bg-white dark:bg-slate-900">
           <Button size="icon" variant="ghost" onClick={onToggleCollapse}><ChevronRight className="w-4 h-4" /></Button>
        </div>
        
        {/* Content */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden w-full flex flex-col items-center gap-2 py-4 no-scrollbar">
          {groups.map((group) => {
            const Icon = getIcon(group.id);
            return (
               <Button key={group.id} size="icon" variant={selectedGroup === group.id ? "secondary" : "ghost"} onClick={() => onGroupChange(group.id)} title={group.name}>
                 <Icon className="w-4 h-4" />
               </Button>
            )
          })}
        </div>
      </div>
    );
  }

  // Expanded View
  return (
    <div className="w-64 bg-slate-50 dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 flex flex-col h-full transition-all duration-300">
      
      {/* Header - Perfectly aligned with h-14 */}
      <div className="h-14 px-4 flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0">
        <h2 className="font-semibold text-sm text-slate-800 dark:text-slate-100">FinContacts</h2>
        <Button size="icon" variant="ghost" onClick={onToggleCollapse} className="h-8 w-8"><ChevronLeft className="w-4 h-4" /></Button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden py-4">
        <div className="px-3 mb-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Main</div>
        {groups.filter(g => g.type === 'system').map(group => (
          <GroupItem key={group.id} group={group} selected={selectedGroup === group.id} onClick={() => onGroupChange(group.id)} icon={getIcon(group.id)} />
        ))}

        <div className="px-3 mt-6 mb-2 flex items-center justify-between">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Custom Groups</span>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-5 w-5 text-slate-500 hover:text-slate-900" 
            onClick={() => setShowGroupInput(!showGroupInput)}
          >
            <Plus className="w-3.5 h-3.5" />
          </Button>
        </div>
        
        {showGroupInput && (
          <form onSubmit={handleAddGroupSubmit} className="px-3 mb-2">
            <Input 
              autoFocus
              placeholder="Group name..." 
              value={newGroupInput}
              onChange={(e) => setNewGroupInput(e.target.value)}
              className="h-8 text-sm bg-white dark:bg-slate-900"
              onBlur={() => !newGroupInput && setShowGroupInput(false)}
            />
          </form>
        )}

        {groups.filter(g => g.type === 'custom').map(group => (
          <GroupItem key={group.id} group={group} selected={selectedGroup === group.id} onClick={() => onGroupChange(group.id)} icon={getIcon(group.id)} />
        ))}
      </div>
    </div>
  );
}

function GroupItem({ group, selected, onClick, icon: Icon }) {
  return (
    <button
      onClick={onClick}
      className={`w-[calc(100%-16px)] mx-2 flex items-center gap-3 px-3 py-2 text-sm font-medium transition-colors rounded-md ${
        selected 
          ? "bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-slate-100" 
          : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
      }`}
    >
      <Icon className={`w-4 h-4 shrink-0 ${selected ? "text-slate-900 dark:text-slate-100" : "text-slate-500 dark:text-slate-500"}`} />
      <span className="truncate">{group.name}</span>
    </button>
  );
}