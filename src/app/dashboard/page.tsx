"use client";

import { useEffect } from "react";
import useSWR from "swr";
import { FileType } from "@/lib/types";
import { toast } from "sonner";
import { fetcher } from "@/lib/utils";
import FileUpload from "@/components/ui/file-upload";
import { FileCard } from "@/components/ui/file-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import Loader from "@/components/ui/loader";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const {
    data: files,
    error,
    isLoading,
  } = useSWR<{ data: FileType[] }>("/api/files", fetcher);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="grid gap-y-7 xl:gap-y-0 xl:grid-cols-2 gap-x-14">
      <FileUpload />
      <div className="h-[90vh] space-y-5 pb-12">
        <h1 className="text-3xl font-semibold">Files</h1>
        {files?.data && files?.data.length > 0 ? (
          <ScrollArea className="h-full overflow-y-auto border border-gray-700 p-5 rounded-lg grid gap-y-5">
            <div className="space-y-3">
              {files.data.map((file: FileType) => {
                return <FileCard key={file.id} file={file} />;
              })}
            </div>
          </ScrollArea>
        ) : (
          <div>No Files Uploaded.</div>
        )}
      </div>
    </div>
  );
}
