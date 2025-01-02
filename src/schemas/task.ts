import { z } from "zod";

export const taskSchema = z.object({
  id: z.number(),
  title: z
    .string()
    .nonempty("Title is required")
    .max(100, "Title must be 100 characters or less"),
  markdownContent: z
    .string()
    .max(1000, "Markdown content must be 1000 characters or less")
    .optional(),
  dueDate: z.date(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Task = z.infer<typeof taskSchema>;
