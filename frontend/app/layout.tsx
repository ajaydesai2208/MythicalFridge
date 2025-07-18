// app/layout.tsx
import "@/app/globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import NavBar from "../components/NavBar/NavBar";
import { Providers } from "@/components/Providers" // ← add this


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "VirtualFridge",
  description: "Your fridge but better.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        <Providers>
        <NavBar />
        <main className="flex-1">{children}</main>
        </Providers>
      </body>
    </html>
  )
}
