import TaskSearch from "./TaskSearch";
import TaskStatusFilter from "./TaskStatusFilter";
import ViewModeToggle from "./ViewModelToggle";

interface TaskFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filterStatus: string;
  onFilterChange: (status: string) => void;
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
}

const TaskFilters = ({
  searchQuery,
  onSearchChange,
  filterStatus,
  onFilterChange,
  viewMode,
  onViewModeChange,
}: TaskFiltersProps) => {
  return (
    <div className="bg-background p-6 rounded-lg border border-gray-200 shadow-sm">
      <div className="flex flex-col lg:flex-row gap-4">
        <TaskSearch searchQuery={searchQuery} onSearchChange={onSearchChange} />

        <div className="flex gap-3">
          <TaskStatusFilter
            filterStatus={filterStatus}
            onFilterChange={onFilterChange}
          />
          <ViewModeToggle
            viewMode={viewMode}
            onViewModeChange={onViewModeChange}
          />
        </div>
      </div>
    </div>
  );
};

export default TaskFilters;
