"use server";

import { promises as fs } from "node:fs";
import path from "node:path";
import type { Column, Task } from "@/lib/zodSchemas";

type TaskRecord = {
  id?: string | number;
  title?: string;
  description?: string;
  column?: string;
};

const columns: Column[] = ["backlog", "in-progress", "review", "done"];

const normalizeColumn = (value?: string): Column | undefined => {
  if (!value) return undefined;
  return columns.includes(value as Column) ? (value as Column) : undefined;
};

export const getSingleTask = async (id: string): Promise<Task | null> => {
  const filePath = path.join(process.cwd(), "lib", "mockData.json");
  const raw = await fs.readFile(filePath, "utf-8");

  const parsed = raw.trim() ? JSON.parse(raw) : [];
  const tasks: TaskRecord[] = parsed ?? [];

  const task = tasks.find((item) => String(item?.id) === String(id));

  if (!task) return null;

  return {
    id: String(task.id ?? ""),
    title: String(task.title ?? ""),
    description: String(task.description ?? ""),
    column: normalizeColumn(task.column),
  };
};
