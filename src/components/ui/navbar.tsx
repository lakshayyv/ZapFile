"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { Input } from "./input";
import { useSession } from "next-auth/react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { DialogTitle, DialogTrigger } from "@radix-ui/react-dialog";
import UserAvatar from "./user-avatar";
import { redirect, useRouter } from "next/navigation";
import { toast } from "sonner";
import Search from "./search";

export default function Navbar() {
  const [search, setSearch] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { data: session } = useSession();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen(true);
        setTimeout(() => searchInputRef.current?.focus(), 100);
      }
      if (e.key === "Escape") {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <nav className="flex items-center justify-between gap-x-5 p-4 px-10 bg-black text-white">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/dashboard" className="text-xl font-bold">
              ZAP<span className="text-purple-600">FILE</span>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <div className="w-full" />
      {session?.user && (
        <>
          {" "}
          <div
            className="w-1/4 p-2 pl-4 text-white bg-gray-800 rounded-lg"
            onClick={() => setIsSearchOpen(true)}
          >
            <div className="flex items-center justify-between">
              <h1 className="text-gray-500">Search...</h1>
              <div className="flex items-center justify-center w-10 h-6 p-1 bg-black text-xs text-gray-300 rounded">
                ⌘ K
              </div>
            </div>
          </div>
          <UserAvatar user={session?.user} />
        </>
      )}
      {/* <Search open={isSearchOpen} onOpenChange={setIsSearchOpen} /> */}
    </nav>
  );
}
