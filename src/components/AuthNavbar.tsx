// src/components/AuthNavbar.tsx
'use client';

import Link from 'next/link';

type Props = {
  user: { name: string; email: string } | null;
};

const handleLogout = async () => {
  await fetch('/api/logout', {
    method: 'POST',
  });

  window.location.href = '/login'; // ⬅️ Redirect to login page
};

export default function AuthNavbar({ user }: Props) {
  return (
    <nav className="w-full bg-[#2C3333] px-6 py-4 flex items-center justify-between shadow">
      <Link href="/home" className="text-2xl font-bold text-[#A5C9CA]">TeamCheckr</Link>
      <div className="flex items-center gap-6">
        <Link href="/groups" className="text-white hover:text-[#A5C9CA]">Groups</Link>
        <Link href="/reviews" className="text-white hover:text-[#A5C9CA]">Reviews</Link>
        <Link href="/profile" className="text-white hover:text-[#A5C9CA]">Profile</Link>
        {user && <span className="text-[#A5C9CA] font-semibold ml-4">{user.name}</span>}
        <button onClick={handleLogout} className="ml-4 px-4 py-1 bg-[#395B64] text-white rounded hover:bg-[#A5C9CA] hover:text-[#2C3333] transition-colors">Log out</button>
      </div>
    </nav>
  );
}
