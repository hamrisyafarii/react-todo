import { Button } from "@/components/ui/button";

interface TaskActionsProps {
  onViewDetails?: () => void;
  onUpdateStatus?: () => void;
}

const TaskActions = ({ onViewDetails, onUpdateStatus }: TaskActionsProps) => {
  return (
    <div className="flex w-full gap-2">
      <Button
        variant="outline"
        size="sm"
        className="flex-1 text-xs font-medium hover:bg-gray-50"
        onClick={onViewDetails}
      >
        View Details
      </Button>
      <Button
        variant="default"
        size="sm"
        className="flex-1 text-xs font-medium bg-blue-600 hover:bg-blue-700"
        onClick={onUpdateStatus}
      >
        Update Status
      </Button>
    </div>
  );
};

export default TaskActions;
