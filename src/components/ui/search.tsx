"use client";

import * as React from "react";

import {
  CommandDialog,
  // CommandEmpty,
  // CommandGroup,
  CommandInput,
  // CommandItem,
  // CommandList,
} from "@/components/ui/command";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Search() {
  const [open, setOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const router = useRouter();
  const { data: session, status } = useSession();
  const [value, setValue] = React.useState<string | undefined>("file"); // Default value

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
      if (e.key === "Enter" && open && searchTerm) {
        e.preventDefault();
        setOpen(false);
        router.push(`/${value === "File" ? "file" : "files"}?id=${searchTerm}`);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [searchTerm, router, open, value]);

  // const handleLogout = async () => {
  //   const response = await logout();
  //   if (response.error) {
  //     toast.error(response.error);
  //   }
  //   if (response.data) {
  //     toast.success(response.data);
  //   }
  // };

  return (
    <>
      <div
        className="w-full xl:w-1/4 p-2 pl-4 text-white bg-gray-800 rounded-lg cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <div className="flex items-center justify-between">
          <h1 className="text-gray-500">Search...</h1>
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-black px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            <span className="text-sm">⌘K</span>
          </kbd>
        </div>
      </div>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <DialogTitle className="sr-only">Search Dialog</DialogTitle>
        <div className="flex items-center gap-2 p-3">
          <Select value={value} onValueChange={(val) => setValue(val)}>
            <SelectTrigger className="w-[100px] outline-none ring-0">
              <SelectValue>{value || "Select"}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="File">File</SelectItem>
                <SelectItem value="User">User</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <CommandInput
            placeholder={`Type a ${value || "file"} id`}
            value={searchTerm}
            onValueChange={(val) => setSearchTerm(val)}
          />
        </div>
        {/* {status === "authenticated" && (
          <CommandList>
            <CommandGroup heading="Actions">
              <CommandItem onClick={handleLogout}>
                <LogOut />
                <span>Logout</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        )} */}
      </CommandDialog>
    </>
  );
}
