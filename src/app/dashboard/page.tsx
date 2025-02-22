"use client";

import useSWR from "swr";
import { FileType } from "@/lib/types";
import { toast } from "sonner";
import { fetcher } from "@/lib/utils";

export default function Page() {
  const {
    data: files,
    error,
    isLoading,
  } = useSWR<{ data: FileType[] }>("/api/files", fetcher);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    toast.error(error);
  }
  return (
    <div>
      {files?.data && files?.data.length > 0 ? (
        <ul>
          {files.data.map((file: FileType) => {
            return <li key={file.id}>{file.name}</li>;
          })}
        </ul>
      ) : (
        <div>No Files Uploaded.</div>
      )}
    </div>
  );
}
