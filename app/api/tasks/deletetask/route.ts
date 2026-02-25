import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  return NextResponse.json({ msg: "test" });
}
