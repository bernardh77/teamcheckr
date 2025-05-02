"use client";
import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const errors = {
    email: (!form.email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) && submitted,
    password: !form.password && submitted,
  };

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    if (Object.values(errors).every((v) => !v)) {
      alert("Logged in! (No backend yet)");
    }
  }

  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-[#2C3333] py-12 px-4">
      <form
        className="bg-white rounded-2xl shadow-lg px-6 py-8 w-full max-w-[450px] mx-auto mt-16"
        onSubmit={handleSubmit}
        noValidate
      >
        <h1 className="text-2xl font-bold text-center text-[#2C3333] mb-6">Login to your Account</h1>
        <div className="mb-5">
          <label htmlFor="email" className="block font-medium mb-1 text-[#2C3333]">User Email</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            className={`w-full rounded border px-3 py-2 bg-white text-[#2C3333] focus:outline-none focus:ring-2 focus:ring-[#395B64] ${errors.email ? 'border-[#F76C6C]' : 'border-gray-300'}`}
            value={form.email}
            onChange={handleChange}
            required
          />
          {errors.email && <p className="text-[#F76C6C] text-xs mt-1">Valid email is required.</p>}
        </div>
        <div className="mb-5 relative">
          <label htmlFor="password" className="block font-medium mb-1 text-[#2C3333]">Password</label>
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            className={`w-full rounded border px-3 py-2 bg-white text-[#2C3333] focus:outline-none focus:ring-2 focus:ring-[#395B64] ${errors.password ? 'border-[#F76C6C]' : 'border-gray-300'}`}
            value={form.password}
            onChange={handleChange}
            required
          />
          <button
            type="button"
            className="absolute right-2 top-10 text-sm text-[#395B64]"
            tabIndex={-1}
            onClick={() => setShowPassword((v) => !v)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
          {errors.password && <p className="text-[#F76C6C] text-xs mt-1">Password is required.</p>}
        </div>
        <button
          type="submit"
          className="w-full bg-[#395B64] hover:bg-[#2C3333] text-white font-semibold py-2 rounded transition-colors mb-2"
        >
          Sign in
        </button>
        <div className="flex justify-end mb-6">
          <Link href="/forgot" className="text-[#395B64] text-sm hover:underline">Forgot Password?</Link>
        </div>
        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-300" />
          <span className="mx-3 text-gray-500 text-sm">New to TeamCheckr?</span>
          <div className="flex-grow border-t border-gray-300" />
        </div>
        <Link href="/signup">
          <button
            type="button"
            className="w-full bg-white hover:bg-gray-100 text-[#2C3333] font-semibold py-2 rounded border border-gray-300 transition-colors"
          >
            Create an account
          </button>
        </Link>
      </form>
    </main>
  );
}
