import { NextResponse } from "next/server";

export async  function GET() {
    return NextResponse.json({
        ADMIN_SECRET: process.env.ADMIN_SECRET,
        SESSION_SECRET: !! process.env.SESSION_SECRET,
    });
}