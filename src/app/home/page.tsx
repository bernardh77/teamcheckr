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
    return <div>Not authenticated</div>;
  }

  return (
    <main>
      <h1>Welcome, {user.name}!</h1>
      <p>You are logged in as {user.email}</p>
    </main>
  );
}
