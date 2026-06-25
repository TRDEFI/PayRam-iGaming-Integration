'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error } = await signIn(email, password);
    if (error) {
      setError(error.message);
    } else {
      window.location.href = '/dashboard';
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-[#12121a] border border-gray-800 rounded-2xl p-8">
          <h1 className="text-3xl font-bold text-white mb-2">Giris Yap</h1>
          <p className="text-gray-400 mb-8">Hesabiniza erisin</p>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">E-posta</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-[#1a1a2e] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#00d4aa] transition-colors"
                placeholder="ornek@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Sifre</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-[#1a1a2e] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#00d4aa] transition-colors"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#00d4aa] text-black font-semibold rounded-lg hover:bg-[#00e8bc] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Giris yapiliyor...' : 'Giris Yap'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Hesabiniz yok mu?{' '}
              <Link href="/register" className="text-[#00d4aa] hover:underline">
                Kayit Ol
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
