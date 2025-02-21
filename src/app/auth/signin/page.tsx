"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

export default function Page() {

  const handleClick = async () => {
    try {
      await signIn("google", { callbackUrl: "/dashboard", redirect: true });
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div>
      <h1 className="text-4xl">
        Sign in to <span className="text-purple-600">ZapFile</span>
      </h1>
      <Button
        type="button"
        onClick={handleClick}
        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold"
      >
        Sign in
      </Button>
    </div>
  );
}
