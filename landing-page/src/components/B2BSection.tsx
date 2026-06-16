"use client";

import { useEffect, useState } from "react";

export default function B2BSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<"benefits" | "how" | "pricing">("benefits");
  const [counters, setCounters] = useState({ partners: 0, volume: 0, uptime: 0 });

  useEffect(() => {
    setIsVisible(true);
    // Animate counters
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
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Sıfır Aylık Ücret",
      description: "Sadece işlem başına komisyon. Sabit gider yok, sadece kazandığınızda ödeyin.",
      color: "from-orange-400 to-orange-600",
      stat: "%0.1-0.5",
      statLabel: "Komisyon Oranı",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "10 Dakikada Canlı",
      description: "Teknik bilgi gerekmez. Otomatik kurulum ve yapılandırma ile hemen başlayın.",
      color: "from-amber-400 to-amber-600",
      stat: "10dk",
      statLabel: "Kurulum Süresi",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Tam Kontrol",
      description: "Kendi sunucunuzda, kendi cüzdanlarınızla. Verileriniz asla paylaşlmaz.",
      color: "from-yellow-400 to-yellow-600",
      stat: "Self-Custody",
      statLabel: "Güvenlik Modeli",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: "Detaylı Raporlama",
      description: "İşlem geçmişi, bakiye takibi, otomatik mutabakat ve analitik panel.",
      color: "from-orange-500 to-amber-500",
      stat: "Real-time",
      statLabel: "Veri Akışı",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      title: "Esnek Entegrasyon",
      description: "REST API, webhook'lar, SDK'lar. Mevcut sisteminize kolayca entegre edin.",
      color: "from-amber-500 to-yellow-500",
      stat: "REST API",
      statLabel: "Entegrasyon",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      ),
      title: "Çoklu Zincir",
      description: "Ethereum, Base, Polygon, Tron, Bitcoin. Müşterilerinize geniş seçenek sunun.",
      color: "from-yellow-500 to-orange-500",
      stat: "5+",
      statLabel: "Blockchain",
    },
  ];

  const howItWorksSteps = [
    {
      step: "01",
      title: "Başvuru Yap",
      description: "Formu doldurun, 24 saat içinde size ulaşalım.",
      icon: "📝",
    },
    {
      step: "02",
      title: "Kurulum Yap",
      description: "VPS'nize PayRam'ı kurun veya biz kuralım.",
      icon: "⚙️",
    },
    {
      step: "03",
      title: "Entegre Et",
      description: "API'leri mevcut sisteminize bağlayın.",
      icon: "🔗",
    },
    {
      step: "04",
      title: "Canlıya Geç",
      description: "Müşterileriniz kripto ödeme kabulmeye başlasın.",
      icon: "🚀",
    },
  ];

  return (
    <section id="b2b" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-5 py-2 mb-6">
            <svg className="w-5 h-5 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <span className="text-orange-400 text-sm font-semibold tracking-wide">B2B ÇÖZÜMLER</span>
          </div>
          
          <h2 className={`text-4xl md:text-6xl font-bold text-white mb-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            B2B <span className="text-gradient">İş Ortaklığı</span>
          </h2>
          <p className={`text-gray-400 text-xl max-w-3xl mx-auto transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            İşletmeniz için güçlü kripto ödeme altyapısı. Sıfır aylık ücret, sadece işlem komisyonu.
          </p>
        </div>

        {/* Stats Bar */}
        <div className={`grid grid-cols-3 gap-4 mb-16 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl p-6 text-center border border-gray-700/50">
            <div className="text-3xl md:text-4xl font-bold text-orange-400 mb-2">{counters.partners}+</div>
            <div className="text-gray-400 text-sm">Aktif İş Ortağı</div>
          </div>
          <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl p-6 text-center border border-gray-700/50">
            <div className="text-3xl md:text-4xl font-bold text-amber-400 mb-2">${counters.volume}M+</div>
            <div className="text-gray-400 text-sm">Aylık İşlem Hacmi</div>
          </div>
          <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl p-6 text-center border border-gray-700/50">
            <div className="text-3xl md:text-4xl font-bold text-green-400 mb-2">%{counters.uptime}</div>
            <div className="text-gray-400 text-sm">Uptime Garantisi</div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className={`flex justify-center mb-12 transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-gray-800/50 rounded-full p-1 border border-gray-700/50">
            {(["benefits", "how", "pricing"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTab === tab
                    ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/25"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {tab === "benefits" ? "Avantajlar" : tab === "how" ? "Nasıl Çalışır" : "Fiyatlandırma"}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className={`transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          {/* Benefits Tab */}
          {activeTab === "benefits" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="group bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-orange-500/50 transition-all duration-500 hover:scale-105"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-14 h-14 bg-gradient-to-br ${benefit.color} rounded-xl flex items-center justify-center text-white shadow-lg`}>
                      {benefit.icon}
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-orange-400">{benefit.stat}</div>
                      <div className="text-xs text-gray-500">{benefit.statLabel}</div>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{benefit.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{benefit.description}</p>
                </div>
              ))}
            </div>
          )}

          {/* How It Works Tab */}
          {activeTab === "how" && (
            <div className="relative">
              {/* Connection line */}
              <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-500/0 via-orange-500/50 to-orange-500/0 -translate-y-1/2"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {howItWorksSteps.map((step, index) => (
                  <div
                    key={index}
                    className="relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl p-6 border border-gray-700/50 hover:border-orange-500/50 transition-all duration-500 text-center group"
                  >
                    {/* Step number */}
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center shadow-lg shadow-orange-500/25">
                      <span className="text-sm font-bold text-white">{step.step}</span>
                    </div>
                    
                    {/* Icon */}
                    <div className="text-4xl mb-4 mt-4">{step.icon}</div>
                    
                    {/* Content */}
                    <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                    <p className="text-gray-400 text-sm">{step.description}</p>
                    
                    {/* Arrow (except last) */}
                    {index < howItWorksSteps.length - 1 && (
                      <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-6 text-orange-400">
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
              <div className="bg-gradient-to-br from-orange-600/20 to-amber-600/20 rounded-3xl p-8 border border-orange-500/30 relative overflow-hidden">
                {/* Glow effect */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl"></div>
                
                <div className="relative">
                  <h3 className="text-2xl font-bold text-white mb-2">B2B Fiyatlandırma</h3>
                  <p className="text-gray-400 mb-8">Şeffaf ve adil fiyatlandırma modeli</p>
                  
                  {/* Price */}
                  <div className="mb-8">
                    <div className="flex items-baseline gap-2">
                      <span className="text-6xl font-bold text-gradient">$500</span>
                      <span className="text-gray-400">tek seferlik</span>
                    </div>
                    <p className="text-gray-500 text-sm mt-2">Kurulum ücreti</p>
                  </div>
                  
                  {/* Features */}
                  <ul className="space-y-4 mb-8">
                    {[
                      "Sıfır aylık ücret",
                      "İşlem komisyonu: %0.1 - %0.5",
                      "On-demand VPS kiralama",
                      "7/24 teknik destek",
                      "Özel hesap yöneticisi",
                    ].map((feature, i) => (
                      <li key={i} className="flex items-center gap-3 text-gray-300">
                        <div className="w-5 h-5 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                          <svg className="w-3 h-3 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {/* CTA */}
                  <a
                    href="#cta"
                    className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-4 rounded-xl font-semibold text-center block hover:from-orange-600 hover:to-amber-600 transition-all duration-300 shadow-lg shadow-orange-500/25"
                  >
                    B2B Ortak Ol
                  </a>
                </div>
              </div>

              {/* Comparison Table */}
              <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-3xl p-8 border border-gray-700/50">
                <h3 className="text-2xl font-bold text-white mb-6">Karşılaştırma</h3>
                
                <div className="space-y-4">
                  {/* Header */}
                  <div className="grid grid-cols-3 gap-4 pb-4 border-b border-gray-700/50">
                    <div className="text-gray-400 text-sm"></div>
                    <div className="text-center text-orange-400 font-semibold text-sm">TRDEFI</div>
                    <div className="text-center text-gray-400 text-sm">Geleneksel</div>
                  </div>
                  
                  {/* Rows */}
                  {[
                    { label: "Aylık Ücret", trdefi: "Yok", traditional: "$500-2000" },
                    { label: "Kurulum", trdefi: "$500", traditional: "$5000+" },
                    { label: "Komisyon", trdefi: "%0.1-0.5", traditional: "%2-5" },
                    { label: "Kurulum Süresi", trdefi: "10 dakika", traditional: "2-4 hafta" },
                    { label: "KYC/Zorunluluk", trdefi: "Yok", traditional: "Var" },
                    { label: "Self-Custody", trdefi: "Var", traditional: "Yok" },
                  ].map((row, i) => (
                    <div key={i} className="grid grid-cols-3 gap-4 py-3 border-b border-gray-700/30">
                      <div className="text-gray-300 text-sm">{row.label}</div>
                      <div className="text-center text-green-400 font-medium text-sm">{row.trdefi}</div>
                      <div className="text-center text-gray-500 text-sm line-through">{row.traditional}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
