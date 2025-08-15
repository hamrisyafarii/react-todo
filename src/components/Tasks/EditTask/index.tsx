import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useTask } from "@/hooks/use-task";
import type { TaskDataSchema } from "@/schemas/task.schema";
import type { TaskDTO } from "@/types/task.type";
import { useEffect, useState } from "react";

interface updateTaskProps {
  taskId?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdateTask: (taskId: string, values: TaskDataSchema) => void;
}

const EditTask = ({
  taskId,
  open,
  onOpenChange,
  onUpdateTask,
}: updateTaskProps) => {
  const { loading, getTaskById } = useTask();

  // ini untuk state fetch data task by id
  const [task, setTask] = useState<TaskDTO | null>(null);

  // ini untuk state kalau ada perubahan data
  const [formData, setFormData] = useState<TaskDataSchema>({
    title: "",
    description: "",
    priority: "LOW",
    status: "PENDING",
    isFavorite: false,
    deadline: "",
    categoryId: undefined,
  });

  // ini untuk fatching data task by id
  useEffect(() => {
    if (open && taskId) {
      const fetchTaskById = async () => {
        const taskDetail = await getTaskById(taskId);
        if (taskDetail) {
          setTask(taskDetail);
        }
      };
      fetchTaskById();
    }
  }, [open, taskId, getTaskById]);

  // Ini untuk effect apakah ada perubahan di data task
  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title ?? "",
        description: task.description ?? "",
        priority: task.priority ?? "LOW",
        status: task.status ?? "PENDING",
        isFavorite: task.isFavorite ?? false,
        deadline: task.deadline ?? "",
        categoryId: task.categoryId ?? undefined,
      });
    }
  }, [task]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (loading) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[600px]">
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogTitle>Form Edit Task</DialogTitle>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (taskId) {
              onUpdateTask(taskId, formData);
            }
          }}
          className="space-y-2"
        >
          <div className="space-y-2">
            <Label>Title</Label>
            <Input
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
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
          <div className="flex justify-end gap-2">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" className="bg-chart-2">
              Update
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditTask;
