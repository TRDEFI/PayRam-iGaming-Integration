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
      color: "from-orange-500 to-yellow-500",
      status: "active",
    },
    {
      name: "Ethereum",
      symbol: "ETH",
      logo: <EthereumLogo />,
      color: "from-blue-500 to-purple-500",
      status: "active",
    },
    {
      name: "Base",
      symbol: "USDC",
      logo: <BaseLogo />,
      color: "from-blue-400 to-blue-600",
      status: "active",
    },
    {
      name: "Polygon",
      symbol: "POL",
      logo: <PolygonLogo />,
      color: "from-purple-500 to-purple-700",
      status: "active",
    },
    {
      name: "Tron",
      symbol: "TRX",
      logo: <TronLogo />,
      color: "from-red-500 to-red-700",
      status: "active",
    },
    {
      name: "Solana",
      symbol: "SOL",
      logo: <SolanaLogo />,
      color: "from-green-400 to-green-600",
      status: "roadmap",
    },
    {
      name: "TON",
      symbol: "TON",
      logo: <TonLogo />,
      color: "from-cyan-400 to-cyan-600",
      status: "roadmap",
    },
  ];

  return (
    <section id="chains" className="py-20 px-4 sm:px-6 lg:px-8 bg-black/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className={`text-3xl md:text-5xl font-bold text-white mb-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Desteklenen <span className="text-gradient">Ağlar</span>
          </h2>
          <p className={`text-gray-400 text-lg max-w-2xl mx-auto transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Tüm büyük blockchain ağlarında kripto alım-satım yapın.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {chains.map((chain, index) => (
            <div
              key={index}
              className={`chain-icon card-3d bg-gradient-to-br ${chain.color} rounded-2xl p-6 text-center ${
                chain.status === "roadmap" ? "opacity-70" : ""
              } transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                {chain.logo}
              </div>
              <div className="text-xl font-bold text-white">{chain.name}</div>
              <div className="text-white/80 text-sm mt-1">{chain.symbol}</div>
              {chain.status === "roadmap" && (
                <div className="mt-3 text-xs bg-white/20 rounded-full px-3 py-1 inline-block">
                  Yakında
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
