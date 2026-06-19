"use client";

import { useEffect, useState } from "react";
import Navbar from "./Navbar";

export default function Hero({ onOpenPopup }: { onOpenPopup: () => void }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      setMousePosition({
        x: (clientX / innerWidth - 0.5) * 20,
        y: (clientY / innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative overflow-hidden min-h-screen gradient-mesh">
      <Navbar onOpenPopup={onOpenPopup} />
      
      {/* Gradient Mesh Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute top-0 left-0 w-full h-full opacity-30"
          style={{
            background: `
              radial-gradient(ellipse 80% 50% at 20% 40%, rgba(245, 158, 11, 0.15) 0%, transparent 50%),
              radial-gradient(ellipse 60% 40% at 80% 20%, rgba(16, 185, 129, 0.1) 0%, transparent 50%),
              radial-gradient(ellipse 50% 50% at 50% 80%, rgba(245, 158, 11, 0.08) 0%, transparent 50%)
            `
          }}
        />
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(245, 158, 11, 0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(245, 158, 11, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <div className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Column - Content */}
          <div className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[#1a1a25] border border-[rgba(245,158,11,0.2)] rounded-full px-4 py-2 mb-8">
              <div className="w-2 h-2 bg-[#10b981] rounded-full animate-pulse"></div>
              <span className="text-[#94a3b8] text-sm font-medium">PayRam Altyapısı ile Güçlendirildi</span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-[0.95] tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
              Kripto
              <br />
              Ödemelerin
              <br />
              <span className="text-gradient">Geleceği</span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-[#94a3b8] mb-10 max-w-lg leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
              Bireysel kullanıcılar için kolay kripto alım-satım, işletmeler için güçlü B2B ödeme altyapısı.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={onOpenPopup}
                className="btn-primary text-center text-lg"
              >
                Ücretsiz Başla
              </button>
              <a 
                href="#how-it-works" 
                className="btn-secondary text-center text-lg"
              >
                Nasıl Çalışır?
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center gap-8 mt-12 text-sm text-[#64748b]">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#10b981]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>KYC Gerekmez</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#10b981]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>10 Dakikada Canlı</span>
              </div>
            </div>
          </div>

          {/* Right Column - Visual */}
          <div className={`relative transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            {/* Main Card */}
            <div className="relative bg-[#12121a] border border-[rgba(245,158,11,0.2)] rounded-3xl p-8 shadow-2xl">
              {/* Card Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#f59e0b] to-[#d97706] rounded-xl flex items-center justify-center">
                    <span className="text-black font-bold">₿</span>
                  </div>
                  <div>
                    <div className="text-white font-semibold">BTC/USDC</div>
                    <div className="text-[#64748b] text-sm">Bitcoin</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[#10b981] text-xl font-bold">+2.4%</div>
                  <div className="text-[#64748b] text-sm">24s</div>
                </div>
              </div>

              {/* Price Display */}
              <div className="bg-[#0a0a0f] rounded-2xl p-6 mb-6">
                <div className="text-[#64748b] text-sm mb-2">Güncel Fiyat</div>
                <div className="text-4xl font-bold text-white" style={{ fontFamily: 'var(--font-mono)' }}>
                  $67,842.50
                </div>
                <div className="text-[#10b981] text-sm mt-1">+$1,592.30 (2.40%)</div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-4">
                <button className="bg-[#10b981] hover:bg-[#059669] text-white py-4 rounded-xl font-semibold transition-all">
                  Al
                </button>
                <button className="bg-[#ef4444] hover:bg-[#dc2626] text-white py-4 rounded-xl font-semibold transition-all">
                  Sat
                </button>
              </div>

              {/* Supported Assets */}
              <div className="flex items-center justify-center gap-4 mt-6 pt-6 border-t border-[rgba(255,255,255,0.05)]">
                <span className="text-[#64748b] text-sm">Desteklenen:</span>
                <div className="flex items-center gap-2">
                  <span className="text-[#f59e0b]">BTC</span>
                  <span className="text-[#627eea]">ETH</span>
                  <span className="text-[#2775CA]">USDC</span>
                  <span className="text-[#8247e5]">POL</span>
                </div>
              </div>
            </div>

            {/* Floating Stats */}
            <div className="absolute -top-6 -right-6 bg-[#1a1a25] border border-[rgba(245,158,11,0.2)] rounded-2xl p-4 shadow-xl animate-float">
              <div className="text-[#10b981] text-2xl font-bold">+12.5%</div>
              <div className="text-[#64748b] text-xs">Bu Ay</div>
            </div>

            <div className="absolute -bottom-4 -left-4 bg-[#1a1a25] border border-[rgba(245,158,11,0.2)] rounded-2xl p-4 shadow-xl animate-float" style={{ animationDelay: '2s' }}>
              <div className="text-white text-lg font-bold">850K+</div>
              <div className="text-[#64748b] text-xs">İşlem</div>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {[
            { value: "$100M+", label: "İşlem Hacmi" },
            { value: "850K+", label: "Zincir Üzerinde İşlem" },
            { value: "190+", label: "Ülke Desteği" },
            { value: "%99.9", label: "Uptime" },
          ].map((stat, index) => (
            <div key={index} className="text-center p-6 bg-[#12121a] border border-[rgba(245,158,11,0.1)] rounded-2xl">
              <div className="text-3xl md:text-4xl font-bold text-gradient mb-2" style={{ fontFamily: 'var(--font-mono)' }}>
                {stat.value}
              </div>
              <div className="text-[#64748b] text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
