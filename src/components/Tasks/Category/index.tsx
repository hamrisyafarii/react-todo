import { SectionContainer } from "@/components/Layouts/SectionContainer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { CategoryDataSchema } from "@/schemas/category.schema";
import type { categoryDTO } from "@/types/category.type";
import { Delete, PlusCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import EditCategory from "../EditCategory";

interface categoryProps {
  category: categoryDTO[];
  onCreateCategory: (values: CategoryDataSchema) => void;
  onDeleteCategory: (categoryId: string) => void;
  onUpdateCategory: (id: string, value: CategoryDataSchema) => void;
}

const Category = ({
  category,
  onCreateCategory,
  onDeleteCategory,
  onUpdateCategory,
}: categoryProps) => {
  const [name, setName] = useState<string>("");
  const [open, setOpen] = useState(false);

  const [editOpen, setEditOpen] = useState<{ [key: string]: boolean }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) {
      return toast.error("Nama kategori wajib di isi");
    }
    onCreateCategory({ name });
    setName("");
    setOpen(false);
  };

  const handleDeleteCategory = (id: string) => {
    const confirmDelete = confirm(
      "Apakah kamu yakin mau menghapus category ini?"
    );
    if (confirmDelete) {
      onDeleteCategory(id);
    }
  };

  const handleEditOpen = (categoryId: string, isOpen: boolean) => {
    setEditOpen((prev) => ({
      ...prev,
      [categoryId]: isOpen,
    }));
  };

  return (
    <SectionContainer padded containerClassName="bg-popover rounded-lg p-2">
      <h1 className="font-medium underline mb-2">Category Task</h1>
      <div className="flex justify-between items-center gap-2">
        {category.length > 0 ? (
          <div className="flex overflow-x-auto space-x-2">
            {category.map((cat) => (
              <Badge
                variant={"outline"}
                className="text-md hover:bg-gray-300 capitalize flex items-center gap-2"
                key={cat.id}
              >
                {cat.name}
                <div className="flex items-center gap-1">
                  <EditCategory
                    open={editOpen[cat.id!] || false}
                    onOpenChange={(isOpen) => handleEditOpen(cat.id!, isOpen)}
                    categoryId={cat.id!}
                    categoryName={cat.name}
                    onUpdateCategory={onUpdateCategory}
                  />
                  <Button
                    size={"icon"}
                    variant={"ghost"}
                    onClick={() => handleDeleteCategory(cat.id!)}
                  >
                    <Delete className="w-4 h-4 text-destructive" />{" "}
                  </Button>
                </div>
              </Badge>
            ))}
          </div>
        ) : (
          <p className="text-md text-muted-foreground underline p-2 rounded-md">
            Tidak ada kategori task, silahkan buat kategori task kamu !!!
          </p>
        )}

        <Dialog open={open} onOpenChange={setOpen}>
          <Button
            size={"icon"}
            className="bg-chart-3"
            onClick={() => setOpen(true)}
          >
            <PlusCircle />
          </Button>
          <DialogContent>
            <DialogTitle>Buat kategori task</DialogTitle>
            <form className="space-y-2" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label>Nama Kategori</Label>
                <Input
                  placeholder="Masukan nama kategori"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="flex justify-end gap-2">
                <DialogClose asChild>
                  <Button variant={"outline"}>Batal</Button>
                </DialogClose>
                <Button type="submit" className="bg-chart-3">
                  Buat
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </SectionContainer>
  );
};

export default Category;
