import { Search } from "lucide-react";

interface TaskEmptyStateProps {
  hasFilters: boolean;
}

const TaskEmptyState = ({ hasFilters }: TaskEmptyStateProps) => {
  return (
    <div className="text-center py-12 bg-background rounded-lg border border-destructive">
      <div className="text-gray-400 mb-4">
        <Search className="w-16 h-16 mx-auto" />
      </div>
      <h3 className="text-lg font-medium text-foreground mb-2">
        No tasks found
      </h3>
      <p className="text-muted-foreground">
        {hasFilters
          ? "Try adjusting your search or filter criteria"
          : "Create your first task to get started"}
      </p>
    </div>
  );
};

export default TaskEmptyState;
