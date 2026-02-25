import { NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";
import { taskSchema, type Task } from "@/lib/zodSchemas";

type StoredTask = Task & { id: string | number; createdAt?: string };

const normalizeColumn = (value: string) => {
  if (value === "in_progress") return "in-progress";
  return value;
};

export async function PATCH(req: Request) {
  const filePath = path.join(process.cwd(), "lib", "mockData.json");
  const body = await req.json();
  const id = body?.id;

  if (!id) {
    return NextResponse.json(
      { message: "Missing task id", status: 400 },
      { status: 400 },
    );
  }

  const payload = {
    title: body?.title,
    description: body?.description,
    column: normalizeColumn(body?.column),
  };

  const validateFields = taskSchema.safeParse(payload);
  if (!validateFields.success) {
    return NextResponse.json(
      { message: "Missing Fields. Failed to Edit Task.", status: 400 },
      { status: 400 },
    );
  }

  let existing: unknown = [];
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    existing = raw.trim() ? JSON.parse(raw) : { tasks: [] };
  } catch (error) {
    console.log(error);
    throw new Error("Issue with reading file...");
  }

  const tasks = Array.isArray(existing)
    ? existing
    : (existing as { tasks?: StoredTask[] })?.tasks ?? [];

  const index = tasks.findIndex(
    (task) => String(task.id) === String(id),
  );

  if (index === -1) {
    return NextResponse.json(
      { message: "Task not found", status: 404 },
      { status: 404 },
    );
  }

  const updated: StoredTask = {
    ...tasks[index],
    ...validateFields.data,
    column: normalizeColumn(validateFields.data.column),
  };

  const next = [...tasks];
  next[index] = updated;

  try {
    await fs.writeFile(
      filePath,
      JSON.stringify({ tasks: next }, null, 2),
      "utf-8",
    );
  } catch (error) {
    console.log(error);
    throw new Error("Issue with writing file...");
  }

  return NextResponse.json({ ok: true, status: 200 }, { status: 200 });
}
