import { NextResponse } from "next/server";
import { createApplication } from "@/lib/data/applications";
import { getSubGroupPublic } from "@/lib/data/subgroups";
import { isMemberVerified } from "@/lib/session";

function requireString(value: unknown, max = 200): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed || trimmed.length > max) return null;
  return trimmed;
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const verified = await isMemberVerified();
  if (!verified) {
    return NextResponse.json(
      { ok: false, message: "인증코드를 먼저 입력해주세요." },
      { status: 403 }
    );
  }

  const subgroup = await getSubGroupPublic(id);
  if (!subgroup) {
    return NextResponse.json({ ok: false, message: "소모임을 찾을 수 없습니다." }, { status: 404 });
  }

  const body = await request.json().catch(() => null);
  const affiliation = requireString(body?.affiliation, 60);
  const name = requireString(body?.name, 30);
  const contact = requireString(body?.contact, 60);
  const message = requireString(body?.message, 500) ?? "";

  if (!affiliation || !name || !contact) {
    return NextResponse.json(
      { ok: false, message: "소속, 이름, 연락처를 입력해주세요." },
      { status: 400 }
    );
  }

  await createApplication(id, { affiliation, name, contact, message });
  return NextResponse.json({ ok: true });
}
