'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminGirisPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate verification delay
    await new Promise((resolve) => setTimeout(resolve, 600));

    // Hardcoded credentials for mock pilot demo
    if (email === 'admin@onarimatlasi.com' && password === 'ankara2026') {
      // Store session state in localStorage
      localStorage.setItem('adminSession', 'active');
      router.push('/admin/oneriler');
    } else {
      setError('Geçersiz e-posta adresi veya şifre. (admin@onarimatlasi.com / ankara2026)');
      setLoading(false);
    }
  };

  return (
    <article className="paper-grain min-h-[80vh] flex items-center justify-center px-5 py-12">
      <div className="w-full max-w-md rounded-sm border border-ink/15 bg-paper-light p-8 shadow-paper space-y-6">
        <div className="text-center space-y-2">
          <span className="archive-label text-ink/40 tracking-[0.2em] block">Yönetim</span>
          <h1 className="font-display text-2xl font-semibold tracking-editorial text-ink">
            Atlas Küratör Girişi
          </h1>
          <p className="text-xs text-ink/50 max-w-xs mx-auto">
            Saha doğrulaması önerilerini ve harita hotspot koordinatlarını yönetmek için giriş yapın.
          </p>
        </div>

        {error && (
          <div className="rounded-sm border border-[--atlas-red-deep]/20 bg-[--atlas-red-deep]/5 p-3.5 text-xs text-[--atlas-red-deep] text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="email" className="archive-label text-ink/60 text-[0.65rem]">
              E-Posta Adresi
            </label>
            <input
              type="email"
              id="email"
              required
              disabled={loading}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-sm border border-ink/15 bg-paper-light px-3 py-2 text-sm text-ink outline-none focus:border-ink/40 disabled:opacity-50"
              placeholder="admin@onarimatlasi.com"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="password" className="archive-label text-ink/60 text-[0.65rem]">
              Şifre
            </label>
            <input
              type="password"
              id="password"
              required
              disabled={loading}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-sm border border-ink/15 bg-paper-light px-3 py-2 text-sm text-ink outline-none focus:border-ink/40 disabled:opacity-50"
              placeholder="••••••••"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-sm border border-ink bg-ink py-2.5 text-center text-xs font-semibold uppercase tracking-[0.14em] text-paper-light hover:bg-[--atlas-red-deep] hover:border-[--atlas-red-deep] transition-all disabled:opacity-50"
            >
              {loading ? 'Doğrulanıyor...' : 'Giriş Yap'}
            </button>
          </div>
        </form>

        <div className="border-t border-ink/10 pt-4 text-center">
          <p className="text-[0.6rem] text-ink/40 uppercase tracking-[0.12em]">
            Demo: admin@onarimatlasi.com · Şifre: ankara2026
          </p>
        </div>
      </div>
    </article>
  );
}
