import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { prisma } from '../../../lib/prisma';

export async function PATCH(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    if (!token) return new Response('Unauthenticated', { status: 401 });

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    const email = payload.email;

    const { profilePicUrl } = await req.json();

    await prisma.user.update({
      where: { email: email as string },
      data: { profilePicUrl },
    });

    return new Response('Updated', { status: 200 });
  } catch (error) {
    console.error('Error updating profile picture:', error);
    return new Response('Failed', { status: 500 });
  }
}
