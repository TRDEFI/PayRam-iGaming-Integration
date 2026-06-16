"use client";

import { useEffect, useState } from "react";

export default function CTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section id="cta" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#12121a] to-[#0a0a0f]" />
      
      {/* Glow Effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#f59e0b]/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className={`inline-flex items-center gap-2 bg-[#1a1a25] border border-[rgba(245,158,11,0.2)] rounded-full px-5 py-2 mb-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="w-2 h-2 bg-[#10b981] rounded-full animate-pulse" />
          <span className="text-[#94a3b8] text-sm font-medium">Şimdi Başlayın</span>
        </div>

        {/* Headline */}
        <h2 className={`text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ fontFamily: 'var(--font-display)' }}>
          Kripto Ödemelerin<br />
          <span className="text-gradient">Geleceğine</span> Adım Atın
        </h2>

        {/* Subheadline */}
        <p className={`text-xl md:text-2xl text-[#94a3b8] mb-12 max-w-2xl mx-auto transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          Bireysel kullanıcılar ve işletmeler için tasarlanmış güçlü kripto ödeme altyapısı. Hemen başlayın.
        </p>

        {/* CTAs */}
        <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <a
            href="https://payram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-lg px-8 py-4"
          >
            Ücretsiz Başla
          </a>
          <a
            href="mailto:info@trdefi.com"
            className="btn-secondary text-lg px-8 py-4"
          >
            İletişime Geç
          </a>
        </div>

        {/* Trust Indicators */}
        <div className={`flex flex-col sm:flex-row items-center justify-center gap-6 mt-12 transition-all duration-700 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex items-center gap-2 text-[#64748b] text-sm">
            <svg className="w-5 h-5 text-[#10b981]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Kredi kartı gerekmez</span>
          </div>
          <div className="flex items-center gap-2 text-[#64748b] text-sm">
            <svg className="w-5 h-5 text-[#10b981]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>10 dakikada canlı</span>
          </div>
          <div className="flex items-center gap-2 text-[#64748b] text-sm">
            <svg className="w-5 h-5 text-[#10b981]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>7/24 destek</span>
          </div>
        </div>
      </div>
    </section>
  );
}
