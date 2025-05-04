// src/components/AuthNavbar.tsx
'use client';

import Link from 'next/link';
import { useState } from 'react';

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
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full bg-[#2C3333] px-6 py-4 flex items-center justify-between shadow relative">
      <Link href="/home" className="text-2xl font-bold text-[#A5C9CA]">
        TeamCheckr
      </Link>
      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-6">
        <Link href="/groups" className="text-white hover:text-[#A5C9CA] hover:text-[#2C3333] px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
          Groups
        </Link>
        <Link href="/reviews" className="text-white hover:text-[#A5C9CA] hover:text-[#2C3333] px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
          Reviews
        </Link>
        <Link href="/profile" className="text-white hover:text-[#A5C9CA] hover:text-[#2C3333] px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
          Profile
        </Link>
        {user && <span className="text-[#A5C9CA] font-semibold ml-4">{user.name}</span>}
        <button
          className="ml-4 px-4 py-1 rounded bg-[#395B64] text-white hover:bg-[#A5C9CA] hover:text-[#2C3333] font-semibold transition-colors"
          onClick={handleLogout}
        >
          Log out
        </button>
      </div>
      {/* Mobile Dropdown */}
      <div className="md:hidden flex items-center">
        <button
          onClick={() => setOpen((v) => !v)}
          className="text-white bg-[#395B64] p-2 rounded-lg flex items-center"
          aria-label="Open menu"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        {open && (
          <div className="absolute right-6 top-16 z-20 bg-white rounded-lg shadow w-44">
            <ul className="py-2 text-sm text-gray-700">
              <li>
                <Link
                  href="/profile"
                  className="block px-4 py-2 rounded hover:bg-[#395B64] hover:text-white transition-colors"
                  onClick={() => setOpen(false)}
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  href="/groups"
                  className="block px-4 py-2 rounded hover:bg-[#395B64] hover:text-white transition-colors"
                  onClick={() => setOpen(false)}
                >
                  Groups
                </Link>
              </li>
              <li>
                <Link
                  href="/reviews"
                  className="block px-4 py-2 rounded hover:bg-[#395B64] hover:text-white transition-colors"
                  onClick={() => setOpen(false)}
                >
                  Reviews
                </Link>
              </li>
              <li>
                <button
                  className="block w-full text-left px-4 py-2 rounded hover:bg-red-100 hover:text-red-700 text-red-600 transition-colors"
                  onClick={handleLogout}
                >
                  Sign out
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}
