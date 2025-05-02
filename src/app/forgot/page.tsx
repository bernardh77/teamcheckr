"use client";
import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [success, setSuccess] = useState(false);

  const error = (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) && (touched || submitted);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    if (email && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setSuccess(true);
      // Here you would trigger your backend reset logic
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#2C3333] py-12 px-4">
      <form
        className="bg-white rounded-2xl shadow-lg px-8 py-10 w-full max-w-[400px] mx-auto"
        onSubmit={handleSubmit}
        noValidate
      >
        <h1 className="text-2xl font-bold text-center text-[#2C3333] mb-4">Forgot your password?</h1>
        <p className="text-center text-[#395B64] mb-6 text-sm">
          Enter your email address and we&apos;ll send you a link to reset your password.
        </p>
        {success ? (
          <div className="text-green-600 text-center mb-6">
            If an account exists for <span className="font-semibold">{email}</span>, a reset link has been sent.
          </div>
        ) : (
          <>
            <div className="mb-4">
              <label htmlFor="email" className="block font-medium mb-1 text-[#2C3333]">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className={`w-full rounded border px-3 py-2 bg-white text-[#2C3333] focus:outline-none focus:ring-2 focus:ring-[#395B64] placeholder-gray-400 ${error ? 'border-[#F76C6C]' : 'border-gray-300'}`}
                value={email}
                onChange={e => setEmail(e.target.value)}
                onBlur={() => setTouched(true)}
                required
                placeholder="Enter your email"
              />
              {error && <p className="text-[#F76C6C] text-xs mt-1">Please enter a valid email address.</p>}
            </div>
            <button
              type="submit"
              className="w-full bg-[#395B64] hover:bg-[#2C3333] text-white font-semibold py-2 rounded transition-colors mb-4"
            >
              Send Reset Link
            </button>
          </>
        )}
        <div className="text-center">
          <Link href="/login" className="text-[#395B64] hover:underline text-sm">
            Back to Login
          </Link>
        </div>
      </form>
    </main>
  );
}