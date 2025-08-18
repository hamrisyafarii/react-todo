import { Star } from "lucide-react";
import { CardTitle, CardDescription } from "@/components/ui/card";

interface TaskHeaderProps {
  title: string;
  description: string;
  isFavorite: boolean;
}

const TaskHeader = ({ title, description, isFavorite }: TaskHeaderProps) => {
  return (
    <div className="flex items-start justify-between">
      <div className="flex-1 min-w-0">
        <CardTitle className="text-lg font-semibold text-gray-900 line-clamp-2 mb-2">
          {title}
        </CardTitle>
        <CardDescription className="text-sm text-gray-600 line-clamp-3">
          {description.slice(0, 50)}
        </CardDescription>
      </div>
      {isFavorite ? (
        <Star className="w-5 h-5 text-yellow-500 fill-current flex-shrink-0 ml-2" />
      ) : (
        <Star className="text-gray-400" />
      )}
    </div>
  );
};

export default TaskHeader;
