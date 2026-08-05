import { NextRequest, NextResponse } from "next/server";
import { verifyAdminSecret } from "@/lib/admin";
import {
  addFunds,
  getUserWallet,
  setBalance,
} from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const adminSecret = req.headers.get("x-admin-secret");

    if (!verifyAdminSecret(adminSecret)) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized admin access",
        },
        {
          status: 401,
        }
      );
    }

    const body = await req.json().catch(() => null);

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid request body",
        },
        {
          status: 400,
        }
      );
    }

    const {
      email,
      amount,
      balance,
      name,
    } = body as {
      email?: string;
      name?: string;
      amount?: number;
      balance?: number;
    };

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          error: "Email is required.",
        },
        {
          status: 400,
        }
      );
    }

    // Default name if one isn't provided
    const userName = name?.trim() || email.split("@")[0];

    // Ensure the wallet exists
    getUserWallet(email, userName);

    let updatedWallet;

    if (typeof balance === "number") {
      updatedWallet = setBalance(
        email,
        userName,
        balance
      );
    } else if (typeof amount === "number") {
      updatedWallet = addFunds(
        email,
        userName,
        amount
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          error: "Provide either amount or balance.",
        },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Wallet updated successfully.",
        wallet: updatedWallet,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Admin injection error:", error);

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