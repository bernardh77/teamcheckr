// src/middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

// Utility function to convert the secret to a crypto key
function getSecretKey() {
  return new TextEncoder().encode(JWT_SECRET);
}

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  const url = req.nextUrl.clone();

  if (url.pathname.startsWith('/home')) {
    if (!token) {
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }
    try {
      await jwtVerify(token, getSecretKey()); // ✅ Edge-compatible
      return NextResponse.next();
    } catch (err) {
      console.log('Token verification failed:', err);
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/home/:path*'],
};
