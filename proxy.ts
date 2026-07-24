import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_COOKIE, verifyToken } from "@/lib/auth-tokens";

const OPEN_PATHS = new Set(["/admin/login", "/api/admin/login", "/api/admin/logout"]);

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (OPEN_PATHS.has(pathname)) {
    return NextResponse.next();
  }

  const token = request.cookies.get(ADMIN_COOKIE)?.value;
  const payload = await verifyToken(token);

  if (payload?.role !== "admin") {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ message: "인증이 필요합니다." }, { status: 401 });
    }
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
