import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

type UserPayload = { name: string; email: string };

function getSecretKey() {
  return new TextEncoder().encode(process.env.JWT_SECRET || 'dev-secret');
}

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  let user: UserPayload | null = null;

  if (token) {
    try {
      const { payload } = await jwtVerify(token, getSecretKey());
      user = payload as UserPayload;
    } catch {
      user = null;
    }
  }

  if (!user) {
    return (
      <main className="min-h-screen w-full bg-[#E7F6F2] flex flex-col items-center py-16 px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-2xl text-center">
          <h1>Test</h1>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#E7F6F2] flex flex-col items-center py-16 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-2xl text-center">
        <h1 className="text-3xl font-bold text-[#2C3333] mb-2">Welcome, {user.name}!</h1>
        <p className="text-[#395B64] mb-6">
          You&apos;re logged in as <span className="font-semibold">{user.email}</span>
        </p>
      </div>
    </main>
  );
}
