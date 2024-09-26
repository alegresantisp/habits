// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Obtén el user.uid de la cookie
  const userId = request.cookies.get('auth_token'); // Ajusta el nombre si es necesario

  // Rutas públicas
  const publicPaths = ['/login', '/about', '/explanation']; // Añade las rutas que deseas hacer públicas

  // Si el usuario no está autenticado y trata de acceder a una ruta privada
  if (!userId && !publicPaths.includes(pathname)) {
    return NextResponse.redirect(new URL('/login', request.url)); // Redirige a la página de inicio de sesión
  }

  // Si el usuario está autenticado y trata de acceder a la página de inicio de sesión
  if (userId && pathname === '/login') {
    return NextResponse.redirect(new URL('/', request.url)); // Redirige a la página principal
  }

  return NextResponse.next(); // Permite el acceso a la ruta
}

export const config = {
  matcher: ['/((?!api|_next|static|favicon.ico).*)'], // Excluye las rutas de API y otros recursos
};

