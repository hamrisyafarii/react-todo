import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
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
import { PlusCircle } from "lucide-react";

interface TaskHeaderProps {
  onNewTask?: () => void;
}

const TaskHeader = ({ onNewTask }: TaskHeaderProps) => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">My Tasks</h1>
        <p className="text-muted-foreground">
          Manage and track your tasks efficiently
        </p>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button>
            <PlusCircle /> Task Baru
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Tambah Task Baru</DialogTitle>
          <form onSubmit={onNewTask} className="space-y-2">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input placeholder="Masukan judul task kamu" />
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea placeholder="Masukan deskripsi disini" />
            </div>

            <div className="space-y-2">
              <Label>Priority</Label>
              <Select>
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
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Pilih Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="LOW">PENDING</SelectItem>
                  <SelectItem value="MEDIUM">IN PROGRES</SelectItem>
                  <SelectItem value="HIGH">COMPLETED</SelectItem>
                  <SelectItem value="CRITICAL">CANCELLED</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>DueDate</Label>
              <Input type="date" className="w-auto" />
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
