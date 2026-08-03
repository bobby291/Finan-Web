import { NextResponse } from "next/server";
import { deleteSession } from "@/lib/session";

/**
 * POST /api/auth/logout
 *
 * Deletes the signed HTTP-only session cookie and logs the user out.
 */
export async function POST() {
  try {
    // Remove the session cookie
    await deleteSession();

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
    console.error("Logout error:", error);

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