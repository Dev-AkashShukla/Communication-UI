"use client";

import { useState, useMemo } from "react";
import { ContactSidebar } from "./ContactSidebar";
import { ContactList } from "./ContactList";
import { ContactDetails } from "./ContactDetails";
import { ContactForm } from "./ContactForm";
import { dummyContacts, initialGroups } from "@/data/dummyData";

const initialFormData = {
  name: "",
  phone: "",
  whatsapp: "",
  email: "",
  telegram: "",
  instagram: "",
  group: "Personal",
  address: "",
  notes: "",
  isSameNum: true,
};

export function ContactsPage() {
  const [contacts, setContacts] = useState(dummyContacts);
  const [groups, setGroups] = useState(initialGroups);
  const [selectedContactId, setSelectedContactId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  
  const [selectedGroup, setSelectedGroup] = useState("all");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  const [formData, setFormData] = useState(initialFormData);

  // Filter Logic
  const filteredContacts = useMemo(() => {
    return contacts.filter((contact) => {
      const matchesSearch =
        contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.phone.includes(searchQuery);
      
      let matchesGroup = true;
      if (selectedGroup === "favorites") matchesGroup = contact.isFavorite;
      else if (selectedGroup !== "all") matchesGroup = contact.group === selectedGroup;

      return matchesSearch && matchesGroup;
    });
  }, [contacts, searchQuery, selectedGroup]);

  const selectedContact = useMemo(() => 
    contacts.find((c) => c.id === selectedContactId), 
  [contacts, selectedContactId]);

  // Handlers
  const handleSelectContact = (id) => {
    setSelectedContactId(id);
    setIsEditing(false);
  };

  const handleAddNew = () => {
    setSelectedContactId(null);
    setIsEditing(false);
    setFormData(initialFormData);
  };

  const handleCreateGroup = (newGroupName) => {
    if (!groups.find(g => g.name === newGroupName)) {
      setGroups([...groups, { id: newGroupName, name: newGroupName, type: "custom" }]);
    }
  };

  const handleSaveContact = (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      whatsapp: formData.isSameNum ? formData.phone : formData.whatsapp,
    };

    if (isEditing && selectedContactId) {
      setContacts(contacts.map(c => c.id === selectedContactId ? { ...c, ...payload } : c));
      setIsEditing(false);
    } else {
      const newContact = { id: Date.now(), ...payload, isFavorite: false, chats: [] };
      setContacts([...contacts, newContact]);
      setSelectedContactId(newContact.id);
    }
    setFormData(initialFormData);
  };

  const handleEditInit = (contact) => {
    setIsEditing(true);
    setFormData({
      ...contact,
      isSameNum: contact.phone === contact.whatsapp
    });
  };

  const handleDelete = (id) => {
    setContacts(contacts.filter(c => c.id !== id));
    setSelectedContactId(null);
  };

  const handleToggleFavorite = (id) => {
    setContacts(contacts.map(c => c.id === id ? { ...c, isFavorite: !c.isFavorite } : c));
  };

  const showForm = !selectedContactId || isEditing;

  return (
    <div className="flex h-full w-full overflow-hidden bg-slate-50 dark:bg-slate-950">
      <ContactSidebar
        groups={groups}
        selectedGroup={selectedGroup}
        onGroupChange={setSelectedGroup}
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        onAddGroup={handleCreateGroup}
        // Removed onNewContact from here
      />

      <ContactList
        contacts={filteredContacts}
        selectedContactId={selectedContactId}
        onSelectContact={handleSelectContact}
        groupName={groups.find(g => g.id === selectedGroup)?.name || "Contacts"}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        // Added onNewContact here
        onNewContact={handleAddNew}
      />

      <div className="flex-1 min-w-0 bg-white dark:bg-slate-900 h-full">
        {showForm ? (
          <ContactForm
            formData={formData}
            groups={groups.filter(g => g.type === "custom")}
            onChange={setFormData}
            onSubmit={handleSaveContact}
            onCancel={() => {
              setIsEditing(false);
              if (!selectedContactId) setFormData(initialFormData);
            }}
            isEditing={isEditing}
          />
        ) : (
          <ContactDetails
            contact={selectedContact}
            onEdit={handleEditInit}
            onDelete={handleDelete}
            onToggleFavorite={handleToggleFavorite}
          />
        )}
      </div>
    </div>
  );
}