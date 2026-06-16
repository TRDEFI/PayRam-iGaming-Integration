"use client";

import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-orange-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 grid grid-cols-2 gap-1">
              <div className="bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold">T</div>
              <div className="bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold">R</div>
              <div className="bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold">D</div>
              <div className="bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold">F</div>
            </div>
            <div>
              <span className="text-xl font-bold text-white">TR</span>
              <span className="text-xl font-bold text-orange-500">DEFI</span>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <a href="#features" className="text-gray-300 hover:text-orange-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Özellikler
              </a>
              <a href="#how-it-works" className="text-gray-300 hover:text-orange-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Nasıl Çalışır
              </a>
              <a href="#b2b" className="text-gray-300 hover:text-orange-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                B2B Çözümler
              </a>
              <a href="#chains" className="text-gray-300 hover:text-orange-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Desteklenen Ağlar
              </a>
              <a href="#faq" className="text-gray-300 hover:text-orange-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                SSS
              </a>
            </div>
          </div>

          <div className="hidden md:block">
            <a href="#cta" className="bg-orange-500 hover:bg-orange-600 text-black px-4 py-2 rounded-md text-sm font-semibold transition-colors">
              Hemen Başla
            </a>
          </div>

          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-orange-400 hover:bg-gray-700 focus:outline-none"
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

      {isOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#features" className="text-gray-300 hover:text-orange-400 block px-3 py-2 rounded-md text-base font-medium">Özellikler</a>
            <a href="#how-it-works" className="text-gray-300 hover:text-orange-400 block px-3 py-2 rounded-md text-base font-medium">Nasıl Çalışır</a>
            <a href="#b2b" className="text-gray-300 hover:text-orange-400 block px-3 py-2 rounded-md text-base font-medium">B2B Çözümler</a>
            <a href="#chains" className="text-gray-300 hover:text-orange-400 block px-3 py-2 rounded-md text-base font-medium">Desteklenen Ağlar</a>
            <a href="#faq" className="text-gray-300 hover:text-orange-400 block px-3 py-2 rounded-md text-base font-medium">SSS</a>
            <a href="#cta" className="bg-orange-500 hover:bg-orange-600 text-black block px-3 py-2 rounded-md text-base font-semibold">Hemen Başla</a>
          </div>
        </div>
      )}
    </nav>
  );
}
