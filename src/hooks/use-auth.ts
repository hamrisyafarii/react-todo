/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "@/lib/axios";
import { useState } from "react";
import { type LoginSchema, type RegisterSchema } from "@/schemas/auth.schema";
import Cookies from "js-cookie";
import { toast } from "sonner";

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = async (values: RegisterSchema) => {
    setLoading(true);
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { confirmPassword, ...payload } = values;
      await axiosInstance.post("/register", payload);

      window.location.href = "/login";
    } catch (error: any) {
      setError(error.response.data.message);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const login = async (values: LoginSchema) => {
    try {
      setLoading(true);
      const res = await axiosInstance.post("/login", values);

      if (res.data.success) {
        const token = res.data.data.token;
        Cookies.set("token", token);
        toast.success("Login Berhasil");
        window.location.href = "/dashboard";
      }
    } catch (error: any) {
      setError(error?.response?.data?.message);
      toast.error("Masukan email dan password dengan benar");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    Cookies.remove("token");
    window.location.href = "/login";
    toast.success("Kamu berhasil logout !");
  };

  return { loading, error, register, login, logout };
};
