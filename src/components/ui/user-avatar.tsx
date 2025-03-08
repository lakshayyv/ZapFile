import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { User } from "next-auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Check, ChevronDown, Copy } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "./button";
import { logout } from "@/actions/user";

export default function UserAvatar({ user }: { user: User }) {
  const [copied, setCopied] = useState(false);

  const handleLogout = async () => {
    const response = await logout();
    if (response.error) {
      toast.error(response.error);
    }
    if (response.data) {
      toast.success(response.data);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(user.public_token);
      setCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error("Failed to copy link.");
    }
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex justify-center items-center gap-x-1">
          <Avatar>
            <AvatarImage src={user.image || ""} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <ChevronDown />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-0">
            <h4 className="font-medium leading-none">{user.name}</h4>
            <div className="flex justify-start items-center text-sm text-muted-foreground">
              Public ID:&nbsp;
              <div className="flex items-center gap-2">
                <span className="text-sm truncate max-w-[170px]">
                  {user.public_token}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleCopy}
                  className="hover:bg-gray-700"
                >
                  {copied ? (
                    <Check size={18} className="text-green-500" />
                  ) : (
                    <Copy size={18} />
                  )}
                </Button>
              </div>
            </div>
          </div>
          <div className="grid gap-2">
            <Button className="text-red-600 font-bold" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
