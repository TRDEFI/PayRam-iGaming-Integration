export default function CTA() {
  return (
    <section id="cta" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-800/30">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Kripto Ödemelerin Geleceğine Adım Atın
        </h2>
        <p className="text-xl text-gray-300 mb-8">
          Bireysel kullanıcılar ve işletmeler için tasarlanmış güçlü kripto
          ödeme altyapısı. Hemen başlayın.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://payram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
          >
            Ücretsiz Başla
          </a>
          <a
            href="mailto:info@trdefi.com"
            className="border border-gray-600 hover:border-gray-500 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
          >
            İletişime Geç
          </a>
        </div>
      </div>
    </section>
  );
}
