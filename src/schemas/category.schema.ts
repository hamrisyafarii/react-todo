import z from "zod";

export const categorySchema = z.object({
  name: z.string().min(1, { message: "Category harus di isi" }),
});

export type CategoryDataSchema = z.infer<typeof categorySchema>;
