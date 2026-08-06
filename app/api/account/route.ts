import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";
import { getUserWallet } from "@/lib/auth";

export async function GET() {
  try {
    const user = await getCurrentUser();

    console.log("SESSION USER:", user);

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

    const wallet = getUserWallet(
      user.email,
      user.name
    );

    console.log("WALLET:", wallet);

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
