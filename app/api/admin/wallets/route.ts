import { NextRequest, NextResponse } from "next/server";
import { verifyAdminSecret } from "@/lib/admin";
import { getAllWallets } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const adminSecret = req.headers.get("x-admin-secret");

    console.log("Header received:", adminSecret);
    console.log("Env value:", process.env.ADMIN_SECRET);

    if (!verifyAdminSecret(adminSecret)) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized admin access.",
        },
        {
          status: 401,
        }
      );
    }

    const wallets = getAllWallets();

    return NextResponse.json(
      {
        success: true,
        wallets,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Admin Wallets Error:", error);

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
