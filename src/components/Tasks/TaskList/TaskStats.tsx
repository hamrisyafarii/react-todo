import type { TaskDTO } from "@/types/task.type";

interface TaskStatsProps {
  tasks: TaskDTO[];
}

const TaskStats = ({ tasks }: TaskStatsProps) => {
  const pendingCount = tasks.filter((t) => t.status === "PENDING").length;
  const inProgressCount = tasks.filter(
    (t) => t.status === "IN_PROGRESS"
  ).length;
  const completedCount = tasks.filter((t) => t.status === "COMPLETED").length;
  const overdueCount = tasks.filter(
    (t) => new Date(t.deadline) < new Date() && t.status !== "COMPLETED"
  ).length;

  const statCards = [
    {
      value: pendingCount,
      label: "Pending Tasks",
      color: "text-foreground",
    },
    {
      value: inProgressCount,
      label: "In Progress",
      color: "text-chart-3",
    },
    {
      value: completedCount,
      label: "Completed",
      color: "text-chart-2",
    },
    {
      value: overdueCount,
      label: "Overdue",
      color: "text-destructive",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {statCards.map((stat, index) => (
        <div
          key={index}
          className="bg-background p-6 rounded-lg border border-gray-200 shadow-sm"
        >
          <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
          <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};

export default TaskStats;
