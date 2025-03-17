"use client";

import { GoogleSignin } from "@/actions/user";
import { Boxes } from "@/components/ui/background-box";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { useState } from "react";

export default function Page() {
  return (
    <div className="relative w-full flex items-center justify-center min-h-screen overflow-hidden">
      <Boxes />
      <Card className="relative z-10 w-full max-w-sm shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold">
            Sign in to <span className="text-purple-600">ZapFile</span>
          </CardTitle>
          <CardDescription className="text-center">
            Securely upload, store, and share files with ease. Sign in with your
            Google account to start sharing instantly.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          <Button
            type="button"
            onClick={GoogleSignin}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 flex items-center justify-center gap-2"
          >
            <Image src="/google.svg" alt="Google Logo" width={20} height={20} />
            Sign in with Google
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}