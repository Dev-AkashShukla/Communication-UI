"use client";

import { ContactsPage } from "@/components/ContactsPage"; // Ensure path is correct

export default function Page() {
  // Ab yahan koi Sidebar nahi hoga, sirf ContactsPage component
  return (
    <div className="h-screen w-full bg-white dark:bg-slate-900">
      <ContactsPage />
    </div>
  );
}