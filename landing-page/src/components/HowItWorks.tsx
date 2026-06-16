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
      step: "1",
      title: "Hesap Oluştur",
      subtitle: "Sadece 30 saniye",
      description: "E-posta adresinizle ücretsiz hesap oluşturun. KYC/KYB gerekmez, tamamen anonim başlayın.",
      illustration: (
        <svg viewBox="0 0 240 200" className="w-full h-full">
          {/* Dark sketch background */}
          <rect x="10" y="10" width="220" height="180" rx="12" fill="#1a1a2e" stroke="#f59e0b" strokeWidth="2" strokeDasharray="6 3" opacity="0.9"/>
          
          {/* Glowing user icon */}
          <circle cx="120" cy="70" r="35" fill="none" stroke="#f59e0b" strokeWidth="2" opacity="0.3"/>
          <circle cx="120" cy="70" r="28" fill="#1e1e3a" stroke="#f59e0b" strokeWidth="2"/>
          <circle cx="120" cy="62" r="10" fill="#f59e0b"/>
          <path d="M100 85 Q120 100 140 85" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round"/>
          
          {/* Email envelope */}
          <rect x="75" y="115" width="90" height="45" rx="6" fill="#1e1e3a" stroke="#60a5fa" strokeWidth="2"/>
          <path d="M75 115 L120 145 L165 115" fill="none" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="155" cy="55" r="12" fill="#22c55e" opacity="0.9"/>
          <path d="M149 55 L153 59 L161 51" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          
          {/* Sketch decoration lines */}
          <line x1="25" y1="175" x2="80" y2="175" stroke="#f59e0b" strokeWidth="1" strokeDasharray="4 4" opacity="0.4"/>
          <line x1="160" y1="175" x2="215" y2="175" stroke="#f59e0b" strokeWidth="1" strokeDasharray="4 4" opacity="0.4"/>
          
          {/* Glow effect */}
          <circle cx="120" cy="70" r="50" fill="url(#glow1)" opacity="0.15"/>
          <defs>
            <radialGradient id="glow1">
              <stop offset="0%" stopColor="#f59e0b"/>
              <stop offset="100%" stopColor="transparent"/>
            </radialGradient>
          </defs>
        </svg>
      ),
      color: "from-orange-500 to-amber-500",
      tip: "IP adresiniz kaydedilmez",
      tipIcon: "🔒",
    },
    {
      step: "2",
      title: "Kripto Al veya Aktar",
      subtitle: "Esnek ödeme seçenekleri",
      description: "Kredi kartı, banka havalesi ile crypto satın alın veya mevcut cüzdanınızdan PayRam cüzdanınıza transfer edin.",
      illustration: (
        <svg viewBox="0 0 240 200" className="w-full h-full">
          {/* Dark sketch background */}
          <rect x="10" y="10" width="220" height="180" rx="12" fill="#1a1a2e" stroke="#f59e0b" strokeWidth="2" strokeDasharray="6 3" opacity="0.9"/>
          
          {/* Credit card */}
          <rect x="25" y="35" width="85" height="55" rx="8" fill="#1e1e3a" stroke="#60a5fa" strokeWidth="2"/>
          <rect x="35" y="48" width="35" height="8" rx="2" fill="#f59e0b"/>
          <rect x="35" y="62" width="55" height="6" rx="2" fill="#60a5fa" opacity="0.4"/>
          <circle cx="90" cy="75" r="8" fill="#ef4444" opacity="0.6"/>
          <circle cx="78" cy="75" r="8" fill="#f59e0b" opacity="0.6"/>
          
          {/* Arrow */}
          <path d="M118 62 L138 62" stroke="#22c55e" strokeWidth="2" strokeDasharray="4 2"/>
          <polygon points="138,58 146,62 138,66" fill="#22c55e"/>
          
          {/* Bitcoin */}
          <circle cx="170" cy="62" r="28" fill="#1e1e3a" stroke="#f59e0b" strokeWidth="2"/>
          <text x="170" y="68" textAnchor="middle" fill="#f59e0b" fontSize="18" fontWeight="bold">₿</text>
          
          {/* Transfer arrows (wallet to wallet) */}
          <path d="M45 115 L85 115" stroke="#a78bfa" strokeWidth="2" strokeDasharray="4 2"/>
          <polygon points="85,111 93,115 85,119" fill="#a78bfa"/>
          
          {/* External wallet */}
          <rect x="100" y="100" width="45" height="40" rx="6" fill="#1e1e3a" stroke="#a78bfa" strokeWidth="2"/>
          <text x="122" y="125" textAnchor="middle" fill="#a78bfa" fontSize="10">WALLET</text>
          
          {/* Arrow to PayRam */}
          <path d="M152 120 L172 120" stroke="#22c55e" strokeWidth="2" strokeDasharray="4 2"/>
          <polygon points="172,116 180,120 172,124" fill="#22c55e"/>
          
          {/* PayRam wallet */}
          <rect x="185" y="100" width="45" height="40" rx="6" fill="#1e1e3a" stroke="#f59e0b" strokeWidth="2"/>
          <text x="207" y="118" textAnchor="middle" fill="#f59e0b" fontSize="8">PayRam</text>
          <text x="207" y="130" textAnchor="middle" fill="#f59e0b" fontSize="8">WALLET</text>
          
          {/* USDC icon */}
          <circle cx="85" cy="165" r="18" fill="#1e1e3a" stroke="#2775CA" strokeWidth="2"/>
          <text x="85" y="170" textAnchor="middle" fill="#2775CA" fontSize="10" fontWeight="bold">$</text>
          
          {/* Arrow */}
          <path d="M108 165 L128 165" stroke="#22c55e" strokeWidth="2" strokeDasharray="4 2"/>
          <polygon points="128,161 136,165 128,169" fill="#22c55e"/>
          
          {/* TRX icon */}
          <circle cx="160" cy="165" r="18" fill="#1e1e3a" stroke="#ef4444" strokeWidth="2"/>
          <text x="160" y="170" textAnchor="middle" fill="#ef4444" fontSize="10" fontWeight="bold">T</text>
          
          {/* Glow effects */}
          <circle cx="170" cy="62" r="40" fill="url(#glow2)" opacity="0.1"/>
          <defs>
            <radialGradient id="glow2">
              <stop offset="0%" stopColor="#f59e0b"/>
              <stop offset="100%" stopColor="transparent"/>
            </radialGradient>
          </defs>
        </svg>
      ),
      color: "from-amber-500 to-yellow-500",
      tip: "Visa, Mastercard, Havale, Kripto Transfer",
      tipIcon: "💳",
    },
    {
      step: "3",
      title: "İşlemleri Yönet",
      subtitle: "Tam kontrol paneli",
      description: "Tüm işlemlerinizi tek noktadan takip edin. Otomatik sweep, bakiye yönetimi ve detaylı raporlama.",
      illustration: (
        <svg viewBox="0 0 240 200" className="w-full h-full">
          {/* Dark sketch background */}
          <rect x="10" y="10" width="220" height="180" rx="12" fill="#1a1a2e" stroke="#f59e0b" strokeWidth="2" strokeDasharray="6 3" opacity="0.9"/>
          
          {/* Dashboard frame */}
          <rect x="25" y="25" width="190" height="110" rx="8" fill="#0f0f23" stroke="#334155" strokeWidth="2"/>
          
          {/* Header bar */}
          <rect x="25" y="25" width="190" height="22" rx="8" fill="#1e1e3a"/>
          <circle cx="40" cy="36" r="4" fill="#ef4444"/>
          <circle cx="52" cy="36" r="4" fill="#f59e0b"/>
          <circle cx="64" cy="36" r="4" fill="#22c55e"/>
          
          {/* Chart bars - animated look */}
          <rect x="40" y="75" width="14" height="45" rx="2" fill="#22c55e" opacity="0.9"/>
          <rect x="60" y="55" width="14" height="65" rx="2" fill="#60a5fa" opacity="0.9"/>
          <rect x="80" y="65" width="14" height="55" rx="2" fill="#a78bfa" opacity="0.9"/>
          <rect x="100" y="45" width="14" height="75" rx="2" fill="#f59e0b" opacity="0.9"/>
          <rect x="120" y="55" width="14" height="65" rx="2" fill="#ef4444" opacity="0.9"/>
          <rect x="140" y="40" width="14" height="80" rx="2" fill="#22c55e" opacity="0.9"/>
          <rect x="160" y="50" width="14" height="70" rx="2" fill="#60a5fa" opacity="0.9"/>
          <rect x="180" y="38" width="14" height="82" rx="2" fill="#f59e0b" opacity="0.9"/>
          
          {/* Pie chart */}
          <circle cx="80" cy="165" r="28" fill="#0f0f23" stroke="#334155" strokeWidth="2"/>
          <path d="M80 165 L80 137 A28 28 0 0 1 105 155 Z" fill="#22c55e"/>
          <path d="M80 165 L105 155 A28 28 0 0 1 100 188 Z" fill="#60a5fa"/>
          <path d="M80 165 L100 188 A28 28 0 0 1 60 188 Z" fill="#f59e0b"/>
          <path d="M80 165 L60 188 A28 28 0 0 1 55 155 Z" fill="#ef4444"/>
          
          {/* Stats cards */}
          <rect x="135" y="140" width="85" height="25" rx="4" fill="#1e1e3a" stroke="#22c55e" strokeWidth="1"/>
          <text x="177" y="156" textAnchor="middle" fill="#22c55e" fontSize="10" fontWeight="bold">$24,580</text>
          
          <rect x="135" y="170" width="85" height="20" rx="4" fill="#1e1e3a" stroke="#60a5fa" strokeWidth="1"/>
          <text x="177" y="184" textAnchor="middle" fill="#60a5fa" fontSize="8">128 İşlem</text>
          
          {/* Notification */}
          <circle cx="205" cy="35" r="10" fill="#ef4444"/>
          <text x="205" y="39" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">3</text>
          
          {/* Glow effects */}
          <circle cx="120" cy="90" r="60" fill="url(#glow3)" opacity="0.08"/>
          <defs>
            <radialGradient id="glow3">
              <stop offset="0%" stopColor="#22c55e"/>
              <stop offset="100%" stopColor="transparent"/>
            </radialGradient>
          </defs>
        </svg>
      ),
      color: "from-green-500 to-emerald-500",
      tip: "Otomatik sweep, raporlama",
      tipIcon: "📊",
    },
  ];

  return (
    <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 via-gray-900 to-black">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-5 py-2 mb-6">
            <svg className="w-5 h-5 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span className="text-orange-400 text-sm font-semibold tracking-wide">3 BASIT ADIM</span>
          </div>
          
          <h2 className={`text-4xl md:text-6xl font-bold text-white mb-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Nasıl <span className="text-gradient">Çalışır</span>?
          </h2>
          <p className={`text-gray-400 text-xl max-w-3xl mx-auto transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            3 basit adımda kripto ödemelerinizi güvenle yönetin.
          </p>
        </div>

        {/* Steps - Horizontal Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`group relative transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              } ${activeStep === index ? 'scale-105' : ''}`}
              style={{ transitionDelay: `${index * 200}ms` }}
              onMouseEnter={() => setActiveStep(index)}
            >
              {/* Connection line (between cards) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-orange-400/50 to-transparent z-10"></div>
              )}
              
              {/* Card */}
              <div className="relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-orange-500/50 transition-all duration-500 h-full">
                {/* Step number badge */}
                <div className="absolute -top-4 left-6">
                  <div className={`w-10 h-10 bg-gradient-to-br ${step.color} rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20`}>
                    <span className="text-lg font-bold text-white">{step.step}</span>
                  </div>
                </div>
                
                {/* Illustration */}
                <div className="w-full h-48 mb-6 mt-4 rounded-xl overflow-hidden border border-gray-700/30">
                  {step.illustration}
                </div>
                
                {/* Content */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-orange-400 font-medium text-sm mb-3">{step.subtitle}</p>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">{step.description}</p>
                  
                  {/* Tip badge */}
                  <div className="inline-flex items-center gap-2 bg-gray-800 border border-gray-700 rounded-full px-3 py-1.5">
                    <span className="text-sm">{step.tipIcon}</span>
                    <span className="text-gray-300 text-xs font-medium">{step.tip}</span>
                  </div>
                </div>
                
                {/* Step indicator */}
                <div className="absolute bottom-3 right-3">
                  <span className="text-gray-600 text-xs font-mono">#{step.step.toString().padStart(2, '0')}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className={`text-center mt-16 transition-all duration-700 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex flex-col sm:flex-row items-center gap-4">
            <a
              href="#cta"
              className="group px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full text-white font-semibold hover:from-orange-600 hover:to-amber-600 transition-all duration-300 shadow-lg shadow-orange-500/25 flex items-center gap-2"
            >
              Hemen Başlayın
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <span className="text-gray-500 text-sm">Kredi kartı gerekmez • Ücretsiz deneme</span>
          </div>
        </div>
      </div>
    </section>
  );
}
