import { NextRequest, NextResponse } from "next/server";
import { validateLogin } from "@/lib/validators";

import {
  authenticateDemoUser,
  getUserWallet,
} from "@/lib/auth";

import { createSession } from "@/lib/session";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const error = validateLogin(body);

    if (error) {
      return NextResponse.json(
        { error },
        { status: 400 }
      );
    }

    const user = await authenticateDemoUser(
      body.email,
      body.password
    );

    if (!user) {
      return NextResponse.json(
        {
          error: "Invalid email or password.",
        },
        {
          status: 401,
        }
      );
    }

    await createSession({
      name: user.name,
      email: user.email,
    });

    const wallet = getUserWallet(
      user.email,
      user.name
    );

    return NextResponse.json(
      {
        success: true,
        user,
        wallet,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Login error:", error);

    return NextResponse.json(
      {
        error: "Unable to login.",
      },
      {
        status: 500,
      }
    );
  }
}