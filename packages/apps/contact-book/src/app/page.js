"use client";

import { useState } from "react";
import {
  Button,
  Input,
  Label,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Avatar,
  AvatarFallback,
  Badge,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Separator,
  Textarea,
} from "@indi-com/ui";
import {
  User,
  MessageCircle,
  Send,
  Smartphone,
  Search,
  Plus,
  Star,
  Mail,
  MapPin,
  FileText,
  Edit2,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { ResizablePanel } from "@/components/ResizablePanel";
import { dummyContacts } from "@/data/dummyContacts";

const groups = [
  { id: "all", name: "All Contacts", icon: User },
  { id: "favorites", name: "Favorites", icon: Star },
  { id: "work", name: "Work", icon: User },
  { id: "personal", name: "Personal", icon: User },
  { id: "family", name: "Family", icon: User },
];

const mainMenuItems = [
  { id: "master", name: "Master", icon: User },
  { id: "whatsapp", name: "WhatsApp", icon: MessageCircle },
  { id: "telegram", name: "Telegram", icon: Send },
  { id: "sms", name: "SMS", icon: Smartphone },
];

export default function ContactBookPage() {
  const [contacts, setContacts] = useState(dummyContacts);
  const [selectedContactId, setSelectedContactId] = useState(null);
  const [editingContact, setEditingContact] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState("all");
  const [selectedMenu, setSelectedMenu] = useState("master");
  const [mainSidebarCollapsed, setMainSidebarCollapsed] = useState(false);
  const [contactSidebarCollapsed, setContactSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    group: "Personal",
    address: "",
    notes: "",
  });

  // Filtered contacts
  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch =
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.phone.includes(searchQuery);
    const matchesGroup =
      selectedGroup === "all" ||
      (selectedGroup === "favorites" && contact.isFavorite) ||
      contact.group.toLowerCase() === selectedGroup;
    return matchesSearch && matchesGroup;
  });

  const selectedContact = contacts.find((c) => c.id === selectedContactId);

  // CRUD Operations
  const handleCreateContact = (e) => {
    e.preventDefault();
    const newContact = {
      id: Date.now(),
      ...formData,
      isFavorite: false,
    };
    setContacts([...contacts, newContact]);
    resetForm();
  };

  const handleUpdateContact = (e) => {
    e.preventDefault();
    setContacts(
      contacts.map((c) =>
        c.id === editingContact.id ? { ...editingContact, ...formData } : c
      )
    );
    setEditingContact(null);
    setSelectedContactId(editingContact.id);
    resetForm();
  };

  const handleDeleteContact = (id) => {
    if (confirm("Are you sure you want to delete this contact?")) {
      setContacts(contacts.filter((c) => c.id !== id));
      setSelectedContactId(null);
    }
  };

  const toggleFavorite = (id) => {
    setContacts(
      contacts.map((c) => (c.id === id ? { ...c, isFavorite: !c.isFavorite } : c))
    );
  };

  const resetForm = () => {
    setFormData({
      name: "",
      phone: "",
      email: "",
      group: "Personal",
      address: "",
      notes: "",
    });
  };

  const startEdit = (contact) => {
    setEditingContact(contact);
    setFormData({
      name: contact.name,
      phone: contact.phone,
      email: contact.email || "",
      group: contact.group,
      address: contact.address || "",
      notes: contact.notes || "",
    });
    setSelectedContactId(null);
  };

  const cancelEdit = () => {
    setEditingContact(null);
    resetForm();
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const groupCounts = {
    all: contacts.length,
    favorites: contacts.filter((c) => c.isFavorite).length,
    work: contacts.filter((c) => c.group === "Work").length,
    personal: contacts.filter((c) => c.group === "Personal").length,
    family: contacts.filter((c) => c.group === "Family").length,
  };

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950">
      {/* 1. MAIN SIDEBAR (Left - Icons) */}
      <div
        className={`flex flex-col bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-all duration-300 ${
          mainSidebarCollapsed ? "w-16" : "w-20"
        }`}
      >
        {/* Logo/Header */}
        <div className="flex items-center justify-center h-16 border-b border-slate-200 dark:border-slate-800">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">CB</span>
          </div>
        </div>

        {/* Menu Items */}
        <div className="flex-1 py-4 space-y-2 px-3">
          {mainMenuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedMenu(item.id)}
                className={`w-full aspect-square rounded-lg flex flex-col items-center justify-center gap-1 transition-all ${
                  selectedMenu === item.id
                    ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
                title={item.name}
              >
                <Icon className="w-5 h-5" />
                {!mainSidebarCollapsed && (
                  <span className="text-[10px] font-medium">{item.name}</span>
                )}
              </button>
            );
          })}
        </div>

        {/* User Avatar */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <Avatar className="w-10 h-10 cursor-pointer">
            <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white">
              AK
            </AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* 2. CONTACT SIDEBAR (Groups) */}
      <div
        className={`flex flex-col bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-all duration-300 ${
          contactSidebarCollapsed ? "w-0 overflow-hidden" : "w-64"
        }`}
      >
        {/* Header */}
        <div className="h-16 px-4 flex items-center justify-between border-b border-slate-200 dark:border-slate-800">
          <h2 className="font-semibold text-lg">Contacts</h2>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setContactSidebarCollapsed(!contactSidebarCollapsed)}
          >
            {contactSidebarCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </Button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search contacts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        {/* New Contact Button */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800">
          <Button
            className="w-full"
            onClick={() => {
              setEditingContact(null);
              setSelectedContactId(null);
              resetForm();
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            New Contact
          </Button>
        </div>

        {/* Groups */}
        <div className="flex-1 overflow-y-auto p-2">
          <div className="space-y-1">
            {groups.map((group) => {
              const Icon = group.icon;
              return (
                <button
                  key={group.id}
                  onClick={() => setSelectedGroup(group.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all ${
                    selectedGroup === group.id
                      ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                      : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span className="font-medium">{group.name}</span>
                  </div>
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    {groupCounts[group.id]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* New Group Button */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <Button variant="outline" className="w-full" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            New Group
          </Button>
        </div>
      </div>

      {/* 3. CONTACT LIST (Resizable) */}
      <ResizablePanel minWidth={250} maxWidth={500} defaultWidth={350}>
        <div className="h-full flex flex-col bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800">
          {/* Header */}
          <div className="h-16 px-4 flex items-center justify-between border-b border-slate-200 dark:border-slate-800">
            <div>
              <h3 className="font-semibold">
                {groups.find((g) => g.id === selectedGroup)?.name || "All Contacts"}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {filteredContacts.length} contacts
              </p>
            </div>
          </div>

          {/* Contact Cards */}
          <div className="flex-1 overflow-y-auto p-2">
            {filteredContacts.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-slate-500 dark:text-slate-400">
                <User className="w-12 h-12 mb-2 opacity-50" />
                <p>No contacts found</p>
              </div>
            ) : (
              <div className="space-y-2">
                {filteredContacts.map((contact) => (
                  <Card
                    key={contact.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedContactId === contact.id
                        ? "ring-2 ring-blue-500 dark:ring-blue-400"
                        : ""
                    }`}
                    onClick={() => {
                      setSelectedContactId(contact.id);
                      setEditingContact(null);
                    }}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Avatar className="w-12 h-12">
                          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                            {getInitials(contact.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold truncate">{contact.name}</h4>
                            {contact.isFavorite && (
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 flex-shrink-0" />
                            )}
                          </div>
                          <p className="text-sm text-slate-600 dark:text-slate-400 truncate">
                            {contact.phone}
                          </p>
                          {contact.email && (
                            <p className="text-xs text-slate-500 dark:text-slate-500 truncate">
                              {contact.email}
                            </p>
                          )}
                          <Badge variant="outline" className="mt-2 text-xs">
                            {contact.group}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </ResizablePanel>

      {/* 4. RIGHT PANEL (Details or Form) */}
      <div className="flex-1 bg-white dark:bg-slate-900 overflow-y-auto">
        {editingContact || (!selectedContactId && !editingContact) ? (
          // CONTACT FORM (Create or Edit)
          <div className="h-full flex flex-col">
            <div className="h-16 px-6 flex items-center justify-between border-b border-slate-200 dark:border-slate-800">
              <h2 className="text-xl font-semibold">
                {editingContact ? "Edit Contact" : "New Contact"}
              </h2>
              {editingContact && (
                <Button variant="ghost" onClick={cancelEdit}>
                  Cancel
                </Button>
              )}
            </div>
            <div className="flex-1 p-6 overflow-y-auto">
              <form
                onSubmit={editingContact ? handleUpdateContact : handleCreateContact}
                className="max-w-2xl space-y-6"
              >
                <div className="space-y-2">
                  <Label htmlFor="name">
                    Full Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">
                    Phone Number <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="phone"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="group">Group</Label>
                  <select
                    id="group"
                    value={formData.group}
                    onChange={(e) => setFormData({ ...formData, group: e.target.value })}
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  >
                    <option value="Personal">Personal</option>
                    <option value="Work">Work</option>
                    <option value="Family">Family</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    placeholder="Enter full address..."
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Add notes about this contact..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    rows={4}
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button type="submit" className="flex-1">
                    {editingContact ? "Update Contact" : "Create Contact"}
                  </Button>
                  {!editingContact && (
                    <Button type="button" variant="outline" onClick={resetForm}>
                      Reset
                    </Button>
                  )}
                </div>
              </form>
            </div>
          </div>
        ) : selectedContact ? (
          // CONTACT DETAILS
          <div className="h-full flex flex-col">
            {/* Header with Actions */}
            <div className="h-16 px-6 flex items-center justify-between border-b border-slate-200 dark:border-slate-800">
              <h2 className="text-xl font-semibold">Contact Details</h2>
              <div className="flex gap-2">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => toggleFavorite(selectedContact.id)}
                >
                  <Star
                    className={`w-5 h-5 ${
                      selectedContact.isFavorite
                        ? "fill-yellow-400 text-yellow-400"
                        : ""
                    }`}
                  />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => startEdit(selectedContact)}
                >
                  <Edit2 className="w-5 h-5" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => handleDeleteContact(selectedContact.id)}
                >
                  <Trash2 className="w-5 h-5 text-red-500" />
                </Button>
              </div>
            </div>

            {/* Contact Info */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-6">
                {/* Avatar and Name */}
                <div className="flex flex-col items-center mb-8">
                  <Avatar className="w-24 h-24 mb-4">
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-2xl">
                      {getInitials(selectedContact.name)}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="text-2xl font-bold mb-1">{selectedContact.name}</h3>
                  <Badge variant="outline">{selectedContact.group}</Badge>
                </div>

                <Separator className="my-6" />

                {/* Tabs */}
                <Tabs defaultValue="info" className="w-full">
                  <TabsList className="w-full grid grid-cols-4">
                    <TabsTrigger value="info">Info</TabsTrigger>
                    <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
                    <TabsTrigger value="sms">SMS</TabsTrigger>
                    <TabsTrigger value="telegram">Telegram</TabsTrigger>
                  </TabsList>

                  {/* Info Tab */}
                  <TabsContent value="info" className="space-y-6 pt-4">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Smartphone className="w-5 h-5 text-slate-500 mt-0.5" />
                        <div className="flex-1">
                          <p className="text-sm text-slate-500 dark:text-slate-400">Phone</p>
                          <p className="font-medium">{selectedContact.phone}</p>
                        </div>
                      </div>

                      {selectedContact.email && (
                        <div className="flex items-start gap-3">
                          <Mail className="w-5 h-5 text-slate-500 mt-0.5" />
                          <div className="flex-1">
                            <p className="text-sm text-slate-500 dark:text-slate-400">Email</p>
                            <p className="font-medium">{selectedContact.email}</p>
                          </div>
                        </div>
                      )}

                      {selectedContact.address && (
                        <div className="flex items-start gap-3">
                          <MapPin className="w-5 h-5 text-slate-500 mt-0.5" />
                          <div className="flex-1">
                            <p className="text-sm text-slate-500 dark:text-slate-400">Address</p>
                            <p className="font-medium">{selectedContact.address}</p>
                          </div>
                        </div>
                      )}

                      {selectedContact.notes && (
                        <div className="flex items-start gap-3">
                          <FileText className="w-5 h-5 text-slate-500 mt-0.5" />
                          <div className="flex-1">
                            <p className="text-sm text-slate-500 dark:text-slate-400">Notes</p>
                            <p className="font-medium">{selectedContact.notes}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  {/* WhatsApp Tab */}
                  <TabsContent value="whatsapp" className="pt-4">
                    <div className="text-center py-12">
                      <MessageCircle className="w-16 h-16 mx-auto mb-4 text-slate-300" />
                      <h3 className="text-lg font-semibold mb-2">WhatsApp Integration</h3>
                      <p className="text-slate-500 dark:text-slate-400 mb-4">
                        Connect WhatsApp to see chat history and send messages
                      </p>
                      <Button>Connect WhatsApp</Button>
                    </div>
                  </TabsContent>

                  {/* SMS Tab */}
                  <TabsContent value="sms" className="pt-4">
                    <div className="text-center py-12">
                      <Smartphone className="w-16 h-16 mx-auto mb-4 text-slate-300" />
                      <h3 className="text-lg font-semibold mb-2">SMS Integration</h3>
                      <p className="text-slate-500 dark:text-slate-400 mb-4">
                        Send SMS directly from the contact book
                      </p>
                      <Button>Send SMS</Button>
                    </div>
                  </TabsContent>

                  {/* Telegram Tab */}
                  <TabsContent value="telegram" className="pt-4">
                    <div className="text-center py-12">
                      <Send className="w-16 h-16 mx-auto mb-4 text-slate-300" />
                      <h3 className="text-lg font-semibold mb-2">Telegram Integration</h3>
                      <p className="text-slate-500 dark:text-slate-400 mb-4">
                        Connect Telegram to see messages and send directly
                      </p>
                      <Button>Connect Telegram</Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        ) : (
          // NO CONTACT SELECTED
          <div className="h-full flex items-center justify-center text-slate-500 dark:text-slate-400">
            <div className="text-center">
              <User className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium">No contact selected</p>
              <p className="text-sm">Select a contact to view details</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
