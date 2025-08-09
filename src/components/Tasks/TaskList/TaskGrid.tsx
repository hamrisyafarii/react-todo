import type { TaskDTO } from "@/types/task.type";
import TaskCard from "../TaskCard";

interface TaskGridProps {
  tasks: TaskDTO[];
  viewMode: "grid" | "list";
  onViewDetails?: (taskId: string) => void;
  onUpdateStatus?: (taskId: string) => void;
}

const TaskGrid = ({
  tasks,
  viewMode,
  onViewDetails,
  onUpdateStatus,
}: TaskGridProps) => {
  return (
    <div
      className={`grid gap-6 ${
        viewMode === "grid"
          ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          : "grid-cols-1"
      }`}
    >
      {tasks.map((task) => (
        <div key={task.id} className={viewMode === "list" ? "max-w-none" : ""}>
          <TaskCard
            task={task}
            onViewDetails={onViewDetails}
            onUpdateStatus={onUpdateStatus}
          />
        </div>
      ))}
    </div>
  );
};

export default TaskGrid;
