import { NextResponse } from "next/server";
import { findCreatorSubGroups } from "@/lib/data/subgroups";
import { createCreatorSession } from "@/lib/session";
import { validateManagePassword } from "@/lib/manage-credentials";
import { allowCreatorLogin } from "@/lib/rate-limit";

const FAILURE = "연락처 또는 관리 비밀번호가 올바르지 않습니다.";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const contact = typeof body?.contact === "string" ? body.contact.trim() : "";
  const password = validateManagePassword(body?.password);
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (!contact || !password || !(await allowCreatorLogin(`${forwarded}:${contact}`))) {
    return NextResponse.json({ ok: false, message: FAILURE }, { status: 401 });
  }
  const subgroups = await findCreatorSubGroups(contact, password);
  if (!subgroups.length) {
    return NextResponse.json({ ok: false, message: FAILURE }, { status: 401 });
  }
  await createCreatorSession(subgroups.map((group) => group.id));
  return NextResponse.json({ ok: true, subgroups });
}
