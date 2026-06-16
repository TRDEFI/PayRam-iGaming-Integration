export default function HowItWorks() {
  const steps = [
    {
      step: "1",
      title: "Hesap Oluştur",
      description:
        "E-posta adresinizle ücretsiz hesap oluşturun. KYC/KYB gerekmez.",
    },
    {
      step: "2",
      title: "Cüzdanınızı Bağlayın",
      description:
        "MetaMask veya diğer cüzdanlarınızı bağlayın. Özel anahtarlarınız sizde kalır.",
    },
    {
      step: "3",
      title: "Kripto Alın veya Satın",
      description:
        "Kredi kartı, banka havalesi veya doğrudan kripto transferi ile işlem yapın.",
    },
    {
      step: "4",
      title: "İşlemlerinizi Yönetin",
      description:
        "Tüm işlemlerinizi tek noktadan takip edin. Otomatik sweep ve raporlama.",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-800/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Nasıl Çalışır?
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            4 basit adımda kripto ödemelerinizi yönetin.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">
                  {step.step}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {step.title}
              </h3>
              <p className="text-gray-400">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
