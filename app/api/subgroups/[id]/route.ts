import { NextResponse } from "next/server";
import { getSubGroupFull, getSubGroupPublic } from "@/lib/data/subgroups";
import { isMemberVerified } from "@/lib/session";

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
