import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

// export async function middleware(req: Request) {
//   const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

//   // If no token is found, redirect to login
//   if (!token) {
//     return NextResponse.redirect(new URL("/auth/login", req.url));
//   }

//   // Allow the request to continue if the user is authenticated
//   return NextResponse.next();
// }

// // Apply middleware to routes under /dashboard/*
// export const config = {
//   matcher: ["/dashboard/:path*", "/dashboard/*"], // This applies to all routes under /dashboard including dynamic routes
// };
