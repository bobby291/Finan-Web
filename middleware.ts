import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const SESSION_COOKIE = "session";

const secret = process.env.SESSION_SECRET!;

const secretKey = new TextEncoder().encode(secret);

async function verifySession(token: string) {
  try {
    const { payload } = await jwtVerify(token, secretKey);
    return payload;
  } catch {
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect dashboard
  if (!pathname.startsWith("/dashboard")) {
    return NextResponse.next();
  }

  const token = request.cookies.get(SESSION_COOKIE)?.value;

  // No session? Send user to signup
  if (!token) {
    return NextResponse.redirect(
      new URL("/signup", request.url)
    );
  }

  const session = await verifySession(token);

  // Invalid session? Send user to signup
  if (!session) {
    return NextResponse.redirect(
      new URL("/signup", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
