import { NextResponse } from "next/server";
import { listSubGroupsByIds } from "@/lib/data/subgroups";
import { creatorSessionSubgroupIds } from "@/lib/session";

export async function GET() {
  const ids = await creatorSessionSubgroupIds();
  if (!ids.length) {
    return NextResponse.json({ message: "로그인이 필요합니다." }, { status: 401 });
  }
  return NextResponse.json({ subgroups: await listSubGroupsByIds(ids) });
}
