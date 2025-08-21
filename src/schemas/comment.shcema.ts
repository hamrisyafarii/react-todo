import z from "zod";

export const commentSchema = z.object({
  id: z.string().optional(),
  content: z.string().min(1, { message: "Comment harus diisi" }),
  taskId: z.string().optional(),
  task: z
    .object({
      user: z.object({
        username: z.string(),
      }),
    })
    .optional(),
});

export type CommentDataSchema = z.infer<typeof commentSchema>;
