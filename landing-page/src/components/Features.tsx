export default function Features() {
  const features = [
    {
      icon: "🔐",
      title: "Self-Custody",
      description:
        "Cüzdanlarınız size ait. Özel anahtarlarınız her zaman sizin kontrolünüzde.",
    },
    {
      icon: "⚡",
      title: "Anında Kurulum",
      description:
        "10 dakikada canlıya geçin. Karmaşık KYC/KYB süreçleri yok.",
    },
    {
      icon: "🌍",
      title: "190+ Ülke",
      description:
        "Kredi kartı, Apple Pay, Google Pay, banka havalesi ve 175+ ödeme yöntemi.",
    },
    {
      icon: "🤖",
      title: "Akıllı Yönlendirme",
      description:
        "En iyi ödeme yöntemini otomatik seçer. Ülke ve tutara göre optimizasyon.",
    },
    {
      icon: "🔗",
      title: "Çoklu Zincir",
      description:
        "Ethereum, Base, Polygon, Tron, Bitcoin. Solana ve TON yolda.",
    },
    {
      icon: "🛡️",
      title: "Güvenli Sweep",
      description:
        "SmartSweep ile otomatik toplama. Gas-verimli, anahtarsız mimari.",
    },
  ];

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Neden PayRam?
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Bireysel kullanıcılar ve işletmeler için tasarlanmış kapsamlı kripto
            ödeme çözümleri.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-blue-500 transition-colors"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
