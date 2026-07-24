import { NextResponse } from "next/server";
import { setManagePassword } from "@/lib/data/subgroups";
import { isAdminSession } from "@/lib/session";
import { validateManagePassword } from "@/lib/manage-credentials";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdminSession())) {
    return NextResponse.json({ message: "인증이 필요합니다." }, { status: 401 });
  }
  const body = await request.json().catch(() => null);
  const password = validateManagePassword(body?.managePassword);
  if (!password) {
    return NextResponse.json({ message: "4자 이상의 비밀번호를 입력해주세요." }, { status: 400 });
  }
  const { id } = await params;
  return (await setManagePassword(id, password))
    ? NextResponse.json({ ok: true })
    : NextResponse.json({ message: "소모임을 찾을 수 없습니다." }, { status: 404 });
}
