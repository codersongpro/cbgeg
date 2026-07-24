import { NextResponse } from "next/server";
import { boardAccess } from "@/lib/board-auth";
import {
  deleteBoardPost,
  getBoardPost,
  listBoardComments,
  updateBoardPost,
  verifyBoardPostPassword,
} from "@/lib/data/board";
import { validateBoardPost } from "@/lib/board-input";
import { validateManagePassword } from "@/lib/manage-credentials";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const access = await boardAccess();
  if (!access.allowed) {
    return NextResponse.json({ message: "회원 인증이 필요합니다." }, { status: 401 });
  }
  const { id } = await params;
  const post = await getBoardPost(id);
  if (!post) return NextResponse.json({ message: "글을 찾을 수 없습니다." }, { status: 404 });
  return NextResponse.json({
    post,
    comments: await listBoardComments(id),
    isAdmin: access.isAdmin,
  });
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const access = await boardAccess();
  if (!access.allowed) {
    return NextResponse.json({ message: "회원 인증이 필요합니다." }, { status: 401 });
  }
  const { id } = await params;
  const body = await request.json().catch(() => null);
  const input = validateBoardPost(body);
  const password = validateManagePassword(body?.password);
  if (!input || (!access.isAdmin && !password)) {
    return NextResponse.json({ message: "입력 내용을 확인해주세요." }, { status: 400 });
  }
  if (!access.isAdmin && !(await verifyBoardPostPassword(id, password!))) {
    return NextResponse.json({ message: "글 비밀번호가 올바르지 않습니다." }, { status: 403 });
  }
  return (await updateBoardPost(id, input))
    ? NextResponse.json({ ok: true })
    : NextResponse.json({ message: "글을 찾을 수 없습니다." }, { status: 404 });
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const access = await boardAccess();
  if (!access.allowed) {
    return NextResponse.json({ message: "회원 인증이 필요합니다." }, { status: 401 });
  }
  const { id } = await params;
  const body = await request.json().catch(() => null);
  const password = validateManagePassword(body?.password);
  if (!access.isAdmin && (!password || !(await verifyBoardPostPassword(id, password)))) {
    return NextResponse.json({ message: "글 비밀번호가 올바르지 않습니다." }, { status: 403 });
  }
  return (await deleteBoardPost(id))
    ? NextResponse.json({ ok: true })
    : NextResponse.json({ message: "글을 찾을 수 없습니다." }, { status: 404 });
}
