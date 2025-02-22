"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "./theme-provider";
import { Toaster } from "sonner";

export default function Provides({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider attribute="class" defaultTheme="dark">
        <Toaster />
        <div className="p-10">{children}</div>
      </ThemeProvider>
    </SessionProvider>
  );
}
