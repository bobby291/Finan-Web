import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";
import { getUserWallet } from "@/lib/auth";

export async function GET() {
  try {
    // Verify the authenticated session
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    // Get or automatically create the user's wallet
    const wallet = getUserWallet(
      user.email,
      user.name
    );

    return NextResponse.json(
      {
        success: true,
        account: wallet,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("GET /api/account:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}