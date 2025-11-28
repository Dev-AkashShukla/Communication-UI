// src/app/layout.js
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import FrameGuard from "../components/FrameGuard";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Contact Book | Indi Com",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* GALTI YAHAN THI: Yahan pehle {children} likha tha jo direct show ho raha tha */}
        
        {/* Sirf FrameGuard ke andar children hone chahiye */}
        <FrameGuard>
          {children}
        </FrameGuard>
      </body>
    </html>
  );
}