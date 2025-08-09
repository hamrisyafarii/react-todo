import { Search } from "lucide-react";

interface TaskEmptyStateProps {
  hasFilters: boolean;
}

const TaskEmptyState = ({ hasFilters }: TaskEmptyStateProps) => {
  return (
    <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
      <div className="text-gray-400 mb-4">
        <Search className="w-16 h-16 mx-auto" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
      <p className="text-gray-600">
        {hasFilters
          ? "Try adjusting your search or filter criteria"
          : "Create your first task to get started"}
      </p>
    </div>
  );
};

export default TaskEmptyState;
