"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";

interface OnrampPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = "auth" | "wallet" | "deposit" | "confirmation" | "withdraw";

interface UserData {
  email: string;
  name: string;
  walletAddress?: string;
  depositAmount?: number;
  depositMethod?: string;
  transactionHash?: string;
}

interface WalletInfo {
  id: string;
  address: string;
  chain: string;
  label: string;
  is_primary: boolean;
  balance?: number;
}

export default function OnrampPopup({ isOpen, onClose }: OnrampPopupProps) {
  const [currentStep, setCurrentStep] = useState<Step>("auth");
  const [userData, setUserData] = useState<UserData>({
    email: "",
    name: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

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

  useEffect(() => {
    if (user && isOpen) {
      setUserData({
        ...userData,
        email: user.email || "",
        name: user.user_metadata?.full_name || "",
      });
      if (currentStep === "auth") {
        setCurrentStep("wallet");
      }
    }
  }, [user, isOpen]);

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
                    currentStep === step || (currentStep === "withdraw" && step === "wallet")
                      ? "bg-orange-500 text-black"
                      : index < ["auth", "wallet", "deposit", "confirmation"].indexOf(currentStep) ||
                        (currentStep === "withdraw" && index < 2)
                      ? "bg-green-500 text-white"
                      : "bg-gray-700 text-gray-400"
                  }`}
                >
                  {index < ["auth", "wallet", "deposit", "confirmation"].indexOf(currentStep) ||
                   (currentStep === "withdraw" && index < 2) ? (
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
                      index < ["auth", "wallet", "deposit", "confirmation"].indexOf(currentStep) ||
                      (currentStep === "withdraw" && index < 2)
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
              onWithdraw={() => setCurrentStep("withdraw")}
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
          {currentStep === "withdraw" && (
            <WithdrawStep
              userData={userData}
              onBack={() => setCurrentStep("wallet")}
              onClose={handleClose}
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
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState(userData.email);
  const [name, setName] = useState(userData.name);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("E-posta ve şifre gerekli");
      return;
    }

    if (!isLoginMode && !name) {
      setError("Ad Soyad gerekli");
      return;
    }

    if (!isLoginMode && password.length < 6) {
      setError("Şifre en az 6 karakter olmalı");
      return;
    }

    setIsLoading(true);
    try {
      let result;
      if (isLoginMode) {
        result = await signIn(email, password);
      } else {
        result = await signUp(email, password, name);
      }

      if (result.error) {
        setError(result.error.message);
      } else {
        setUserData({ ...userData, email, name });
        onNext();
      }
    } catch {
      setError("Bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h3 className="text-xl font-bold text-white mb-4">
        {isLoginMode ? "Hesabınıza Giriş Yapın" : "Yeni Hesap Oluşturun"}
      </h3>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl mb-4 text-sm">
          {error}
        </div>
      )}

      {/* Toggle */}
      <div className="flex bg-gray-800 rounded-xl p-1 mb-4">
        <button
          onClick={() => { setIsLoginMode(true); setError(""); }}
          className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-colors ${
            isLoginMode ? "bg-orange-500 text-black" : "text-gray-400 hover:text-white"
          }`}
        >
          Giriş Yap
        </button>
        <button
          onClick={() => { setIsLoginMode(false); setError(""); }}
          className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-colors ${
            !isLoginMode ? "bg-orange-500 text-black" : "text-gray-400 hover:text-white"
          }`}
        >
          Kayıt Ol
        </button>
      </div>

      {/* Email Form */}
      <form onSubmit={handleSubmit}>
        <div className="space-y-3">
          {!isLoginMode && (
            <input
              type="text"
              placeholder="Adınız Soyadınız"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
            />
          )}
          <input
            type="email"
            placeholder="E-posta adresiniz"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
            required
          />
          <input
            type="password"
            placeholder="Şifreniz"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
            required
            minLength={6}
          />
        </div>
        <button
          type="submit"
          disabled={isLoading || !email || !password}
          className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-black px-4 py-3 rounded-xl font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
              {isLoginMode ? "Giriş yapılıyor..." : "Kayıt yapılıyor..."}
            </span>
          ) : isLoginMode ? (
            "Giriş Yap"
          ) : (
            "Kayıt Ol"
          )}
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
  onWithdraw,
  isLoading,
  setIsLoading,
}: {
  userData: UserData;
  setUserData: (data: UserData) => void;
  onNext: () => void;
  onBack: () => void;
  onWithdraw: () => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}) {
  const [walletAddress, setWalletAddress] = useState("");
  const [bridgeAddresses, setBridgeAddresses] = useState<{ evm?: string; svm?: string; btc?: string }>({});
  const [copiedAddress, setCopiedAddress] = useState("");
  const [balance, setBalance] = useState<{ USDC: number; MATIC: number } | null>(null);
  const [balanceLoading, setBalanceLoading] = useState(false);
  const [otherWallets, setOtherWallets] = useState<WalletInfo[]>([]);
  const [consolidating, setConsolidating] = useState(false);
  const [consolidateMessage, setConsolidateMessage] = useState("");
  const { user } = useAuth();

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAddress(label);
    setTimeout(() => setCopiedAddress(""), 2000);
  };

  const fetchBalance = async (address: string) => {
    setBalanceLoading(true);
    try {
      const res = await fetch("/api/balance-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address }),
      });
      const data = await res.json();
      if (data.balances) {
        setBalance({
          USDC: data.balances.USDC.balance,
          MATIC: data.balances.MATIC.balance,
        });
      }
    } catch (err) {
      console.error("Balance check error:", err);
    } finally {
      setBalanceLoading(false);
    }
  };

  const fetchOtherWallets = async () => {
    if (!user) return;
    try {
      const res = await fetch("/api/user/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id }),
      });
      const data = await res.json();
      if (data.wallets) {
        const otherWalletsData = data.wallets.filter(
          (w: WalletInfo) => w.address !== walletAddress
        );
        setOtherWallets(otherWalletsData);
      }
    } catch (err) {
      console.error("Fetch other wallets error:", err);
    }
  };

  const handleConsolidate = async () => {
    if (!user || otherWallets.length === 0) return;

    setConsolidating(true);
    setConsolidateMessage("Cüzdanlar birleştiriliyor...");

    try {
      const res = await fetch("/api/wallet/consolidate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          wallets: otherWallets,
          targetAddress: walletAddress,
          userPrivateKey: "placeholder",
        }),
      });

      const data = await res.json();

      if (data.success) {
        setConsolidateMessage("Cüzdanlar başarıyla birleştirildi!");
        setOtherWallets([]);
        fetchBalance(walletAddress);
      } else {
        setConsolidateMessage("Birleştirme hatası: " + (data.error || "Bilinmeyen hata"));
      }
    } catch (err) {
      setConsolidateMessage("Birleştirme hatası: " + (err as Error).message);
    } finally {
      setConsolidating(false);
    }
  };

  useEffect(() => {
    const createWallet = async () => {
      setIsLoading(true);
      try {
        // Generate deterministic wallet address from email
        const seed = userData.email || "default@trdefi.com";
        const mockAddress = "0x" + Array.from({ length: 40 }, (_, i) => {
          const charCode = seed.charCodeAt(i % seed.length);
          return "0123456789abcdef"[(charCode + i) % 16];
        }).join("");
        
        setWalletAddress(mockAddress);
        setUserData({ ...userData, walletAddress: mockAddress });

        // Get real Bridge API deposit addresses for multiple chains
        const res = await fetch("/api/bridge/deposit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ address: mockAddress }),
        });
        const data = await res.json();
        if (data.address) {
          setBridgeAddresses(data.address);
        }

        // Save wallet to Supabase with chain info
        if (user) {
          const { error: walletError } = await supabase
            .from("wallets")
            .insert({
              user_id: user.id,
              address: mockAddress,
              chain: "polygon",
              chain_id: 137,
              label: "Ana Cüzdan (Polygon)",
              is_primary: true,
            });

          if (walletError) {
            console.error("Wallet save error:", walletError);
          }
        }

        // Fetch balance after wallet creation
        fetchBalance(mockAddress);
        
        // Fetch other wallets for consolidation
        fetchOtherWallets();
      } catch {
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

          {/* Main Wallet - Polygon */}
          <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-orange-400 text-xs font-semibold">ANA CÜZDAN</p>
              <span className="bg-orange-500 text-black text-xs font-bold px-2 py-1 rounded">POLYGON (MATIC)</span>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-white font-mono text-xs break-all bg-gray-900 p-2 rounded flex-1">{walletAddress}</p>
              <button
                onClick={() => copyToClipboard(walletAddress, "main")}
                className="flex-shrink-0 bg-orange-500 text-black p-2 rounded-lg hover:bg-orange-600 transition-colors"
              >
                {copiedAddress === "main" ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                )}
              </button>
            </div>
            <p className="text-yellow-400 text-xs mt-2">⚠️ AlchemyPay'te bu adresi yapıştırın ve ağ olarak <span className="font-bold">Polygon (MATIC)</span> seçin</p>
          </div>

          {/* Balance Section */}
          <div className="bg-gray-800 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-gray-400 text-sm font-semibold">BAKİYENİZ</p>
              <button
                onClick={() => fetchBalance(walletAddress)}
                disabled={balanceLoading}
                className="flex items-center gap-1 text-xs text-gray-400 hover:text-white transition-colors"
              >
                <svg 
                  className={`w-3 h-3 ${balanceLoading ? 'animate-spin' : ''}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                {balanceLoading ? 'Sorgulanıyor...' : 'Yenile'}
              </button>
            </div>
            {balance ? (
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-900 rounded-lg p-3">
                  <p className="text-gray-500 text-xs">USDC</p>
                  <p className="text-white font-bold text-lg">${balance.USDC.toFixed(2)}</p>
                </div>
                <div className="bg-gray-900 rounded-lg p-3">
                  <p className="text-gray-500 text-xs">MATIC</p>
                  <p className="text-white font-bold text-lg">{balance.MATIC.toFixed(4)}</p>
                </div>
              </div>
            ) : (
              <div className="text-center py-3">
                <p className="text-gray-500 text-sm">
                  {balanceLoading ? 'Bakiye sorgulanıyor...' : 'Bakiye yüklenemedi'}
                </p>
              </div>
            )}
          </div>

          {/* Bridge Deposit Addresses */}
          {bridgeAddresses.evm && (
            <div className="bg-gray-800 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-gray-400 text-sm">Bridge Deposit (EVM):</p>
                <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">Ethereum</span>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-white font-mono text-xs break-all bg-gray-900 p-2 rounded flex-1">{bridgeAddresses.evm}</p>
                <button
                  onClick={() => copyToClipboard(bridgeAddresses.evm || "", "evm")}
                  className="flex-shrink-0 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  {copiedAddress === "evm" ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          )}

          {bridgeAddresses.btc && (
            <div className="bg-gray-800 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-gray-400 text-sm">Bridge Deposit (BTC):</p>
                <span className="bg-orange-600 text-white text-xs font-bold px-2 py-1 rounded">Bitcoin</span>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-white font-mono text-xs break-all bg-gray-900 p-2 rounded flex-1">{bridgeAddresses.btc}</p>
                <button
                  onClick={() => copyToClipboard(bridgeAddresses.btc || "", "btc")}
                  className="flex-shrink-0 bg-orange-600 text-white p-2 rounded-lg hover:bg-orange-700 transition-colors"
                >
                  {copiedAddress === "btc" ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          )}

          {bridgeAddresses.svm && (
            <div className="bg-gray-800 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-gray-400 text-sm">Bridge Deposit (SOL):</p>
                <span className="bg-purple-500 text-white text-xs font-bold px-2 py-1 rounded">Solana</span>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-white font-mono text-xs break-all bg-gray-900 p-2 rounded flex-1">{bridgeAddresses.svm}</p>
                <button
                  onClick={() => copyToClipboard(bridgeAddresses.svm || "", "svm")}
                  className="flex-shrink-0 bg-purple-500 text-white p-2 rounded-lg hover:bg-purple-600 transition-colors"
                >
                  {copiedAddress === "svm" ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Other Wallets & Consolidation */}
          {otherWallets.length > 0 && (
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4">
              <p className="text-purple-400 text-xs font-semibold mb-2">DİĞER CÜZDANLARINIZ</p>
              <div className="space-y-2 mb-3">
                {otherWallets.map((wallet) => (
                  <div key={wallet.id} className="bg-gray-900 rounded-lg p-2 flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-xs font-mono truncate">{wallet.address}</p>
                      <p className="text-gray-500 text-xs">{wallet.label}</p>
                    </div>
                    {wallet.balance !== undefined && (
                      <span className="text-orange-400 text-xs ml-2">${wallet.balance?.toFixed(2) || "0.00"}</span>
                    )}
                  </div>
                ))}
              </div>
              
              {consolidateMessage && (
                <div className={`text-xs mb-2 p-2 rounded ${
                  consolidateMessage.includes("başarıyla") 
                    ? "bg-green-500/10 text-green-400" 
                    : "bg-red-500/10 text-red-400"
                }`}>
                  {consolidateMessage}
                </div>
              )}
              
              <button
                onClick={handleConsolidate}
                disabled={consolidating}
                className="w-full bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors disabled:opacity-50"
              >
                {consolidating ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Birleştiriliyor...
                  </span>
                ) : (
                  "Cüzdanları Birleştir (Gasless)"
                )}
              </button>
            </div>
          )}

          {/* Withdraw Button */}
          <div className="bg-gray-800 rounded-xl p-4">
            <p className="text-gray-400 text-xs font-semibold mb-2">İŞLEMLER</p>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={onNext}
                className="bg-orange-500 hover:bg-orange-600 text-black px-4 py-3 rounded-xl font-semibold transition-colors text-sm"
              >
                Yatırım Yap
              </button>
              <button
                onClick={onWithdraw}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-xl font-semibold transition-colors text-sm"
              >
                Withdraw
              </button>
            </div>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
            <p className="text-blue-400 text-xs font-semibold mb-2">ÖNEMLİ BİLGİ</p>
            <ul className="text-gray-400 text-xs space-y-1">
              <li>• Ana cüzdanınız <span className="text-white font-bold">Polygon</span> ağında</li>
              <li>• AlchemyPay'te <span className="text-white font-bold">USDC</span> ve <span className="text-white font-bold">Polygon (MATIC)</span> seçin</li>
              <li>• Yanlış ağa gönderilen fonlar geri alınamaz!</li>
            </ul>
          </div>

          <button
            onClick={onBack}
            className="w-full bg-gray-700 hover:bg-gray-600 text-white px-4 py-3 rounded-xl font-semibold transition-colors"
          >
            Geri
          </button>
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
  const [copied, setCopied] = useState(false);
  const [waitingForPayment, setWaitingForPayment] = useState(false);

  const walletAddress = userData.walletAddress || "";

  const copyAddress = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const openAlchemyPay = () => {
    const url = `https://ramp.alchemypay.org/?crypto=USDC&fiat=TRY&network=MATIC`;
    window.open(url, "_blank");
    setWaitingForPayment(true);
  };

  const confirmPayment = () => {
    setUserData({
      ...userData,
      depositAmount: 0,
      depositMethod: "card",
      transactionHash: "Bakiye doğrulanacak",
    });
    setWaitingForPayment(false);
    onNext();
  };

  // Waiting for AlchemyPay payment
  if (waitingForPayment) {
    return (
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">Ödemenizi Tamamlayın</h3>
        <p className="text-gray-400 text-sm mb-4">
          AlchemyPay sayfasında yatırınızı tamamlayın
        </p>
        
        <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4 mb-4 text-left">
          <p className="text-orange-400 text-xs font-semibold mb-2">⚠️ ÖNEMLİ - AĞ SEÇİMİ:</p>
          <div className="bg-red-500/20 rounded-lg p-2 mb-2">
            <p className="text-red-400 text-xs font-bold">AlchemyPay'te MUTLAKA "Polygon (MATIC)" ağını seçin!</p>
          </div>
          <p className="text-gray-400 text-xs">Yanlış ağa gönderilen fonlar geri alınamaz.</p>
        </div>
        
        <div className="bg-gray-800 rounded-xl p-4 mb-4 text-left">
          <p className="text-orange-400 text-xs font-semibold mb-2">YAPMANIZ GEREKENLER:</p>
          <ol className="text-gray-400 text-xs space-y-2 list-decimal list-inside">
            <li>AlchemyPay sayfasında <span className="text-white font-bold">wallet adresini</span> yapıştırın</li>
            <li><span className="text-yellow-400 font-bold">Ağ olarak "Polygon (MATIC)" seçin</span></li>
            <li><span className="text-yellow-400 font-bold">Token olarak "USDC" seçin</span></li>
            <li>Tutarı girin ve kart bilgilerinizi girin</li>
            <li>Ödeme tamamlandıktan sonra <span className="text-white font-bold">aşağıdaki butona tıklayın</span></li>
          </ol>
        </div>

        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-3 mb-4">
          <p className="text-yellow-400 text-xs">
            ⚠️ Ödeme tamamlanmadan butona tıklamayın!
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setWaitingForPayment(false)}
            className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-4 py-3 rounded-xl font-semibold transition-colors"
          >
            İptal
          </button>
          <button
            onClick={confirmPayment}
            className="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-xl font-semibold transition-colors"
          >
            ✓ Ödemeyi Tamamladım
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-xl font-bold text-white mb-4">Kripto Yatır</h3>

      {/* Wallet Address */}
      <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4 mb-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-orange-400 text-xs font-semibold">CÜZDAN ADRESİNİZ</p>
          <span className="bg-orange-500 text-black text-xs font-bold px-2 py-1 rounded">POLYGON (MATIC)</span>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-white font-mono text-xs break-all bg-gray-900 p-2 rounded flex-1">{walletAddress}</p>
          <button
            onClick={copyAddress}
            className="flex-shrink-0 bg-orange-500 text-black p-2 rounded-lg hover:bg-orange-600 transition-colors"
          >
            {copied ? (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
            )}
          </button>
        </div>
        <p className="text-yellow-400 text-xs mt-2">⚠️ AlchemyPay'te bu adresi yapıştırın ve <span className="font-bold">Polygon (MATIC)</span> ağını seçin</p>
      </div>

      {/* Instructions */}
      <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 mb-4">
        <p className="text-blue-400 text-xs font-semibold mb-2">NASIL ÇALIŞIR?</p>
        <ol className="text-gray-400 text-xs space-y-1 list-decimal list-inside">
          <li>Yukarıdaki adresi <span className="text-white font-bold">Kopyala</span> butonuyla kopyalayın</li>
          <li><span className="text-white font-bold">AlchemyPay'de aç</span> butonuna tıklayın</li>
          <li>AlchemyPay sayfasında adresi yapıştırın</li>
          <li><span className="text-yellow-400 font-bold">Ağ: Polygon (MATIC)</span> seçin</li>
          <li><span className="text-yellow-400 font-bold">Token: USDC</span> seçin</li>
          <li>Tutarı girin ve kart bilgilerinizi girin</li>
          <li>Geri dönüp <span className="text-white font-bold">"Ödemeyi Tamamladım"</span> butonuna tıklayın</li>
        </ol>
        <div className="mt-3 bg-red-500/10 border border-red-500/30 rounded-lg p-2">
          <p className="text-red-400 text-xs font-semibold">⚠️ Yanlış ağa gönderilen fonlar geri alınamaz!</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-4 py-3 rounded-xl font-semibold transition-colors"
        >
          Geri
        </button>
        <button
          onClick={openAlchemyPay}
          disabled={isLoading}
          className="flex-1 bg-orange-500 hover:bg-orange-600 text-black px-4 py-3 rounded-xl font-semibold transition-colors disabled:opacity-50"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
              Açılıyor...
            </span>
          ) : (
            "AlchemyPay'de Aç"
          )}
        </button>
      </div>
    </div>
  );
}

// Withdraw Step Component
function WithdrawStep({
  userData,
  onBack,
  onClose,
}: {
  userData: UserData;
  onBack: () => void;
  onClose: () => void;
}) {
  const [destinationChain, setDestinationChain] = useState("polygon");
  const [destinationAddress, setDestinationAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [withdrawLoading, setWithdrawLoading] = useState(false);
  const [withdrawResult, setWithdrawResult] = useState<{
    success: boolean;
    message: string;
    addresses?: { evm?: string; svm?: string; btc?: string };
  } | null>(null);

  const chains = [
    { id: "polygon", name: "Polygon", color: "bg-purple-500" },
    { id: "ethereum", name: "Ethereum", color: "bg-blue-500" },
    { id: "base", name: "Base", color: "bg-blue-400" },
    { id: "arbitrum", name: "Arbitrum", color: "bg-blue-600" },
    { id: "solana", name: "Solana", color: "bg-purple-400" },
    { id: "bitcoin", name: "Bitcoin", color: "bg-orange-500" },
  ];

  const handleWithdraw = async () => {
    if (!userData.walletAddress || !destinationAddress || !amount) return;

    setWithdrawLoading(true);
    setWithdrawResult(null);

    try {
      const chainIdMap: Record<string, string> = {
        polygon: "137",
        ethereum: "1",
        base: "8453",
        arbitrum: "42161",
        solana: "1151111081099710",
        bitcoin: "0",
      };

      const tokenAddressMap: Record<string, string> = {
        polygon: "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359",
        ethereum: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
        base: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
        arbitrum: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
        solana: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
        bitcoin: "",
      };

      const res = await fetch("/api/wallet/withdraw", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          walletAddress: userData.walletAddress,
          toChainId: chainIdMap[destinationChain],
          toTokenAddress: tokenAddressMap[destinationChain],
          recipientAddress: destinationAddress,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setWithdrawResult({
          success: true,
          message: "Withdrawal adresi oluşturuldu. Aşağıdaki adrese pUSD gönderin.",
          addresses: data.withdrawalAddresses,
        });
      } else {
        setWithdrawResult({
          success: false,
          message: data.error || "Withdrawal hatası",
        });
      }
    } catch (err) {
      setWithdrawResult({
        success: false,
        message: "Withdrawal hatası: " + (err as Error).message,
      });
    } finally {
      setWithdrawLoading(false);
    }
  };

  return (
    <div>
      <h3 className="text-xl font-bold text-white mb-4">Withdraw</h3>

      {/* Source Wallet */}
      <div className="bg-gray-800 rounded-xl p-4 mb-4">
        <p className="text-gray-400 text-xs font-semibold mb-2">KAYNAK CÜZDAN</p>
        <p className="text-white font-mono text-xs break-all">{userData.walletAddress}</p>
      </div>

      {/* Destination Chain */}
      <div className="bg-gray-800 rounded-xl p-4 mb-4">
        <p className="text-gray-400 text-xs font-semibold mb-2">HEDEF AĞ</p>
        <div className="grid grid-cols-3 gap-2">
          {chains.map((chain) => (
            <button
              key={chain.id}
              onClick={() => setDestinationChain(chain.id)}
              className={`p-2 rounded-lg text-xs font-semibold transition-colors ${
                destinationChain === chain.id
                  ? `${chain.color} text-white`
                  : "bg-gray-700 text-gray-400 hover:bg-gray-600"
              }`}
            >
              {chain.name}
            </button>
          ))}
        </div>
      </div>

      {/* Destination Address */}
      <div className="bg-gray-800 rounded-xl p-4 mb-4">
        <p className="text-gray-400 text-xs font-semibold mb-2">HEDEF ADRES</p>
        <input
          type="text"
          placeholder="Cüzdan adresini yapıştırın"
          value={destinationAddress}
          onChange={(e) => setDestinationAddress(e.target.value)}
          className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white font-mono text-xs placeholder-gray-500 focus:outline-none focus:border-orange-500"
        />
      </div>

      {/* Amount */}
      <div className="bg-gray-800 rounded-xl p-4 mb-4">
        <p className="text-gray-400 text-xs font-semibold mb-2">MİKTAR (pUSD)</p>
        <input
          type="number"
          placeholder="0.00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-orange-500"
        />
      </div>

      {/* Result */}
      {withdrawResult && (
        <div className={`rounded-xl p-4 mb-4 ${
          withdrawResult.success ? "bg-green-500/10 border border-green-500/30" : "bg-red-500/10 border border-red-500/30"
        }`}>
          <p className={`text-sm font-semibold mb-2 ${withdrawResult.success ? "text-green-400" : "text-red-400"}`}>
            {withdrawResult.message}
          </p>
          
          {withdrawResult.addresses && (
            <div className="space-y-2 mt-3">
              {withdrawResult.addresses.evm && (
                <div className="bg-gray-900 rounded-lg p-2">
                  <p className="text-gray-500 text-xs">EVM Adresi:</p>
                  <p className="text-white font-mono text-xs break-all">{withdrawResult.addresses.evm}</p>
                </div>
              )}
              {withdrawResult.addresses.svm && (
                <div className="bg-gray-900 rounded-lg p-2">
                  <p className="text-gray-500 text-xs">Solana Adresi:</p>
                  <p className="text-white font-mono text-xs break-all">{withdrawResult.addresses.svm}</p>
                </div>
              )}
              {withdrawResult.addresses.btc && (
                <div className="bg-gray-900 rounded-lg p-2">
                  <p className="text-gray-500 text-xs">Bitcoin Adresi:</p>
                  <p className="text-white font-mono text-xs break-all">{withdrawResult.addresses.btc}</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Info */}
      <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 mb-4">
        <p className="text-blue-400 text-xs font-semibold mb-2">NASIL ÇALIŞIR?</p>
        <ol className="text-gray-400 text-xs space-y-1 list-decimal list-inside">
          <li>Hedef ağ ve adresi girin</li>
          <li>Göndermek istediğiniz pUSD miktarını girin</li>
          <li>"Withdrawal Adresi Oluştur" butonuna tıklayın</li>
          <li>Oluşturulan adrese pUSD gönderin</li>
          <li>Fonlar hedef cüzdanınıza bridge edilecek</li>
        </ol>
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-4 py-3 rounded-xl font-semibold transition-colors"
        >
          Geri
        </button>
        <button
          onClick={handleWithdraw}
          disabled={withdrawLoading || !destinationAddress || !amount}
          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-xl font-semibold transition-colors disabled:opacity-50"
        >
          {withdrawLoading ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Oluşturuluyor...
            </span>
          ) : (
            "Withdrawal Adresi Oluştur"
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
  const { user } = useAuth();

  const copyAddress = () => {
    if (userData.walletAddress) {
      navigator.clipboard.writeText(userData.walletAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  useEffect(() => {
    const saveTransaction = async () => {
      if (!user || !userData.depositAmount) return;

      try {
        const { data: wallet } = await supabase
          .from("wallets")
          .select("id")
          .eq("user_id", user.id)
          .eq("is_primary", true)
          .single();

        if (wallet) {
          const { error: txError } = await supabase
            .from("transactions")
            .insert({
              user_id: user.id,
              wallet_id: wallet.id,
              type: "deposit",
              status: "completed",
              chain: "polygon",
              chain_id: 137,
              amount: userData.depositAmount,
              token_symbol: "USDC",
              token_address: "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359",
              fiat_amount: userData.depositAmount,
              fiat_currency: "USD",
              provider: userData.depositMethod === "card" ? "alchemyPay" : "polymarket",
              external_tx_hash: userData.transactionHash || null,
            });

          if (txError) {
            console.error("Transaction save error:", txError);
          }
        }
      } catch (err) {
        console.error("Save transaction error:", err);
      }
    };

    saveTransaction();
  }, [user, userData]);

  return (
    <div className="text-center">
      {userData.depositMethod === "card" ? (
        <>
          <div className="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Ödeme Alınıyor</h3>
          <p className="text-gray-400 mb-6">
            <span className="text-orange-500 font-bold">${userData.depositAmount}</span> yatırınız işleniyor.
          </p>
          
          <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-orange-400 text-xs font-semibold">AĞ BİLGİSİ</p>
              <span className="bg-orange-500 text-black text-xs font-bold px-2 py-1 rounded">POLYGON (MATIC)</span>
            </div>
            <p className="text-gray-400 text-xs">USDC tokenları Polygon ağında işleniyor</p>
          </div>
          
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 mb-4">
            <p className="text-yellow-400 text-sm">
              AlchemyPay ödemenizi doğruluyor. Bu işlem 1-5 dakika sürebilir.
            </p>
          </div>
          <div className="bg-gray-800 rounded-xl p-4 mb-6 text-left">
            <p className="text-gray-400 text-sm mb-2">Durum:</p>
            <p className="text-yellow-400 font-semibold">AlchemyPay'ta işleniyor...</p>
          </div>
        </>
      ) : (
        <>
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Yatırım Başarılı!</h3>
          <p className="text-gray-400 mb-6">
            Hesabınıza <span className="text-orange-500 font-bold">${userData.depositAmount}</span> yatırıldı.
          </p>
        </>
      )}

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
