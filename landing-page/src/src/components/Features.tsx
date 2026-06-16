"use client";

import { useEffect, useState } from "react";

export default function Features() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: "🔐",
      title: "Self-Custody",
      description: "Cüzdanlarınız size ait. Özel anahtarlarınız her zaman sizin kontrolünüzde.",
      color: "from-orange-400 to-orange-600",
    },
    {
      icon: "⚡",
      title: "Anında Kurulum",
      description: "10 dakikada canlıya geçin. Karmaşık KYC/KYB süreçleri yok.",
      color: "from-amber-400 to-amber-600",
    },
    {
      icon: "🌍",
      title: "190+ Ülke",
      description: "Kredi kartı, Apple Pay, Google Pay, banka havalesi ve 175+ ödeme yöntemi.",
      color: "from-yellow-400 to-yellow-600",
    },
    {
      icon: "🤖",
      title: "Akıllı Yönlendirme",
      description: "En iyi ödeme yöntemini otomatik seçer. Ülke ve tutara göre optimizasyon.",
      color: "from-orange-500 to-amber-500",
    },
    {
      icon: "🔗",
      title: "Çoklu Zincir",
      description: "Ethereum, Base, Polygon, Tron, Bitcoin. Solana ve TON yolda.",
      color: "from-amber-500 to-yellow-500",
    },
    {
      icon: "🛡️",
      title: "Güvenli Sweep",
      description: "SmartSweep ile otomatik toplama. Gas-verimli, anahtarsız mimari.",
      color: "from-yellow-500 to-orange-500",
    },
  ];

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className={`text-3xl md:text-5xl font-bold text-white mb-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Neden <span className="text-gradient">TRDEFI</span>?
          </h2>
          <p className={`text-gray-400 text-lg max-w-2xl mx-auto transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Bireysel kullanıcılar ve işletmeler için tasarlanmış kapsamlı kripto ödeme çözümleri.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`card-3d bg-black/60 backdrop-blur-sm border border-orange-500/20 rounded-2xl p-8 hover:border-orange-500/50 transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center text-3xl mb-6 shadow-lg shadow-orange-500/20`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
