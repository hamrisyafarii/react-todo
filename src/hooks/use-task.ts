/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "@/lib/axios";
import type { TaskDataSchema } from "@/schemas/task.schema";
import type { TaskDTO } from "@/types/task.type";
import { useEffect, useState } from "react";

export const useTask = () => {
  const [tasks, setTasks] = useState<TaskDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getAllTask = async () => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.get("/tasks");

      if (data.success) {
        setTasks(data.data.data);
      }
    } catch (error: any) {
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllTask();
  }, []);

  const createTask = async (values: TaskDataSchema) => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.post("/task", values);

      if (data.success) {
        setTasks(data.data);
      }
      return;
    } catch (error: any) {
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return { tasks, loading, error, getAllTask, createTask };
};
