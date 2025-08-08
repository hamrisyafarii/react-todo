import type { TaskDTO } from "@/types/task.type";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Calendar, Star, Clock, Flag } from "lucide-react";
import { cn } from "@/lib/utils";

interface TaskCardProps {
  task: TaskDTO;
}

const TaskCard = ({ task }: TaskCardProps) => {
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const isOverdue = (deadline: string) => {
    return new Date(deadline) < new Date() && task.status !== "COMPLETED";
  };

  return (
    <Card className="h-full transition-all duration-200 hover:shadow-lg hover:-translate-y-1 border-0 shadow-sm bg-white">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg font-semibold text-gray-900 line-clamp-2 mb-2">
              {task.title}
            </CardTitle>
            <CardDescription className="text-sm text-gray-600 line-clamp-3">
              {task.description}
            </CardDescription>
          </div>
          {task.isFavorite && (
            <Star className="w-5 h-5 text-yellow-500 fill-current flex-shrink-0 ml-2" />
          )}
        </div>

        <div className="flex flex-wrap gap-2 mt-3">
          <Badge
            variant="outline"
            className={cn(
              "text-xs font-medium",
              getPriorityColor(task.priority)
            )}
          >
            <Flag className="w-3 h-3 mr-1" />
            {task.priority}
          </Badge>
          <Badge
            variant="outline"
            className={cn("text-xs font-medium", getStatusColor(task.status))}
          >
            {task.status.replace("_", " ")}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex items-center text-sm text-gray-600">
          <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
          <span
            className={cn(
              "font-medium",
              isOverdue(task.deadline) ? "text-red-600" : "text-gray-700"
            )}
          >
            {formatDate(task.deadline)}
          </span>
          {isOverdue(task.deadline) && (
            <Clock className="w-4 h-4 ml-2 text-red-500" />
          )}
        </div>
      </CardContent>

      <CardFooter className="pt-0 mt-auto">
        <div className="flex w-full gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 text-xs font-medium hover:bg-gray-50"
          >
            View Details
          </Button>
          <Button
            variant="default"
            size="sm"
            className="flex-1 text-xs font-medium bg-blue-600 hover:bg-blue-700"
          >
            Update Status
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TaskCard;
