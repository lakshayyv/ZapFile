"use client";

import { useEffect } from "react";
import useSWR from "swr";
import { FileType } from "@/lib/types";
import { toast } from "sonner";
import { fetcher } from "@/lib/utils";
import { FileCard } from "@/components/ui/file-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import Loader from "@/components/ui/loader";
import { useRouter, useSearchParams } from "next/navigation";

export default function FileList() {
  const router = useRouter();
  const params = useSearchParams();
  const id = params.get("id");
  
  const {
    data: files,
    error,
    isLoading,
  } = useSWR<{ message: string; data: FileType[] }>(
    id ? `/api/files/${id}` : null,  // Avoids making an API call if id is null
    fetcher
  );

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error, router]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="h-[90vh] space-y-5 pb-12">
      <h1 className="text-3xl font-semibold">Files</h1>
      {files?.data && files?.data.length > 0 ? (
        <ScrollArea className="h-full overflow-y-auto border border-gray-700 p-5 rounded-lg grid gap-y-5">
          <div className="grid grid-cols-2 gap-3">
            {files.data.map((file: FileType) => (
              <FileCard key={file.id} file={{ ...file, read_only: true }} />
            ))}
          </div>
        </ScrollArea>
      ) : (
        <div>No Files Uploaded.</div>
      )}
    </div>
  );
}
