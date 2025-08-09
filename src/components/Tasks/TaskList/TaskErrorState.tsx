import { Button } from "@/components/ui/button";

interface TaskErrorStateProps {
  error: string;
  onRetry?: () => void;
}

const TaskErrorState = ({ error, onRetry }: TaskErrorStateProps) => {
  const handleLoginRedirect = () => {
    window.location.href = "/login";
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="text-red-500 text-xl font-bold mb-2">
          Error Loading Tasks
        </div>
        <div className="text-gray-600 text-lg flex flex-col gap-2 capitalize">
          {error}
          <div className="flex gap-2 justify-center mt-4">
            {onRetry && (
              <Button variant="outline" onClick={onRetry}>
                Retry
              </Button>
            )}
            <Button variant="outline" onClick={handleLoginRedirect}>
              Login
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskErrorState;
