import { NextResponse } from "next/server";
import { deleteSubGroup, updateSubGroup } from "@/lib/data/subgroups";
import { isAdminSession } from "@/lib/session";
import { validateSubGroupInput } from "@/lib/subgroup-input";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdminSession())) {
    return NextResponse.json({ message: "인증이 필요합니다." }, { status: 401 });
  }
  const input = validateSubGroupInput(await request.json().catch(() => null));
  if (!input) return NextResponse.json({ message: "입력 내용을 확인해주세요." }, { status: 400 });
  const { id } = await params;
  return (await updateSubGroup(id, input))
    ? NextResponse.json({ ok: true })
    : NextResponse.json({ message: "소모임을 찾을 수 없습니다." }, { status: 404 });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdminSession())) {
    return NextResponse.json({ message: "인증이 필요합니다." }, { status: 401 });
  }
  const { id } = await params;
  return (await deleteSubGroup(id))
    ? NextResponse.json({ ok: true })
    : NextResponse.json({ message: "소모임을 찾을 수 없습니다." }, { status: 404 });
}
