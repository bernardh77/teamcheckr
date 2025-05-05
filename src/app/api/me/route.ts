// /api/me/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  if (!token) return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const { payload } = await jwtVerify(token, secret);
  const email = payload.email as string;

  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      name: true,
      email: true,
      bio: true,
      profilePicUrl: true,
      experiences: true,
    },
  });

  return NextResponse.json(user);
}
