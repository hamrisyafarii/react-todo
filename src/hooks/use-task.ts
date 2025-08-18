/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "@/lib/axios";
import type { TaskDataSchema } from "@/schemas/task.schema";
import type { TaskDTO } from "@/types/task.type";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

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
      setError(error.response?.data?.message || "Gagal memuat task");
    } finally {
      setLoading(false);
    }
  };

  const getTaskById = useCallback(async (id: string) => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.get(`/task/${id}`);
      if (data.success) {
        return data.data;
      }
    } catch (error: any) {
      setError(error.response?.data?.message || "Gagal memuat detail task");
    } finally {
      setLoading(false);
    }
  }, []);

  const createTask = async (values: TaskDataSchema) => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.post("/task", values);
      if (data.success) {
        setTasks((prev) => [...prev, data.data]);
        toast.success("Berhasil mambuat task baru");
      }
    } catch (error: any) {
      setError(error.response?.data?.message || "Gagal membuat task");
      toast.error("Gagal membuat task baru, coba beberapa menit lagi !");
    } finally {
      setLoading(false);
    }
  };

  const updateTask = async (id: string, values: TaskDataSchema) => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.put(`/task/${id}`, values);
      if (data.success) {
        setTasks((prev) =>
          prev.map((task) => (task.id === id ? data.data : task))
        );
      }
    } catch (error: any) {
      setError(error.response?.data?.message || "Gagal memperbarui task");
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (id: string) => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.delete(`/task/${id}`);
      if (data.success) {
        setTasks((prev) => prev.filter((task) => task.id !== id));
        toast.success("Berhasil menghapus task");
      }
    } catch (error: any) {
      setError(error.response?.data?.message || "Gagal menghapus task");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllTask();
  }, []);

  const toggleFavorite = async (id: string, currentValue: boolean) => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.patch(`/task/${id}/isFav`, {
        isFavorite: !currentValue,
      });

      if (data.success) {
        setTasks((prev) =>
          prev.map((task) =>
            task.id === id
              ? { ...task, isFavorite: data.data.isFavorite }
              : task
          )
        );
        toast.success(
          data.data.isFavorite
            ? "Task ditandai sebagai favorite"
            : "Task dihapus dari favorite"
        );
      }
    } catch (error: any) {
      setError(error.response?.data?.message || "Gagal toggle favorite");
      toast.error("Gagal mengubah status favorite");
    } finally {
      setLoading(false);
    }
  };

  return {
    tasks,
    loading,
    error,
    getAllTask,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
    toggleFavorite,
  };
};
