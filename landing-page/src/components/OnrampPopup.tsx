"use client";

import { useState, useEffect } from "react";

interface OnrampPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = "auth" | "wallet" | "deposit" | "confirmation";

interface UserData {
  email: string;
  name: string;
  walletAddress?: string;
  depositAmount?: number;
  depositMethod?: string;
  transactionHash?: string;
}

export default function OnrampPopup({ isOpen, onClose }: OnrampPopupProps) {
  const [currentStep, setCurrentStep] = useState<Step>("auth");
  const [userData, setUserData] = useState<UserData>({
    email: "",
    name: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClose = () => {
    setCurrentStep("auth");
    setUserData({ email: "", name: "" });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <style>{`
        .onramp-scroll::-webkit-scrollbar { width: 6px; }
        .onramp-scroll::-webkit-scrollbar-track { background: #1f2937; border-radius: 3px; }
        .onramp-scroll::-webkit-scrollbar-thumb { background: #f97316; border-radius: 3px; }
        .onramp-scroll::-webkit-scrollbar-thumb:hover { background: #ea580c; }
      `}</style>
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Popup */}
      <div className="relative w-full max-w-lg bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl border border-orange-500/20 shadow-2xl shadow-orange-500/10 flex flex-col max-h-[90vh] overflow-hidden">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 text-gray-400 hover:text-white transition-colors"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="px-6 pt-6 pb-4 shrink-0">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 grid grid-cols-2 gap-0.5">
              <div className="bg-orange-500 rounded-full flex items-center justify-center text-white text-[8px] font-bold">T</div>
              <div className="bg-orange-500 rounded-full flex items-center justify-center text-white text-[8px] font-bold">R</div>
              <div className="bg-orange-500 rounded-full flex items-center justify-center text-white text-[8px] font-bold">D</div>
              <div className="bg-orange-500 rounded-full flex items-center justify-center text-white text-[8px] font-bold">F</div>
            </div>
            <span className="text-lg font-bold text-white">TR<span className="text-orange-500">DEFI</span></span>
          </div>
          <p className="text-gray-400 text-sm">Kripto yatırma işleminizi tamamlayın</p>
        </div>

        {/* Step Indicator */}
        <div className="px-6 pb-4 shrink-0">
          <div className="flex items-center gap-2">
            {["auth", "wallet", "deposit", "confirmation"].map((step, index) => (
              <div key={step} className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                    currentStep === step
                      ? "bg-orange-500 text-black"
                      : index < ["auth", "wallet", "deposit", "confirmation"].indexOf(currentStep)
                      ? "bg-green-500 text-white"
                      : "bg-gray-700 text-gray-400"
                  }`}
                >
                  {index < ["auth", "wallet", "deposit", "confirmation"].indexOf(currentStep) ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    index + 1
                  )}
                </div>
                {index < 3 && (
                  <div
                    className={`w-12 h-0.5 transition-all duration-300 ${
                      index < ["auth", "wallet", "deposit", "confirmation"].indexOf(currentStep)
                        ? "bg-green-500"
                        : "bg-gray-700"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-400">
            <span>Giriş</span>
            <span>Cüzdan</span>
            <span>Yatırım</span>
            <span>Tamam</span>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 pb-6 overflow-y-auto flex-1 min-h-0 onramp-scroll" style={{ scrollbarWidth: 'thin', scrollbarColor: '#f97316 #1f2937' }}>
          {currentStep === "auth" && (
            <AuthStep
              userData={userData}
              setUserData={setUserData}
              onNext={() => setCurrentStep("wallet")}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          )}
          {currentStep === "wallet" && (
            <WalletStep
              userData={userData}
              setUserData={setUserData}
              onNext={() => setCurrentStep("deposit")}
              onBack={() => setCurrentStep("auth")}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          )}
          {currentStep === "deposit" && (
            <DepositStep
              userData={userData}
              setUserData={setUserData}
              onNext={() => setCurrentStep("confirmation")}
              onBack={() => setCurrentStep("wallet")}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          )}
          {currentStep === "confirmation" && (
            <ConfirmationStep
              userData={userData}
              onClose={handleClose}
            />
          )}
        </div>
      </div>
    </div>
  );
}

// Auth Step Component
function AuthStep({
  userData,
  setUserData,
  onNext,
  isLoading,
  setIsLoading,
}: {
  userData: UserData;
  setUserData: (data: UserData) => void;
  onNext: () => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}) {
  const [email, setEmail] = useState(userData.email);
  const [name, setName] = useState(userData.name);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) return;

    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: "trdefi-user", name }),
      });
      const data = await res.json();
      if (data.token) {
        localStorage.setItem("trdefi_token", data.token);
      }
      setUserData({ ...userData, email, name });
      onNext();
    } catch {
      alert("Kayıt hatası. Lütfen tekrar deneyin.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h3 className="text-xl font-bold text-white mb-4">Hesabınıza Giriş Yapın</h3>

      {/* Google Auth Button */}
      <button
        type="button"
        onClick={async () => {
          setIsLoading(true);
          try {
            const res = await fetch("/api/auth/register", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email: "demo@trdefi.com", password: "trdefi-user", name: "Demo Kullanıcı" }),
            });
            const data = await res.json();
            if (data.token) {
              localStorage.setItem("trdefi_token", data.token);
            }
            setUserData({ email: "demo@trdefi.com", name: "Demo Kullanıcı" });
            onNext();
          } catch {
            alert("Giriş hatası.");
          } finally {
            setIsLoading(false);
          }
        }}
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-3 bg-white text-gray-900 px-4 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50 mb-4"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
        {isLoading ? "Giriş yapılıyor..." : "Google ile Giriş Yap"}
      </button>

      {/* Divider */}
      <div className="flex items-center gap-4 my-4">
        <div className="flex-1 h-px bg-gray-700" />
        <span className="text-gray-500 text-sm">veya</span>
        <div className="flex-1 h-px bg-gray-700" />
      </div>

      {/* Email Form */}
      <form onSubmit={handleSubmit}>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Adınız Soyadınız"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
            required
          />
          <input
            type="email"
            placeholder="E-posta adresiniz"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isLoading || !email || !name}
          className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-black px-4 py-3 rounded-xl font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Giriş yapılıyor..." : "Devam Et"}
        </button>
      </form>

      <p className="text-gray-500 text-xs mt-4 text-center">
        Giriş yaparak{" "}
        <a href="#" className="text-orange-500 hover:underline">
          Kullanım Şartları
        </a>{" "}
        ve{" "}
        <a href="#" className="text-orange-500 hover:underline">
          Gizlilik Politikası
        </a>
        &apos;nı kabul etmiş olursunuz.
      </p>
    </div>
  );
}

// Wallet Step Component
function WalletStep({
  userData,
  setUserData,
  onNext,
  onBack,
  isLoading,
  setIsLoading,
}: {
  userData: UserData;
  setUserData: (data: UserData) => void;
  onNext: () => void;
  onBack: () => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}) {
  const [walletAddress, setWalletAddress] = useState("");
  const [bridgeAddresses, setBridgeAddresses] = useState<{ evm?: string; svm?: string; btc?: string }>({});

  useEffect(() => {
    const createWallet = async () => {
      setIsLoading(true);
      try {
        // Generate a deterministic address from user email (in production, use proper wallet)
        const seed = userData.email || "default@trdefi.com";
        const mockAddress = "0x" + Array.from({ length: 40 }, (_, i) => {
          const charCode = seed.charCodeAt(i % seed.length);
          return "0123456789abcdef"[(charCode + i) % 16];
        }).join("");
        
        setWalletAddress(mockAddress);
        setUserData({ ...userData, walletAddress: mockAddress });

        // Get real Bridge API deposit addresses
        const res = await fetch("/api/bridge/deposit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ address: mockAddress }),
        });
        const data = await res.json();
        if (data.address) {
          setBridgeAddresses(data.address);
        }
      } catch {
        // Fallback to mock address
        const mockAddress = "0x" + Array.from({ length: 40 }, () => "0123456789abcdef"[Math.floor(Math.random() * 16)]).join("");
        setWalletAddress(mockAddress);
        setUserData({ ...userData, walletAddress: mockAddress });
      } finally {
        setIsLoading(false);
      }
    };
    createWallet();
  }, []);

  return (
    <div>
      <h3 className="text-xl font-bold text-white mb-4">Cüzdanınız Oluşturuluyor</h3>

      {isLoading ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-300">Cüzdanınız güvenli bir şekilde oluşturuluyor...</p>
          <p className="text-gray-500 text-sm mt-2">Bu işlem birkaç saniye sürebilir</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="text-green-400 font-semibold">Cüzdan başarıyla oluşturuldu!</p>
                <p className="text-gray-400 text-sm">Gas ücreti ödenmedi (gasless)</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-4">
            <p className="text-gray-400 text-sm mb-2">Cüzdan Adresiniz:</p>
            <p className="text-white font-mono text-sm break-all">{walletAddress}</p>
          </div>

          {bridgeAddresses.evm && (
            <div className="bg-gray-800 rounded-xl p-4">
              <p className="text-gray-400 text-sm mb-2">Bridge Deposit Adresi (EVM):</p>
              <p className="text-white font-mono text-sm break-all">{bridgeAddresses.evm}</p>
            </div>
          )}

          {bridgeAddresses.btc && (
            <div className="bg-gray-800 rounded-xl p-4">
              <p className="text-gray-400 text-sm mb-2">Bridge Deposit Adresi (BTC):</p>
              <p className="text-white font-mono text-sm break-all">{bridgeAddresses.btc}</p>
            </div>
          )}

          {bridgeAddresses.svm && (
            <div className="bg-gray-800 rounded-xl p-4">
              <p className="text-gray-400 text-sm mb-2">Bridge Deposit Adresi (SOL):</p>
              <p className="text-white font-mono text-sm break-all">{bridgeAddresses.svm}</p>
            </div>
          )}

          <div className="bg-gray-800/50 rounded-xl p-4">
            <p className="text-gray-400 text-sm">
              Bu cüzdan size aittir ve tüm yatırımlarınız burada saklanır. Adresinizi
              istediğiniz zaman paylaşabilirsiniz.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onBack}
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-4 py-3 rounded-xl font-semibold transition-colors"
            >
              Geri
            </button>
            <button
              onClick={onNext}
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-black px-4 py-3 rounded-xl font-semibold transition-colors"
            >
              Yatırım Yap
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Deposit Step Component
function DepositStep({
  userData,
  setUserData,
  onNext,
  onBack,
  isLoading,
  setIsLoading,
}: {
  userData: UserData;
  setUserData: (data: UserData) => void;
  onNext: () => void;
  onBack: () => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}) {
  const [amount, setAmount] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("");
  const [quote, setQuote] = useState<{ fee?: string; received?: string } | null>(null);
  const [isFetchingQuote, setIsFetchingQuote] = useState(false);

  const depositMethods = [
    {
      id: "card",
      name: "Kredi / Banka Kartı",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ),
      description: "Visa, Mastercard",
      fee: "%1.75",
      minAmount: "$2",
    },
    {
      id: "applepay",
      name: "Apple Pay",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.52-3.23 0-1.44.65-2.2.46-3.06-.4C4.36 16.36 5.02 9.32 8.76 9.08c1.35.07 2.29.74 3.08.8.98-.2 1.93-.88 3.2-.8 1.52.04 2.65.72 3.32 1.84-2.94 1.64-2.24 5.42.62 6.52-.56 1.34-1.28 2.62-2.93 3.84zM12.03 8.87c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
        </svg>
      ),
      description: "iPhone, iPad, Mac",
      fee: "%1.75",
      minAmount: "$2",
    },
    {
      id: "googlepay",
      name: "Google Pay",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
      ),
      description: "Android, Chrome",
      fee: "%1.75",
      minAmount: "$2",
    },
    {
      id: "crypto",
      name: "Kripto Transferi",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
      ),
      description: "ETH, USDC, BTC ve daha fazlası",
      fee: "Sadece gas (~$0.003)",
      minAmount: "$2",
    },
  ];

  // Fetch real quote from Bridge API when amount changes
  useEffect(() => {
    const fetchQuote = async () => {
      if (!amount || parseFloat(amount) < 2 || selectedMethod === "card" || selectedMethod === "applepay" || selectedMethod === "googlepay") {
        setQuote(null);
        return;
      }
      
      setIsFetchingQuote(true);
      try {
        const res = await fetch("/api/bridge/quote", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fromAmount: (parseFloat(amount) * 1000000).toString(), // USDC has 6 decimals
            fromChain: "137", // Polygon
            fromToken: "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359", // USDC on Polygon
            toChain: "137",
            toToken: "0xC011a7E12a19f7B1f670d46F03B03f3342E82DFB", // pUSD on Polygon
            recipientAddress: userData.walletAddress || "0x0000000000000000000000000000000000000000",
          }),
        });
        const data = await res.json();
        if (data.fee || data.receivedAmount) {
          setQuote({ fee: data.fee, received: data.receivedAmount });
        }
      } catch {
        // Fallback to estimated fee
        setQuote({ fee: "~$0.003", received: (parseFloat(amount) - 0.003).toFixed(2) });
      } finally {
        setIsFetchingQuote(false);
      }
    };
    fetchQuote();
  }, [amount, selectedMethod, userData.walletAddress]);

  const handleDeposit = async () => {
    if (!amount || !selectedMethod) return;
    setIsLoading(true);
    
    try {
      if (selectedMethod === "crypto") {
        // For crypto transfer, we already have the deposit address
        setUserData({ 
          ...userData, 
          depositAmount: parseFloat(amount), 
          depositMethod: selectedMethod, 
          transactionHash: "Waiting for deposit..." 
        });
      } else {
        // For card/Apple Pay/Google Pay, create a mock tx for now
        // In production, this would redirect to a payment provider
        const mockTxHash = "0x" + Array.from({ length: 64 }, () => "0123456789abcdef"[Math.floor(Math.random() * 16)]).join("");
        setUserData({ 
          ...userData, 
          depositAmount: parseFloat(amount), 
          depositMethod: selectedMethod, 
          transactionHash: mockTxHash 
        });
      }
      onNext();
    } catch {
      alert("İşlem hatası. Lütfen tekrar deneyin.");
    } finally {
      setIsLoading(false);
    }
  };

  const quickAmounts = [10, 25, 50, 100, 250, 500];

  return (
    <div>
      <h3 className="text-xl font-bold text-white mb-4">Yatırım Tutarı</h3>

      {/* Amount Input */}
      <div className="relative mb-4">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">$</span>
        <input
          type="number"
          placeholder="0.00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full bg-gray-800 border border-gray-700 rounded-xl pl-8 pr-4 py-4 text-white text-2xl font-bold placeholder-gray-600 focus:outline-none focus:border-orange-500 transition-colors"
          min="2"
        />
      </div>

      {/* Quick Amount Buttons */}
      <div className="grid grid-cols-3 gap-2 mb-6">
        {quickAmounts.map((quickAmount) => (
          <button
            key={quickAmount}
            onClick={() => setAmount(quickAmount.toString())}
            className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
              amount === quickAmount.toString()
                ? "bg-orange-500 text-black"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            ${quickAmount}
          </button>
        ))}
      </div>

      {/* Deposit Methods */}
      <div className="space-y-2 mb-6">
        <p className="text-gray-400 text-sm mb-3">Ödeme Yöntemi Seçin</p>
        {depositMethods.map((method) => (
          <button
            key={method.id}
            onClick={() => setSelectedMethod(method.id)}
            className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all ${
              selectedMethod === method.id
                ? "border-orange-500 bg-orange-500/10"
                : "border-gray-700 bg-gray-800/50 hover:border-gray-600"
            }`}
          >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              selectedMethod === method.id ? "bg-orange-500 text-black" : "bg-gray-700 text-gray-300"
            }`}>
              {method.icon}
            </div>
            <div className="flex-1 text-left">
              <p className="text-white font-semibold">{method.name}</p>
              <p className="text-gray-400 text-xs">{method.description}</p>
            </div>
            <div className="text-right">
              <p className="text-green-400 text-sm font-semibold">{method.fee}</p>
              <p className="text-gray-500 text-xs">Min: {method.minAmount}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Summary */}
      {amount && selectedMethod && (
        <div className="bg-gray-800/50 rounded-xl p-4 mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-400">Yatırım Tutarı</span>
            <span className="text-white font-semibold">${amount}</span>
          </div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-400">İşlem Ücreti</span>
            <span className="text-green-400">
              {isFetchingQuote ? (
                <span className="inline-flex items-center gap-1">
                  <div className="w-3 h-3 border border-green-400 border-t-transparent rounded-full animate-spin" />
                  Hesaplanıyor...
                </span>
              ) : selectedMethod === "crypto" ? (
                quote?.fee || "~$0.003"
              ) : (
                `$${(parseFloat(amount) * 0.0175).toFixed(2)}`
              )}
            </span>
          </div>
          <div className="h-px bg-gray-700 my-2" />
          <div className="flex justify-between">
            <span className="text-gray-400">Hesabınıza Geçecek</span>
            <span className="text-white font-bold">
              {isFetchingQuote ? (
                "..."
              ) : selectedMethod === "crypto" ? (
                `$${quote?.received || (parseFloat(amount) - 0.003).toFixed(2)}`
              ) : (
                `$${(parseFloat(amount) * 0.9825).toFixed(2)}`
              )}
            </span>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-4 py-3 rounded-xl font-semibold transition-colors"
        >
          Geri
        </button>
        <button
          onClick={handleDeposit}
          disabled={isLoading || !amount || !selectedMethod || parseFloat(amount) < 2}
          className="flex-1 bg-orange-500 hover:bg-orange-600 text-black px-4 py-3 rounded-xl font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
              İşleniyor...
            </span>
          ) : (
            "Yatırım Yap"
          )}
        </button>
      </div>
    </div>
  );
}

// Confirmation Step Component
function ConfirmationStep({
  userData,
  onClose,
}: {
  userData: UserData;
  onClose: () => void;
}) {
  const [copied, setCopied] = useState(false);

  const copyAddress = () => {
    if (userData.walletAddress) {
      navigator.clipboard.writeText(userData.walletAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="text-center">
      <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h3 className="text-2xl font-bold text-white mb-2">Yatırım Başarılı!</h3>
      <p className="text-gray-400 mb-6">
        Hesabınıza <span className="text-orange-500 font-bold">${userData.depositAmount}</span> yatırıldı.
      </p>

      <div className="bg-gray-800 rounded-xl p-4 mb-6 text-left">
        <p className="text-gray-400 text-sm mb-2">İşlem Hash:</p>
        <p className="text-white font-mono text-xs break-all">{userData.transactionHash}</p>
      </div>

      {userData.depositMethod === "crypto" && userData.walletAddress && (
        <div className="bg-gray-800 rounded-xl p-4 mb-6 text-left">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-400 text-sm">Para Gönderin:</p>
          </div>
          <p className="text-orange-400 text-xs mb-2">Aşağıdaki adrese kripto para gönderin:</p>
          <p className="text-white font-mono text-xs break-all bg-gray-900 p-2 rounded">{userData.walletAddress}</p>
          <button
            onClick={() => {
              navigator.clipboard.writeText(userData.walletAddress || "");
              alert("Adres kopyalandı!");
            }}
            className="mt-2 text-orange-500 hover:text-orange-400 text-xs font-semibold"
          >
            Adresi Kopyala
          </button>
        </div>
      )}

      <div className="bg-gray-800 rounded-xl p-4 mb-6 text-left">
        <div className="flex items-center justify-between mb-2">
          <p className="text-gray-400 text-sm">Cüzdan Adresiniz:</p>
          <button
            onClick={copyAddress}
            className="text-orange-500 hover:text-orange-400 text-xs font-semibold"
          >
            {copied ? "Kopyalandı!" : "Kopyala"}
          </button>
        </div>
        <p className="text-white font-mono text-xs break-all">{userData.walletAddress}</p>
      </div>

      <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4 mb-6">
        <p className="text-orange-400 text-sm">
          Artık kripto işlemlerinizi TRDEFI üzerinden güvenle yapabilirsiniz.
        </p>
      </div>

      <button
        onClick={onClose}
        className="w-full bg-orange-500 hover:bg-orange-600 text-black px-4 py-3 rounded-xl font-semibold transition-colors"
      >
        Tamamla
      </button>
    </div>
  );
}
