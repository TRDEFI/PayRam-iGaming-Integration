"use client";

import { useEffect, useState } from "react";

export default function Features() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: (
        <svg className="w-8 h-8 text-[#f59e0b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
      ),
      title: "Self-Custody",
      description: "Cüzdanlarınız size ait. Özel anahtarlarınız her zaman sizin kontrolünüzde. Merkezi otorite yok.",
      stat: "100%",
      statLabel: "Cüzdan kontrolü",
    },
    {
      icon: (
        <svg className="w-8 h-8 text-[#f59e0b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
        </svg>
      ),
      title: "Anında Kurulum",
      description: "10 dakikada canlıya geçin. Karmaşık KYC/KYB süreçleri yok, email ile hemen başlayın.",
      stat: "10dk",
      statLabel: "Canlıya geçiş",
    },
    {
      icon: (
        <svg className="w-8 h-8 text-[#f59e0b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
        </svg>
      ),
      title: "190+ Ülke",
      description: "Kredi kartı, Apple Pay, Google Pay, banka havalesi ve 175+ ödeme yöntemi destekliyor.",
      stat: "175+",
      statLabel: "Ödeme yöntemi",
    },
    {
      icon: (
        <svg className="w-8 h-8 text-[#f59e0b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
        </svg>
      ),
      title: "Akıllı Yönlendirme",
      description: "En iyi ödeme yöntemini otomatik seçer. Ülke ve tutara göre optimizasyon ile maksimum dönüşüm.",
      stat: "3x",
      statLabel: "Dönüşüm artışı",
    },
    {
      icon: (
        <svg className="w-8 h-8 text-[#f59e0b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
        </svg>
      ),
      title: "Çoklu Zincir",
      description: "Ethereum, Base, Polygon, Tron, Bitcoin tek platformda. Solana ve TON roadmap'te.",
      stat: "5+",
      statLabel: "Blockchain",
    },
    {
      icon: (
        <svg className="w-8 h-8 text-[#f59e0b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
      ),
      title: "Güvenli Sweep",
      description: "SmartSweep ile otomatik toplama. Gas-verimli, anahtarsız mimari ile fonlarınız güvende.",
      stat: "%0.25",
      statLabel: "Sweep fee",
    },
  ];

  return (
    <section id="features" className="section-padding relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#12121a] to-[#0a0a0f]" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 bg-[#1a1a25] border border-[rgba(245,158,11,0.2)] rounded-full px-4 py-2 mb-6">
            <span className="text-[#f59e0b] text-sm font-medium">Özellikler</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-display)' }}>
            Neden <span className="text-gradient">TRDEFI</span>?
          </h2>
          <p className="text-xl text-[#94a3b8] leading-relaxed">
            Bireysel kullanıcılar ve işletmeler için tasarlanmış kapsamlı kripto ödeme çözümleri.
          </p>
        </div>

        {/* Features Grid - Asymmetric */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group bg-[#12121a] border border-[rgba(245,158,11,0.1)] rounded-2xl p-8 hover:border-[rgba(245,158,11,0.3)] transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Icon */}
              <div className="w-14 h-14 bg-[#f59e0b]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#f59e0b]/20 transition-colors">
                {feature.icon}
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-white mb-3" style={{ fontFamily: 'var(--font-display)' }}>
                {feature.title}
              </h3>
              <p className="text-[#94a3b8] leading-relaxed mb-6">
                {feature.description}
              </p>

              {/* Stat */}
              <div className="flex items-end gap-2 pt-4 border-t border-[rgba(255,255,255,0.05)]">
                <span className="text-3xl font-bold text-gradient" style={{ fontFamily: 'var(--font-mono)' }}>
                  {feature.stat}
                </span>
                <span className="text-[#64748b] text-sm pb-1">{feature.statLabel}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <a href="#cta" className="btn-primary inline-flex items-center gap-2">
            Hemen Başla
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
