import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface TaskHeaderProps {
  onNewTask?: () => void;
}

const TaskHeader = ({ onNewTask }: TaskHeaderProps) => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Tasks</h1>
        <p className="text-gray-600">Manage and track your tasks efficiently</p>
      </div>
      <Button
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6"
        onClick={onNewTask}
      >
        <Plus className="w-4 h-4 mr-2" />
        New Task
      </Button>
    </div>
  );
};

export default TaskHeader;
