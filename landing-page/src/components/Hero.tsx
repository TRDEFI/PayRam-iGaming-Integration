import Navbar from "./Navbar";

export default function Hero() {
  return (
    <div className="relative">
      <Navbar />
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Kripto Ödemelerin{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Geleceği
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Bireysel kullanıcılar için kolay kripto alım-satım, işletmeler için
            güçlü B2B ödeme altyapısı. Tek platformda, tek noktadan.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#cta"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
            >
              Ücretsiz Başla
            </a>
            <a
              href="#how-it-works"
              className="border border-gray-600 hover:border-gray-500 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
            >
              Nasıl Çalışır?
            </a>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 text-center">
            <div className="text-4xl font-bold text-blue-400 mb-2">$100M+</div>
            <div className="text-gray-400">İşlem Hacmi</div>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 text-center">
            <div className="text-4xl font-bold text-cyan-400 mb-2">850K+</div>
            <div className="text-gray-400">Zincir Üzerinde İşlem</div>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 text-center">
            <div className="text-4xl font-bold text-green-400 mb-2">190+</div>
            <div className="text-gray-400">Ülke Desteği</div>
          </div>
        </div>
      </div>
    </div>
  );
}
