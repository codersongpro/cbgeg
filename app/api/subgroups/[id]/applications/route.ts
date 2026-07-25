import { NextResponse } from "next/server";
import { listApplications } from "@/lib/data/applications";
import { getSubGroupFull } from "@/lib/data/subgroups";
import { canManageSubgroup } from "@/lib/subgroup-access-server";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const token = new URL(request.url).searchParams.get("token") ?? "";

  if (!(await canManageSubgroup(id, token))) {
    return NextResponse.json({ message: "접근 권한이 없습니다." }, { status: 403 });
  }

  const subgroup = await getSubGroupFull(id);
  if (!subgroup) {
    return NextResponse.json({ message: "소모임을 찾을 수 없습니다." }, { status: 404 });
  }

  const applications = await listApplications(id);
  return NextResponse.json({ subgroup, applications });
}
