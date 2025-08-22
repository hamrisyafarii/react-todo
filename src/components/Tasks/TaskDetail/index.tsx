import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Clock,
  Delete,
  Flag,
  Send,
  Star,
  Trash2Icon,
} from "lucide-react";
import type { TaskDTO } from "@/types/task.type";
import { useTask } from "@/hooks/use-task";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Input } from "@/components/ui/input";
import { useComment } from "@/hooks/use-comment";
import type { CommentDataSchema } from "@/schemas/comment.shcema";

interface TaskDetailDialogProps {
  taskId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDeleteTask: (taskId: string) => void;
  onToggleFav: (taskId: string, isFavorite: boolean) => void;
}

const TaskDetail = ({
  taskId,
  open,
  onOpenChange,
  onDeleteTask,
  onToggleFav,
}: TaskDetailDialogProps) => {
  const { getTaskById, loading } = useTask();
  const { getAllComment, comment, createComment, deleteComment } = useComment();
  const [task, setTask] = useState<TaskDTO | null>(null);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    if (open && taskId) {
      const fetchTaskDetail = async () => {
        const taskDetail = await getTaskById(taskId);
        if (taskDetail) setTask(taskDetail);

        await getAllComment(taskId);
      };
      fetchTaskDetail();
    }
  }, [open, taskId, getTaskById, getAllComment]);

  const handleCreateComment = async (
    value: CommentDataSchema & { taskId: string }
  ) => {
    if (!value.content.trim()) return;
    await createComment(value);
    setNewComment("");
    await getAllComment(taskId);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "HIGH":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300";
      case "MEDIUM":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300";
      case "LOW":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300";
      case "IN_PROGRESS":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300";
      case "TODO":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300";
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case "HIGH":
        return "Tinggi";
      case "MEDIUM":
        return "Sedang";
      case "LOW":
        return "Rendah";
      default:
        return priority;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "Selesai";
      case "IN_PROGRESS":
        return "Sedang Dikerjakan";
      case "TODO":
        return "Belum Dikerjakan";
      default:
        return status;
    }
  };

  const isOverdue = (deadline: string) => {
    return new Date(deadline) < new Date() && task?.status !== "COMPLETED";
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

  if (!task) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange} key={task.id}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto ">
        <DialogHeader>
          <DialogTitle className="flex items-start gap-3">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <Star
                  onClick={() => onToggleFav(task.id, task.isFavorite)}
                  className={`w-5 h-5 cursor-pointer ${
                    task.isFavorite
                      ? "text-yellow-500 fill-current"
                      : "text-gray-400 hover:text-yellow-500"
                  }`}
                />
                <span className="text-xl font-semibold underline">
                  {task.title}
                </span>
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 border-2 p-4 rounded-xl">
          <div className="flex flex-wrap gap-3">
            <Badge className={getPriorityColor(task.priority)}>
              <Flag className="w-3 h-3 mr-1" />
              {getPriorityLabel(task.priority)}
            </Badge>
            <Badge className={getStatusColor(task.status)}>
              {getStatusLabel(task.status)}
            </Badge>
            <Badge className="capitalize">
              {task.category?.name ?? "No Category"}
            </Badge>
          </div>

          {task.description && (
            <div>
              <h4 className="font-medium text-sm text-muted-foreground mb-2">
                Deskripsi
              </h4>
              <p className="text-sm leading-relaxed">{task.description}</p>
            </div>
          )}

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">Deadline:</span>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`text-sm ${
                  isOverdue(task.deadline)
                    ? "text-red-600 font-medium"
                    : "text-muted-foreground"
                }`}
              >
                {format(new Date(task.deadline), "dd MMMM yyyy, HH:mm", {
                  locale: id,
                })}
              </span>
              {isOverdue(task.deadline) && (
                <Badge variant="destructive" className="text-xs">
                  Terlambat
                </Badge>
              )}
            </div>
          </div>

          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>
                Dibuat:{" "}
                {format(new Date(task.createdAt!), "dd MMM yyyy, HH:mm", {
                  locale: id,
                })}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>
                Terakhir diupdate:{" "}
                {format(new Date(task.updatedAt!), "dd MMM yyyy, HH:mm", {
                  locale: id,
                })}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          {comment.length > 0 &&
            comment.map((com) => (
              <div
                className="w-full border-1 rounded-xl px-4 py-1"
                key={com.id}
              >
                <div className="flex justify-between items-center gap-2 ">
                  <div className="flex flex-col ">
                    <h1 className="text-sm font-semibold mb-1 underline">
                      {com.task?.user?.username}
                    </h1>
                    <p className="text-sm">{com.content}</p>
                  </div>
                  <div className="flex justify-end items-center">
                    <Button
                      className="text-destructive"
                      size={"icon"}
                      variant={"ghost"}
                      onClick={() => deleteComment(com.id!)}
                    >
                      <Delete />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
        </div>

        <div className="space-y-2">
          <div className="flex gap-2">
            <Input
              value={newComment}
              placeholder="Tambahkan komentar"
              onChange={(e) => setNewComment(e.target.value)}
            />
            <Button
              onClick={() =>
                handleCreateComment({ content: newComment, taskId })
              }
              variant={"outline"}
            >
              <Send />
            </Button>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button
            size={"icon"}
            variant="destructive"
            className="w-full"
            onClick={() => onDeleteTask(task.id)}
          >
            <Trash2Icon />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TaskDetail;
