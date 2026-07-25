import { NextResponse } from "next/server";
import { createSubGroup, listSubGroupsFull } from "@/lib/data/subgroups";
import { isAdminSession } from "@/lib/session";
import { validateManagePassword } from "@/lib/manage-credentials";
import { validateSubGroupInput } from "@/lib/subgroup-input";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAdminSession())) {
    return NextResponse.json({ message: "인증이 필요합니다." }, { status: 401 });
  }
  const subgroups = await listSubGroupsFull();
  return NextResponse.json({ subgroups });
}

export async function POST(request: Request) {
  if (!(await isAdminSession())) {
    return NextResponse.json({ message: "인증이 필요합니다." }, { status: 401 });
  }
  const body = await request.json().catch(() => null);
  const input = validateSubGroupInput(body);
  const password = validateManagePassword(body?.managePassword);
  if (!input || !password) {
    return NextResponse.json({ message: "입력 내용을 확인해주세요." }, { status: 400 });
  }
  const result = await createSubGroup(input, password);
  return NextResponse.json({ ok: true, id: result.id });
}
