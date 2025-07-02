import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const { token } = req.nextauth;

    // Admin routes protection
    if (pathname.startsWith("/admin") && token?.role !== "admin") {
      return NextResponse.rewrite(new URL("/employee/dashboard", req.url));
    }

    // Employee routes protection
    if (pathname.startsWith("/employee") && !token) {
      return NextResponse.rewrite(new URL("/", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;
        
        // Allow access to public routes
        if (pathname === "/" || pathname.startsWith("/api/auth")) {
          return true;
        }
        
        // Require authentication for protected routes
        if (pathname.startsWith("/admin") || pathname.startsWith("/employee")) {
          return !!token;
        }
        
        return true;
      },
    },
  }
);

export const config = { 
  matcher: ["/admin/:path*", "/employee/:path*"] 
};