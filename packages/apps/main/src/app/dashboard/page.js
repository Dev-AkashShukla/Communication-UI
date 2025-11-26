// src/app/dashboard/page.js
import { redirect } from "next/navigation";

export default function DashboardRoot() {
  // Jaise hi user /dashboard par aaye, use contact-book par bhej do
  redirect("/dashboard/contact-book");
}
