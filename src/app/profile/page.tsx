'use client';

import { useState, useEffect, useRef } from 'react';
import ExperienceSection from '@/components/ExperienceSection';
interface UserPayload {
  name: string;
  email: string;
  university?: string;
  bio?: string;
  experience?: string[];
  profilePicUrl?: string;
  gender?: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserPayload | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [profilePic, setProfilePic] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(true); 

  // Fetch user data from secure API route
  useEffect(() => {
    fetch('/api/me')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data) {
          setUser(data);
          setProfilePic(data.profilePicUrl || getDicebearUrl(data.name));
        }
      })
      .finally(() => setLoading(false)); // <-- MARK DONE
  }, []);

  const getDicebearUrl = (name: string,) => {
    const seed = encodeURIComponent(name);
    return `https://api.dicebear.com/9.x/notionists/svg?seed=${seed}`;
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const base64 = await toBase64(file);
    const res = await fetch('/api/upload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ file: base64 }),
    });

    const data = await res.json();
    setProfilePic(data.url);
    setModalOpen(false);

    // TODO: Persist updated URL to DB with another API call (e.g., PATCH /api/profile)
  };

  const toBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#2C3333]">
        <div className="text-white text-xl">Loading...</div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#2C3333]">
        <div className="text-white text-xl">Not authenticated.</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#E7F6F2] flex items-center justify-center px-4 py-16">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-2xl flex flex-col items-center text-center">
        {/* Avatar with modal trigger */}
        <div
          className="relative group cursor-pointer mb-3"
          onClick={() => setModalOpen(true)}
        >
          <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-[#395B64] hover:border-red-500 transition-all duration-200">
            <img
              src={profilePic}
              alt={user.name}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>

        {/* Basic Info */}
        <h1 className="text-3xl font-bold text-[#2C3333] mb-2">{user.name}</h1>
        <p className="text-[#395B64] mb-4">{user.email}</p>

        {user.university && (
          <div className="mb-4">
            <h2 className="font-semibold text-[#395B64]">University</h2>
            <p className="text-[#2C3333]">{user.university}</p>
          </div>
        )}

        {user.bio && (
          <div className="mb-4 max-w-lg">
            <h2 className="font-semibold text-[#395B64]">Bio</h2>
            <p className="text-[#2C3333]">{user.bio}</p>
          </div>
        )}

        {/* {user.experiences?.length > 0 && (
          <div className="mb-4 max-w-lg">
            <h2 className="font-semibold text-[#395B64]">Experience</h2>
            <ul className="text-left list-disc list-inside text-[#2C3333]">
              {user.experiences.map((exp, idx) => (
                <li key={idx}>{exp}</li>
              ))}
            </ul>
          </div>
        )} */}

        {/* Modal */}
        {modalOpen && (
          // <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50">

            <div className="bg-[#2C3333] rounded-xl overflow-hidden w-full max-w-md">
              <h3 className="text-white text-xl font-semibold text-center py-4 border-b border-gray-700">
                Change Profile Photo
              </h3>

              <div className="flex flex-col">
                <button
                  type="button"
                  className="text-blue-400 hover:bg-gray-700 py-4 font-medium border-b border-gray-700"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Upload Photo
                </button>
                <button
                  type="button"
                  className="text-red-500 hover:bg-gray-700 py-4 font-medium border-b border-gray-700"
                  onClick={() => {
                    const fallback = getDicebearUrl(user.name);
                    setProfilePic(fallback);
                    setModalOpen(false);
                    // Optional: Save fallback to DB
                  }}
                >
                  Remove Current Photo
                </button>
                <button
                  type="button"
                  className="text-white hover:bg-gray-700 py-4"
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
            </div>
          </div>
        )}
        <ExperienceSection />
      </div>
    </main>
  );
}
