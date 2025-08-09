import { Calendar, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface TaskDeadlineProps {
  deadline: string;
  isOverdue: boolean;
}

const TaskDeadline = ({ deadline, isOverdue }: TaskDeadlineProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="flex items-center text-sm text-gray-600">
      <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
      <span
        className={cn(
          "font-medium",
          isOverdue ? "text-red-600" : "text-gray-700"
        )}
      >
        {formatDate(deadline)}
      </span>
      {isOverdue && <Clock className="w-4 h-4 ml-2 text-red-500" />}
    </div>
  );
};

export default TaskDeadline;
