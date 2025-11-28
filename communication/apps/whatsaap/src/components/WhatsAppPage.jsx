"use client";

import { useState, useMemo } from "react";
import { WhatsAppSidebar } from "./WhatsAppSidebar";
import { TemplateList } from "./TemplateList";
import { MobilePreview } from "./MobilePreview";
import { Button, Input, Label, Textarea, Tabs, TabsList, TabsTrigger, TabsContent, Badge } from "@indi-com/ui";
import { dummyTemplates } from "../data/whatsappData";
import { dummyContacts, initialGroups } from "../data/whatsappData"; // Tumhare existing data se import
import { Save, Users, Send } from "lucide-react";

export function WhatsAppPage() {
  const [activeTab, setActiveTab] = useState("templates");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [templates, setTemplates] = useState(dummyTemplates);
  const [selectedTemplateId, setSelectedTemplateId] = useState(dummyTemplates[0].id);
  
  // Builder State
  const [editingTemplate, setEditingTemplate] = useState(dummyTemplates[0]);
  const [selectedAudience, setSelectedAudience] = useState("all");

  const handleTemplateSelect = (id) => {
    setSelectedTemplateId(id);
    const tmpl = templates.find(t => t.id === id);
    setEditingTemplate(JSON.parse(JSON.stringify(tmpl))); // Deep copy for editing
  };

  const updateComponent = (compType, field, value) => {
    setEditingTemplate(prev => ({
      ...prev,
      components: {
        ...prev.components,
        [compType]: {
          ...prev.components[compType],
          [field]: value
        }
      }
    }));
  };

  // Audience Count Logic
  const audienceCount = useMemo(() => {
    if (selectedAudience === 'all') return dummyContacts.length;
    if (selectedAudience === 'favorites') return dummyContacts.filter(c => c.isFavorite).length;
    return dummyContacts.filter(c => c.group === selectedAudience).length;
  }, [selectedAudience]);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-50 dark:bg-slate-950">
      
      {/* 1. Navigation Sidebar */}
      <WhatsAppSidebar 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        isCollapsed={isCollapsed}
        onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
      />

      {/* 2. Template List Panel */}
      {activeTab === 'templates' && (
        <TemplateList 
          templates={templates} 
          selectedId={selectedTemplateId} 
          onSelect={handleTemplateSelect}
          onNew={() => console.log("Create New")}
        />
      )}

      {/* 3. Main Workspace (Builder + Preview) */}
      <div className="flex-1 flex min-w-0 bg-white dark:bg-slate-900 h-full">
        
        {/* Left: Editor Form */}
        <div className="flex-1 flex flex-col border-r border-slate-200 dark:border-slate-800 h-full overflow-hidden">
          
          {/* Header */}
          <div className="h-14 px-6 flex items-center justify-between border-b border-slate-200 dark:border-slate-800 shrink-0">
            <div className="flex flex-col">
              <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                {editingTemplate.name}
              </h2>
              <div className="flex items-center gap-2">
                 <Badge variant="secondary" className="text-[10px] h-4 px-1">{editingTemplate.category}</Badge>
                 <span className="text-[10px] text-slate-500">{editingTemplate.language}</span>
              </div>
            </div>
            <div className="flex gap-2">
                <Button variant="outline" size="sm" className="h-8"><Save className="w-4 h-4 mr-2" /> Draft</Button>
                <Button size="sm" className="h-8 bg-green-600 hover:bg-green-700 text-white"><Send className="w-4 h-4 mr-2" /> Send Campaign</Button>
            </div>
          </div>

          {/* Form Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <Tabs defaultValue="content" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4 bg-slate-100 dark:bg-slate-800">
                <TabsTrigger value="content">Message Content</TabsTrigger>
                <TabsTrigger value="audience">Target Audience</TabsTrigger>
              </TabsList>

              {/* Edit Content Tab */}
              <TabsContent value="content" className="space-y-6">
                
                {/* Header Config */}
                <div className="space-y-2 p-4 border border-slate-100 dark:border-slate-800 rounded-lg bg-slate-50/50 dark:bg-slate-900">
                  <Label className="text-xs font-bold uppercase text-slate-500">Header</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <Label className="text-xs">Type</Label>
                        <select 
                          className="flex h-9 w-full rounded-md border border-slate-200 bg-white px-3 py-1 text-sm"
                          value={editingTemplate.components.header?.type || "NONE"}
                          onChange={(e) => updateComponent('header', 'type', e.target.value)}
                        >
                          <option value="NONE">None</option>
                          <option value="TEXT">Text</option>
                          <option value="IMAGE">Image</option>
                        </select>
                    </div>
                    {editingTemplate.components.header?.type === 'TEXT' && (
                       <Input 
                         placeholder="Header Text" 
                         value={editingTemplate.components.header?.text || ""} 
                         onChange={(e) => updateComponent('header', 'text', e.target.value)}
                         className="mt-6 h-9"
                       />
                    )}
                    {editingTemplate.components.header?.type === 'IMAGE' && (
                       <Input 
                         placeholder="Image URL" 
                         value={editingTemplate.components.header?.url || ""} 
                         onChange={(e) => updateComponent('header', 'url', e.target.value)}
                         className="mt-6 h-9"
                       />
                    )}
                  </div>
                </div>

                {/* Body Config */}
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase text-slate-500">Body Text</Label>
                  <Textarea 
                    className="min-h-[120px] font-mono text-sm bg-slate-50"
                    placeholder="Enter message text. Use {{1}} for variables."
                    value={editingTemplate.components.body.text}
                    onChange={(e) => updateComponent('body', 'text', e.target.value)}
                  />
                  <p className="text-[10px] text-slate-400">
                    Supports variables like {"{{1}}"}, {"{{2}}"} etc.
                  </p>
                </div>

                {/* Footer Config */}
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase text-slate-500">Footer (Optional)</Label>
                  <Input 
                    className="h-9"
                    placeholder="e.g. Reply STOP to unsubscribe" 
                    value={editingTemplate.components.footer?.text || ""} 
                    onChange={(e) => updateComponent('footer', 'text', e.target.value)}
                  />
                </div>
              </TabsContent>

              {/* Target Audience Tab */}
              <TabsContent value="audience" className="space-y-6">
                <div className="p-5 border border-blue-100 bg-blue-50/50 dark:bg-blue-900/10 dark:border-blue-800 rounded-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
                        <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                        <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">Select Target Group</h4>
                        <p className="text-xs text-slate-500">Linked to your Contact Book</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label>Contact Group</Label>
                    <select 
                      className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-1 text-sm shadow-sm"
                      value={selectedAudience}
                      onChange={(e) => setSelectedAudience(e.target.value)}
                    >
                      {initialGroups.map(g => (
                        <option key={g.id} value={g.id}>{g.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-blue-200/50 pt-4">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Estimated Recipients:</span>
                    <Badge className="bg-blue-600 text-white hover:bg-blue-700 px-3 py-1 text-sm">
                        {audienceCount} Contacts
                    </Badge>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Right: Mobile Preview */}
        <div className="w-[380px] border-l border-slate-200 dark:border-slate-800 hidden xl:block shrink-0 bg-slate-50 dark:bg-slate-950">
           <MobilePreview data={editingTemplate} />
        </div>

      </div>
    </div>
  );
}