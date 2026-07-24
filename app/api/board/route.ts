import { NextResponse } from "next/server";
import { boardAccess } from "@/lib/board-auth";
import { createBoardPost, listBoardPosts } from "@/lib/data/board";
import { validateBoardPost } from "@/lib/board-input";
import { validateManagePassword } from "@/lib/manage-credentials";
import { allowBoardWrite } from "@/lib/rate-limit";

export async function GET() {
  const access = await boardAccess();
  if (!access.allowed) {
    return NextResponse.json({ message: "회원 인증이 필요합니다." }, { status: 401 });
  }
  return NextResponse.json({ posts: await listBoardPosts(), isAdmin: access.isAdmin });
}

export async function POST(request: Request) {
  const access = await boardAccess();
  if (!access.allowed) {
    return NextResponse.json({ message: "회원 인증이 필요합니다." }, { status: 401 });
  }
  const body = await request.json().catch(() => null);
  const input = validateBoardPost(body);
  const password = validateManagePassword(body?.password);
  if (!input || !password) {
    return NextResponse.json(
      { message: "내용과 4자 이상의 글 비밀번호를 확인해주세요." },
      { status: 400 }
    );
  }
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (!(await allowBoardWrite(`post:${ip}`))) {
    return NextResponse.json({ message: "잠시 후 다시 시도해주세요." }, { status: 429 });
  }
  return NextResponse.json({ ok: true, id: await createBoardPost(input, password) });
}
