import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter } from "lucide-react";

interface TaskStatusFilterProps {
  filterStatus: string;
  onFilterChange: (status: string) => void;
}

const TaskStatusFilter = ({
  filterStatus,
  onFilterChange,
}: TaskStatusFilterProps) => {
  const statusOptions = [
    { value: "all", label: "All Tasks" },
    { value: "PENDING", label: "Pending" },
    { value: "IN_PROGRESS", label: "In Progress" },
    { value: "COMPLETED", label: "Completed" },
    { value: "CANCELLED", label: "Cancelled" },
  ];

  return (
    <Select value={filterStatus} onValueChange={onFilterChange}>
      <SelectTrigger className="w-48">
        <Filter className="w-4 h-4 mr-2" />
        <SelectValue placeholder="Filter by status" />
      </SelectTrigger>
      <SelectContent>
        {statusOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default TaskStatusFilter;
