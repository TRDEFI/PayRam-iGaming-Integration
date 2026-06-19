"use client";

import { useState, useEffect } from "react";

export default function Navbar({ onOpenPopup }: { onOpenPopup?: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-[#0a0a0f]/90 backdrop-blur-md border-b border-[rgba(245,158,11,0.1)]' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 grid grid-cols-2 gap-1">
              <div className="bg-[#f59e0b] rounded-full flex items-center justify-center text-black text-xs font-bold">T</div>
              <div className="bg-[#f59e0b] rounded-full flex items-center justify-center text-black text-xs font-bold">R</div>
              <div className="bg-[#f59e0b] rounded-full flex items-center justify-center text-black text-xs font-bold">D</div>
              <div className="bg-[#f59e0b] rounded-full flex items-center justify-center text-black text-xs font-bold">F</div>
            </div>
            <div>
              <span className="text-xl font-bold text-white" style={{ fontFamily: 'var(--font-display)' }}>TR</span>
              <span className="text-xl font-bold text-[#f59e0b]" style={{ fontFamily: 'var(--font-display)' }}>DEFI</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6">
              <a href="#features" className="text-[#94a3b8] hover:text-[#f59e0b] text-sm font-medium transition-colors">
                Özellikler
              </a>
              <a href="#how-it-works" className="text-[#94a3b8] hover:text-[#f59e0b] text-sm font-medium transition-colors">
                Nasıl Çalışır
              </a>
              <a href="#b2b" className="text-[#94a3b8] hover:text-[#f59e0b] text-sm font-medium transition-colors">
                B2B Çözümler
              </a>
              <a href="#pricing" className="text-[#94a3b8] hover:text-[#f59e0b] text-sm font-medium transition-colors">
                Fiyatlandırma
              </a>
              <a href="#chains" className="text-[#94a3b8] hover:text-[#f59e0b] text-sm font-medium transition-colors">
                Ağlar
              </a>
              <a href="#faq" className="text-[#94a3b8] hover:text-[#f59e0b] text-sm font-medium transition-colors">
                SSS
              </a>
            </div>
          </div>

          {/* CTA */}
          <div className="hidden md:block">
            <button onClick={onOpenPopup} className="btn-primary text-sm px-4 py-2">
              Hemen Başla
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="bg-[#1a1a25] inline-flex items-center justify-center p-2 rounded-md text-[#94a3b8] hover:text-[#f59e0b] hover:bg-[#252535] focus:outline-none transition-colors"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Menüyü aç</span>
              {!isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#0a0a0f]/95 backdrop-blur-md border-t border-[rgba(245,158,11,0.1)]" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#features" className="text-[#94a3b8] hover:text-[#f59e0b] block px-3 py-2 rounded-md text-base font-medium">Özellikler</a>
            <a href="#how-it-works" className="text-[#94a3b8] hover:text-[#f59e0b] block px-3 py-2 rounded-md text-base font-medium">Nasıl Çalışır</a>
            <a href="#b2b" className="text-[#94a3b8] hover:text-[#f59e0b] block px-3 py-2 rounded-md text-base font-medium">B2B Çözümler</a>
            <a href="#pricing" className="text-[#94a3b8] hover:text-[#f59e0b] block px-3 py-2 rounded-md text-base font-medium">Fiyatlandırma</a>
            <a href="#chains" className="text-[#94a3b8] hover:text-[#f59e0b] block px-3 py-2 rounded-md text-base font-medium">Ağlar</a>
            <a href="#faq" className="text-[#94a3b8] hover:text-[#f59e0b] block px-3 py-2 rounded-md text-base font-medium">SSS</a>
            <button onClick={onOpenPopup} className="btn-primary block text-center mt-4">Hemen Başla</button>
          </div>
        </div>
      )}
    </nav>
  );
}
