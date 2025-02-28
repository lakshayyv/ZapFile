"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "./theme-provider";
import { Toaster } from "sonner";
import { EdgeStoreProvider } from "@/lib/edgestore";
import { useStore } from "@/store/loader";
import Loader from "./ui/loader";

export default function Provides({ children }: { children: React.ReactNode }) {
  const isLoading = useStore((state) => state.isLoading);

  return (
    <SessionProvider>
      <ThemeProvider attribute="class" defaultTheme="dark">
        <Toaster />
        {isLoading && <Loader />}
        <EdgeStoreProvider>
          <div className="p-10">{children}</div>
        </EdgeStoreProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
