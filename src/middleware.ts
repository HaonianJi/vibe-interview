import { NextRequest, NextResponse } from "next/server";

const ADMIN_PATHS = ["/admin", "/new", "/interview"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAdminRoute = ADMIN_PATHS.some((p) => pathname.startsWith(p));
  if (!isAdminRoute) return NextResponse.next();

  const token = request.cookies.get("admin_token")?.value;
  if (token === process.env.ADMIN_SECRET) {
    return NextResponse.next();
  }

  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("from", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin/:path*", "/new/:path*", "/interview/:path*"],
};
