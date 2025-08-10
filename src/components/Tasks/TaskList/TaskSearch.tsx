import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface TaskSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  placeholder?: string;
}

const TaskSearch = ({
  searchQuery,
  onSearchChange,
  placeholder = "Search tasks...",
}: TaskSearchProps) => {
  return (
    <div className="flex-1">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground w-4 h-4" />
        <Input
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 pr-4 py-2 w-full text-foreground border-gray-300 focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
    </div>
  );
};

export default TaskSearch;
