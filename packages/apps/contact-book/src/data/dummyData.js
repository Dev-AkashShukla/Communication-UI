export const dummyContacts = [
  {
    id: 1,
    name: "Akash Shukla",
    phone: "+91 98765 43210",
    whatsapp: "+91 98765 43210",
    email: "akash@indiminds.com",
    telegram: "@akash_dev",
    instagram: "@akash_ig",
    group: "Work",
    isFavorite: true,
    address: "Kolkata, WB",
    notes: "CEO & Lead Developer",
    chats: [
      { id: 1, sender: "user", text: "Hi Akash, have you reviewed the latest deployment?", time: "10:30 AM" },
      { id: 2, sender: "me", text: "Yes, the build is stable. We are good to go.", time: "10:32 AM" },
      { id: 3, sender: "user", text: "Great, let's notify the stakeholders.", time: "10:33 AM" },
    ]
  },
  {
    id: 2,
    name: "Rahul Sharma",
    phone: "+91 91234 56789",
    whatsapp: "+91 91234 56789",
    email: "rahul.s@techcorp.com",
    telegram: "@rahul_marketing",
    instagram: "@rahul_clicks",
    group: "Work",
    isFavorite: false,
    address: "Mumbai, MH",
    notes: "Marketing Head",
    chats: [
      { id: 1, sender: "user", text: "Can we reschedule the marketing sync?", time: "2:00 PM" },
      { id: 2, sender: "me", text: "Sure, how about 4 PM?", time: "2:15 PM" },
    ]
  },
  {
    id: 3,
    name: "Priya Patel",
    phone: "+91 99887 76655",
    whatsapp: "+91 99887 76655",
    email: "priya.design@creative.com",
    telegram: "@priya_ui",
    instagram: "@priya_art",
    group: "Work",
    isFavorite: true,
    address: "Bangalore, KA",
    notes: "Senior UI/UX Designer",
    chats: []
  },
  {
    id: 4,
    name: "Amit Verma",
    phone: "+91 88776 65544",
    whatsapp: "+91 88776 65544",
    email: "amit.v@gmail.com",
    telegram: "",
    instagram: "@amit_vlogs",
    group: "Family",
    isFavorite: true,
    address: "Delhi, DL",
    notes: "Elder Brother",
    chats: [
      { id: 1, sender: "user", text: "Reached home safely?", time: "9:00 PM" },
      { id: 2, sender: "me", text: "Yes, just entered.", time: "9:05 PM" },
    ]
  },
  {
    id: 5,
    name: "Sneha Gupta",
    phone: "+91 77665 54433",
    whatsapp: "+91 77665 54433",
    email: "sneha.hr@indiminds.com",
    telegram: "@sneha_hr",
    instagram: "",
    group: "Work",
    isFavorite: false,
    address: "Pune, MH",
    notes: "HR Manager",
    chats: []
  },
  {
    id: 6,
    name: "Vikram Singh",
    phone: "+91 66554 43322",
    whatsapp: "+91 66554 43322",
    email: "vikram@investors.com",
    telegram: "@vikram_vc",
    instagram: "",
    group: "Work",
    isFavorite: false,
    address: "Gurgaon, HR",
    notes: "Angel Investor",
    chats: [
      { id: 1, sender: "me", text: "Sending the quarterly report in 5 mins.", time: "11:00 AM" },
      { id: 2, sender: "user", text: "Received. Looks promising.", time: "11:15 AM" },
    ]
  },
  {
    id: 7,
    name: "Anjali Mehta",
    phone: "+91 55443 32211",
    whatsapp: "+91 55443 32211",
    email: "anjali.m@gmail.com",
    telegram: "",
    instagram: "@anjali_m",
    group: "Personal",
    isFavorite: false,
    address: "Jaipur, RJ",
    notes: "College Batchmate",
    chats: []
  }
];

export const initialGroups = [
  { id: "all", name: "All Contacts", type: "system" },
  { id: "favorites", name: "Favorites", type: "system" },
  { id: "Work", name: "Work", type: "custom" },
  { id: "Personal", name: "Personal", type: "custom" },
  { id: "Family", name: "Family", type: "custom" },
];