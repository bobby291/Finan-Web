// lib/session.ts

import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { SessionPayload } from "./types";

const SESSION_COOKIE_NAME = "session";

const secret = process.env.SESSION_SECRET;

if (!secret) {
  throw new Error(
    "SESSION_SECRET is missing. Please add it to your .env.local file."
  );
}

const secretKey = new TextEncoder().encode(secret);

const SESSION_DURATION = 60 * 60 * 24 * 7; // 7 days

/**
 * Create a signed session cookie
 */
export async function createSession(user: SessionPayload) {
  const token = await new SignJWT({
    name: user.name,
    email: user.email,
  })
    .setProtectedHeader({
      alg: "HS256",
    })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION}s`)
    .sign(secretKey);

  const cookieStore = await cookies();

  cookieStore.set({
    name: SESSION_COOKIE_NAME,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DURATION,
  });

  return token;
}

/**
 * Verify session cookie
 */
export async function verifySession(): Promise<SessionPayload | null> {
  try {
    const cookieStore = await cookies();

    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

    if (!token) {
      return null;
    }

    const { payload } = await jwtVerify(token, secretKey);

    return {
      name: payload.name as string,
      email: payload.email as string,
    };
  } catch {
    return null;
  }
}

/**
 * Delete session cookie
 */
export async function deleteSession() {
  const cookieStore = await cookies();

  cookieStore.set({
    name: SESSION_COOKIE_NAME,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: new Date(0),
  });
}

/**
 * Get currently authenticated user
 */
export async function getCurrentUser(): Promise<SessionPayload | null> {
  return verifySession();
}