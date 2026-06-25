'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session, AuthError } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { deriveAddressFromEmail } from '@/lib/crypto';

interface Wallet {
  id: string;
  address: string;
  chain: string;
  chain_id: number;
  label: string;
  is_primary: boolean;
  encrypted_private_key?: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  wallets: Wallet[];
  signUp: (email: string, password: string, fullName?: string) => Promise<{ error: AuthError | null }>;
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  signOut: () => Promise<void>;
  createWallet: (label?: string) => Promise<{ wallet: Wallet | null; error: string | null }>;
  getWallets: () => Promise<void>;
  consolidateWallets: (targetWalletId: string) => Promise<{ success: boolean; error: string | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [wallets, setWallets] = useState<Wallet[]>([]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      getWallets();
    }
  }, [user]);

  const signUp = async (email: string, password: string, fullName?: string) => {
    // First create user via admin API (auto-confirms email)
    const callbackRes = await fetch('/api/auth/callback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, fullName })
    });
    const callbackData = await callbackRes.json();
    
    if (callbackData.error) {
      return { error: { message: callbackData.error } as AuthError };
    }

    // Then sign in
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setWallets([]);
  };

  const getWallets = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('wallets')
        .select('*')
        .eq('user_id', user.id)
        .order('is_primary', { ascending: false });

      if (error) throw error;
      setWallets(data || []);
    } catch (err) {
      console.error('Get wallets error:', err);
    }
  };

  const createWallet = async (label?: string) => {
    if (!user) return { wallet: null, error: 'User not authenticated' };

    try {
      // Derive deterministic address from email
      const address = await deriveAddressFromEmail(user.email || '');

      // Check if wallet already exists
      const { data: existing } = await supabase
        .from('wallets')
        .select('id')
        .eq('user_id', user.id)
        .eq('address', address)
        .single();

      if (existing) {
        return { wallet: wallets.find(w => w.address === address) || null, error: null };
      }

      // Create new wallet
      const isPrimary = wallets.length === 0;
      const walletLabel = label || `Cüzdan ${wallets.length + 1}`;

      const { data, error } = await supabase
        .from('wallets')
        .insert({
          user_id: user.id,
          address,
          chain: 'polygon',
          chain_id: 137,
          label: walletLabel,
          is_primary: isPrimary,
        })
        .select()
        .single();

      if (error) throw error;

      setWallets(prev => [...prev, data]);
      return { wallet: data, error: null };
    } catch (err) {
      return { wallet: null, error: (err as Error).message };
    }
  };

  const consolidateWallets = async (targetWalletId: string) => {
    if (!user) return { success: false, error: 'User not authenticated' };

    const targetWallet = wallets.find(w => w.id === targetWalletId);
    if (!targetWallet) return { success: false, error: 'Target wallet not found' };

    const sourceWallets = wallets.filter(w => w.id !== targetWalletId);
    if (sourceWallets.length === 0) return { success: false, error: 'No wallets to consolidate' };

    try {
      const response = await fetch('/api/wallet/consolidate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          wallets: sourceWallets,
          targetAddress: targetWallet.address,
          userPrivateKey: 'placeholder', // In production, get from secure storage
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Consolidation failed');
      }

      return { success: true, error: null };
    } catch (err) {
      return { success: false, error: (err as Error).message };
    }
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, wallets, signUp, signIn, signOut, createWallet, getWallets, consolidateWallets }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
