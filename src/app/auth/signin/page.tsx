"use client";

import { GoogleSignin } from "@/actions/user";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <div>
      <h1 className="text-4xl">
        Sign in to <span className="text-purple-600">ZapFile</span>
      </h1>
      <Button
        type="button"
        onClick={GoogleSignin}
        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold"
      >
        Sign in
      </Button>
    </div>
  );
}
