import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";


const SESSION_COOKIE_NAME = "session";


const secret = process.env.SESSION_SECRET;


if (!secret) {
  throw new Error(
    "SESSION_SECRET is missing from environment variables."
  );
}


const secretKey = new TextEncoder().encode(secret);



async function verifySessionToken(
  token: string
) {
  try {
    const { payload } = await jwtVerify(
      token,
      secretKey
    );

    return payload;

  } catch {
    return null;
  }
}



export async function middleware(
  request: NextRequest
) {

  const pathname = request.nextUrl.pathname;


  /*
    Protected user routes

    Add more routes here later:
    /portfolio
    /settings
    /investments
  */

  const protectedRoutes = [
    "/dashboard",
  ];



  const requiresAuth = protectedRoutes.some(
    (route) =>
      pathname.startsWith(route)
  );



  if (!requiresAuth) {
    return NextResponse.next();
  }



  const sessionCookie =
    request.cookies.get(
      SESSION_COOKIE_NAME
    )?.value;



  if (!sessionCookie) {

    return NextResponse.redirect(
      new URL(
        "/login",
        request.url
      )
    );

  }



  const session =
    await verifySessionToken(
      sessionCookie
    );



  if (!session) {

    return NextResponse.redirect(
      new URL(
        "/login",
        request.url
      )
    );

  }



  return NextResponse.next();

}



export const config = {

  matcher: [
    "/dashboard/:path*",
  ],

};