import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.JWT_SECRET });

  const { pathname } = req.nextUrl;

  // allow the request if the fallowing is true
  // 1) the token exists

  if (pathname.includes("/api/auth") || token) {
    return NextResponse.next();
  }

  // 2) the token is no valid redirec to the login page
  if (!token && pathname !== "/login") {
    return NextResponse.redirect("/login");
  }
}
