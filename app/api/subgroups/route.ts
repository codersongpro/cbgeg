import { NextResponse } from "next/server";
import { createSubGroup, listSubGroupsFull, listSubGroupsPublic } from "@/lib/data/subgroups";
import { isMemberVerified } from "@/lib/session";

export async function GET() {
  const verified = await isMemberVerified();
  const subgroups = verified ? await listSubGroupsFull() : await listSubGroupsPublic();
  return NextResponse.json({ verified, subgroups });
}

function requireString(value: unknown, max = 200): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed || trimmed.length > max) return null;
  return trimmed;
}

export async function POST(request: Request) {
  const verified = await isMemberVerified();
  if (!verified) {
    return NextResponse.json(
      { ok: false, message: "인증코드를 먼저 입력해주세요." },
      { status: 403 }
    );
  }

  const body = await request.json().catch(() => null);
  const topic = requireString(body?.topic, 60);
  const description = requireString(body?.description, 500);
  const creatorName = requireString(body?.creatorName, 30);
  const creatorAffiliation = requireString(body?.creatorAffiliation, 60);
  const creatorContact = requireString(body?.creatorContact, 60);

  if (!topic || !description || !creatorName || !creatorAffiliation || !creatorContact) {
    return NextResponse.json(
      { ok: false, message: "모든 항목을 입력해주세요." },
      { status: 400 }
    );
  }

  const { id, manageToken } = await createSubGroup({
    topic,
    description,
    creatorName,
    creatorAffiliation,
    creatorContact,
  });

  return NextResponse.json({ ok: true, id, manageToken });
}
