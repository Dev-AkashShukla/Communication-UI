// apps/whatsaap/src/data/whatsappData.js

// 1. Templates Data
export const dummyTemplates = [
  {
    id: "welcome_offer",
    name: "welcome_offer_v1",
    status: "APPROVED",
    language: "en_US",
    category: "MARKETING",
    components: {
      header: { type: "IMAGE", url: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1000&auto=format&fit=crop" },
      body: { text: "Hello {{1}}, check out our latest summer collection! We have a special discount just for you." },
      footer: { text: "IndiMinds Retail" },
      buttons: [
        { type: "QUICK_REPLY", text: "Shop Now" },
        { type: "QUICK_REPLY", text: "Stop Promotions" }
      ]
    }
  },
  {
    id: "delivery_update",
    name: "order_dispatch",
    status: "APPROVED",
    language: "en_US",
    category: "UTILITY",
    components: {
      header: { type: "TEXT", text: "Order Update" },
      body: { text: "Hi {{1}}, your order #{{2}} has been dispatched. Track your shipment here." },
      footer: { text: "Logistics Team" },
      buttons: [
        { type: "URL", text: "Track Order", url: "https://track.com" }
      ]
    }
  }
];

// 2. Contacts Data (Jo tumne diya tha)
export const dummyContacts = [
  {
    id: 1,
    name: "Akash Shukla",
    phone: "+91 98765 43210",
    whatsapp: "+91 98765 43210",
    email: "akash@indiminds.com",
    group: "Work",
    isFavorite: true,
  },
  {
    id: 2,
    name: "Rahul Sharma",
    phone: "+91 91234 56789",
    whatsapp: "+91 91234 56789",
    email: "rahul.s@techcorp.com",
    group: "Work",
    isFavorite: false,
  },
  {
    id: 3,
    name: "Priya Patel",
    phone: "+91 99887 76655",
    whatsapp: "+91 99887 76655",
    email: "priya.design@creative.com",
    group: "Work",
    isFavorite: true,
  },
  {
    id: 4,
    name: "Amit Verma",
    phone: "+91 88776 65544",
    whatsapp: "+91 88776 65544",
    email: "amit.v@gmail.com",
    group: "Family",
    isFavorite: true,
  },
  {
    id: 5,
    name: "Sneha Gupta",
    phone: "+91 77665 54433",
    whatsapp: "+91 77665 54433",
    email: "sneha.hr@indiminds.com",
    group: "Work",
    isFavorite: false,
  },
  {
    id: 6,
    name: "Vikram Singh",
    phone: "+91 66554 43322",
    whatsapp: "+91 66554 43322",
    email: "vikram@investors.com",
    group: "Work",
    isFavorite: false,
  },
  {
    id: 7,
    name: "Anjali Mehta",
    phone: "+91 55443 32211",
    whatsapp: "+91 55443 32211",
    email: "anjali.m@gmail.com",
    group: "Personal",
    isFavorite: false,
  }
];

// 3. Groups Data (Jo tumne diya tha)
export const initialGroups = [
  { id: "all", name: "All Contacts", type: "system" },
  { id: "favorites", name: "Favorites", type: "system" },
  { id: "Work", name: "Work", type: "custom" },
  { id: "Personal", name: "Personal", type: "custom" },
  { id: "Family", name: "Family", type: "custom" },
];