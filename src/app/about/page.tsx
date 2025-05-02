"use client";
import Image from 'next/image'
import Link from 'next/link'

export default function AboutPage() {
  return (
    <main className="bg-white min-h-screen py-12 px-4">
      {/* Mission Statement */}
      <section className="max-w-3xl mx-auto text-center mt-24 mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-[#2C3333] mb-4">Our Mission</h1>
        <p className="text-xl text-[#395B64]">TeamCheckr was created to help university students collaborate better — by making group projects fairer, smarter, and less stressful.</p>
      </section>

      {/* The Problem & Solution */}
      <section className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 mb-16">
        <div className="bg-[#E7F6F2] rounded-2xl p-8 shadow flex flex-col items-center text-center">
          <div className="mb-4">
            <span className="inline-block bg-[#A5C9CA] p-3 rounded-full">
              <svg className="w-8 h-8 text-[#2C3333]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0" /></svg>
            </span>
          </div>
          <h2 className="text-2xl font-bold text-[#2C3333] mb-2">The Problem</h2>
          <ul className="text-[#395B64] text-base list-disc list-inside text-left mx-auto">
            <li>Students often get randomly grouped.</li>
            <li>Some do all the work, others don&apos;t contribute.</li>
            <li>There&apos;s no accountability or visibility into past collaboration.</li>
          </ul>
        </div>
        <div className="bg-[#E7F6F2] rounded-2xl p-8 shadow flex flex-col items-center text-center">
          <div className="mb-4">
            <span className="inline-block bg-[#A5C9CA] p-3 rounded-full">
              <svg className="w-8 h-8 text-[#2C3333]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm0 10c-4.418 0-8-1.79-8-4V6c0-2.21 3.582-4 8-4s8 1.79 8 4v8c0 2.21-3.582 4-8 4z" /></svg>
            </span>
          </div>
          <h2 className="text-2xl font-bold text-[#2C3333] mb-2">The Solution</h2>
          <ul className="text-[#395B64] text-base list-disc list-inside text-left mx-auto">
            <li>Course-specific matching</li>
            <li>Anonymous peer reviews</li>
            <li>Mutual feedback release system</li>
            <li>Moderation & review credibility scores</li>
          </ul>
        </div>
      </section>

      {/* Who I Am */}
      <section className="max-w-3xl mx-auto text-center mb-16">
        <h2 className="text-2xl font-bold text-[#2C3333] mb-4">Who I Am</h2>
        <p className="text-[#395B64] mb-8">I&apos;m Bernard Haryanto, a Computer Science student who got tired of unfair group work. So I built the tool I wish I had — and now I&apos;m sharing it with you.</p>
        <div className="flex flex-col items-center justify-center gap-8">
          <div className="flex flex-col items-center">
            <Image src="https://api.dicebear.com/7.x/notionists/svg?seed=bernardharyanto" alt="Bernard Haryanto" width={72} height={72} className="rounded-full mb-2" unoptimized />
            <p className="font-semibold text-[#2C3333]">Bernard Haryanto</p>
            <p className="text-[#395B64] text-sm">Founder</p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="max-w-3xl mx-auto text-center mb-16">
        <h2 className="text-2xl font-bold text-[#2C3333] mb-4">Our Core Values</h2>
        <div className="flex flex-col sm:flex-row justify-center gap-8">
          <div className="flex flex-col items-center">
            <span className="text-3xl mb-2">🔍</span>
            <p className="font-semibold text-[#2C3333]">Transparency</p>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl mb-2">🤝</span>
            <p className="font-semibold text-[#2C3333]">Fair Collaboration</p>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl mb-2">📈</span>
            <p className="font-semibold text-[#2C3333]">Continuous Improvement</p>
          </div>
        </div>
      </section>

      {/* What's Next */}
      <section className="max-w-3xl mx-auto text-center mb-16">
        <h2 className="text-2xl font-bold text-[#2C3333] mb-4">What&apos;s Next</h2>
        <ul className="text-[#395B64] text-base list-disc list-inside text-left mx-auto inline-block">
          <li>AI matching</li>
          <li>Feedback summaries</li>
          <li>Integration with uni portals</li>
        </ul>
      </section>

      {/* Call to Action */}
      <section className="max-w-2xl mx-auto text-center mt-16">
        <h2 className="text-2xl font-bold text-[#2C3333] mb-4">Ready to work smarter with your next group?</h2>
        <p className="text-[#395B64] mb-8">Sign up today — it&apos;s free!</p>
        <Link href="/signup" className="bg-[#395B64] hover:bg-[#A5C9CA] text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors">
          Sign Up
        </Link>
      </section>
    </main>
  )
} 