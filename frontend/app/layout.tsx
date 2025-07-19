import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SessionProvider } from "next-auth/react";
import NavBar from "@/components/NavBar";

export const metadata: Metadata = {
  title: {
    template: "%s | Mythical Fridge",
    default: "Mythical Fridge",
  },
  description: "Generate magical recipes from the ingredients in your fridge.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={GeistSans.className}>
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <NavBar />
            <main>{children}</main>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}