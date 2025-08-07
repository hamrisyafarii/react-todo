import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(1, { message: "Username harus di isi" }),
  password: z.string().min(1, { message: "Password harus di isi" }),
});

export const registerSchema = z
  .object({
    username: z
      .string()
      .min(3, { message: "Username minimal 3 karakter" })
      .max(25, { message: "Username maksimal 25 karakter" }),
    email: z.email({ message: "Invalid format email" }),
    password: z
      .string()
      .min(3, { message: "Password minimal 3 karakter" })
      .max(25, { message: "Password maksimal 25 karakter" }),
    confirmPassword: z.string({ message: "Konfirmasi Passowrd wajib di isi" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password dan konfirmasi password tidak sama",
    path: ["confirmPassword"],
  });

export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;
