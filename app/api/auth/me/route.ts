import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";

/**
 * GET /api/auth/me
 *
 * Returns the currently authenticated user based on
 * the signed HTTP-only session cookie.
 */
export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    return NextResponse.json(
      {
        authenticated: true,
        user: {
          name: user.name,
          email: user.email,
        },
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Get current user error:", error);

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