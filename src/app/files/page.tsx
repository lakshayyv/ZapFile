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
import { useRouter, useSearchParams } from "next/navigation";
import { getDownloadUrl } from "@edgestore/react/utils";
import { useSession } from "next-auth/react";

export default function Page() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useSearchParams();
  const id = params.get("id");
  const {
    data: files,
    error,
    isLoading,
  } = useSWR<{ message: string; data: FileType[] }>(
    `/api/files/${id}`,
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
    <div className="w-full">
      <div className="h-[90vh] space-y-5 pb-12">
        <h1 className="text-3xl font-semibold">Files</h1>
        {files?.data && files?.data.length > 0 ? (
          <ScrollArea className="h-full overflow-y-auto border border-gray-700 p-5 rounded-lg grid gap-y-5">
            <div className="grid grid-cols-2 gap-3">
              {files.data.map((file: FileType) => {
                return (
                  <FileCard key={file.id} file={{ ...file, read_only: true }} />
                );
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
