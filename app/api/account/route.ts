import { NextResponse } from "next/server";
import { verifySession } from "@/lib/session";
import { getUserWallet } from "@/lib/auth";

/**
 * GET /api/account
 *
 * Returns the authenticated user's wallet.
 */
export async function GET() {
  try {
    // Verify the signed session cookie
    const session = await verifySession();

    if (!session) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    // Retrieve the user's wallet
    const wallet = getUserWallet(
      session.email,
      session.name
    );

    return NextResponse.json(
      {
        success: true,
        account: {
          name: wallet.name,
          email: wallet.email,
          balance: wallet.balance,
          investedBalance: wallet.investedBalance,
          totalDeposits: wallet.totalDeposits,
          totalWithdrawals: wallet.totalWithdrawals,
          totalProfit: wallet.totalProfit,
        },
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Account route error:", error);

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