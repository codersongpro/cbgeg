import { NextResponse } from "next/server";
import { createAccessCode, listAccessCodes } from "@/lib/data/codes";
import { isAdminSession } from "@/lib/session";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAdminSession())) {
    return NextResponse.json({ message: "인증이 필요합니다." }, { status: 401 });
  }
  const codes = await listAccessCodes();
  return NextResponse.json({ codes });
}

export async function POST(request: Request) {
  if (!(await isAdminSession())) {
    return NextResponse.json({ message: "인증이 필요합니다." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const code = typeof body?.code === "string" ? body.code.trim() : "";
  const label = typeof body?.label === "string" ? body.label.trim() : "";

  if (!code || code.length > 60) {
    return NextResponse.json({ message: "코드를 입력해주세요." }, { status: 400 });
  }

  const created = await createAccessCode(code, label);
  return NextResponse.json({ code: created });
}
