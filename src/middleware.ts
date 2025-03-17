import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const secret = process.env.NEXTAUTH_SECRET;

  const token = await getToken({ req, secret });

  if (pathname.startsWith("/dashboard") && !token) {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  if (pathname.startsWith("/auth") && token) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"],
};
