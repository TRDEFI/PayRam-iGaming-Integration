export default function Footer() {
  return (
    <footer className="bg-[#0a0a0f] border-t border-[rgba(245,158,11,0.1)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 grid grid-cols-2 gap-1">
                <div className="bg-[#f59e0b] rounded-full flex items-center justify-center text-black text-xs font-bold">T</div>
                <div className="bg-[#f59e0b] rounded-full flex items-center justify-center text-black text-xs font-bold">R</div>
                <div className="bg-[#f59e0b] rounded-full flex items-center justify-center text-black text-xs font-bold">D</div>
                <div className="bg-[#f59e0b] rounded-full flex items-center justify-center text-black text-xs font-bold">F</div>
              </div>
              <div>
                <span className="text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-display)' }}>TR</span>
                <span className="text-2xl font-bold text-[#f59e0b]" style={{ fontFamily: 'var(--font-display)' }}>DEFI</span>
              </div>
            </div>
            <p className="text-[#94a3b8] mb-4 max-w-md">
              Bireysel kullanıcılar ve işletmeler için tasarlanmış kapsamlı kripto ödeme çözümleri.
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com/PayRam" target="_blank" rel="noopener noreferrer" className="text-[#64748b] hover:text-[#f59e0b] transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="https://docs.payram.com" target="_blank" rel="noopener noreferrer" className="text-[#64748b] hover:text-[#f59e0b] transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                </svg>
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-white font-semibold mb-4" style={{ fontFamily: 'var(--font-display)' }}>Ürünler</h3>
            <ul className="space-y-3">
              <li>
                <a href="#features" className="text-[#94a3b8] hover:text-[#f59e0b] transition-colors text-sm">B2C Çözümler</a>
              </li>
              <li>
                <a href="#b2b" className="text-[#94a3b8] hover:text-[#f59e0b] transition-colors text-sm">B2B Çözümler</a>
              </li>
              <li>
                <a href="#chains" className="text-[#94a3b8] hover:text-[#f59e0b] transition-colors text-sm">Desteklenen Ağlar</a>
              </li>
              <li>
                <a href="#pricing" className="text-[#94a3b8] hover:text-[#f59e0b] transition-colors text-sm">Fiyatlandırma</a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4" style={{ fontFamily: 'var(--font-display)' }}>İletişim</h3>
            <ul className="space-y-3">
              <li>
                <a href="mailto:info@trdefi.com" className="text-[#94a3b8] hover:text-[#f59e0b] transition-colors text-sm flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  info@trdefi.com
                </a>
              </li>
              <li>
                <a href="https://payram.com" target="_blank" rel="noopener noreferrer" className="text-[#94a3b8] hover:text-[#f59e0b] transition-colors text-sm flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                  </svg>
                  payram.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-[rgba(245,158,11,0.1)] mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-[#64748b] text-sm">
            © 2026 TRDEFI. Tüm hakları saklıdır.
          </div>
          <div className="flex items-center gap-6 text-[#64748b] text-sm">
            <a href="#" className="hover:text-[#f59e0b] transition-colors">Gizlilik Politikası</a>
            <a href="#" className="hover:text-[#f59e0b] transition-colors">Kullanım Şartları</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
