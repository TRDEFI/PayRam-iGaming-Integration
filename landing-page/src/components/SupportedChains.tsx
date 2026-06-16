export default function SupportedChains() {
  const chains = [
    {
      name: "Bitcoin",
      symbol: "BTC",
      icon: "₿",
      color: "from-orange-500 to-yellow-500",
      status: "active",
    },
    {
      name: "Ethereum",
      symbol: "ETH",
      icon: "Ξ",
      color: "from-blue-500 to-purple-500",
      status: "active",
    },
    {
      name: "Base",
      symbol: "USDC",
      icon: "🔵",
      color: "from-blue-400 to-blue-600",
      status: "active",
    },
    {
      name: "Polygon",
      symbol: "POL",
      icon: "🟣",
      color: "from-purple-500 to-purple-700",
      status: "active",
    },
    {
      name: "Tron",
      symbol: "TRX",
      icon: "🔴",
      color: "from-red-500 to-red-700",
      status: "active",
    },
    {
      name: "Solana",
      symbol: "SOL",
      icon: "◎",
      color: "from-green-400 to-green-600",
      status: "roadmap",
    },
    {
      name: "TON",
      symbol: "TON",
      icon: "💎",
      color: "from-cyan-400 to-cyan-600",
      status: "roadmap",
    },
  ];

  return (
    <section id="chains" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-800/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Desteklenen Ağlar
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Tüm büyük blockchain ağlarında kripto alım-satım yapın.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {chains.map((chain, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br ${chain.color} rounded-xl p-6 text-center ${
                chain.status === "roadmap" ? "opacity-60" : ""
              }`}
            >
              <div className="text-4xl mb-3">{chain.icon}</div>
              <div className="text-xl font-bold text-white">{chain.name}</div>
              <div className="text-white/80 text-sm">{chain.symbol}</div>
              {chain.status === "roadmap" && (
                <div className="mt-2 text-xs bg-white/20 rounded-full px-2 py-1 inline-block">
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
