import { NextResponse } from "next/server";
import { listSubGroupsFull } from "@/lib/data/subgroups";
import { isAdminSession } from "@/lib/session";

export async function GET() {
  if (!(await isAdminSession())) {
    return NextResponse.json({ message: "인증이 필요합니다." }, { status: 401 });
  }
  const subgroups = await listSubGroupsFull();
  return NextResponse.json({ subgroups });
}
