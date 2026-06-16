"use client";

import { useEffect, useState } from "react";

export default function B2BSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<"benefits" | "how" | "pricing">("benefits");
  const [counters, setCounters] = useState({ partners: 0, volume: 0, uptime: 0 });

  useEffect(() => {
    setIsVisible(true);
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      setCounters({
        partners: Math.floor(150 * progress),
        volume: Math.floor(2.5 * progress * 10) / 10,
        uptime: Math.floor(99.9 * progress * 10) / 10,
      });
      if (step >= steps) clearInterval(timer);
    }, interval);
    return () => clearInterval(timer);
  }, []);

  const benefits = [
    {
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Sıfır Aylık Ücret",
      description: "Sadece işlem başına komisyon. Sabit gider yok, sadece kazandığınızda ödeyin.",
      stat: "%0.1-0.5",
      statLabel: "Komisyon Oranı",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
        </svg>
      ),
      title: "10 Dakikada Canlı",
      description: "Teknik bilgi gerekmez. Otomatik kurulum ve yapılandırma ile hemen başlayın.",
      stat: "10dk",
      statLabel: "Kurulum Süresi",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
      ),
      title: "Tam Kontrol",
      description: "Kendi sunucunuzda, kendi cüzdanlarınızla. Verileriniz asla paylaşılmaz.",
      stat: "Self-Custody",
      statLabel: "Güvenlik Modeli",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
        </svg>
      ),
      title: "Detaylı Raporlama",
      description: "İşlem geçmişi, bakiye takibi, otomatik mutabakat ve analitik panel.",
      stat: "Real-time",
      statLabel: "Veri Akışı",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
        </svg>
      ),
      title: "Esnek Entegrasyon",
      description: "REST API, webhook'lar, SDK'lar. Mevcut sisteminize kolayca entegre edin.",
      stat: "REST API",
      statLabel: "Entegrasyon",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
        </svg>
      ),
      title: "Çoklu Zincir",
      description: "Ethereum, Base, Polygon, Tron, Bitcoin. Müşterilerinize geniş seçenek sunun.",
      stat: "5+",
      statLabel: "Blockchain",
    },
  ];

  const howItWorksSteps = [
    {
      step: "01",
      title: "Başvuru Yap",
      description: "Formu doldurun, 24 saat içinde size ulaşalım.",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
      ),
    },
    {
      step: "02",
      title: "Kurulum Yap",
      description: "VPS'nize PayRam'ı kurun veya biz kuralım.",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.657 5.657a2.121 2.121 0 01-3-3l5.657-5.657m5.657 5.657L21 3m-5.25 5.25l5.25 5.25M3 21l5.25-5.25" />
        </svg>
      ),
    },
    {
      step: "03",
      title: "Entegre Et",
      description: "API'leri mevcut sisteminize bağlayın.",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
        </svg>
      ),
    },
    {
      step: "04",
      title: "Canlıya Geç",
      description: "Müşterileriniz kripto ödeme kabulmeye başlasın.",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.841m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
        </svg>
      ),
    },
  ];

  const testimonials = [
    {
      company: "CryptoBet",
      role: "CTO",
      quote: "TRDEFI ile 10 dakikada kripto ödemeleri almaya başladık. Geleneksel çözümler aylar sürüyordu.",
      metric: "3x dönüşüm artışı",
    },
    {
      company: "BetChain",
      role: "CEO",
      quote: "Sıfır aylık ücret modeli生意imizi değiştirdi. Sadece işlem başına ödeme yapıyoruz.",
      metric: "%80 maliyet düşüşü",
    },
    {
      company: "GameFi Pro",
      role: "Lead Dev",
      quote: "Self-custody modeli güven veriyor. Müşterilerimizin fondları her zaman güvende.",
      metric: "100% uptime",
    },
  ];

  return (
    <section id="b2b" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#12121a] to-[#0a0a0f]" />
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#f59e0b]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#10b981]/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 bg-[#1a1a25] border border-[rgba(245,158,11,0.2)] rounded-full px-5 py-2 mb-6">
            <svg className="w-5 h-5 text-[#f59e0b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <span className="text-[#f59e0b] text-sm font-semibold tracking-wide">B2B ÇÖZÜMLER</span>
          </div>
          
          <h2 className={`text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ fontFamily: 'var(--font-display)' }}>
            B2B <span className="text-gradient">İş Ortaklığı</span>
          </h2>
          <p className={`text-[#94a3b8] text-xl transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            İşletmeniz için güçlü kripto ödeme altyapısı. Sıfır aylık ücret, sadece işlem komisyonu.
          </p>
        </div>

        {/* Stats Bar */}
        <div className={`grid grid-cols-3 gap-4 mb-16 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-[#12121a] border border-[rgba(245,158,11,0.1)] rounded-2xl p-6 text-center">
            <div className="text-3xl md:text-4xl font-bold text-[#f59e0b] mb-2" style={{ fontFamily: 'var(--font-mono)' }}>
              {counters.partners}+
            </div>
            <div className="text-[#94a3b8] text-sm">Aktif İş Ortağı</div>
          </div>
          <div className="bg-[#12121a] border border-[rgba(245,158,11,0.1)] rounded-2xl p-6 text-center">
            <div className="text-3xl md:text-4xl font-bold text-[#fbbf24] mb-2" style={{ fontFamily: 'var(--font-mono)' }}>
              ${counters.volume}M+
            </div>
            <div className="text-[#94a3b8] text-sm">Aylık İşlem Hacmi</div>
          </div>
          <div className="bg-[#12121a] border border-[rgba(245,158,11,0.1)] rounded-2xl p-6 text-center">
            <div className="text-3xl md:text-4xl font-bold text-[#10b981] mb-2" style={{ fontFamily: 'var(--font-mono)' }}>
              %{counters.uptime}
            </div>
            <div className="text-[#94a3b8] text-sm">Uptime Garantisi</div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className={`flex justify-center mb-12 transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-[#1a1a25] rounded-full p-1 border border-[rgba(245,158,11,0.2)]">
            {(["benefits", "how", "pricing"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTab === tab
                    ? "bg-gradient-to-r from-[#f59e0b] to-[#d97706] text-black shadow-lg shadow-[#f59e0b]/25"
                    : "text-[#94a3b8] hover:text-white"
                }`}
              >
                {tab === "benefits" ? "Avantajlar" : tab === "how" ? "Nasıl Çalışır" : "Fiyatlandırma"}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className={`transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          {/* Benefits Tab - Bento Grid */}
          {activeTab === "benefits" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="group bg-[#12121a] border border-[rgba(245,158,11,0.1)] rounded-2xl p-6 hover:border-[rgba(245,158,11,0.3)] transition-all duration-500"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-14 h-14 bg-[#f59e0b]/10 rounded-xl flex items-center justify-center text-[#f59e0b] group-hover:bg-[#f59e0b]/20 transition-colors">
                      {benefit.icon}
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gradient" style={{ fontFamily: 'var(--font-mono)' }}>{benefit.stat}</div>
                      <div className="text-xs text-[#64748b]">{benefit.statLabel}</div>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2" style={{ fontFamily: 'var(--font-display)' }}>{benefit.title}</h3>
                  <p className="text-[#94a3b8] text-sm leading-relaxed">{benefit.description}</p>
                </div>
              ))}
            </div>
          )}

          {/* How It Works Tab */}
          {activeTab === "how" && (
            <div className="relative">
              <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-[#f59e0b]/0 via-[#f59e0b]/50 to-[#f59e0b]/0 -translate-y-1/2" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {howItWorksSteps.map((step, index) => (
                  <div
                    key={index}
                    className="relative bg-[#12121a] border border-[rgba(245,158,11,0.1)] rounded-2xl p-6 hover:border-[rgba(245,158,11,0.3)] transition-all duration-500 text-center group"
                  >
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-10 bg-gradient-to-br from-[#f59e0b] to-[#d97706] rounded-full flex items-center justify-center shadow-lg shadow-[#f59e0b]/25">
                      <span className="text-sm font-bold text-black" style={{ fontFamily: 'var(--font-mono)' }}>{step.step}</span>
                    </div>
                    
                    <div className="text-4xl mb-4 mt-4 text-[#f59e0b] group-hover:scale-110 transition-transform">
                      {step.icon}
                    </div>
                    
                    <h3 className="text-lg font-semibold text-white mb-2" style={{ fontFamily: 'var(--font-display)' }}>{step.title}</h3>
                    <p className="text-[#94a3b8] text-sm">{step.description}</p>
                    
                    {index < howItWorksSteps.length - 1 && (
                      <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-6 text-[#f59e0b]">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" />
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Pricing Tab */}
          {activeTab === "pricing" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Pricing Card */}
              <div className="bg-[#12121a] border border-[rgba(245,158,11,0.2)] rounded-3xl p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-[#f59e0b]/10 rounded-full blur-3xl" />
                
                <div className="relative">
                  <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-display)' }}>B2B Fiyatlandırma</h3>
                  <p className="text-[#94a3b8] mb-8">Şeffaf ve adil fiyatlandırma modeli</p>
                  
                  <div className="mb-8">
                    <div className="flex items-baseline gap-2">
                      <span className="text-6xl font-bold text-gradient" style={{ fontFamily: 'var(--font-mono)' }}>$500</span>
                      <span className="text-[#94a3b8]">tek seferlik</span>
                    </div>
                    <p className="text-[#64748b] text-sm mt-2">Kurulum ücreti</p>
                  </div>
                  
                  <ul className="space-y-4 mb-8">
                    {[
                      "Sıfır aylık ücret",
                      "İşlem komisyonu: %0.1 - %0.5",
                      "On-demand VPS kiralama",
                      "7/24 teknik destek",
                      "Özel hesap yöneticisi",
                    ].map((feature, i) => (
                      <li key={i} className="flex items-center gap-3 text-[#cbd5e1]">
                        <div className="w-5 h-5 rounded-full bg-[#10b981]/20 flex items-center justify-center flex-shrink-0">
                          <svg className="w-3 h-3 text-[#10b981]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <a
                    href="#cta"
                    className="w-full bg-gradient-to-r from-[#f59e0b] to-[#d97706] text-black py-4 rounded-xl font-semibold text-center block hover:from-[#d97706] hover:to-[#b45309] transition-all duration-300 shadow-lg shadow-[#f59e0b]/25"
                  >
                    B2B Ortak Ol
                  </a>
                </div>
              </div>

              {/* Comparison Table */}
              <div className="bg-[#12121a] border border-[rgba(245,158,11,0.1)] rounded-3xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-display)' }}>Karşılaştırma</h3>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4 pb-4 border-b border-[rgba(255,255,255,0.05)]">
                    <div className="text-[#64748b] text-sm"></div>
                    <div className="text-center text-[#f59e0b] font-semibold text-sm">TRDEFI</div>
                    <div className="text-center text-[#94a3b8] text-sm">Geleneksel</div>
                  </div>
                  
                  {[
                    { label: "Aylık Ücret", trdefi: "Yok", traditional: "$500-2000" },
                    { label: "Kurulum", trdefi: "$500", traditional: "$5000+" },
                    { label: "Komisyon", trdefi: "%0.1-0.5", traditional: "%2-5" },
                    { label: "Kurulum Süresi", trdefi: "10 dakika", traditional: "2-4 hafta" },
                    { label: "KYC/Zorunluluk", trdefi: "Yok", traditional: "Var" },
                    { label: "Self-Custody", trdefi: "Var", traditional: "Yok" },
                  ].map((row, i) => (
                    <div key={i} className="grid grid-cols-3 gap-4 py-3 border-b border-[rgba(255,255,255,0.03)]">
                      <div className="text-[#cbd5e1] text-sm">{row.label}</div>
                      <div className="text-center text-[#10b981] font-medium text-sm">{row.trdefi}</div>
                      <div className="text-center text-[#64748b] text-sm line-through">{row.traditional}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Social Proof */}
        <div className={`mt-20 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-8">
            <h3 className="text-xl font-semibold text-[#94a3b8]" style={{ fontFamily: 'var(--font-display)' }}>
              İş Ortaklarımız Ne Diyor?
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-[#12121a] border border-[rgba(245,158,11,0.1)] rounded-2xl p-6 hover:border-[rgba(245,158,11,0.2)] transition-all duration-300"
              >
                <p className="text-[#cbd5e1] mb-4 leading-relaxed italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white font-medium">{testimonial.company}</div>
                    <div className="text-[#64748b] text-sm">{testimonial.role}</div>
                  </div>
                  <div className="text-[#10b981] text-sm font-medium">{testimonial.metric}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
