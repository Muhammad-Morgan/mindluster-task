"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Task } from "@/lib/zodSchemas";
import type { Column } from "@/lib/zodSchemas";
import TasksList from "@/components/organisms/TasksList";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  DndContext,
  closestCorners,
  DragEndEvent,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";

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
  const queryClient = useQueryClient();

  const { data, isPending } = useQuery({
    queryKey: ["tasks", q],
    queryFn: async () => {
      const resp = await fetch(`/api/tasks/gettasks?q=${q}`);
      return resp.json();
    },
  });

  const updateTaskMutation = useMutation({
    mutationFn: async ({
      taskId,
      newColumn,
    }: {
      taskId: string;
      newColumn: Column;
    }) => {
      const resp = await fetch("/api/tasks/edittask", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: taskId,
          column: newColumn,
        }),
      });
      if (!resp.ok) throw new Error("Failed to update task");
      return resp.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 100,
        tolerance: 5,
      },
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const [taskId, sourceColumn] = String(active.id).split("-");
    const targetColumn = String(over.id);

    if (sourceColumn === targetColumn) return;

    updateTaskMutation.mutate({
      taskId,
      newColumn: targetColumn as Column,
    });
  };

  if (isPending) return <h2>Loading...</h2>;
  console.log(data);

  const currentTasks = (data?.tasks as Task[]) ?? [];
  if (currentTasks.length === 0) return <h2>Nothing found...</h2>;

  const getColumnCount = (columnKey: string) => {
    return currentTasks.filter(
      (task) => (task.column ?? "backlog") === columnKey,
    ).length;
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
    >
      <main className="container py-4">
        <div className="d-flex flex-column gap-3">
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
                  <TasksList column={column.key} tasks={currentTasks} />
                  <Link
                    href="/tasks/create-task"
                    className="btn btn-outline-primary btn-sm w-100"
                  >
                    + Add task
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </DndContext>
  );
};

export default Dashboard;
