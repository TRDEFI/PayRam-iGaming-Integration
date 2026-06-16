export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="text-2xl font-bold text-white mb-4">
              <span className="text-blue-400">Pay</span>Ram
            </div>
            <p className="text-gray-400 mb-4">
              Bireysel kullanıcılar ve işletmeler için tasarlanmış kapsamlı kripto
              ödeme çözümleri.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/PayRam"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                GitHub
              </a>
              <a
                href="https://docs.payram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                Dokümantasyon
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Ürünler</h3>
            <ul className="space-y-2">
              <li>
                <a href="#features" className="text-gray-400 hover:text-white">
                  B2C Çözümler
                </a>
              </li>
              <li>
                <a href="#b2b" className="text-gray-400 hover:text-white">
                  B2B Çözümler
                </a>
              </li>
              <li>
                <a href="#chains" className="text-gray-400 hover:text-white">
                  Desteklenen Ağlar
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">İletişim</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:info@trdefi.com"
                  className="text-gray-400 hover:text-white"
                >
                  info@trdefi.com
                </a>
              </li>
              <li>
                <a
                  href="https://payram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white"
                >
                  payram.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          © 2026 PayRam. Tüm hakları saklıdır.
        </div>
      </div>
    </footer>
  );
}
