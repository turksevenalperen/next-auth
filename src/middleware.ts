
//src/middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { token } = req.nextauth;
    const url = req.nextUrl.clone();

    if (req.nextUrl.pathname === "/") {
      if (!token) return NextResponse.next();

      if (token.userRole === "admin") {
        url.pathname = "/admin";
        return NextResponse.redirect(url);
      }

      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }

    if (
      req.nextUrl.pathname.startsWith("/admin") &&
      token?.userRole !== "admin"
    ) {
      url.pathname = "/unauthorized";
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  },
  {
    pages: {
      signIn: "/",
    },
  }
);

export const config = {
  matcher: ["/", "/admin/:path*", "/dashboard/:path*"],
};
