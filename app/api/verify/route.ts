import { NextResponse } from "next/server";
import { verifyAccessCode } from "@/lib/data/codes";
import { createMemberSession, isMemberVerified } from "@/lib/session";

export async function GET() {
  return NextResponse.json({ verified: await isMemberVerified() });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const code = typeof body?.code === "string" ? body.code : "";

  if (!code.trim()) {
    return NextResponse.json({ ok: false, message: "코드를 입력해주세요." }, { status: 400 });
  }

  const valid = await verifyAccessCode(code);
  if (!valid) {
    return NextResponse.json(
      { ok: false, message: "코드가 올바르지 않습니다." },
      { status: 401 }
    );
  }

  await createMemberSession();
  return NextResponse.json({ ok: true });
}
