import { NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";
import { taskSchema, type Task } from "@/lib/zodSchemas";
import { v4 as uuidv4 } from "uuid";

type StoredTask = Task & { id: string; createdAt: string };

export const POST = async (req: Request) => {
  const filePath = path.join(process.cwd(), "lib", "mockData.json");
  const body = await req.json();
  // validating
  const validateFields = taskSchema.safeParse(body);
  if (!validateFields.success) {
    return NextResponse.json(
      {
        message: "Missing Fields. Failed to Create Lesson.",
        status: 400,
      },
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
  const next: StoredTask[] = [
    ...existing,
    {
      ...validateFields.data,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
    },
  ];
  try {
    await fs.writeFile(filePath, JSON.stringify(next, null, 2), "utf-8");
  } catch (error) {
    console.log(error);
    throw new Error("Issue with writing file...");
  }
  return NextResponse.json({ ok: true, status: 200 }, { status: 201 });
};
