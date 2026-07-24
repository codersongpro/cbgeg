import { NextResponse } from "next/server";
import { deleteAccessCode, setAccessCodeActive } from "@/lib/data/codes";
import { isAdminSession } from "@/lib/session";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdminSession())) {
    return NextResponse.json({ message: "인증이 필요합니다." }, { status: 401 });
  }
  const { id } = await params;
  const body = await request.json().catch(() => null);
  if (typeof body?.active !== "boolean") {
    return NextResponse.json({ message: "잘못된 요청입니다." }, { status: 400 });
  }
  await setAccessCodeActive(id, body.active);
  return NextResponse.json({ ok: true });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdminSession())) {
    return NextResponse.json({ message: "인증이 필요합니다." }, { status: 401 });
  }
  const { id } = await params;
  await deleteAccessCode(id);
  return NextResponse.json({ ok: true });
}
