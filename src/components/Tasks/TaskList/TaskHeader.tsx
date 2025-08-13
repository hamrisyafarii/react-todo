import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { TaskDataSchema } from "@/schemas/task.schema";
import { PlusCircle } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

interface TaskHeaderProps {
  onNewTask?: (values: TaskDataSchema) => void;
}

const TaskHeader = ({ onNewTask }: TaskHeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<TaskDataSchema>({
    title: "",
    description: "",
    priority: "MEDIUM",
    status: "PENDING",
    deadline: "",
    isFavorite: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title) {
      toast.error("Judul task harus di isi");
      return;
    }

    onNewTask?.(formData);
    setFormData({
      title: "",
      description: "",
      priority: "MEDIUM",
      status: "PENDING",
      deadline: "",
      isFavorite: false,
    });
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">My Tasks</h1>
        <p className="text-muted-foreground">
          Manage and track your tasks efficiently
        </p>
      </div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <Button onClick={() => setIsOpen(true)}>
          <PlusCircle /> Task Baru
        </Button>
        <DialogContent>
          <DialogTitle>Tambah Task Baru</DialogTitle>
          <form onSubmit={handleSubmit} className="space-y-2">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Masukan judul task kamu"
              />
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Masukan deskripsi disini"
              />
            </div>

            <div className="space-y-2">
              <Label>Priority</Label>
              <Select
                value={formData.priority}
                onValueChange={(value) => handleSelectChange("priority", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Pilih prioritas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="LOW">LOW</SelectItem>
                  <SelectItem value="MEDIUM">MEDIUM</SelectItem>
                  <SelectItem value="HIGH">HIGH</SelectItem>
                  <SelectItem value="CRITICAL">CRITICAL</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => handleSelectChange("status", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Pilih Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PENDING">PENDING</SelectItem>
                  <SelectItem value="IN_PROGRESS">IN PROGRESS</SelectItem>
                  <SelectItem value="COMPLETED">COMPLETED</SelectItem>
                  <SelectItem value="CANCELLED">CANCELLED</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Due Date</Label>
              <Input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
              />
            </div>

            <div className="flex justify-end items-center gap-2">
              <Button type="submit">Tambah</Button>
              <DialogClose asChild>
                <Button variant={"ghost"}>Cancel</Button>
              </DialogClose>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TaskHeader;
