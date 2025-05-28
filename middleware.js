import { NextResponse } from 'next/server';

const protectedModules = ['/Posts', '/Users', '/Settings']; // rutas que requieren auth

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('token')?.value;

  // Verifica si la ruta empieza por alguno de los módulos protegidos
  const isProtected = protectedModules.some((route) => pathname.startsWith(route));

  if (isProtected && !token) {
    return NextResponse.redirect(new URL('/Login', request.url));
  }

  return NextResponse.next();
}

// Aplica el middleware solo a rutas bajo los módulos definidos
export const config = {
  matcher: ['/Posts/:path*', '/Users/:path*', '/Settings/:path*'],
};
