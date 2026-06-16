export default function B2BSection() {
  const benefits = [
    {
      icon: "💰",
      title: "Sıfır Aylık Ücret",
      description:
        "Sadece işlem başına komisyon. Sabit gider yok, sadece kazandığınızda ödeyin.",
    },
    {
      icon: "🚀",
      title: "10 Dakikada Canlı",
      description:
        "Teknik bilgi gerekmez. Otomatik kurulum ve yapılandırma.",
    },
    {
      icon: "🔒",
      title: "Tam Kontrol",
      description:
        "Kendi sunucunuzda, kendi cüzdanlarınızla. Verileriniz sizde kalır.",
    },
    {
      icon: "📊",
      title: "Detaylı Raporlama",
      description:
        "İşlem geçmişi, bakiye takibi, otomatik mutabakat.",
    },
    {
      icon: "🎯",
      title: "Esnek Entegrasyon",
      description:
        "REST API, webhook'lar, SDK'lar. Mevcut sisteminize kolayca entegre edin.",
    },
    {
      icon: "🌐",
      title: "Çoklu Zincir",
      description:
        "Ethereum, Base, Polygon, Tron, Bitcoin. Müşterilerinize geniş seçenek sunun.",
    },
  ];

  return (
    <section id="b2b" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            B2B İş Ortaklığı
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            İşletmeniz için güçlü kripto ödeme altyapısı. Sıfır aylık ücret,
            sadece işlem komisyonu.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-xl p-6 hover:border-blue-500 transition-colors"
            >
              <div className="text-4xl mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {benefit.title}
              </h3>
              <p className="text-gray-400">{benefit.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30 rounded-2xl p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                B2B Fiyatlandırma
              </h3>
              <ul className="space-y-4">
                <li className="flex items-center text-gray-300">
                  <span className="text-green-400 mr-3">✓</span>
                  Aylık ücret yok
                </li>
                <li className="flex items-center text-gray-300">
                  <span className="text-green-400 mr-3">✓</span>
                  Kurulum ücreti: $500 (tek seferlik)
                </li>
                <li className="flex items-center text-gray-300">
                  <span className="text-green-400 mr-3">✓</span>
                  İşlem komisyonu: %0.1 - %0.5
                </li>
                <li className="flex items-center text-gray-300">
                  <span className="text-green-400 mr-3">✓</span>
                  On-demand VPS kiralama imkanı
                </li>
              </ul>
            </div>
            <div className="text-center md:text-right">
              <div className="text-5xl font-bold text-white mb-2">$500</div>
              <div className="text-gray-400 mb-6">Kurulum Ücreti</div>
              <a
                href="#cta"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
              >
                B2B Ortak Ol
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
