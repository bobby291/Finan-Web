import { NextRequest, NextResponse } from "next/server";

import { validateSignup } from "@/lib/validators";
import {
  createDemoUser,
  getUserWallet,
} from "@/lib/auth";

import { createSession } from "@/lib/session";

export async function POST(req: NextRequest) {
  console.log("POST ROUTE HIT");

  try {
    const body = await req.json();

    const error = validateSignup(body);

    if (error) {
      return NextResponse.json(
        {
          success: false,
          error,
        },
        {
          status: 400,
        }
      );
    }

    // Create/overwrite demo user
    const user = await createDemoUser(
      body.name,
      body.email,
      body.password
    );

    // Create session immediately
    await createSession({
      name: user.name,
      email: user.email,
    });

    // Create or update wallet
    const wallet = getUserWallet(
      user.email,
      user.name
    );

    console.log("USER:", user);
    console.log("WALLET:", wallet);

    return NextResponse.json(
      {
        success: true,
        user,
        wallet,
        redirect: "/dashboard",
      },
      {
        status: 200,
      }
    );
  } catch (err) {
    console.error("SIGNUP ERROR:", err);

    return NextResponse.json(
      {
        success: false,
        error:
          err instanceof Error
            ? err.message
            : "Unable to create account.",
      },
      {
        status: 500,
      }
    );
  }
}
