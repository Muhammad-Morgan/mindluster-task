import type { Task } from "@/utils/zodSchema";

const normalizeColumn = (value: string): Task["column"] => {
  if (value === "in_progress") return "in-progress";
  if (value === "backlog") return "backlog";
  if (value === "in-progress") return "in-progress";
  if (value === "review") return "review";
  if (value === "done") return "done";
  return "backlog";
};

export const fetchTasks = async (baseUrl?: string): Promise<Task[]> => {
  const endpoint = baseUrl
    ? `${baseUrl}/api/tasks/gettasks`
    : "/api/tasks/gettasks";

  const response = await fetch(endpoint, { cache: "no-store" });

  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }

  const data = await response.json();
  const tasks = Array.isArray(data) ? data : data?.tasks;

  if (!Array.isArray(tasks)) {
    return [];
  }

  return tasks.map((task, index) => ({
    id: String(task?.id ?? index),
    title: String(task?.title ?? ""),
    description: String(task?.description ?? ""),
    column: normalizeColumn(String(task?.column ?? "backlog")),
  }));
};
