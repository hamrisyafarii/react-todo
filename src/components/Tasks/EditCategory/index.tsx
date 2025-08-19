import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit2Icon } from "lucide-react";
import React, { useEffect, useState } from "react";

interface editProps {
  categoryId: string;
  categoryName: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdateCategory: (id: string, value: { name: string }) => void;
}

const EditCategory = ({
  categoryId,
  categoryName,
  onUpdateCategory,
  open,
  onOpenChange,
}: editProps) => {
  const [name, setName] = useState<string>("");

  useEffect(() => {
    if (open) {
      setName(categoryName || "");
    } else {
      setName("");
    }
  }, [open, categoryName]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (categoryId && name.trim()) {
      onUpdateCategory(categoryId, { name: name.trim() });
      onOpenChange(false);
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  return (
    <>
      <Button variant={"ghost"} onClick={() => onOpenChange(true)}>
        <Edit2Icon className="w-4 h-4" />
      </Button>

      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogTitle>Form Update Kategori</DialogTitle>
          <form className="space-y-2" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label>Nama Kategori</Label>
              <Input
                value={name}
                onChange={handleNameChange}
                placeholder="Masukan nama kategori"
                autoFocus
              />
            </div>
            <div className="flex justify-end gap-2">
              <DialogClose asChild>
                <Button variant={"outline"}>Cancel</Button>
              </DialogClose>
              <Button
                className="bg-chart-3"
                type="submit"
                disabled={!name.trim()}
              >
                Update
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditCategory;
