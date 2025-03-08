"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "./theme-provider";
import { Toaster } from "sonner";
import { EdgeStoreProvider } from "@/lib/edgestore";
import { useStore } from "@/store/loader";
import Loader from "./ui/loader";
import Navbar from "./ui/navbar";

export default function Provides({ children }: { children: React.ReactNode }) {
  const isLoading = useStore((state) => state.isLoading);

  return (
    <SessionProvider>
      <ThemeProvider attribute="class" defaultTheme="dark">
        <Toaster />
        {isLoading && <Loader />}
        <EdgeStoreProvider>
          <Navbar />
          <div className="p-10">{children}</div>
        </EdgeStoreProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
