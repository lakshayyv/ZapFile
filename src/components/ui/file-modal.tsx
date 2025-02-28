import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileType } from "@/lib/types";
import { comparePasskey } from "@/lib/utils";
import { getDownloadUrl } from "@edgestore/react/utils";
import { useState } from "react";

export function FileModal({ file }: { file: FileType }) {
  const [passkey, setPasskey] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    setPasskey(e.target.value);
  };

  const handleDownload = () => {
    if (comparePasskey(passkey, file.passkey)) {
      const url = getDownloadUrl(file.url);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = file.name;
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
      setError("");
    } else {
      setError("Enter correct passkey");
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(e) => {
        setOpen(e);
        setError("");
      }}
    >
      <DialogTrigger asChild>
        <Button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold">
          Download
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Download File</DialogTitle>
          <DialogDescription>
            Enter the passkey to download to file.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-3">
            <Label htmlFor="passkey" className="text-right">
              Passkey
            </Label>
            <Input id="passkey" onChange={handleInput} className="col-span-3" />
          </div>
          {error && <div className="text-sm text-red-600">{error}</div>}
        </div>
        <DialogFooter>
          <Button type="button" className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold" onClick={handleDownload}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
