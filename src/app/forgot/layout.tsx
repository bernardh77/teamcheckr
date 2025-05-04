import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col bg-[#2C3333]">
          <div className="flex-1 flex items-center justify-center">{children}</div>
      </div>
      <Footer />
    </>
  );
} 