import { NextRequest, NextResponse } from "next/server";
import { validateLogin } from "@/lib/validators";
import { authenticateUser, getUserWallet } from "@/lib/auth";
import { createSession } from "@/lib/session";

/**
 * POST /api/auth/login
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }

    const { email, password } = body as {
      email?: string;
      password?: string;
    };

    const error = validateLogin({
      email: email ?? "",
      password: password ?? "",
    });

    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    const user = authenticateUser(email!, password!);

    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    const wallet = getUserWallet(user.email);

    await createSession({
      name: user.name,
      email: user.email,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Login successful.",
        user: {
          name: user.name,
          email: user.email,
        },
        wallet: {
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
    console.error("Login error:", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}