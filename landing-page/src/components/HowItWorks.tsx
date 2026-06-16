"use client";

import { useEffect, useState } from "react";

export default function HowItWorks() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const steps = [
    {
      step: "1",
      title: "Hesap Oluştur",
      subtitle: "Sadece 30 saniye",
      description: "E-posta adresinizle ücretsiz hesap oluşturun. KYC/KYB gerekmez, tamamen anonim.",
      illustration: (
        <svg viewBox="0 0 200 200" className="w-full h-full">
          {/* Sketch paper background */}
          <rect x="20" y="20" width="160" height="160" rx="8" fill="#FFFEF7" stroke="#2D3748" strokeWidth="2" strokeDasharray="4 2"/>
          
          {/* User icon */}
          <circle cx="100" cy="75" r="30" fill="#FED7AA" stroke="#F97316" strokeWidth="3"/>
          <circle cx="100" cy="68" r="12" fill="#F97316"/>
          <path d="M75 95 Q100 115 125 95" fill="#F97316" stroke="#F97316" strokeWidth="2"/>
          
          {/* Email icon */}
          <rect x="60" y="120" width="80" height="40" rx="4" fill="#BFDBFE" stroke="#3B82F6" strokeWidth="2"/>
          <path d="M60 120 L100 145 L140 120" fill="none" stroke="#3B82F6" strokeWidth="2"/>
          
          {/* Checkmark */}
          <circle cx="150" cy="50" r="15" fill="#10B981"/>
          <path d="M142 50 L148 56 L158 44" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round"/>
          
          {/* Sketch lines */}
          <line x1="30" y1="180" x2="90" y2="180" stroke="#CBD5E0" strokeWidth="2" strokeDasharray="3 3"/>
          <line x1="110" y1="180" x2="170" y2="180" stroke="#CBD5E0" strokeWidth="2" strokeDasharray="3 3"/>
        </svg>
      ),
      color: "from-orange-400 to-orange-600",
      tip: "IP adresiniz kaydedilmez",
    },
    {
      step: "2",
      title: "Cüzdanınızı Bağlayın",
      subtitle: "Güvenli bağlantı",
      description: "MetaMask veya diğer cüzdanlarınızı bağlayın. Özel anahtarlarınız asla sunucularımıza gönderilmez.",
      illustration: (
        <svg viewBox="0 0 200 200" className="w-full h-full">
          {/* Sketch paper background */}
          <rect x="20" y="20" width="160" height="160" rx="8" fill="#FFFEF7" stroke="#2D3748" strokeWidth="2" strokeDasharray="4 2"/>
          
          {/* Wallet */}
          <rect x="55" y="50" width="90" height="70" rx="6" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="3"/>
          <rect x="55" y="50" width="90" height="20" rx="6" fill="#F59E0B"/>
          <circle cx="120" cy="85" r="12" fill="#FBBF24" stroke="#F59E0B" strokeWidth="2"/>
          <rect x="75" y="80" width="30" height="10" rx="2" fill="#F59E0B"/>
          
          {/* Connection arrows */}
          <path d="M40 100 L55 100" stroke="#10B981" strokeWidth="3" strokeDasharray="4 2"/>
          <path d="M145 100 L160 100" stroke="#10B981" strokeWidth="3" strokeDasharray="4 2"/>
          
          {/* Security shield */}
          <path d="M100 140 L80 150 L80 170 Q100 185 120 170 L120 150 Z" fill="#10B981" stroke="#059669" strokeWidth="2"/>
          <path d="M95 160 L100 165 L110 155" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round"/>
          
          {/* Key icons */}
          <circle cx="40" cy="60" r="8" fill="#8B5CF6" stroke="#7C3AED" strokeWidth="2"/>
          <rect x="48" y="57" width="15" height="6" fill="#8B5CF6"/>
          
          <circle cx="160" cy="130" r="8" fill="#8B5CF6" stroke="#7C3AED" strokeWidth="2"/>
          <rect x="137" y="127" width="15" height="6" fill="#8B5CF6"/>
        </svg>
      ),
      color: "from-amber-400 to-amber-600",
      tip: "MetaMask, Trust Wallet, Rainbow",
    },
    {
      step: "3",
      title: "Kripto Alın veya Satın",
      subtitle: "Çoklu ödeme yöntemi",
      description: "Kredi kartı, banka havalesi veya doğrudan kripto transferi ile işlem yapın.",
      illustration: (
        <svg viewBox="0 0 200 200" className="w-full h-full">
          {/* Sketch paper background */}
          <rect x="20" y="20" width="160" height="160" rx="8" fill="#FFFEF7" stroke="#2D3748" strokeWidth="2" strokeDasharray="4 2"/>
          
          {/* Credit card */}
          <rect x="30" y="50" width="80" height="50" rx="6" fill="#3B82F6" stroke="#2563EB" strokeWidth="2"/>
          <rect x="40" y="65" width="30" height="8" rx="2" fill="#FBBF24"/>
          <rect x="40" y="80" width="50" height="6" rx="2" fill="white" opacity="0.5"/>
          
          {/* Arrow */}
          <path d="M120 75 L140 75" stroke="#F97316" strokeWidth="3" markerEnd="url(#arrowhead)"/>
          
          {/* Crypto coin */}
          <circle cx="160" cy="75" r="25" fill="#F59E0B" stroke="#D97706" strokeWidth="3"/>
          <text x="160" y="80" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">₿</text>
          
          {/* Bank icon */}
          <rect x="30" y="120" width="50" height="40" rx="4" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="2"/>
          <rect x="35" y="125" width="40" height="8" fill="#9CA3AF"/>
          <rect x="38" y="138" width="8" height="17" fill="#9CA3AF"/>
          <rect x="51" y="138" width="8" height="17" fill="#9CA3AF"/>
          <rect x="64" y="138" width="8" height="17" fill="#9CA3AF"/>
          
          {/* Arrow */}
          <path d="M90 140 L110 140" stroke="#F97316" strokeWidth="3" markerEnd="url(#arrowhead)"/>
          
          {/* USDC coin */}
          <circle cx="140" cy="140" r="22" fill="#2775CA" stroke="#1E40AF" strokeWidth="2"/>
          <text x="140" y="145" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">$</text>
          
          {/* Transfer arrows */}
          <path d="M130 160 L150 160" stroke="#10B981" strokeWidth="2"/>
          <path d="M150 160 L145 155 M150 160 L145 165" stroke="#10B981" strokeWidth="2"/>
          
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#F97316"/>
            </marker>
          </defs>
        </svg>
      ),
      color: "from-yellow-400 to-yellow-600",
      tip: "Visa, Mastercard, Havale",
    },
    {
      step: "4",
      title: "İşlemlerinizi Yönetin",
      subtitle: "Tam kontrol",
      description: "Tüm işlemlerinizi tek noktadan takip edin. Otomatik sweep ve detaylı raporlama.",
      illustration: (
        <svg viewBox="0 0 200 200" className="w-full h-full">
          {/* Sketch paper background */}
          <rect x="20" y="20" width="160" height="160" rx="8" fill="#FFFEF7" stroke="#2D3748" strokeWidth="2" strokeDasharray="4 2"/>
          
          {/* Dashboard */}
          <rect x="35" y="35" width="130" height="100" rx="4" fill="#1E293B" stroke="#475569" strokeWidth="2"/>
          
          {/* Chart bars */}
          <rect x="45" y="80" width="12" height="45" rx="2" fill="#10B981"/>
          <rect x="62" y="60" width="12" height="65" rx="2" fill="#3B82F6"/>
          <rect x="79" y="70" width="12" height="55" rx="2" fill="#8B5CF6"/>
          <rect x="96" y="45" width="12" height="80" rx="2" fill="#F59E0B"/>
          <rect x="113" y="55" width="12" height="70" rx="2" fill="#EF4444"/>
          <rect x="130" y="40" width="12" height="85" rx="2" fill="#10B981"/>
          <rect x="147" y="50" width="12" height="75" rx="2" fill="#3B82F6"/>
          
          {/* Pie chart */}
          <circle cx="100" cy="155" r="25" fill="#F3F4F6" stroke="#D1D5DB" strokeWidth="2"/>
          <path d="M100 155 L100 130 A25 25 0 0 1 122 145 Z" fill="#10B981"/>
          <path d="M100 155 L122 145 A25 25 0 0 1 115 175 Z" fill="#3B82F6"/>
          <path d="M100 155 L115 175 A25 25 0 0 1 85 175 Z" fill="#F59E0B"/>
          <path d="M100 155 L85 175 A25 25 0 0 1 78 145 Z" fill="#EF4444"/>
          <path d="M100 155 L78 145 A25 25 0 0 1 100 130 Z" fill="#8B5CF6"/>
          
          {/* Notification bell */}
          <circle cx="165" cy="45" r="12" fill="#EF4444"/>
          <path d="M160 45 L165 40 L170 45" fill="none" stroke="white" strokeWidth="2"/>
          <rect x="163" y="45" width="4" height="6" fill="white"/>
        </svg>
      ),
      color: "from-orange-500 to-amber-500",
      tip: "Otomatik sweep, raporlama",
    },
  ];

  return (
    <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black/50 to-black/30">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-4 py-2 mb-6">
            <svg className="w-5 h-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span className="text-orange-400 text-sm font-medium">Basit & Hızlı</span>
          </div>
          
          <h2 className={`text-4xl md:text-6xl font-bold text-white mb-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Nasıl <span className="text-gradient">Çalışır</span>?
          </h2>
          <p className={`text-gray-400 text-xl max-w-3xl mx-auto transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            4 basit adımda kripto ödemelerinizi güvenle yönetin.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`group relative transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              } ${activeStep === index ? 'scale-105' : ''}`}
              style={{ transitionDelay: `${index * 150}ms` }}
              onMouseEnter={() => setActiveStep(index)}
            >
              {/* Sketch-style card */}
              <div className="relative bg-[#FFFEF7] rounded-2xl p-6 shadow-xl border-2 border-dashed border-gray-300 hover:border-orange-400 transition-all duration-300">
                {/* Step number badge */}
                <div className={`absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br ${step.color} rounded-xl flex items-center justify-center shadow-lg`}>
                  <span className="text-2xl font-bold text-white">{step.step}</span>
                </div>
                
                {/* Paper clip decoration */}
                <div className="absolute -top-3 right-8 text-4xl opacity-30 rotate-45">📎</div>
                
                {/* Content */}
                <div className="flex flex-col lg:flex-row gap-6 mt-4">
                  {/* Illustration */}
                  <div className="flex-shrink-0 w-full lg:w-48 h-48 bg-gray-100 rounded-xl overflow-hidden border border-gray-200">
                    {step.illustration}
                  </div>
                  
                  {/* Text */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-2xl font-bold text-gray-800">{step.title}</h3>
                    </div>
                    <p className="text-orange-600 font-medium text-sm mb-3">{step.subtitle}</p>
                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
                    
                    {/* Tip badge */}
                    <div className="mt-4 inline-flex items-center gap-2 bg-green-50 border border-green-200 rounded-full px-3 py-1">
                      <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-green-700 text-xs font-medium">{step.tip}</span>
                    </div>
                  </div>
                </div>
                
                {/* Sketch-style decorative elements */}
                <div className="absolute bottom-2 right-2 text-gray-300 text-xs font-mono">
                  #{step.step.toString().padStart(2, '0')}
                </div>
              </div>
              
              {/* Connection line */}
              {index < steps.length - 1 && index % 2 === 0 && (
                <div className="hidden lg:block absolute top-1/2 -right-6 w-12 h-0.5 bg-gradient-to-r from-orange-400 to-transparent"></div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className={`text-center mt-16 transition-all duration-700 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex flex-col sm:flex-row items-center gap-4">
            <a
              href="#pricing"
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
