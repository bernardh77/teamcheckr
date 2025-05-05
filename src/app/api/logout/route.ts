import { NextResponse } from 'next/server';

export async function POST() {
  const res = NextResponse.json({ success: true });

  // Clear the token by setting it to empty and expired
  res.cookies.set('token', '', {
    httpOnly: true,
    path: '/',
    expires: new Date(0),
  });

  return res;
}