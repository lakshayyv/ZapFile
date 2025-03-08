"use client";

import { FileType } from "@/lib/types";
import { comparePasskey, fetcher } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import useSWR from "swr";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getDownloadUrl } from "@edgestore/react/utils";

export default function Page() {
  const [passkey, setPasskey] = useState<string>("");
  const router = useRouter();
  const params = useSearchParams();
  const id = params.get("id");
  const { data: file, error } = useSWR<{ message: string; data: FileType }>(
    `/api/file/${id}`,
    fetcher
  );

  useEffect(() => {
    if (error) {
      toast.error("File doesn't exist");
      router.push("/dashboard");
    }
  }, [error, router]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasskey(e.target.value);
  };

  const handleDownload = () => {
    if (file?.data.passkey) {
      if (comparePasskey(passkey, file?.data.passkey)) {
        const url = getDownloadUrl(file.data.url);
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = file.data.name;
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
        toast.success(`${file.data.name} downloaded`);
      } else {
        toast.error("Incorrect passkey");
      }
    } else {
      toast.error("Something went wrong");
      router.push("/dashboard");
    }
    setPasskey("");
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle
          className="truncate w-full text-purple-600"
          title={file?.data.name}
        >
          <span className="text-white">Download</span>{" "}
          <span>{file?.data.name}</span>
        </CardTitle>
        <CardDescription>{file?.data.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="passkey">Passkey</Label>
              <Input
                id="passkey"
                value={passkey}
                onChange={handleInput}
                placeholder="Enter the secret passkey"
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          type="button"
          onClick={handleDownload}
          className="w-full bg-purple-600 hover:bg-purple-600 text-white font-semibold"
        >
          Download
        </Button>
      </CardFooter>
    </Card>
  );
}
