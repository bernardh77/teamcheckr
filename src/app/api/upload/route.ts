import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { prisma } from '../../../lib/prisma';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: Request) {
  try {
    const { file } = await req.json();

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(file, {
      folder: 'teamcheckr_uploads',
    });

    // Get user from token
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;  
    if (!token) return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    const email = payload.email as string;

    // Update user in DB
    await prisma.user.update({
      where: { email },
      data: {
        profilePicUrl: result.secure_url,
      },
    });

    return NextResponse.json({ url: result.secure_url });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
