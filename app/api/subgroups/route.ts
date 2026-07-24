import { NextResponse } from "next/server";
import { createSubGroup, listSubGroupsFull, listSubGroupsPublic } from "@/lib/data/subgroups";
import {
  createCreatorSession,
  creatorSessionSubgroupIds,
  isMemberVerified,
} from "@/lib/session";
import { validateManagePassword } from "@/lib/manage-credentials";
import { validateSubGroupInput } from "@/lib/subgroup-input";

export async function GET() {
  const verified = await isMemberVerified();
  const subgroups = verified ? await listSubGroupsFull() : await listSubGroupsPublic();
  return NextResponse.json({ verified, subgroups });
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
  const input = validateSubGroupInput(body);
  const managePassword = validateManagePassword(body?.managePassword);

  if (!input || !managePassword) {
    return NextResponse.json(
      { ok: false, message: "모든 항목과 4자 이상의 관리 비밀번호를 입력해주세요." },
      { status: 400 }
    );
  }

  const { id, manageToken } = await createSubGroup(input, managePassword);
  await createCreatorSession([...(await creatorSessionSubgroupIds()), id]);

  return NextResponse.json({ ok: true, id, manageToken });
}
