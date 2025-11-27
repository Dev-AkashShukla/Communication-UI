"use client";

import { 
  Button, 
  Avatar, 
  AvatarFallback, 
  Badge, 
  Tabs, 
  TabsList, 
  TabsTrigger, 
  TabsContent,
  // Make sure to export these from your UI library or import from components/ui/alert-dialog
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@indi-com/ui";

import { Star, Edit2, Trash2, Smartphone, Mail, MapPin, Send, MessageCircle, Instagram, Phone } from "lucide-react";

function getInitials(name) {
  return name ? name.substring(0, 2).toUpperCase() : "NA";
}

export function ContactDetails({ contact, onEdit, onDelete, onToggleFavorite }) {
  if (!contact) return null;

  return (
    <div className="h-full flex flex-col bg-white dark:bg-slate-900">
      
      {/* Header */}
      <div className="h-14 px-6 flex items-center justify-between border-b border-slate-200 dark:border-slate-800 shrink-0">
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">Contact Details</span>
          <Badge variant="secondary" className="text-[10px] font-medium px-2 py-0 h-5 bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
            {contact.group}
          </Badge>
        </div>
        <div className="flex gap-1">
          <Button size="icon" variant="ghost" onClick={() => onToggleFavorite(contact.id)} className="h-8 w-8">
            <Star className={`w-4 h-4 ${contact.isFavorite ? "fill-yellow-400 text-yellow-400" : "text-slate-400"}`} />
          </Button>
          <Button size="icon" variant="ghost" onClick={() => onEdit(contact)} className="h-8 w-8">
            <Edit2 className="w-4 h-4 text-slate-600 dark:text-slate-400" />
          </Button>
          
          {/* Shadcn Alert Dialog for Delete */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button size="icon" variant="ghost" className="h-8 w-8 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20">
                <Trash2 className="w-4 h-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete 
                  <span className="font-bold text-slate-900 dark:text-slate-100"> {contact.name} </span>
                  from your contact list.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction 
                  onClick={() => onDelete(contact.id)} 
                  className="bg-red-600 hover:bg-red-700 text-white focus:ring-red-600"
                >
                  Delete Contact
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

        </div>
      </div>

      {/* Profile Banner */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-8 flex flex-col items-center bg-slate-50/50 dark:bg-slate-950/50 border-b border-slate-100 dark:border-slate-800">
          <Avatar className="w-24 h-24 mb-4 ring-4 ring-white dark:ring-slate-800 shadow-sm">
            <AvatarFallback className="bg-slate-900 text-white text-2xl font-light">
              {getInitials(contact.name)}
            </AvatarFallback>
          </Avatar>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">{contact.name}</h2>
          <p className="text-slate-500 text-sm mt-1">{contact.notes || "No status"}</p>
          
          <div className="flex gap-4 mt-6">
             <ActionButton icon={MessageCircle} label="WhatsApp" color="text-green-600 bg-green-50 hover:bg-green-100 dark:bg-green-900/20 dark:hover:bg-green-900/30" />
             <ActionButton icon={Phone} label="Call" color="text-blue-600 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/30" />
             <ActionButton icon={Mail} label="Email" color="text-slate-600 bg-slate-100 hover:bg-slate-200 dark:text-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700" />
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="info" className="w-full">
          <div className="px-6 border-b border-slate-200 dark:border-slate-800">
            <TabsList className="w-full justify-start h-11 bg-transparent p-0 gap-8">
              <TabItem value="info" label="Overview" />
              <TabItem value="whatsapp" label="WhatsApp" />
              <TabItem value="social" label="Socials" />
            </TabsList>
          </div>

          <div className="bg-white dark:bg-slate-900">
            <TabsContent value="info" className="p-6 space-y-6 mt-0 animate-in fade-in-50">
               <Section title="Contact Info">
                 <InfoRow icon={Smartphone} label="Mobile" value={contact.phone} />
                 <InfoRow icon={MessageCircle} label="WhatsApp" value={contact.whatsapp} />
                 <InfoRow icon={Mail} label="Email" value={contact.email} />
                 <InfoRow icon={MapPin} label="Address" value={contact.address} />
               </Section>
            </TabsContent>

            <TabsContent value="whatsapp" className="h-[400px] mt-0">
               <ChatInterface contact={contact} />
            </TabsContent>

            <TabsContent value="social" className="p-6 mt-0">
               <Section title="Social Profiles">
                 <InfoRow icon={Send} label="Telegram" value={contact.telegram || "Not connected"} />
                 <InfoRow icon={Instagram} label="Instagram" value={contact.instagram || "Not connected"} />
               </Section>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}

// Sub-components
function ActionButton({ icon: Icon, color }) {
  return <button className={`p-3 rounded-full transition-colors ${color}`}><Icon className="w-5 h-5" /></button>
}

function TabItem({ value, label }) {
  return (
    <TabsTrigger 
      value={value} 
      className="rounded-none border-b-2 border-transparent data-[state=active]:border-slate-900 dark:data-[state=active]:border-slate-100 px-0 py-3 text-sm text-slate-500 data-[state=active]:text-slate-900 dark:data-[state=active]:text-slate-100 font-medium transition-none"
    >
      {label}
    </TabsTrigger>
  )
}

function Section({ title, children }) {
  return (
    <div className="bg-white dark:bg-slate-950 p-5 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm">
      <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-4">{title}</h3>
      <div className="space-y-4">{children}</div>
    </div>
  )
}

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-8 h-8 rounded-md bg-slate-50 dark:bg-slate-800 flex items-center justify-center shrink-0">
        <Icon className="w-4 h-4 text-slate-500 dark:text-slate-400" />
      </div>
      <div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-0.5">{label}</p>
        <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{value || "--"}</p>
      </div>
    </div>
  )
}

function ChatInterface({ contact }) {
  return (
    <div className="flex flex-col h-full bg-[#EFEAE2] dark:bg-slate-950">
      <div className="flex-1 overflow-y-auto p-4 flex flex-col items-center justify-center text-slate-400">
        <MessageCircle className="w-10 h-10 mb-2 opacity-20" />
        <p className="text-xs">Chat history with {contact.name}</p>
      </div>
      <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex gap-2">
        <input className="flex-1 bg-slate-100 dark:bg-slate-800 dark:text-slate-200 rounded-full px-4 py-2 text-sm focus:outline-none" placeholder="Type a message..." />
        <Button size="icon" className="rounded-full h-9 w-9 bg-slate-900"><Send className="w-4 h-4" /></Button>
      </div>
    </div>
  )
}