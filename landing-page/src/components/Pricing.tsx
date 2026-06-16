"use client";

import { useEffect, useState } from "react";

export default function Pricing() {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnnual, setIsAnnual] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const plans = [
    {
      name: "Bireysel",
      subtitle: "Kişisel Kullanım",
      price: "Ücretsiz",
      period: "ömür boyu",
      description: "Kripto al/sat/transfer yapmak isteyen bireysel kullanıcılar için.",
      highlight: false,
      features: [
        { text: "Sınırsız işlem", included: true },
        { text: "5+ blockchain desteği", included: true },
        { text: "Self-custody cüzdan", included: true },
        { text: "Kredi kartı ile alım", included: true },
        { text: "Otomatik sweep", included: true },
        { text: "Mobil uygulama", included: true },
        { text: "7/24 destek", included: true },
        { text: "API erişimi", included: false },
      ],
      cta: "Hemen Başla",
      ctaStyle: "btn-secondary",
    },
    {
      name: "B2B İş Ortağı",
      subtitle: "İşletme Entegrasyonu",
      price: "$500",
      period: "tek seferlik kurulum",
      description: "Platformuna kripto ödeme eklemek isteyen işletmeler için.",
      highlight: true,
      features: [
        { text: "Sınırsız işlem", included: true },
        { text: "5+ blockchain desteği", included: true },
        { text: "Self-custody altyapı", included: true },
        { text: "Kredi kartı ile alım", included: true },
        { text: "Otomatik sweep", included: true },
        { text: "7/24 öncelikli destek", included: true },
        { text: "REST API + Webhook", included: true },
        { text: "Özel hesap yöneticisi", included: true },
      ],
      cta: "B2B Ortak Ol",
      ctaStyle: "btn-primary",
      badge: "En Popüler",
    },
  ];

  return (
    <section id="pricing" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#12121a] to-[#0a0a0f]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#1a1a25] border border-[rgba(245,158,11,0.2)] rounded-full px-5 py-2 mb-6">
            <svg className="w-5 h-5 text-[#f59e0b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-[#f59e0b] text-sm font-semibold tracking-wide">FİYATLANDIRMA</span>
          </div>
          
          <h2 className={`text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ fontFamily: 'var(--font-display)' }}>
            Basit ve <span className="text-gradient">Şeffaf</span>
          </h2>
          <p className={`text-[#94a3b8] text-xl max-w-3xl mx-auto transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Bireysel kullanıcılar ücretsiz başlar. İşletmeler sadece işlem komisyonu öder.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-[#12121a] rounded-3xl p-8 transition-all duration-500 ${
                plan.highlight
                  ? 'border-2 border-[#f59e0b] shadow-xl shadow-[#f59e0b]/10'
                  : 'border border-[rgba(245,158,11,0.1)]'
              } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#f59e0b] to-[#d97706] text-black text-sm font-bold px-4 py-1 rounded-full">
                  {plan.badge}
                </div>
              )}

              {/* Header */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                  {plan.name}
                </h3>
                <p className="text-[#94a3b8] text-sm">{plan.subtitle}</p>
              </div>

              {/* Price */}
              <div className="mb-8">
                <div className="flex items-baseline gap-2">
                  <span className={`text-5xl font-bold ${plan.highlight ? 'text-gradient' : 'text-white'}`} style={{ fontFamily: 'var(--font-mono)' }}>
                    {plan.price}
                  </span>
                </div>
                <p className="text-[#64748b] text-sm mt-2">{plan.period}</p>
              </div>

              {/* Description */}
              <p className="text-[#94a3b8] mb-8">{plan.description}</p>

              {/* Features */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    {feature.included ? (
                      <div className="w-5 h-5 rounded-full bg-[#10b981]/20 flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-[#10b981]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    ) : (
                      <div className="w-5 h-5 rounded-full bg-[#64748b]/20 flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-[#64748b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </div>
                    )}
                    <span className={feature.included ? 'text-[#cbd5e1]' : 'text-[#64748b]'}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a href="#cta" className={`block text-center ${plan.ctaStyle}`}>
                {plan.cta}
              </a>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className={`mt-16 text-center transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex flex-col sm:flex-row items-center gap-6 text-[#94a3b8] text-sm">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-[#10b981]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Kredi kartı gerekmez</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-[#10b981]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>İstediğiniz zaman iptal edin</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-[#10b981]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>7/24 teknik destek</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
