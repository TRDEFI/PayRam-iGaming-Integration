'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';

interface Wallet {
  id: string;
  address: string;
  chain: string;
  chain_id: number;
  label: string;
  is_primary: boolean;
  balance?: number;
}

interface Transaction {
  id: string;
  type: string;
  status: string;
  chain: string;
  amount: number;
  token_symbol: string;
  fiat_amount: number;
  fiat_currency: string;
  provider: string;
  external_tx_hash: string;
  created_at: string;
}

interface Balance {
  USDC: { balance: number; contract: string; decimals: number };
  MATIC: { balance: number; decimals: number };
}

interface WithdrawState {
  isOpen: boolean;
  walletAddress: string;
  destinationChain: string;
  destinationAddress: string;
  amount: string;
  loading: boolean;
  result: {
    success: boolean;
    message: string;
    addresses?: { evm?: string; svm?: string; btc?: string };
  } | null;
}

export default function DashboardPage() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState<Balance | null>(null);
  const [balanceLoading, setBalanceLoading] = useState(false);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);
  const [consolidating, setConsolidating] = useState(false);
  const [consolidateMessage, setConsolidateMessage] = useState('');
  const [withdrawState, setWithdrawState] = useState<WithdrawState>({
    isOpen: false,
    walletAddress: '',
    destinationChain: 'polygon',
    destinationAddress: '',
    amount: '',
    loading: false,
    result: null,
  });

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      fetch('/api/user/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id })
      })
        .then(res => res.json())
        .then(data => {
          if (data.wallets) setWallets(data.wallets);
          if (data.transactions) setTransactions(data.transactions);
        })
        .catch(console.error);
    }
  }, [user]);

  const fetchBalance = useCallback(async () => {
    const primaryWallet = wallets.find(w => w.is_primary);
    if (!primaryWallet) return;

    setBalanceLoading(true);
    try {
      const res = await fetch('/api/balance-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address: primaryWallet.address })
      });
      const data = await res.json();
      if (data.balances) {
        setBalance(data.balances);
        setLastRefresh(new Date());
      }
    } catch (err) {
      console.error('Balance check error:', err);
    } finally {
      setBalanceLoading(false);
    }
  }, [wallets]);

  useEffect(() => {
    if (wallets.length > 0) {
      fetchBalance();
    }
  }, [wallets, fetchBalance]);

  const handleConsolidate = async (targetWalletId: string) => {
    const targetWallet = wallets.find(w => w.id === targetWalletId);
    const sourceWallets = wallets.filter(w => w.id !== targetWalletId);

    if (!targetWallet || sourceWallets.length === 0) return;

    setConsolidating(true);
    setConsolidateMessage('Cüzdanlar birleştiriliyor...');

    try {
      const res = await fetch('/api/wallet/consolidate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          wallets: sourceWallets,
          targetAddress: targetWallet.address,
          userPrivateKey: 'placeholder',
        }),
      });

      const data = await res.json();

      if (data.success) {
        setConsolidateMessage('Cüzdanlar başarıyla birleştirildi!');
        fetchBalance();
      } else {
        setConsolidateMessage('Birleştirme hatası: ' + (data.error || 'Bilinmeyen hata'));
      }
    } catch (err) {
      setConsolidateMessage('Birleştirme hatası: ' + (err as Error).message);
    } finally {
      setConsolidating(false);
    }
  };

  const handleWithdraw = async () => {
    if (!withdrawState.walletAddress || !withdrawState.destinationAddress || !withdrawState.amount) return;

    setWithdrawState(prev => ({ ...prev, loading: true, result: null }));

    try {
      const chainIdMap: Record<string, string> = {
        polygon: '137',
        ethereum: '1',
        base: '8453',
        arbitrum: '42161',
        solana: '1151111081099710',
        bitcoin: '0',
      };

      const tokenAddressMap: Record<string, string> = {
        polygon: '0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359',
        ethereum: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
        base: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
        arbitrum: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
        solana: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
        bitcoin: '',
      };

      const res = await fetch('/api/wallet/withdraw', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          walletAddress: withdrawState.walletAddress,
          toChainId: chainIdMap[withdrawState.destinationChain],
          toTokenAddress: tokenAddressMap[withdrawState.destinationChain],
          recipientAddress: withdrawState.destinationAddress,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setWithdrawState(prev => ({
          ...prev,
          loading: false,
          result: {
            success: true,
            message: 'Withdrawal adresi oluşturuldu. Aşağıdaki adrese pUSD gönderin.',
            addresses: data.withdrawalAddresses,
          },
        }));
      } else {
        setWithdrawState(prev => ({
          ...prev,
          loading: false,
          result: {
            success: false,
            message: data.error || 'Withdrawal hatası',
          },
        }));
      }
    } catch (err) {
      setWithdrawState(prev => ({
        ...prev,
        loading: false,
        result: {
          success: false,
          message: 'Withdrawal hatası: ' + (err as Error).message,
        },
      }));
    }
  };

  const openWithdrawModal = (walletAddress: string) => {
    setWithdrawState({
      isOpen: true,
      walletAddress,
      destinationChain: 'polygon',
      destinationAddress: '',
      amount: '',
      loading: false,
      result: null,
    });
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="text-white">Yukleniyor...</div>
      </main>
    );
  }

  if (!user) return null;

  const primaryWallet = wallets.find(w => w.is_primary);

  return (
    <main className="min-h-screen bg-[#0a0a0f]">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            <p className="text-gray-400">{user.email}</p>
          </div>
          <div className="flex gap-4">
            <Link
              href="/"
              className="px-4 py-2 bg-[#1a1a2e] text-white rounded-lg hover:bg-[#252540] transition-colors"
            >
              Ana Sayfa
            </Link>
            <button
              onClick={signOut}
              className="px-4 py-2 bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/30 transition-colors"
            >
              Cikis Yap
            </button>
          </div>
        </div>

        {/* Balance Section */}
        <div className="bg-[#12121a] border border-gray-800 rounded-2xl p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">Toplam Bakiye</h2>
            <button
              onClick={fetchBalance}
              disabled={balanceLoading}
              className="flex items-center gap-2 px-3 py-1.5 bg-[#1a1a2e] text-gray-300 rounded-lg hover:bg-[#252540] transition-colors text-sm disabled:opacity-50"
            >
              <svg 
                className={`w-4 h-4 ${balanceLoading ? 'animate-spin' : ''}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              {balanceLoading ? 'Yükleniyor...' : 'Yenile'}
            </button>
          </div>

          {balance ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#1a1a2e] rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">USDC</span>
                  <span className="text-xs px-2 py-1 bg-[#00d4aa]/10 text-[#00d4aa] rounded">Polygon</span>
                </div>
                <p className="text-2xl font-bold text-white">${balance.USDC.balance.toFixed(2)}</p>
                <p className="text-gray-500 text-xs mt-1">Stablecoin (1 USD = 1 USDC)</p>
              </div>
              <div className="bg-[#1a1a2e] rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">MATIC</span>
                  <span className="text-xs px-2 py-1 bg-purple-500/10 text-purple-400 rounded">Polygon</span>
                </div>
                <p className="text-2xl font-bold text-white">{balance.MATIC.balance.toFixed(4)}</p>
                <p className="text-gray-500 text-xs mt-1">Gas ücretleri için</p>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              {balanceLoading ? (
                <div className="flex items-center justify-center gap-2 text-gray-400">
                  <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                  Bakiye sorgulanıyor...
                </div>
              ) : primaryWallet ? (
                <div>
                  <p className="text-gray-400 mb-2">Bakiye yüklenemedi</p>
                  <button 
                    onClick={fetchBalance}
                    className="text-[#00d4aa] hover:underline text-sm"
                  >
                    Tekrar dene
                  </button>
                </div>
              ) : (
                <p className="text-gray-400">Henüz cüzdanınız yok</p>
              )}
            </div>
          )}

          {lastRefresh && (
            <p className="text-gray-500 text-xs mt-3 text-right">
              Son güncelleme: {lastRefresh.toLocaleTimeString('tr-TR')}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-[#12121a] border border-gray-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white">Cuzdanlarim</h2>
              {wallets.length > 1 && (
                <button
                  onClick={() => handleConsolidate(wallets.find(w => w.is_primary)?.id || wallets[0].id)}
                  disabled={consolidating}
                  className="flex items-center gap-2 px-3 py-1.5 bg-purple-500/20 text-purple-400 border border-purple-500/30 rounded-lg hover:bg-purple-500/30 transition-colors text-sm disabled:opacity-50"
                >
                  {consolidating ? (
                    <>
                      <div className="w-4 h-4 border-2 border-purple-400 border-t-transparent rounded-full animate-spin" />
                      Birleştiriliyor...
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                      </svg>
                      Birleştir
                    </>
                  )}
                </button>
              )}
            </div>
            
            {consolidateMessage && (
              <div className={`text-sm mb-4 p-3 rounded-lg ${
                consolidateMessage.includes('başarıyla') 
                  ? 'bg-green-500/10 text-green-400 border border-green-500/30' 
                  : 'bg-red-500/10 text-red-400 border border-red-500/30'
              }`}>
                {consolidateMessage}
              </div>
            )}
            
            {wallets.length === 0 ? (
              <p className="text-gray-400">Henuz cuzdaniniz yok</p>
            ) : (
              <div className="space-y-3">
                {wallets.map(wallet => (
                  <div key={wallet.id} className="bg-[#1a1a2e] rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="text-white font-medium">{wallet.label}</p>
                        <p className="text-gray-400 text-sm font-mono">{wallet.address.slice(0, 6)}...{wallet.address.slice(-4)}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {wallet.is_primary && (
                          <span className="text-xs px-2 py-1 bg-[#00d4aa]/10 text-[#00d4aa] rounded">
                            Ana
                          </span>
                        )}
                        <span className="text-xs px-2 py-1 bg-blue-500/10 text-blue-400 rounded">
                          {wallet.chain}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => openWithdrawModal(wallet.address)}
                        className="flex-1 bg-blue-500/20 text-blue-400 border border-blue-500/30 px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-blue-500/30 transition-colors"
                      >
                        Withdraw
                      </button>
                      {!wallet.is_primary && wallets.length > 1 && (
                        <button
                          onClick={() => handleConsolidate(wallets.find(w => w.is_primary)?.id || wallets[0].id)}
                          disabled={consolidating}
                          className="flex-1 bg-purple-500/20 text-purple-400 border border-purple-500/30 px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-purple-500/30 transition-colors disabled:opacity-50"
                        >
                          Birleştir
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-[#12121a] border border-gray-800 rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Son Islemler</h2>
            {transactions.length === 0 ? (
              <p className="text-gray-400">Henuz isleminiz yok</p>
            ) : (
              <div className="space-y-3">
                {transactions.map(tx => (
                  <div key={tx.id} className="bg-[#1a1a2e] rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white font-medium">
                          {tx.type === 'deposit' ? 'Yatırım' : 'Çekim'} - {tx.amount > 0 ? `$${tx.amount}` : 'Beklemede'} {tx.token_symbol}
                        </p>
                        <p className="text-gray-400 text-sm">{new Date(tx.created_at).toLocaleDateString('tr-TR')}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded ${
                        tx.status === 'completed' ? 'bg-green-500/10 text-green-400' :
                        tx.status === 'pending' ? 'bg-yellow-500/10 text-yellow-400' :
                        'bg-red-500/10 text-red-400'
                      }`}>
                        {tx.status === 'completed' ? 'Tamamlandı' : 
                         tx.status === 'pending' ? 'Beklemede' : 'Başarısız'}
                      </span>
                    </div>
                    {tx.external_tx_hash && (
                      <p className="text-gray-500 text-xs mt-1 font-mono">{tx.external_tx_hash}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Withdraw Modal */}
      {withdrawState.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setWithdrawState(prev => ({ ...prev, isOpen: false }))} />
          <div className="relative w-full max-w-md bg-[#12121a] border border-gray-800 rounded-2xl p-6 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setWithdrawState(prev => ({ ...prev, isOpen: false }))}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h3 className="text-xl font-bold text-white mb-4">Withdraw</h3>

            {/* Source Wallet */}
            <div className="bg-[#1a1a2e] rounded-lg p-3 mb-4">
              <p className="text-gray-400 text-xs mb-1">Kaynak Cüzdan</p>
              <p className="text-white font-mono text-xs break-all">{withdrawState.walletAddress}</p>
            </div>

            {/* Destination Chain */}
            <div className="mb-4">
              <p className="text-gray-400 text-xs font-semibold mb-2">HEDEF AĞ</p>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'polygon', name: 'Polygon', color: 'bg-purple-500' },
                  { id: 'ethereum', name: 'Ethereum', color: 'bg-blue-500' },
                  { id: 'base', name: 'Base', color: 'bg-blue-400' },
                  { id: 'arbitrum', name: 'Arbitrum', color: 'bg-blue-600' },
                  { id: 'solana', name: 'Solana', color: 'bg-purple-400' },
                  { id: 'bitcoin', name: 'Bitcoin', color: 'bg-orange-500' },
                ].map((chain) => (
                  <button
                    key={chain.id}
                    onClick={() => setWithdrawState(prev => ({ ...prev, destinationChain: chain.id }))}
                    className={`p-2 rounded-lg text-xs font-semibold transition-colors ${
                      withdrawState.destinationChain === chain.id
                        ? `${chain.color} text-white`
                        : 'bg-[#1a1a2e] text-gray-400 hover:bg-[#252540]'
                    }`}
                  >
                    {chain.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Destination Address */}
            <div className="mb-4">
              <p className="text-gray-400 text-xs font-semibold mb-2">HEDEF ADRES</p>
              <input
                type="text"
                placeholder="Cüzdan adresini yapıştırın"
                value={withdrawState.destinationAddress}
                onChange={(e) => setWithdrawState(prev => ({ ...prev, destinationAddress: e.target.value }))}
                className="w-full bg-[#1a1a2e] border border-gray-700 rounded-lg px-3 py-2 text-white font-mono text-xs placeholder-gray-500 focus:outline-none focus:border-orange-500"
              />
            </div>

            {/* Amount */}
            <div className="mb-4">
              <p className="text-gray-400 text-xs font-semibold mb-2">MİKTAR (pUSD)</p>
              <input
                type="number"
                placeholder="0.00"
                value={withdrawState.amount}
                onChange={(e) => setWithdrawState(prev => ({ ...prev, amount: e.target.value }))}
                className="w-full bg-[#1a1a2e] border border-gray-700 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-orange-500"
              />
            </div>

            {/* Result */}
            {withdrawState.result && (
              <div className={`rounded-lg p-4 mb-4 ${
                withdrawState.result.success ? 'bg-green-500/10 border border-green-500/30' : 'bg-red-500/10 border border-red-500/30'
              }`}>
                <p className={`text-sm font-semibold mb-2 ${withdrawState.result.success ? 'text-green-400' : 'text-red-400'}`}>
                  {withdrawState.result.message}
                </p>
                
                {withdrawState.result.addresses && (
                  <div className="space-y-2 mt-3">
                    {withdrawState.result.addresses.evm && (
                      <div className="bg-[#1a1a2e] rounded-lg p-2">
                        <p className="text-gray-500 text-xs">EVM Adresi:</p>
                        <p className="text-white font-mono text-xs break-all">{withdrawState.result.addresses.evm}</p>
                      </div>
                    )}
                    {withdrawState.result.addresses.svm && (
                      <div className="bg-[#1a1a2e] rounded-lg p-2">
                        <p className="text-gray-500 text-xs">Solana Adresi:</p>
                        <p className="text-white font-mono text-xs break-all">{withdrawState.result.addresses.svm}</p>
                      </div>
                    )}
                    {withdrawState.result.addresses.btc && (
                      <div className="bg-[#1a1a2e] rounded-lg p-2">
                        <p className="text-gray-500 text-xs">Bitcoin Adresi:</p>
                        <p className="text-white font-mono text-xs break-all">{withdrawState.result.addresses.btc}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setWithdrawState(prev => ({ ...prev, isOpen: false }))}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-4 py-3 rounded-xl font-semibold transition-colors"
              >
                İptal
              </button>
              <button
                onClick={handleWithdraw}
                disabled={withdrawState.loading || !withdrawState.destinationAddress || !withdrawState.amount}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-xl font-semibold transition-colors disabled:opacity-50"
              >
                {withdrawState.loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Oluşturuluyor...
                  </span>
                ) : (
                  'Withdrawal Adresi Oluştur'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
