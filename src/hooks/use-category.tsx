/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "@/lib/axios";
import type { CategoryDataSchema } from "@/schemas/category.schema";
import type { categoryDTO } from "@/types/category.type";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const useCategory = () => {
  const [category, setCategory] = useState<categoryDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getAllCategory = async () => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.get("/category");

      setCategory(data.data);
    } catch (error: any) {
      console.error(error);
      setError("Gagal memuat category task, coba beberapa saat lagi");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  const getCategoryById = async (id: string) => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.get(`/category/${id}`);

      if (data.success) {
        return data.data;
      }

      return;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const createNewCategory = async (values: CategoryDataSchema) => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.post("/category", values);

      if (data.success) {
        setCategory((prev) => [...prev, data.data]);
        toast.success("Kategori task berhasil dibuat");
      }
    } catch (error: any) {
      setError(error.response.data.message);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const updateCategory = async (id: string, value: CategoryDataSchema) => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.put(`category/${id}`, value);

      if (data.success) {
        setCategory((prev) =>
          prev.map((cat) => (cat.id === id ? data.data : cat))
        );
        toast.success(data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteCategory = async (id: string) => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.delete(`/category/${id}`);

      if (data.success) {
        setCategory((prev) => prev.filter((cat) => cat.id !== id));
        toast.success("Category task berhasil dihapus");
      }
    } catch (error: any) {
      console.error(error);
      setError("Tidak bisa menghapus category task, coba beberapa saat lagi !");
    } finally {
      setLoading(false);
    }
  };

  return {
    category,
    loading,
    error,
    createNewCategory,
    deleteCategory,
    updateCategory,
    getCategoryById,
  };
};
