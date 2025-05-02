import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="bg-[#34403A] fixed w-full z-50 text-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-[#A5C9CA]">TeamCheckr</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* <Link href="/features" className="hover:text-[#A5C9CA] transition-colors">
              Features
            </Link>
            <Link href="/testimonials" className="hover:text-[#A5C9CA] transition-colors">
              Testimonials
            </Link> */}
            <Link href="/about" className="hover:text-[#A5C9CA] transition-colors">
              About
            </Link>
            <div className="flex space-x-4">
              <Link 
                href="/login" 
                className="border-2 border-[#A5C9CA] text-[#A5C9CA] hover:bg-[#A5C9CA] hover:text-[#2C3333] px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
              >
                Login
              </Link>
              <Link 
                href="/signup" 
                className="bg-[#395B64] hover:bg-[#A5C9CA] text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
              >
                Sign Up
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-white hover:text-[#A5C9CA] focus:outline-none">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
} 