import z from "zod";

export type Column = "backlog" | "in-progress" | "review" | "done";

export type Task = {
  title: string;
  description: string;
  column: Column;
};

export const taskSchema = z.object({
  title: z.string().min(3, "Title must be 3 characters at least"),
  description: z.string(),
  column: z.enum(["backlog", "in-progress", "review", "done"]),
});
export type TaskSchemaType = z.infer<typeof taskSchema>;
