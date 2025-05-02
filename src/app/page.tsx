import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-[#2C3333] text-white min-h-screen flex flex-col justify-center items-center px-4 pt-16">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Smarter Group Projects Start Here
          </h1>
          <p className="text-xl md:text-2xl text-[#A5C9CA] mb-8">
            TeamCheckr helps university students team up smarter — match by course, collaborate better, and review experiences anonymously.
          </p>
          <div className="space-x-4">
            <Link 
              href="/signup" 
              className="bg-[#395B64] hover:bg-[#A5C9CA] text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
            >
              Get Started
            </Link>
            <Link 
              href="/login" 
              className="border-2 border-[#A5C9CA] text-[#A5C9CA] hover:bg-[#A5C9CA] hover:text-[#2C3333] px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
            >
              Login
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-[#E7F6F2]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-[#2C3333]">
            Why Choose TeamCheckr?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="w-16 h-16 bg-[#A5C9CA] rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-[#2C3333]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-[#2C3333]">Smart Matching</h3>
              <p className="text-[#395B64]">Find compatible groupmates based on skills, availability, and course requirements.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="w-16 h-16 bg-[#A5C9CA] rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-[#2C3333]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-[#2C3333]">Anonymous Reviews</h3>
              <p className="text-[#395B64]">Share honest feedback about your group experience while maintaining privacy.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="w-16 h-16 bg-[#A5C9CA] rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-[#2C3333]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-[#2C3333]">Profile System</h3>
              <p className="text-[#395B64]">Showcase your skills, experience, and availability to find the perfect match.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-bold text-[#2C3333] mb-4">What Students Say About TeamCheckr</h2>
          <p className="text-[#395B64] text-lg">Join thousands of students who've made group projects less stressful and more successful.</p>
        </div>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Testimonial 1 */}
          <div className="bg-[#F8FAFC] rounded-2xl shadow p-8 flex flex-col items-center text-center">
            <Image src={`https://api.dicebear.com/7.x/notionists/svg?seed=kaynejuro`} alt="Kayne Juro" width={80} height={80} className="w-20 h-20 rounded-full mb-4" unoptimized />
            <h3 className="font-bold text-lg text-[#2C3333] mb-1">Kayne Juro</h3>
            <p className="text-[#395B64] text-sm mb-0">Computer Science Student</p>
            <p className="text-[#395B64] text-sm mb-2">Singapore Institute of Management</p>
            <p className="text-[#395B64] text-base mb-2">&quot;The connections you make at TeamCheckr are unparalleled, I found the best groupmates!&quot;</p>
          </div>
          {/* Testimonial 2 */}
          <div className="bg-[#F8FAFC] rounded-2xl shadow p-8 flex flex-col items-center text-center">
            <Image src={`https://api.dicebear.com/7.x/notionists/svg?seed=nickwijaya`} alt="Nick Wijaya" width={80} height={80} className="w-20 h-20 rounded-full mb-4" unoptimized />
            <h3 className="font-bold text-lg text-[#2C3333] mb-1">Nick Wijaya</h3>
            <p className="text-[#395B64] text-sm mb-0">Computer Science Student</p>
            <p className="text-[#395B64] text-sm mb-2">Swinburne University</p>
            <p className="text-[#395B64] text-base">&quot;TeamCheckr increased my motivation, my skills, and my network!&quot;</p>
          </div>
          {/* Testimonial 3 */}
          <div className="bg-[#F8FAFC] rounded-2xl shadow p-8 flex flex-col items-center text-center">
            <Image src={`https://api.dicebear.com/7.x/notionists/svg?seed=jonathanluhur`} alt="Jonathan Luhur" width={80} height={80} className="w-20 h-20 rounded-full mb-4" unoptimized />
            <h3 className="font-bold text-lg text-[#2C3333] mb-1">Jonathan Luhur</h3>
            <p className="text-[#395B64] text-sm mb-0">Mechatronics Student</p>
            <p className="text-[#395B64] text-sm mb-2">University of Technology Sydney</p>
            <p className="text-[#395B64] text-base">&quot;The pessimist complains about the wind; the optimist expects it to change; the realist adjusts the sails.&quot;</p>
          </div>
        </div>
      </section>

      {/* CTA Footer
      <footer className="bg-[#2C3333] text-white py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Find Your Perfect Group?</h2>
          <p className="text-[#A5C9CA] mb-8">Join thousands of students who have found their ideal study partners.</p>
          <div className="space-x-4">
            <Link 
              href="/signup" 
              className="bg-[#395B64] hover:bg-[#A5C9CA] text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
            >
              Sign Up Now
            </Link>
            <Link 
              href="/login" 
              className="border-2 border-[#A5C9CA] text-[#A5C9CA] hover:bg-[#A5C9CA] hover:text-[#2C3333] px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
            >
              Login
            </Link>
          </div>
        </div>
      </footer> */}
    </main>
  )
}
