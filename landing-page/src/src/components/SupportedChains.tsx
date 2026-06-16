"use client";

import { useEffect, useState } from "react";

export default function SupportedChains() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const chains = [
    {
      name: "Bitcoin",
      symbol: "BTC",
      logo: "https://cryptologos.cc/logos/bitcoin-btc-logo.svg",
      color: "from-orange-500 to-yellow-500",
      status: "active",
    },
    {
      name: "Ethereum",
      symbol: "ETH",
      logo: "https://cryptologos.cc/logos/ethereum-eth-logo.svg",
      color: "from-blue-500 to-purple-500",
      status: "active",
    },
    {
      name: "Base",
      symbol: "USDC",
      logo: "https://cryptologos.cc/logos/usdc-usdc-logo.svg",
      color: "from-blue-400 to-blue-600",
      status: "active",
    },
    {
      name: "Polygon",
      symbol: "POL",
      logo: "https://cryptologos.cc/logos/polygon-matic-logo.svg",
      color: "from-purple-500 to-purple-700",
      status: "active",
    },
    {
      name: "Tron",
      symbol: "TRX",
      logo: "https://cryptologos.cc/logos/tron-trx-logo.svg",
      color: "from-red-500 to-red-700",
      status: "active",
    },
    {
      name: "Solana",
      symbol: "SOL",
      logo: "https://cryptologos.cc/logos/solana-sol-logo.svg",
      color: "from-green-400 to-green-600",
      status: "roadmap",
    },
    {
      name: "TON",
      symbol: "TON",
      logo: "https://cryptologos.cc/logos/toncoin-ton-logo.svg",
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
              <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center p-2">
                <img 
                  src={chain.logo} 
                  alt={`${chain.name} logo`}
                  className="w-10 h-10 object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
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
