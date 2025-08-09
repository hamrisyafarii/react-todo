import type { TaskDTO } from "@/types/task.type";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import TaskHeader from "./TaskHeader";
import TaskPriority from "./TaskPriority";
import TaskStatus from "./TaskStatus";
import TaskDeadline from "./TaskDeadline";
import TaskActions from "./TaskAction";

interface TaskCardProps {
  task: TaskDTO;
  onViewDetails?: (taskId: string) => void;
  onUpdateStatus?: (taskId: string) => void;
}

const TaskCard = ({ task, onViewDetails, onUpdateStatus }: TaskCardProps) => {
  const isOverdue = (deadline: string) => {
    return new Date(deadline) < new Date() && task.status !== "COMPLETED";
  };

  const handleViewDetails = () => {
    onViewDetails?.(task.id);
  };

  const handleUpdateStatus = () => {
    onUpdateStatus?.(task.id);
  };

  return (
    <Card className="h-full transition-all duration-200 hover:shadow-lg hover:-translate-y-1 border-0 shadow-sm bg-background">
      <CardHeader className="pb-3">
        <TaskHeader
          title={task.title}
          description={task.description}
          isFavorite={task.isFavorite}
        />

        <div className="flex flex-wrap gap-2 mt-3">
          <TaskPriority priority={task.priority} />
          <TaskStatus status={task.status} />
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <TaskDeadline
          deadline={task.deadline}
          isOverdue={isOverdue(task.deadline)}
        />
      </CardContent>

      <CardFooter className="pt-0 mt-auto">
        <TaskActions
          onViewDetails={handleViewDetails}
          onUpdateStatus={handleUpdateStatus}
        />
      </CardFooter>
    </Card>
  );
};

export default TaskCard;
