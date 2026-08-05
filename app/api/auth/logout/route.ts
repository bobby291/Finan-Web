// app/api/auth/logout/route.ts

import { NextResponse } from "next/server";
import {
  deleteSession,
  deleteDemoUserCookie,
} from "@/lib/session";

/**
 * POST /api/auth/logout
 *
 * Clears all authentication cookies.
 */
export async function POST() {
  try {
    // Remove session cookie
    await deleteSession();

    // Remove demo user cookie
    await deleteDemoUserCookie();

    return NextResponse.json(
      {
        success: true,
        message: "Logged out successfully.",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Logout Error:", error);

    return NextResponse.json(
      {
        error: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}