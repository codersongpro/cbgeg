import { NextResponse } from "next/server";
import { boardAccess } from "@/lib/board-auth";
import { deleteBoardComment, verifyBoardCommentPassword } from "@/lib/data/board";
import { validateManagePassword } from "@/lib/manage-credentials";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string; commentId: string }> }
) {
  const access = await boardAccess();
  if (!access.allowed) {
    return NextResponse.json({ message: "회원 인증이 필요합니다." }, { status: 401 });
  }
  const { id, commentId } = await params;
  const body = await request.json().catch(() => null);
  const password = validateManagePassword(body?.password);
  if (
    !access.isAdmin &&
    (!password || !(await verifyBoardCommentPassword(id, commentId, password)))
  ) {
    return NextResponse.json({ message: "댓글 비밀번호가 올바르지 않습니다." }, { status: 403 });
  }
  return (await deleteBoardComment(id, commentId))
    ? NextResponse.json({ ok: true })
    : NextResponse.json({ message: "댓글을 찾을 수 없습니다." }, { status: 404 });
}
