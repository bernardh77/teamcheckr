// src/app/api/experience/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { prisma } from '@/lib/prisma';

const getSecretKey = () => new TextEncoder().encode(process.env.JWT_SECRET || 'dev-secret');

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  if (!token) return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });

  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    const email = payload.email as string;

    const user = await prisma.user.findUnique({ where: { email }, include: { experiences: true } });
    return NextResponse.json(user?.experiences || []);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  if (!token) return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });

  const body = await req.json();

  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    const email = payload.email as string;
    const user = await prisma.user.findUnique({ where: { email } });

    const experience = await prisma.experience.create({
      data: {
        userId: user!.id,
        ...body,
        startDate: new Date(body.startDate),
        endDate: body.endDate ? new Date(body.endDate) : null,
      },
    });

    return NextResponse.json(experience);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to create' }, { status: 500 });
  }
}
