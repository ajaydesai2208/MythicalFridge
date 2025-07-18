"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { ToastProvider, ToastViewport } from "@/components/ui/toast";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider attribute="class" enableSystem defaultTheme="light">
      <SessionProvider>
        <ToastProvider>
          {children}
          <ToastViewport />
        </ToastProvider>
      </SessionProvider>
    </NextThemesProvider>
  );
}
