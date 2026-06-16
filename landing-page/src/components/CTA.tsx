"use client";

import { useEffect, useState } from "react";

export default function CTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section id="cta" className="py-20 px-4 sm:px-6 lg:px-8 bg-black/30">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className={`text-3xl md:text-5xl font-bold text-white mb-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          Kripto Ödemelerin Geleceğine <span className="text-gradient">Adım Atın</span>
        </h2>
        <p className={`text-xl text-gray-300 mb-8 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          Bireysel kullanıcılar ve işletmeler için tasarlanmış güçlü kripto ödeme altyapısı. Hemen başlayın.
        </p>
        <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <a
            href="https://payram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-orange-500 hover:bg-orange-600 text-black px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/25"
          >
            Ücretsiz Başla
          </a>
          <a
            href="mailto:info@trdefi.com"
            className="border border-orange-500/50 hover:border-orange-500 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 hover:bg-orange-500/10"
          >
            İletişime Geç
          </a>
        </div>
      </div>
    </section>
  );
}
