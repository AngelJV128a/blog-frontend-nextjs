import { NextResponse } from "next/server";

const protectedRoutes = ["/Posts", "/Users", "/Settings"];
const adminOnlyRoutes = ["/Users", "/Settings", "/Posts/Admin"];

function decodeJWT(token) {
  try {
    const payload = token.split(".")[1];
    const decoded = atob(payload);
    return JSON.parse(decoded);
  } catch (err) {
    console.error("Token decoding error:", err);
    return null;
  }
}

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isAdminRoute = adminOnlyRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/Login", request.url));
  }

  if (isAdminRoute && token) {
    const decoded = decodeJWT(token);
    const userRole = decoded?.roles;

    if (!userRole?.includes("admin")) {
      return NextResponse.redirect(new URL("/NotAuthorized", request.url)); // o página de error
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/Posts/:path*", "/Users/:path*", "/Settings/:path*"],
};
