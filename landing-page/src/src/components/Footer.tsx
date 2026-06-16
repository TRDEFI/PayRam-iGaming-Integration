export default function Footer() {
  return (
    <footer className="bg-black border-t border-orange-900/30 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 grid grid-cols-2 gap-1">
                <div className="bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold">T</div>
                <div className="bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold">R</div>
                <div className="bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold">D</div>
                <div className="bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold">F</div>
              </div>
              <div>
                <span className="text-2xl font-bold text-white">TR</span>
                <span className="text-2xl font-bold text-orange-500">DEFI</span>
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              Bireysel kullanıcılar ve işletmeler için tasarlanmış kapsamlı kripto ödeme çözümleri.
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com/PayRam" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-400 transition-colors">
                GitHub
              </a>
              <a href="https://docs.payram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-400 transition-colors">
                Dokümantasyon
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Ürünler</h3>
            <ul className="space-y-2">
              <li>
                <a href="#features" className="text-gray-400 hover:text-orange-400 transition-colors">B2C Çözümler</a>
              </li>
              <li>
                <a href="#b2b" className="text-gray-400 hover:text-orange-400 transition-colors">B2B Çözümler</a>
              </li>
              <li>
                <a href="#chains" className="text-gray-400 hover:text-orange-400 transition-colors">Desteklenen Ağlar</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">İletişim</h3>
            <ul className="space-y-2">
              <li>
                <a href="mailto:info@trdefi.com" className="text-gray-400 hover:text-orange-400 transition-colors">
                  info@trdefi.com
                </a>
              </li>
              <li>
                <a href="https://payram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-400 transition-colors">
                  payram.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-orange-900/30 mt-8 pt-8 text-center text-gray-400 text-sm">
          © 2026 TRDEFI. Tüm hakları saklıdır.
        </div>
      </div>
    </footer>
  );
}
