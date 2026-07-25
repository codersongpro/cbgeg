import { NextResponse } from "next/server";
import {
  deleteSubGroup,
  getSubGroupFull,
  getSubGroupPublic,
  updateSubGroup,
} from "@/lib/data/subgroups";
import { isMemberVerified } from "@/lib/session";
import { canManageSubgroup } from "@/lib/subgroup-access-server";
import { validateSubGroupInput } from "@/lib/subgroup-input";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const verified = await isMemberVerified();
  const subgroup = verified ? await getSubGroupFull(id) : await getSubGroupPublic(id);

  if (!subgroup) {
    return NextResponse.json({ message: "소모임을 찾을 수 없습니다." }, { status: 404 });
  }

  return NextResponse.json({ verified, subgroup });
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const token = new URL(request.url).searchParams.get("token") ?? "";
  if (!(await canManageSubgroup(id, token))) {
    return NextResponse.json({ message: "권한이 없습니다." }, { status: 403 });
  }
  const input = validateSubGroupInput(await request.json().catch(() => null));
  if (!input) {
    return NextResponse.json({ message: "입력 내용을 확인해주세요." }, { status: 400 });
  }
  if (!(await updateSubGroup(id, input))) {
    return NextResponse.json({ message: "소모임을 찾을 수 없습니다." }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const token = new URL(request.url).searchParams.get("token") ?? "";
  if (!(await canManageSubgroup(id, token))) {
    return NextResponse.json({ message: "권한이 없습니다." }, { status: 403 });
  }
  if (!(await deleteSubGroup(id))) {
    return NextResponse.json({ message: "소모임을 찾을 수 없습니다." }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
