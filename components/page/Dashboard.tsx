"use client";

import { useQuery } from "@tanstack/react-query";
import type { Task } from "@/lib/zodSchemas";
import TasksList from "@/components/organisms/TasksList";
import { useSearchParams } from "next/navigation";

const columns = [
  {
    key: "backlog",
    title: "Backlog",
    color: "var(--bs-primary)",
  },
  {
    key: "in-progress",
    title: "In Progress",
    color: "var(--bs-warning)",
  },
  {
    key: "review",
    title: "Review",
    color: "var(--bs-purple)",
  },
  {
    key: "done",
    title: "Done",
    color: "var(--bs-success)",
  },
] as const;

const Dashboard = () => {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";
  const { data, isPending } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const resp = await fetch(`/api/tasks/gettasks?q=${q}`);
      return resp.json();
    },
  });
  if (isPending) return <h2>Loading...</h2>;
  const tasks = data?.tasks as Task[];
  if (tasks.length === 0) return <h2>Nothing found...</h2>;
  const getColumnCount = (columnKey: string) => {
    return tasks.filter((task) => (task.column ?? "backlog") === columnKey)
      .length;
  };

  return (
    <main className="container py-4">
      <div className="d-flex flex-column gap-3">
        {isPending ? (
          <h2>Wait....</h2>
        ) : (
          <div className="row g-3">
            {columns.map((column) => (
              <div className="col-12 col-md-6 col-xl-3" key={column.key}>
                <div
                  className="h-100 border border-1 rounded-3 p-3 d-flex flex-column gap-3"
                  style={{
                    borderColor: column.color,
                    backgroundColor: "var(--bs-column-bg)",
                  }}
                >
                  <div className="d-flex align-items-center justify-content-between">
                    <span className="d-flex align-items-center gap-2 text-uppercase small fw-semibold text-body">
                      <span
                        className="rounded-circle d-inline-block"
                        style={{
                          width: "8px",
                          height: "8px",
                          backgroundColor: column.color,
                        }}
                      />
                      {column.title}
                    </span>
                    <span className="badge rounded-pill text-bg-light text-body-secondary">
                      {getColumnCount(column.key)}
                    </span>
                  </div>
                  <TasksList column={column.key} tasks={tasks} />
                  <button
                    className="btn btn-outline-primary btn-sm w-100"
                    type="button"
                  >
                    + Add task
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Dashboard;
