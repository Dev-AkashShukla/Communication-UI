"use client";

import { Button, Input, Label, Textarea, Checkbox } from "@indi-com/ui"; 
import { Save, X, Phone, MessageCircle } from "lucide-react";

export function ContactForm({ formData, groups, onChange, onSubmit, onCancel, isEditing }) {
  
  const handleChange = (field, value) => {
    const newData = { ...formData, [field]: value };
    if (field === 'phone' && formData.isSameNum) {
      newData.whatsapp = value;
    }
    if (field === 'isSameNum') {
      if (value === true) newData.whatsapp = formData.phone;
    }
    onChange(newData);
  };

  return (
    <div className="h-full flex flex-col bg-white dark:bg-slate-900">
      
      {/* 1. UNIFORM HEADER: h-14 fixed height */}
      <div className="h-14 px-6 flex items-center justify-between border-b border-slate-200 dark:border-slate-800 shrink-0">
        <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
          {isEditing ? "Edit Contact" : "Create New Contact"}
        </h2>
        {isEditing && (
          <Button variant="ghost" size="sm" onClick={onCancel} className="h-8 text-slate-500 hover:text-slate-900">
            <X className="w-4 h-4 mr-2" /> Cancel
          </Button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-slate-50/30 dark:bg-slate-950/30">
        <form onSubmit={onSubmit} className="max-w-full mx-auto bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5 md:col-span-2">
              <Label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Full Name</Label>
              <Input placeholder="e.g. Akash Shukla" value={formData.name} onChange={(e) => handleChange("name", e.target.value)} required className="h-9" />
            </div>

            <div className="space-y-1.5">
              <Label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide flex items-center gap-2">SMS / Call Number</Label>
              <Input placeholder="+91..." value={formData.phone} onChange={(e) => handleChange("phone", e.target.value)} required className="h-9" />
            </div>

            <div className="space-y-1.5">
              <Label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide flex items-center gap-2">WhatsApp Number</Label>
              <Input 
                placeholder="+91..." 
                value={formData.whatsapp} 
                onChange={(e) => handleChange("whatsapp", e.target.value)} 
                disabled={formData.isSameNum}
                className={`h-9 ${formData.isSameNum ? "bg-slate-50 text-slate-500" : ""}`}
              />
              <div className="flex items-center gap-2 pt-1">
                 <input 
                    type="checkbox" 
                    id="sameNum" 
                    checked={formData.isSameNum} 
                    onChange={(e) => handleChange("isSameNum", e.target.checked)}
                    className="w-3.5 h-3.5 rounded border-slate-300 accent-slate-900"
                 />
                 <label htmlFor="sameNum" className="text-xs text-slate-600 dark:text-slate-400 cursor-pointer select-none">Same as Phone Number</label>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
             <div className="space-y-1.5">
              <Label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Email</Label>
              <Input type="email" placeholder="user@example.com" value={formData.email} onChange={(e) => handleChange("email", e.target.value)} className="h-9" />
            </div>
             <div className="space-y-1.5">
              <Label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Group</Label>
              <select 
                className="flex h-9 w-full rounded-md border border-slate-200 bg-white px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-slate-900"
                value={formData.group} 
                onChange={(e) => handleChange("group", e.target.value)}
              >
                {groups.map(g => <option key={g.id} value={g.name}>{g.name}</option>)}
              </select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Telegram</Label>
              <Input placeholder="@username" value={formData.telegram} onChange={(e) => handleChange("telegram", e.target.value)} className="h-9" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Instagram</Label>
              <Input placeholder="@handle" value={formData.instagram} onChange={(e) => handleChange("instagram", e.target.value)} className="h-9" />
            </div>
          </div>

          <div className="space-y-1.5 pt-2">
            <Label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Notes</Label>
            <Textarea placeholder="Any extra details..." rows={3} value={formData.notes} onChange={(e) => handleChange("notes", e.target.value)} className="resize-none" />
          </div>

          <div className="pt-4 flex gap-3 border-t border-slate-100 mt-6">
            <Button type="submit" className="flex-1 bg-slate-900 hover:bg-slate-800 text-white"><Save className="w-4 h-4 mr-2" /> Save Contact</Button>
            <Button type="button" variant="outline" onClick={() => onChange(initialFormData)}>Reset</Button>
          </div>
        </form>
      </div>
    </div>
  );
}