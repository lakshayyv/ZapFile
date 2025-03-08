import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { FileType } from "@/lib/types";
import { getDownloadUrl } from "@edgestore/react/utils";
import { useSession } from "next-auth/react";
import { FileModal } from "./file-modal";
import { useEdgeStore } from "@/lib/edgestore";
import { deleteById } from "@/actions/file";
import { toast } from "sonner";
import { mutate } from "swr";
import { useStore } from "@/store/loader";
import { Check, Copy, Share } from "lucide-react";
import { useState } from "react";

export function FileCard({ file }: { file: FileType }) {
  const { data: session, status } = useSession();
  const { edgestore } = useEdgeStore();
  const start = useStore((state) => state.start);
  const stop = useStore((state) => state.stop);
  const [copied, setCopied] = useState(false);

  const handleDownload = async () => {
    try {
      if (session?.user.public_token === file.public_token) {
        const url = getDownloadUrl(file.url);
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = file.name;
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
      } else {
      }
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  const handleDelete = async () => {
    start();
    try {
      const db_response = await deleteById(file.id);
      const store_response = await edgestore.publicFiles.delete({
        url: file.url,
      });
      mutate("/api/files");
      if (db_response.error) {
        toast.error(db_response.error);
      }
      if (db_response.data) {
        toast.success(db_response.data.message || "File deleted succcesfully");
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      stop();
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        `http://localhost:3000/file?id=${file.id}`
      );
      setCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error("Failed to copy link.");
    }
  };

  return (
    <Card className="bg-white/10 backdrop-blur-lg">
      <div className="flex justify-between items-start pr-5">
        <CardHeader>
          <CardTitle>{file.name}</CardTitle>
          <CardDescription>{file.description}</CardDescription>
        </CardHeader>
        <Popover>
          <PopoverTrigger>
            <div className="bg-black/20 aspect-square w-10 flex justify-center items-center rounded mt-5">
              <Share size={20} />
            </div>
          </PopoverTrigger>
          <PopoverContent
            align="end"
            className="bg-black/20 backdrop-blur-lg rounded-md"
          >
            <div className="flex items-center gap-2">
              <span className="text-sm truncate max-w-[200px]">
                http://localhost:3000/file?id={file.id}
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
          </PopoverContent>
        </Popover>
      </div>

      <CardContent></CardContent>
      <CardFooter className="flex justify-between items-center">
        <Button
          type="button"
          className="bg-red-600 hover:bg-red-700 text-white font-semibold"
          onClick={handleDelete}
        >
          Delete
        </Button>
        {session?.user.public_token === file.public_token ? (
          <Button
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold"
            onClick={handleDownload}
          >
            Download
          </Button>
        ) : (
          <FileModal file={file} />
        )}
      </CardFooter>
    </Card>
  );
}
