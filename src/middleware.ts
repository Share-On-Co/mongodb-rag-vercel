import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get('currentUser')?.value
  console.log(request.nextUrl)

  if (currentUser && request.nextUrl.pathname.startsWith('/login') || currentUser && request.nextUrl.pathname.startsWith('/register')) {
    return Response.redirect(new URL('/', request.url))
  }
 
  else if (!currentUser && request.nextUrl.pathname.startsWith('/register')) {
    return 
  }
  else if (!currentUser && !request.nextUrl.pathname.startsWith('/login')) {
    return Response.redirect(new URL('/login', request.url))
  }
}
 
export const config = {
  matcher: ['/((?!api|_next/static|_next/image))',
    '/login',
    '/register'
  ],
}