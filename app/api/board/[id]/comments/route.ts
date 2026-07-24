import { NextResponse } from "next/server";
import { boardAccess } from "@/lib/board-auth";
import { createBoardComment } from "@/lib/data/board";
import { validateBoardComment } from "@/lib/board-input";
import { validateManagePassword } from "@/lib/manage-credentials";
import { allowBoardWrite } from "@/lib/rate-limit";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const access = await boardAccess();
  if (!access.allowed) {
    return NextResponse.json({ message: "회원 인증이 필요합니다." }, { status: 401 });
  }
  const body = await request.json().catch(() => null);
  const input = validateBoardComment(body);
  const password = validateManagePassword(body?.password);
  if (!input || !password) {
    return NextResponse.json(
      { message: "댓글과 4자 이상의 댓글 비밀번호를 확인해주세요." },
      { status: 400 }
    );
  }
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (!(await allowBoardWrite(`comment:${ip}`))) {
    return NextResponse.json({ message: "잠시 후 다시 시도해주세요." }, { status: 429 });
  }
  const { id } = await params;
  const commentId = await createBoardComment(id, input, password);
  return commentId
    ? NextResponse.json({ ok: true, id: commentId })
    : NextResponse.json({ message: "글을 찾을 수 없습니다." }, { status: 404 });
}
