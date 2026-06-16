"use client";

import { useEffect, useState } from "react";

export default function HowItWorks() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const steps = [
    {
      step: "01",
      title: "Hesap Oluştur",
      subtitle: "Sadece 30 saniye",
      description: "E-posta adresinizle ücretsiz hesap oluşturun. KYC/KYB gerekmez, tamamen anonim başlayın.",
      illustration: (
        <svg viewBox="0 0 240 200" className="w-full h-full">
          <rect x="10" y="10" width="220" height="180" rx="12" fill="#1a1a2e" stroke="#f59e0b" strokeWidth="2" strokeDasharray="6 3" opacity="0.9"/>
          <circle cx="120" cy="70" r="35" fill="none" stroke="#f59e0b" strokeWidth="2" opacity="0.3"/>
          <circle cx="120" cy="70" r="28" fill="#1e1e3a" stroke="#f59e0b" strokeWidth="2"/>
          <circle cx="120" cy="62" r="10" fill="#f59e0b"/>
          <path d="M100 85 Q120 100 140 85" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round"/>
          <rect x="75" y="115" width="90" height="45" rx="6" fill="#1e1e3a" stroke="#60a5fa" strokeWidth="2"/>
          <path d="M75 115 L120 145 L165 115" fill="none" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="155" cy="55" r="12" fill="#22c55e" opacity="0.9"/>
          <path d="M149 55 L153 59 L161 51" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          <line x1="25" y1="175" x2="80" y2="175" stroke="#f59e0b" strokeWidth="1" strokeDasharray="4 4" opacity="0.4"/>
          <line x1="160" y1="175" x2="215" y2="175" stroke="#f59e0b" strokeWidth="1" strokeDasharray="4 4" opacity="0.4"/>
          <circle cx="120" cy="70" r="50" fill="url(#glow1)" opacity="0.15"/>
          <defs>
            <radialGradient id="glow1">
              <stop offset="0%" stopColor="#f59e0b"/>
              <stop offset="100%" stopColor="transparent"/>
            </radialGradient>
          </defs>
        </svg>
      ),
      details: ["KYC gerekmez", "30 saniyede tamamlanır", "IP adresi kaydedilmez"],
    },
    {
      step: "02",
      title: "Kripto Al veya Aktar",
      subtitle: "Esnek ödeme seçenekleri",
      description: "Kredi kartı, banka havalesi ile crypto satın alın veya mevcut cüzdanınızdan transfer edin.",
      illustration: (
        <svg viewBox="0 0 240 200" className="w-full h-full">
          <rect x="10" y="10" width="220" height="180" rx="12" fill="#1a1a2e" stroke="#f59e0b" strokeWidth="2" strokeDasharray="6 3" opacity="0.9"/>
          <rect x="25" y="35" width="85" height="55" rx="8" fill="#1e1e3a" stroke="#60a5fa" strokeWidth="2"/>
          <rect x="35" y="48" width="35" height="8" rx="2" fill="#f59e0b"/>
          <rect x="35" y="62" width="55" height="6" rx="2" fill="#60a5fa" opacity="0.4"/>
          <circle cx="90" cy="75" r="8" fill="#ef4444" opacity="0.6"/>
          <circle cx="78" cy="75" r="8" fill="#f59e0b" opacity="0.6"/>
          <path d="M118 62 L138 62" stroke="#22c55e" strokeWidth="2" strokeDasharray="4 2"/>
          <polygon points="138,58 146,62 138,66" fill="#22c55e"/>
          <circle cx="170" cy="62" r="28" fill="#1e1e3a" stroke="#f59e0b" strokeWidth="2"/>
          <text x="170" y="68" textAnchor="middle" fill="#f59e0b" fontSize="18" fontWeight="bold">₿</text>
          <path d="M45 115 L85 115" stroke="#a78bfa" strokeWidth="2" strokeDasharray="4 2"/>
          <polygon points="85,111 93,115 85,119" fill="#a78bfa"/>
          <rect x="100" y="100" width="45" height="40" rx="6" fill="#1e1e3a" stroke="#a78bfa" strokeWidth="2"/>
          <text x="122" y="125" textAnchor="middle" fill="#a78bfa" fontSize="10">WALLET</text>
          <path d="M152 120 L172 120" stroke="#22c55e" strokeWidth="2" strokeDasharray="4 2"/>
          <polygon points="172,116 180,120 172,124" fill="#22c55e"/>
          <rect x="185" y="100" width="45" height="40" rx="6" fill="#1e1e3a" stroke="#f59e0b" strokeWidth="2"/>
          <text x="207" y="118" textAnchor="middle" fill="#f59e0b" fontSize="8">PayRam</text>
          <text x="207" y="130" textAnchor="middle" fill="#f59e0b" fontSize="8">WALLET</text>
          <circle cx="85" cy="165" r="18" fill="#1e1e3a" stroke="#2775CA" strokeWidth="2"/>
          <text x="85" y="170" textAnchor="middle" fill="#2775CA" fontSize="10" fontWeight="bold">$</text>
          <path d="M108 165 L128 165" stroke="#22c55e" strokeWidth="2" strokeDasharray="4 2"/>
          <polygon points="128,161 136,165 128,169" fill="#22c55e"/>
          <circle cx="160" cy="165" r="18" fill="#1e1e3a" stroke="#ef4444" strokeWidth="2"/>
          <text x="160" y="170" textAnchor="middle" fill="#ef4444" fontSize="10" fontWeight="bold">T</text>
          <circle cx="170" cy="62" r="40" fill="url(#glow2)" opacity="0.1"/>
          <defs>
            <radialGradient id="glow2">
              <stop offset="0%" stopColor="#f59e0b"/>
              <stop offset="100%" stopColor="transparent"/>
            </radialGradient>
          </defs>
        </svg>
      ),
      details: ["Visa, Mastercard destekli", "Apple Pay, Google Pay", "Kripto transfer"],
    },
    {
      step: "03",
      title: "İşlemleri Yönet",
      subtitle: "Tam kontrol paneli",
      description: "Tüm işlemlerinizi tek noktadan takip edin. Otomatik sweep, bakiye yönetimi ve detaylı raporlama.",
      illustration: (
        <svg viewBox="0 0 240 200" className="w-full h-full">
          <rect x="10" y="10" width="220" height="180" rx="12" fill="#1a1a2e" stroke="#f59e0b" strokeWidth="2" strokeDasharray="6 3" opacity="0.9"/>
          <rect x="25" y="25" width="190" height="110" rx="8" fill="#0f0f23" stroke="#334155" strokeWidth="2"/>
          <rect x="25" y="25" width="190" height="22" rx="8" fill="#1e1e3a"/>
          <circle cx="40" cy="36" r="4" fill="#ef4444"/>
          <circle cx="52" cy="36" r="4" fill="#f59e0b"/>
          <circle cx="64" cy="36" r="4" fill="#22c55e"/>
          <rect x="40" y="75" width="14" height="45" rx="2" fill="#22c55e" opacity="0.9"/>
          <rect x="60" y="55" width="14" height="65" rx="2" fill="#60a5fa" opacity="0.9"/>
          <rect x="80" y="65" width="14" height="55" rx="2" fill="#a78bfa" opacity="0.9"/>
          <rect x="100" y="45" width="14" height="75" rx="2" fill="#f59e0b" opacity="0.9"/>
          <rect x="120" y="55" width="14" height="65" rx="2" fill="#ef4444" opacity="0.9"/>
          <rect x="140" y="40" width="14" height="80" rx="2" fill="#22c55e" opacity="0.9"/>
          <rect x="160" y="50" width="14" height="70" rx="2" fill="#60a5fa" opacity="0.9"/>
          <rect x="180" y="38" width="14" height="82" rx="2" fill="#f59e0b" opacity="0.9"/>
          <circle cx="80" cy="165" r="28" fill="#0f0f23" stroke="#334155" strokeWidth="2"/>
          <path d="M80 165 L80 137 A28 28 0 0 1 105 155 Z" fill="#22c55e"/>
          <path d="M80 165 L105 155 A28 28 0 0 1 100 188 Z" fill="#60a5fa"/>
          <path d="M80 165 L100 188 A28 28 0 0 1 60 188 Z" fill="#f59e0b"/>
          <path d="M80 165 L60 188 A28 28 0 0 1 55 155 Z" fill="#ef4444"/>
          <rect x="135" y="140" width="85" height="25" rx="4" fill="#1e1e3a" stroke="#22c55e" strokeWidth="1"/>
          <text x="177" y="156" textAnchor="middle" fill="#22c55e" fontSize="10" fontWeight="bold">$24,580</text>
          <rect x="135" y="170" width="85" height="20" rx="4" fill="#1e1e3a" stroke="#60a5fa" strokeWidth="1"/>
          <text x="177" y="184" textAnchor="middle" fill="#60a5fa" fontSize="8">128 İşlem</text>
          <circle cx="205" cy="35" r="10" fill="#ef4444"/>
          <text x="205" y="39" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">3</text>
          <circle cx="120" cy="90" r="60" fill="url(#glow3)" opacity="0.08"/>
          <defs>
            <radialGradient id="glow3">
              <stop offset="0%" stopColor="#22c55e"/>
              <stop offset="100%" stopColor="transparent"/>
            </radialGradient>
          </defs>
        </svg>
      ),
      details: ["Otomatik sweep", "Detaylı raporlama", "Multi-wallet destek"],
    },
  ];

  return (
    <section id="how-it-works" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#12121a] to-[#0a0a0f]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-[#1a1a25] border border-[rgba(245,158,11,0.2)] rounded-full px-5 py-2 mb-6">
            <svg className="w-5 h-5 text-[#f59e0b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span className="text-[#f59e0b] text-sm font-semibold tracking-wide">3 BASIT ADIM</span>
          </div>
          
          <h2 className={`text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ fontFamily: 'var(--font-display)' }}>
            Nasıl <span className="text-gradient">Çalışır</span>?
          </h2>
          <p className={`text-[#94a3b8] text-xl max-w-3xl mx-auto transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            3 basit adımda kripto ödemelerinizi güvenle yönetin.
          </p>
        </div>

        {/* Steps with Timeline */}
        <div className="relative">
          {/* Vertical Timeline Line (Desktop) */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#f59e0b]/20 via-[#f59e0b]/40 to-[#f59e0b]/20" />

          <div className="space-y-12 lg:space-y-0">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`relative transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                } ${activeStep === index ? 'z-10' : ''}`}
                style={{ transitionDelay: `${index * 200}ms` }}
                onMouseEnter={() => setActiveStep(index)}
              >
                {/* Timeline Node */}
                <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-[#12121a] border-2 border-[#f59e0b] rounded-full items-center justify-center z-10 shadow-lg shadow-[#f59e0b]/20">
                  <span className="text-2xl font-bold text-gradient" style={{ fontFamily: 'var(--font-mono)' }}>
                    {step.step}
                  </span>
                </div>

                {/* Content Grid */}
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${index % 2 === 0 ? '' : 'lg:direction-rtl'}`}>
                  {/* Illustration */}
                  <div className={`${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div className={`relative bg-[#12121a] border border-[rgba(245,158,11,0.2)] rounded-3xl p-6 transition-all duration-500 ${
                      activeStep === index ? 'border-[rgba(245,158,11,0.5)] shadow-xl shadow-[#f59e0b]/10' : ''
                    }`}>
                      <div className="w-full h-64 rounded-xl overflow-hidden">
                        {step.illustration}
                      </div>
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className={`${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div className="lg:hidden flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#f59e0b] to-[#d97706] rounded-xl flex items-center justify-center shadow-lg shadow-[#f59e0b]/20">
                        <span className="text-xl font-bold text-white" style={{ fontFamily: 'var(--font-mono)' }}>{step.step}</span>
                      </div>
                      <div className="h-0.5 flex-1 bg-gradient-to-r from-[#f59e0b]/50 to-transparent" />
                    </div>

                    <div className="inline-flex items-center gap-2 text-[#f59e0b] text-sm font-medium mb-4">
                      <span style={{ fontFamily: 'var(--font-mono)' }}>ADIM {step.step}</span>
                      <span className="text-[#64748b]">—</span>
                      <span>{step.subtitle}</span>
                    </div>

                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                      {step.title}
                    </h3>

                    <p className="text-[#94a3b8] text-lg leading-relaxed mb-8">
                      {step.description}
                    </p>

                    {/* Detail List */}
                    <div className="space-y-3">
                      {step.details.map((detail, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className="w-6 h-6 bg-[#10b981]/20 rounded-full flex items-center justify-center flex-shrink-0">
                            <svg className="w-4 h-4 text-[#10b981]" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span className="text-[#cbd5e1]">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className={`text-center mt-20 transition-all duration-700 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <a href="#cta" className="btn-primary inline-flex items-center gap-2">
            Hemen Başlayın
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <p className="text-[#64748b] text-sm mt-4">Kredi kartı gerekmez • Ücretsiz deneme</p>
        </div>
      </div>
    </section>
  );
}
