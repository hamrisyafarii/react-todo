/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "@/lib/axios";
import type { CommentDataSchema } from "@/schemas/comment.shcema";
import { useCallback, useState } from "react";
import { toast } from "sonner";

export const useComment = () => {
  const [comment, setComment] = useState<CommentDataSchema[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getAllComment = useCallback(async (taskId: string) => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.get(`/comment/task/${taskId}`);
      if (data.success) {
        setComment(data.data);
      }
    } catch (error: any) {
      console.log(error);
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const createComment = async (
    values: CommentDataSchema & { taskId: string }
  ) => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.post("/comment", values);

      if (data.success) {
        setComment((prev) => [...prev, data.data]);
        toast.success("Komentar sudah terkirim");
      }
    } catch (error: any) {
      console.log("Error Create:", error);
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteComment = async (commentId: string) => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.delete(`/comment/${commentId}`);

      if (data.success) {
        setComment((prev) => prev.filter((cmt) => cmt.id !== commentId));
        toast.success("Berhasil hapus komentar");
      }
    } catch (error: any) {
      console.error(error);
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    getAllComment,
    loading,
    error,
    comment,
    createComment,
    deleteComment,
  };
};
