import { useTask } from "@/hooks/use-task";
import LoadingPage from "@/pages/loading";
import { useState } from "react";

import TaskHeader from "./TaskHeader";
import TaskStats from "./TaskStats";
import TaskFilters from "./TaskFilters";
import TaskEmptyState from "./TaskEmptyState";
import TaskErrorState from "./TaskErrorState";
import TaskGrid from "./TaskGrid";
import type { TaskDataSchema } from "@/schemas/task.schema";
import TaskDetail from "../TaskDetail";

const TaskList = () => {
  const { tasks, loading, error, createTask, getAllTask, deleteTask } =
    useTask();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const [openDetailView, setOpenDetailView] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const handleNewTask = async (values: TaskDataSchema) => {
    await createTask(values);
    await getAllTask();
  };

  const handleViewDetails = (taskId: string) => {
    setSelectedTask(taskId);
    setOpenDetailView(true);
  };

  const handleDeleteTask = async (taskId: string) => {
    const confirmDelete = confirm("Yakin ingin menghapus task ini?");
    if (!confirmDelete) return;

    try {
      await deleteTask(taskId); // tunggu sampai delete selesai
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseDialog = () => {
    setOpenDetailView(false);
    setSelectedTask(null);
  };

  const handleUpdateStatus = (taskId: string) => {
    console.log("Update status for task:", taskId);
  };

  if (loading) return <LoadingPage />;

  if (error) {
    return <TaskErrorState error={error} />;
  }

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || task.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const hasFilters = searchQuery !== "" || filterStatus !== "all";

  return (
    <div className="space-y-6">
      <TaskHeader onNewTask={handleNewTask} />

      <TaskStats tasks={tasks} />

      <TaskFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filterStatus={filterStatus}
        onFilterChange={setFilterStatus}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />
      {filteredTasks.length === 0 ? (
        <TaskEmptyState hasFilters={hasFilters} />
      ) : (
        <TaskGrid
          tasks={filteredTasks}
          viewMode={viewMode}
          onViewDetails={handleViewDetails}
          onUpdateStatus={handleUpdateStatus}
        />
      )}

      {selectedTask && (
        <TaskDetail
          onDeleteTask={handleDeleteTask}
          taskId={selectedTask}
          open={openDetailView}
          onOpenChange={handleCloseDialog}
        />
      )}
    </div>
  );
};

export default TaskList;
