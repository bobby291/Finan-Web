import { NextRequest, NextResponse } from "next/server";
import { verifyAdminSecret } from "@/lib/admin";
import { walletStore } from "@/lib/walletStore";


/**
 * POST /api/admin/inject
 *
 * Demo admin endpoint for manually adjusting wallet balances.
 *
 * Body:
 *
 * {
 *   "email": "user@email.com",
 *   "amount": 100
 * }
 *
 * OR
 *
 * {
 *   "email": "user@email.com",
 *   "balance": 500
 * }
 *
 */


export async function POST(req: NextRequest) {
  try {
    const adminSecret = req.headers.get("x-admin-secret");


    // Protect endpoint
    if (!verifyAdminSecret(adminSecret)) {
      return NextResponse.json(
        {
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
    } = body as {
      email?: string;
      amount?: number;
      balance?: number;
    };


    if (!email) {
      return NextResponse.json(
        {
          error: "Email is required",
        },
        {
          status: 400,
        }
      );
    }


    let updatedWallet;


    /**
     * Replace balance completely
     */
    if (typeof balance === "number") {

      updatedWallet = walletStore.setBalance(
        email,
        balance
      );

    }


    /**
     * Add funds
     */
    else if (typeof amount === "number") {

      updatedWallet = walletStore.addFunds(
        email,
        amount
      );

    }


    else {

      return NextResponse.json(
        {
          error:
            "Provide either amount or balance",
        },
        {
          status: 400,
        }
      );

    }



    if (!updatedWallet) {
      return NextResponse.json(
        {
          error:
            "Wallet not found for this email",
        },
        {
          status: 404,
        }
      );
    }



    return NextResponse.json(
      {
        success: true,
        message:
          "Wallet updated successfully.",
        wallet: updatedWallet,
      },
      {
        status: 200,
      }
    );


  } catch (error) {

    console.error(
      "Admin injection error:",
      error
    );


    return NextResponse.json(
      {
        error:
          "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}