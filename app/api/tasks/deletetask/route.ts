import { NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";
import type { Task } from "@/lib/zodSchemas";

type StoredTask = Task & { id: string | number; createdAt?: string };

export async function DELETE(req: Request) {
  const filePath = path.join(process.cwd(), "lib", "mockData.json");
  const body = await req.json();
  const id = body?.id;

  if (!id) {
    return NextResponse.json(
      { message: "Missing task id", status: 400 },
      { status: 400 },
    );
  }

  let existing: StoredTask[] | [] = [];
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    existing = raw.trim() ? JSON.parse(raw) : [];
  } catch (error) {
    console.log(error);
    throw new Error("Issue with reading file...");
  }

  const next = existing.filter((task) => String(task.id) !== String(id));

  if (next.length === existing.length) {
    return NextResponse.json(
      { message: "Task not found", status: 404 },
      { status: 404 },
    );
  }

  try {
    await fs.writeFile(filePath, JSON.stringify(next, null, 2), "utf-8");
    return NextResponse.json({ ok: true, status: 200 }, { status: 200 });
  } catch (error) {
    console.log(error);
    throw new Error("Issue with writing file...");
  }
}
