"use client";

import { useEffect, useState } from "react";

export default function HowItWorks() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const steps = [
    {
      step: "1",
      title: "Hesap Oluştur",
      description: "E-posta adresinizle ücretsiz hesap oluşturun. KYC/KYB gerekmez.",
      color: "from-orange-400 to-orange-600",
    },
    {
      step: "2",
      title: "Cüzdanınızı Bağlayın",
      description: "MetaMask veya diğer cüzdanlarınızı bağlayın. Özel anahtarlarınız sizde kalır.",
      color: "from-amber-400 to-amber-600",
    },
    {
      step: "3",
      title: "Kripto Alın veya Satın",
      description: "Kredi kartı, banka havalesi veya doğrudan kripto transferi ile işlem yapın.",
      color: "from-yellow-400 to-yellow-600",
    },
    {
      step: "4",
      title: "İşlemlerinizi Yönetin",
      description: "Tüm işlemlerinizi tek noktadan takip edin. Otomatik sweep ve raporlama.",
      color: "from-orange-500 to-amber-500",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-black/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className={`text-3xl md:text-5xl font-bold text-white mb-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Nasıl <span className="text-gradient">Çalışır</span>?
          </h2>
          <p className={`text-gray-400 text-lg max-w-2xl mx-auto transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            4 basit adımda kripto ödemelerinizi yönetin.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`text-center transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className={`w-20 h-20 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-orange-500/20 card-3d`}>
                <span className="text-3xl font-bold text-white">{step.step}</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
              <p className="text-gray-400">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
