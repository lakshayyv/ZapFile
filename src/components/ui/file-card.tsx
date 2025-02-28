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
import { FileType } from "@/lib/types";
import { getDownloadUrl } from "@edgestore/react/utils";
import { useSession } from "next-auth/react";
import { FileModal } from "./file-modal";
import { useEdgeStore } from "@/lib/edgestore";
import { del } from "@/actions/file";
import { toast } from "sonner";
import { mutate } from "swr";
import { useStore } from "@/store/loader";

export function FileCard({ file }: { file: FileType }) {
  const { data: session, status } = useSession();
  const { edgestore } = useEdgeStore();
  const start = useStore((state) => state.start);
  const stop = useStore((state) => state.stop);

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
      const db_response = await del(file.id);
      const store_response = await edgestore.publicFiles.delete({
        url: file.url,
      });
      mutate("/api/files");
      toast.success(db_response.message || "File deleted succcesfully");
    } catch (error: any) {
      console.log(error);
      toast.error(error.message || "Something went wrong");
    } finally {
      stop();
    }
  };

  return (
    <Card className="bg-white/10 backdrop-blur-lg">
      <CardHeader>
        <CardTitle>{file.name}</CardTitle>
        <CardDescription>{file.description}</CardDescription>
      </CardHeader>
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
