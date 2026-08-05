// proxy.ts

import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const SESSION_COOKIE = "session";

const secret = process.env.SESSION_SECRET;

if (!secret) {
  throw new Error(
    "SESSION_SECRET is missing from environment variables."
  );
}

const secretKey = new TextEncoder().encode(secret);

/**
 * Verify the signed session cookie.
 */
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

  /**
   * Protected routes.
   * Add more routes here whenever needed.
   */
  const protectedRoutes = [
    "/dashboard",
    "/admin",
  ];

  const requiresAuth = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (!requiresAuth) {
    return NextResponse.next();
  }

  const sessionCookie = request.cookies.get(SESSION_COOKIE)?.value;

  if (!sessionCookie) {
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  const session = await verifySession(sessionCookie);

  if (!session) {
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
  ],
};