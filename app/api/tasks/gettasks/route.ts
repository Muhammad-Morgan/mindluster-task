import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";
import { type Task } from "@/lib/zodSchemas";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const q = searchParams.get("q") || "";

  const filePath = path.join(process.cwd(), "lib", "mockData.json");
  let existing: Task[] | [] = [];

  try {
    const raw = await fs.readFile(filePath, "utf-8");
    existing = raw.trim() ? JSON.parse(raw) : [];

    if (existing.length === 0)
      return NextResponse.json(
        { message: "Not Found", status: 404 },
        { status: 404 },
      );

    if (q) {
      existing = existing.filter((task) => {
        if (
          task.title.toLowerCase().includes(q) ||
          task.description.toLowerCase().includes(q)
        ) {
          return task;
        }
      });
    }

    const sorted = [...existing].sort((a, b) =>
      String(a?.title ?? "").localeCompare(String(b?.title ?? ""), "en", {
        sensitivity: "base",
      }),
    );
    return NextResponse.json(
      { tasks: sorted, ok: true, status: 200 },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    throw new Error("issue with reading from the file...");
  }
}
