import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          authenticated: false,
          user: null,
        },
        {
          status: 401,
        }
      );
    }

    return NextResponse.json(
      {
        success: true,
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
    console.error("GET /api/auth/me:", error);

    return NextResponse.json(
      {
        success: false,
        authenticated: false,
        error: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}