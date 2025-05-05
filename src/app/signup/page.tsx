"use client";
import { useState } from "react";

function passwordStrength(password: string) {
  const checks = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[a-z]/.test(password),
    /[0-9]/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ];
  return checks;
}

export default function SignUpPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    university: "",
    program: "",
    year: "",
    terms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [touched, setTouched] = useState<{ [k: string]: boolean }>({});
  const [submitted, setSubmitted] = useState(false);

  const strengthChecks = passwordStrength(form.password);
  const strength = strengthChecks.filter(Boolean).length;

  const errors = {
    name: !form.name && (touched.name || submitted),
    email: (!form.email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) && (touched.email || submitted),
    password: (!form.password || strength < 3) && (touched.password || submitted),
    confirmPassword: (form.confirmPassword !== form.password || !form.confirmPassword) && (touched.confirmPassword || submitted),
    university: !form.university && (touched.university || submitted),
    program: !form.program && (touched.program || submitted),
    year: !form.year && (touched.year || submitted),
    terms: !form.terms && submitted,
  };

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value, type } = e.target;
    let checked = false;
    if (type === "checkbox") {
      checked = (e.target as HTMLInputElement).checked;
    }
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) {
    setTouched((t) => ({ ...t, [e.target.name]: true }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    if (Object.values(errors).every((v) => !v)) {
      try {
        const res = await fetch('/api/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            password: form.password,
          }),
        });
        const data = await res.json();
        if (res.ok) {
          // Success: show a message or redirect
        //   alert('Account created! You can now log in.');
          // Optionally redirect: window.location.href = '/login';
          window.location.href = '/home';
        } else {
          // Show backend error (e.g., email already in use)
          alert(data.error || 'Signup failed');
        }
      } catch (err) {
        console.error(err);
        alert('Something went wrong. Please try again.');
      }
    }
  }

  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-[#2C3333] py-12 px-4">
    <form
        className="bg-white rounded-2xl shadow-lg px-6 py-8 w-full max-w-[450px] mx-auto mt-16 bg-red-200"
        onSubmit={handleSubmit}
        noValidate
    >
        <h1 className="text-2xl font-bold text-center text-[#2C3333] mb-6">Create your Account</h1>
        <div className="mb-4">
          <label className="block font-medium mb-1 text-[#2C3333]">Full Name</label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            className={`w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#395B64] text-[#2C3333] placeholder-gray-400 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
            value={form.name}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">Full name is required.</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block font-medium mb-1 text-[#2C3333]">Email Address</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            className={`w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#395B64] text-[#2C3333] placeholder-gray-400 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
            value={form.email}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            />
          {errors.email && <p className="text-red-500 text-xs mt-1">Valid email is required.</p>}
        </div>
        <div className="mb-4 relative">
          <label htmlFor="password" className="block font-medium mb-1 text-[#2C3333]">Password</label>
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            className={`w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#395B64] text-[#2C3333] placeholder-gray-400 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
            value={form.password}
            onChange={handleChange}
            onBlur={handleBlur}
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
          {/* Password strength bar */}
          <div className="h-2 w-full bg-gray-200 rounded mt-2">
            <div
              className={`h-2 rounded transition-all ${
                strength === 0 ? "w-0" :
                strength === 1 ? "w-1/5 bg-red-400" :
                strength === 2 ? "w-2/5 bg-orange-400" :
                strength === 3 ? "w-3/5 bg-yellow-400" :
                strength === 4 ? "w-4/5 bg-blue-400" :
                "w-full bg-green-500"
              }`}
            />
          </div>
          {/* Password checklist */}
          <ul className="text-xs mt-2 space-y-1">
            <li className={`flex items-center gap-1 ${strengthChecks[0] ? "text-green-600" : "text-[#2C3333]"}`}>
              {strengthChecks[0] ? (
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              ) : (
                <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              )}
              At least 8 characters
            </li>
            <li className={`flex items-center gap-1 ${strengthChecks[1] ? "text-green-600" : "text-[#2C3333]"}`}>
              {strengthChecks[1] ? (
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              ) : (
                <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              )}
              Uppercase letter
            </li>
            <li className={`flex items-center gap-1 ${strengthChecks[2] ? "text-green-600" : "text-[#2C3333]"}`}>
              {strengthChecks[2] ? (
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              ) : (
                <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              )}
              Lowercase letter
            </li>
            <li className={`flex items-center gap-1 ${strengthChecks[3] ? "text-green-600" : "text-[#2C3333]"}`}>
              {strengthChecks[3] ? (
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              ) : (
                <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              )}
              Number
            </li>
            <li className={`flex items-center gap-1 ${strengthChecks[4] ? "text-green-600" : "text-[#2C3333]"}`}>
              {strengthChecks[4] ? (
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              ) : (
                <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              )}
              Special character
            </li>
          </ul>
          {errors.password && <p className="text-red-500 text-xs mt-1">Password is too weak.</p>}
        </div>
        <div className="mb-4 relative">
          <label htmlFor="confirmPassword" className="block font-medium mb-1 text-[#2C3333]">Confirm Password</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirm ? "text" : "password"}
            autoComplete="new-password"
            className={`w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#395B64] text-[#2C3333] placeholder-gray-400 ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
            value={form.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          <button
            type="button"
            className="absolute right-2 top-10 text-sm text-[#395B64]"
            tabIndex={-1}
            onClick={() => setShowConfirm((v) => !v)}
          >
            {showConfirm ? "Hide" : "Show"}
          </button>
          {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">Passwords do not match.</p>}
        </div>
        {/* <div className="mb-4">
          <label htmlFor="university" className="block font-medium mb-1 text-[#2C3333]">University / Institution</label>
          <input
            id="university"
            name="university"
            type="text"
            className={`w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#395B64] ${errors.university ? 'border-red-500' : 'border-gray-300'}`}
            value={form.university}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          {errors.university && <p className="text-red-500 text-xs mt-1">University is required.</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="program" className="block font-medium mb-1 text-[#2C3333]">Program or Major</label>
          <input
            id="program"
            name="program"
            type="text"
            className={`w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#395B64] ${errors.program ? 'border-red-500' : 'border-gray-300'}`}
            value={form.program}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          {errors.program && <p className="text-red-500 text-xs mt-1">Program or major is required.</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="year" className="block font-medium mb-1 text-[#2C3333]">Year of Study</label>
          <select
            id="year"
            name="year"
            className={`w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#395B64] ${errors.year ? 'border-red-500' : 'border-gray-300'}`}
            value={form.year}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          >
            <option value="">Select year</option>
            {years.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
          {errors.year && <p className="text-red-500 text-xs mt-1">Year of study is required.</p>}
        </div> */}
        <div className="mb-6 flex items-center">
          <input
            id="terms"
            name="terms"
            type="checkbox"
            checked={form.terms}
            onChange={handleChange}
            className="mr-2"
            required
          />
          <label htmlFor="terms" className="text-sm text-[#2C3333]">I agree to the <a href="/terms" className="underline text-[#395B64]">Terms of Service</a></label>
          {errors.terms && <p className="text-red-500 text-xs ml-2">Required</p>}
        </div>
        <button
          type="submit"
          className="w-full bg-[#395B64] hover:bg-[#2C3333] text-white font-semibold py-2 rounded transition-colors"
        >
          Create Account
        </button>
        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-300" />
          <span className="mx-3 text-gray-500 text-sm">Already have an account?</span>
          <div className="flex-grow border-t border-gray-300" />
        </div>
        <a href="/login">
          <button
            type="button"
            className="w-full bg-white hover:bg-gray-100 text-[#2C3333] font-semibold py-2 rounded border border-gray-300 transition-colors"
          >
            Log in
          </button>
        </a>
      </form>
    </main>
  );
} 