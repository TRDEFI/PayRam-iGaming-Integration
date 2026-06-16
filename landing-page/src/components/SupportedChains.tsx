"use client";

import { useEffect, useState } from "react";

export default function SupportedChains() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const BitcoinLogo = () => (
    <svg viewBox="0 0 64 64" className="w-10 h-10" fill="white">
      <path d="M61.55,19.28c-3-2.77-7.15-7-10.53-10l-.2-.14a3.82,3.82,0,0,0-1.11-.62l0,0C41.56,7,3.63-.09,2.89,0a1.4,1.4,0,0,0-.58.22L2.12.37a2.23,2.23,0,0,0-.52.84l-.05.13v.71l0,.11C5.82,14.05,22.68,53,26,62.14c.2.62.58,1.8,1.29,1.86h.16c.38,0,2-2.14,2-2.14S58.41,26.74,61.34,23a9.46,9.46,0,0,0,1-1.48A2.41,2.41,0,0,0,61.55,19.28Z"/>
      <text x="32" y="45" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">₿</text>
    </svg>
  );

  const EthereumLogo = () => (
    <img 
      src="https://cryptologos.cc/logos/ethereum-eth-logo.svg" 
      alt="Ethereum" 
      className="w-10 h-10"
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        target.style.display = 'none';
      }}
    />
  );

  const BaseLogo = () => (
    <svg viewBox="0 0 40 40" className="w-10 h-10" fill="none">
      <circle cx="20" cy="20" r="20" fill="white"/>
      <path d="M20 8C13.373 8 8 13.373 8 20s5.373 12 12 12 12-5.373 12-12S26.627 8 20 8zm5.5 17h-3v-3h-5v3h-3V15h3v5h5v-5h3v10z" fill="#0052FF"/>
    </svg>
  );

  const PolygonLogo = () => (
    <img 
      src="https://cryptologos.cc/logos/polygon-matic-logo.svg" 
      alt="Polygon" 
      className="w-10 h-10"
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        target.style.display = 'none';
      }}
    />
  );

  const TronLogo = () => (
    <svg viewBox="0 0 40 40" className="w-10 h-10" fill="none">
      <circle cx="20" cy="20" r="20" fill="white"/>
      <path d="M30 12L12 20l18 8-6-8zm-14 8l6-3-6-3v6zm8 6l-6-3 6-3v6z" fill="#FF0013"/>
    </svg>
  );

  const SolanaLogo = () => (
    <img 
      src="https://cryptologos.cc/logos/solana-sol-logo.svg" 
      alt="Solana" 
      className="w-10 h-10"
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        target.style.display = 'none';
      }}
    />
  );

  const TonLogo = () => (
    <img 
      src="https://cryptologos.cc/logos/toncoin-ton-logo.svg" 
      alt="TON" 
      className="w-10 h-10"
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        target.style.display = 'none';
      }}
    />
  );

  const chains = [
    {
      name: "Bitcoin",
      symbol: "BTC",
      logo: <BitcoinLogo />,
      status: "active",
      txExample: "10 dk onay",
    },
    {
      name: "Ethereum",
      symbol: "ETH",
      logo: <EthereumLogo />,
      status: "active",
      txExample: "12 sn onay",
    },
    {
      name: "Base",
      symbol: "USDC",
      logo: <BaseLogo />,
      status: "active",
      txExample: "2 sn onay",
    },
    {
      name: "Polygon",
      symbol: "POL",
      logo: <PolygonLogo />,
      status: "active",
      txExample: "2 sn onay",
    },
    {
      name: "Tron",
      symbol: "TRX",
      logo: <TronLogo />,
      status: "active",
      txExample: "3 sn onay",
    },
    {
      name: "Solana",
      symbol: "SOL",
      logo: <SolanaLogo />,
      status: "roadmap",
      txExample: "400ms onay",
    },
    {
      name: "TON",
      symbol: "TON",
      logo: <TonLogo />,
      status: "roadmap",
      txExample: "5 sn onay",
    },
  ];

  return (
    <section id="chains" className="section-padding relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#12121a] to-[#0a0a0f]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#1a1a25] border border-[rgba(245,158,11,0.2)] rounded-full px-5 py-2 mb-6">
            <svg className="w-5 h-5 text-[#f59e0b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
            </svg>
            <span className="text-[#f59e0b] text-sm font-semibold tracking-wide">DESTEKLENEN AĞLAR</span>
          </div>
          
          <h2 className={`text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ fontFamily: 'var(--font-display)' }}>
            Tüm <span className="text-gradient">Blockchain</span>'lerde
          </h2>
          <p className={`text-[#94a3b8] text-xl max-w-3xl mx-auto transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Tüm büyük blockchain ağlarında kripto alım-satım yapın.
          </p>
        </div>

        {/* Chains Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {chains.map((chain, index) => (
            <div
              key={index}
              className={`group bg-[#12121a] border border-[rgba(245,158,11,0.1)] rounded-2xl p-6 text-center hover:border-[rgba(245,158,11,0.3)] transition-all duration-500 ${
                chain.status === "roadmap" ? "opacity-60" : ""
              } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Logo */}
              <div className="w-16 h-16 mx-auto mb-4 bg-[#1a1a25] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                {chain.logo}
              </div>
              
              {/* Info */}
              <div className="text-xl font-bold text-white mb-1" style={{ fontFamily: 'var(--font-display)' }}>
                {chain.name}
              </div>
              <div className="text-[#94a3b8] text-sm mb-3">{chain.symbol}</div>
              
              {/* Status */}
              {chain.status === "active" ? (
                <div className="inline-flex items-center gap-2 bg-[#10b981]/10 text-[#10b981] text-xs font-medium px-3 py-1 rounded-full">
                  <div className="w-1.5 h-1.5 bg-[#10b981] rounded-full animate-pulse" />
                  Aktif
                </div>
              ) : (
                <div className="inline-flex items-center gap-2 bg-[#f59e0b]/10 text-[#f59e0b] text-xs font-medium px-3 py-1 rounded-full">
                  <div className="w-1.5 h-1.5 bg-[#f59e0b] rounded-full" />
                  Roadmap
                </div>
              )}
              
              {/* TX Example */}
              <div className="mt-3 text-[#64748b] text-xs">{chain.txExample}</div>
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <div className={`mt-12 text-center transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-[#64748b] text-sm">
            Solana ve TON yakında ekleniyor. Tüm zincirler testnet&apos;te aktif olarak test edilmektedir.
          </p>
        </div>
      </div>
    </section>
  );
}
