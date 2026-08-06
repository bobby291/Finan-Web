import { NextRequest, NextResponse } from "next/server";

import { validateSignup } from "@/lib/validators";

import {
  createDemoUser,
  getUserWallet,
} from "@/lib/auth";

import { createSession } from "@/lib/session";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const error = validateSignup(body);

    if (error) {
      return NextResponse.json(
        { error },
        { status: 400 }
      );
    }

    // Create the demo user
    const user = await createDemoUser(
      body.name,
      body.email,
      body.password
    );

    // Create signed session cookie
    await createSession({
      name: user.name,
      email: user.email,
    });

    // Create or get wallet
    const wallet = getUserWallet(
      user.email,
      user.name
    );

    return NextResponse.json(
      {
        success: true,
        message: "Account created successfully.",
        user,
        wallet,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("Signup Error:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to create account.",
      },
      {
        status: 500,
      }
    );
  }
}
