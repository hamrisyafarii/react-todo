import { Badge } from "@/components/ui/badge";
import { Flag } from "lucide-react";
import { cn } from "@/lib/utils";
import type { TaskDTO } from "@/types/task.type";

interface TaskPriorityProps {
  priority: TaskDTO["priority"];
}

const TaskPriority = ({ priority }: TaskPriorityProps) => {
  const getPriorityColor = (priority: TaskDTO["priority"]) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <Badge
      variant="outline"
      className={cn("text-xs font-medium", getPriorityColor(priority))}
    >
      <Flag className="w-3 h-3 mr-1" />
      {priority}
    </Badge>
  );
};

export default TaskPriority;
