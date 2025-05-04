// src/app/home/layout.tsx
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import AuthNavbar from '@/components/AuthNavbar';
import Footer from '@/components/Footer';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  let user: { name: string; email: string } | null = null;
  if (token) {
    try {
      user = jwt.verify(token, JWT_SECRET) as { name: string; email: string };
    } catch {
      user = null;
    }
  }

  return (
    <>
      <AuthNavbar user={user} />
      {children}
      <Footer />
    </>
  );
}
