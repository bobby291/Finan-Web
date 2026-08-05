// lib/session.ts

import { cookies } from "next/headers";
import {
  SignJWT,
  jwtVerify,
  type JWTPayload,
} from "jose";
import {
  SessionPayload,
  DemoUser,
} from "./types";

const SESSION_COOKIE = "session";
const DEMO_COOKIE = "demo_user";

const secret = process.env.SESSION_SECRET;

if (!secret) {
  throw new Error("SESSION_SECRET is missing.");
}

const secretKey = new TextEncoder().encode(secret);

const MAX_AGE = 60 * 60 * 24 * 7;

/**
 * Sign any payload into a JWT.
 */
async function sign(
  payload: JWTPayload
): Promise<string> {
  return await new SignJWT(payload)
    .setProtectedHeader({
      alg: "HS256",
    })
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE}s`)
    .sign(secretKey);
}

/**
 * Create the authenticated session.
 */
export async function createSession(
  user: SessionPayload
): Promise<void> {
  const token = await sign({
    name: user.name,
    email: user.email,
  });

  const store = await cookies();

  store.set({
    name: SESSION_COOKIE,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
  });
}

/**
 * Verify session.
 */
export async function verifySession(): Promise<SessionPayload | null> {
  try {
    const token = (await cookies()).get(SESSION_COOKIE)?.value;

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
 * Save demo user cookie.
 */
export async function createDemoUserCookie(
  user: DemoUser
): Promise<void> {
  const token = await sign({
    name: user.name,
    email: user.email,
    password: user.password,
  });

  const store = await cookies();

  store.set({
    name: DEMO_COOKIE,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
  });
}

/**
 * Read demo user cookie.
 */
export async function getDemoUser(): Promise<DemoUser | null> {
  try {
    const token = (await cookies()).get(DEMO_COOKIE)?.value;

    if (!token) {
      return null;
    }

    const { payload } = await jwtVerify(token, secretKey);

    return {
      name: payload.name as string,
      email: payload.email as string,
      password: payload.password as string,
    };
  } catch {
    return null;
  }
}

/**
 * Delete session.
 */
export async function deleteSession(): Promise<void> {
  const store = await cookies();

  store.delete(SESSION_COOKIE);
}

/**
 * Delete demo user cookie.
 */
export async function deleteDemoUserCookie(): Promise<void> {
  const store = await cookies();

  store.delete(DEMO_COOKIE);
}

/**
 * Current authenticated user.
 */
export async function getCurrentUser(): Promise<SessionPayload | null> {
  return verifySession();
}