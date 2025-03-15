import FileList from "@/components/file-list";
import Loader from "@/components/ui/loader";
import { Suspense } from "react";

export default function Page() {
  return (
    <div>
      <Suspense fallback={<Loader />}>
        <FileList />
      </Suspense>
    </div>
  );
}
