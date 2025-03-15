import FileDownloader from "@/components/file-downloader";
import Loader from "@/components/ui/loader";
import { Suspense } from "react";

export default function Page() {
  return (
    <div>
      <Suspense fallback={<Loader />}>
        <FileDownloader />
      </Suspense>
    </div>
  );
}
