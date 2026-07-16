import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import FloatingContact from "@/components/FloatingContact";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Om Dealer Centering Materials - Premium Scaffolding & Formwork",
  description: "High-quality centering materials supplying for your construction needs. Modern, reliable, and premium equipment.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-background text-foreground">
        {children}
        <FloatingContact />
      </body>
    </html>
  );
}
