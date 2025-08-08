/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "@/lib/axios";
import type { TaskDTO } from "@/types/task.type";
import { useEffect, useState } from "react";

export const useTask = () => {
  const [tasks, setTasks] = useState<TaskDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getAllTask = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/tasks");

      console.log(res.data);
      if (res.data.success) {
        setTasks(res.data.data.data);
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

  return { tasks, loading, error, getAllTask };
};
