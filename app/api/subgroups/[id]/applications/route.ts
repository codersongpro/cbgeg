import { NextResponse } from "next/server";
import { listApplications } from "@/lib/data/applications";
import { getSubGroupFull, verifyManageToken } from "@/lib/data/subgroups";
import { isAdminSession } from "@/lib/session";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const token = new URL(request.url).searchParams.get("token") ?? "";

  const isAdmin = await isAdminSession();
  const hasValidToken = !isAdmin && (await verifyManageToken(id, token));

  if (!isAdmin && !hasValidToken) {
    return NextResponse.json({ message: "접근 권한이 없습니다." }, { status: 403 });
  }

  const subgroup = await getSubGroupFull(id);
  if (!subgroup) {
    return NextResponse.json({ message: "소모임을 찾을 수 없습니다." }, { status: 404 });
  }

  const applications = await listApplications(id);
  return NextResponse.json({ subgroup, applications });
}
