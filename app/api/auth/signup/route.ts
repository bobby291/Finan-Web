import { NextRequest, NextResponse } from "next/server";
import { validateSignup } from "@/lib/validators";
import { createSession, createDemoUserCookie } from "@/lib/session";
import { getUserWallet } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Invalid request body." },
        { status: 400 }
      );
    }

    const { name, email, password } = body;

    const error = validateSignup({
      name: name ?? "",
      email: email ?? "",
      password: password ?? "",
    });

    if (error) {
      return NextResponse.json(
        { error },
        { status: 400 }
      );
    }

    // Create the signed demo-user cookie
    await createDemoUserCookie({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
    });

    // Create the authenticated session
    await createSession({
      name: name.trim(),
      email: email.trim().toLowerCase(),
    });

    // Automatically create the wallet
    const wallet = getUserWallet(
      email,
      name
    );

    return NextResponse.json(
      {
        success: true,
        message: "Account created successfully.",
        user: {
          name: wallet.name,
          email: wallet.email,
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
        status: 201,
      }
    );
  } catch (error) {
    console.error("Signup error:", error);

    return NextResponse.json(
      {
        error: "Unable to create account.",
      },
      {
        status: 500,
      }
    );
  }
}