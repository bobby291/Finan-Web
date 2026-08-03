import { NextRequest, NextResponse } from "next/server";
import { validateSignup } from "@/lib/validators";
import { userExists, registerUser } from "@/lib/auth";
import { createSession } from "@/lib/session";

/**
 * POST /api/auth/signup
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

    const { name, email, password } = body as {
      name?: string;
      email?: string;
      password?: string;
    };

    const error = validateSignup({
      name: name ?? "",
      email: email ?? "",
      password: password ?? "",
    });

    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    if (userExists(email!)) {
      return NextResponse.json(
        {
          error: "A user with that email already exists.",
        },
        {
          status: 409,
        }
      );
    }

    // Creates the mock user and the default wallet ($0.16)
    const wallet = registerUser(
      name!,
      email!,
      password!
    );

    // Creates the signed HTTP-only session cookie
    await createSession({
      name: wallet.name,
      email: wallet.email,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Account created successfully.",
        user: {
          name: wallet.name,
          email: wallet.email,
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
        error: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}