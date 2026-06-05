import { Search, Menu } from 'lucide-react';
import { assets } from '../data';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 py-5 md:px-10 flex items-center justify-between text-onyx pointer-events-none mix-blend-difference text-white">
      {/* Left side: Hamburger & Menu */}
      <div className="flex items-center gap-4 pointer-events-auto w-1/3">
        <button className="flex items-center gap-3 hover:opacity-70 transition-opacity">
          <Menu className="w-5 h-5" strokeWidth={1.5} />
          <span className="font-body font-semibold text-[13px] tracking-wide hidden sm:inline">Menu</span>
        </button>
      </div>

      {/* Center: Crown Logo */}
      <div className="flex justify-center pointer-events-auto w-1/3">
        <a href="#" className="flex items-center justify-center hover:scale-105 transition-transform duration-300">
          <img src={assets.logo} alt="Rolex Logo" className="w-10 h-auto object-contain" />
        </a>
      </div>

      {/* Right side: Search & CTA */}
      <div className="flex items-center justify-end gap-6 pointer-events-auto w-1/3">
        <button className="hover:opacity-70 transition-opacity">
          <Search className="w-5 h-5" strokeWidth={2} />
        </button>
        <button className="hidden sm:flex items-center justify-center px-6 py-2 bg-[#0D422B] rounded-full font-body font-semibold text-[12px] tracking-wide hover:bg-[#165C3E] transition-colors border border-transparent text-white mix-blend-normal">
          Learn more
        </button>
      </div>
    </nav>
  );
}
