import { z } from "zod";

export const PriorityEnum = z.enum(["Low", "Medium", "High"]);

export const taskSchema = z.object({
  id: z.string(),
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
  priority: PriorityEnum,
});

export type Task = z.infer<typeof taskSchema>;
export type PriorityEnum = z.infer<typeof PriorityEnum>;
