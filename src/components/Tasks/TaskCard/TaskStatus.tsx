import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { TaskDTO } from "@/types/task.type";

interface TaskStatusProps {
  status: TaskDTO["status"];
}

const TaskStatus = ({ status }: TaskStatusProps) => {
  const getStatusColor = (status: TaskDTO["status"]) => {
    switch (status) {
      case "COMPLETED":
        return "bg-green-100 text-green-800 border-green-200";
      case "IN_PROGRESS":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "PENDING":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "CANCELLED":
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <Badge
      variant="outline"
      className={cn("text-xs font-medium", getStatusColor(status))}
    >
      {status.replace("_", " ")}
    </Badge>
  );
};

export default TaskStatus;
