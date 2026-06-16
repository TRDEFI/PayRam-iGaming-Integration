"use client";

import { useEffect, useState } from "react";

export default function B2BSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const benefits = [
    {
      icon: "💰",
      title: "Sıfır Aylık Ücret",
      description: "Sadece işlem başına komisyon. Sabit gider yok, sadece kazandığınızda ödeyin.",
      color: "from-orange-400 to-orange-600",
    },
    {
      icon: "🚀",
      title: "10 Dakikada Canlı",
      description: "Teknik bilgi gerekmez. Otomatik kurulum ve yapılandırma.",
      color: "from-amber-400 to-amber-600",
    },
    {
      icon: "🔒",
      title: "Tam Kontrol",
      description: "Kendi sunucunuzda, kendi cüzdanlarınızla. Verileriniz sizde kalır.",
      color: "from-yellow-400 to-yellow-600",
    },
    {
      icon: "📊",
      title: "Detaylı Raporlama",
      description: "İşlem geçmişi, bakiye takibi, otomatik mutabakat.",
      color: "from-orange-500 to-amber-500",
    },
    {
      icon: "🎯",
      title: "Esnek Entegrasyon",
      description: "REST API, webhook'lar, SDK'lar. Mevcut sisteminize kolayca entegre edin.",
      color: "from-amber-500 to-yellow-500",
    },
    {
      icon: "🌐",
      title: "Çoklu Zincir",
      description: "Ethereum, Base, Polygon, Tron, Bitcoin. Müşterilerinize geniş seçenek sunun.",
      color: "from-yellow-500 to-orange-500",
    },
  ];

  return (
    <section id="b2b" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className={`text-3xl md:text-5xl font-bold text-white mb-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            B2B <span className="text-gradient">İş Ortaklığı</span>
          </h2>
          <p className={`text-gray-400 text-lg max-w-2xl mx-auto transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            İşletmeniz için güçlü kripto ödeme altyapısı. Sıfır aylık ücret, sadece işlem komisyonu.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className={`card-3d bg-black/60 backdrop-blur-sm border border-orange-500/20 rounded-2xl p-8 hover:border-orange-500/50 transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${benefit.color} rounded-xl flex items-center justify-center text-3xl mb-6 shadow-lg shadow-orange-500/20`}>
                {benefit.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{benefit.title}</h3>
              <p className="text-gray-400 leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Pricing Card */}
        <div className={`card-3d bg-gradient-to-r from-orange-600/20 to-amber-600/20 border border-orange-500/30 rounded-3xl p-8 md:p-12 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">B2B Fiyatlandırma</h3>
              <ul className="space-y-4">
                <li className="flex items-center text-gray-300">
                  <span className="text-orange-400 mr-3 text-xl">✓</span>
                  Aylık ücret yok
                </li>
                <li className="flex items-center text-gray-300">
                  <span className="text-orange-400 mr-3 text-xl">✓</span>
                  Kurulum ücreti: $500 (tek seferlik)
                </li>
                <li className="flex items-center text-gray-300">
                  <span className="text-orange-400 mr-3 text-xl">✓</span>
                  İşlem komisyonu: %0.1 - %0.5
                </li>
                <li className="flex items-center text-gray-300">
                  <span className="text-orange-400 mr-3 text-xl">✓</span>
                  On-demand VPS kiralama imkanı
                </li>
              </ul>
            </div>
            <div className="text-center md:text-right">
              <div className="text-6xl font-bold text-gradient mb-2">$500</div>
              <div className="text-gray-400 text-lg mb-6">Kurulum Ücreti</div>
              <a href="#cta" className="inline-block bg-orange-500 hover:bg-orange-600 text-black px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/25">
                B2B Ortak Ol
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
