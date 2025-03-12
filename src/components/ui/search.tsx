import { CommandDialog, CommandInput } from "cmdk";
import { useState } from "react";

export default function Search({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleChange = (search: string) => {
    setSearchTerm(search);
  };

  return (
    <CommandDialog open={true} onOpenChange={onOpenChange}>
      <CommandInput value={searchTerm} onValueChange={handleChange} />
    </CommandDialog>
  );
}
