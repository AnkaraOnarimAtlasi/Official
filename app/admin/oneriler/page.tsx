'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface MockSubmission {
  id: string;
  name: string;
  email: string;
  artisanName: string;
  district: string;
  craftType: string;
  address: string;
  whyIncluded: string;
  status: 'pending' | 'approved' | 'rejected';
}

const INITIAL_SUBMISSIONS: MockSubmission[] = [
  {
    id: 'sub-1',
    name: 'Can Eren',
    email: 'can.eren@student.edu',
    artisanName: 'Deri Ustası Remzi Bey',
    district: 'Ulus',
    craftType: 'El yapımı deri çanta ve kemer tamiri',
    address: 'Ulus Vakıf Çarşısı No: 42',
    whyIncluded: 'Remzi Usta 40 senedir aynı çarşıda eski zanaat dikiş makineleriyle çalışıyor, Ankara\'da el işçiliği deri onarımını sürdüren son kişilerden.',
    status: 'pending',
  },
  {
    id: 'sub-2',
    name: 'Elif Demir',
    email: 'elif@mimarlik.net',
    artisanName: 'Ahşap Restoratörü Ömer Usta',
    district: 'Kale',
    craftType: 'Ahşap oyma ve mobilya konservasyonu',
    address: 'Ankara Kalesi Sok. No: 15',
    whyIncluded: 'Ömer Usta antika Ankara evlerinin ahşap tavan ve kapı parçalarını geleneksel yöntemlerle restore ediyor. Zanaat mirasının korunması açısından çok kritik.',
    status: 'pending',
  },
];

export default function AdminOnerilerPage() {
  const [submissions, setSubmissions] = useState<MockSubmission[]>(INITIAL_SUBMISSIONS);
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const session = localStorage.getItem('adminSession');
    if (session !== 'active') {
      router.push('/admin/giris');
    } else {
      setAuthenticated(true);
    }
  }, [router]);

  const handleAction = (id: string, action: 'approved' | 'rejected') => {
    setSubmissions((prev) =>
      prev.map((sub) => (sub.id === id ? { ...sub, status: action } : sub))
    );
  };

  const handleLogout = () => {
    localStorage.removeItem('adminSession');
    router.push('/admin/giris');
  };

  if (!authenticated) {
    return (
      <div className="flex h-[80vh] items-center justify-center bg-paper">
        <span className="archive-label text-ink/30 animate-pulse">Doğrulanıyor...</span>
      </div>
    );
  }

  return (
    <article className="paper-grain min-h-screen py-8 md:py-12">
      <div className="mx-auto max-w-layout px-5 md:px-8">
        
        {/* Admin Navigation Header */}
        <div className="flex flex-col gap-4 border-b border-ink/10 pb-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <span className="archive-label text-ink/50">Küratör Paneli</span>
            <h1 className="font-display text-2xl font-semibold tracking-editorial text-ink md:text-3xl">
              Atlas Yönetimi
            </h1>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/admin/oneriler"
              className="rounded-sm border border-ink bg-ink px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-paper-light"
            >
              Öneriler
            </Link>
            <Link
              href="/admin/hotspot-editor"
              className="rounded-sm border border-ink/15 bg-paper-light px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-ink hover:bg-paper"
            >
              Hotspot Editörü
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-sm border border-[--atlas-red-deep]/20 bg-paper-light px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[--atlas-red-deep] hover:bg-[--atlas-red-deep]/5"
            >
              Güvenli Çıkış
            </button>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="mt-8 space-y-6">
          <h2 className="font-display text-xl font-semibold text-ink">
            Kullanıcı Nokta Önerileri
          </h2>

          <div className="grid gap-6">
            {submissions.map((sub) => (
              <div
                key={sub.id}
                className="relative rounded-sm border border-ink/15 bg-paper-light p-6 shadow-paper space-y-4"
              >
                {/* Moderation Status Tag */}
                <span className="absolute top-6 right-6">
                  {sub.status === 'pending' && (
                    <span className="rounded-full bg-amber-50 border border-amber-200 px-2.5 py-0.5 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-amber-700">
                      Değerlendirmede
                    </span>
                  )}
                  {sub.status === 'approved' && (
                    <span className="rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-emerald-700">
                      Onaylandı (Atlasta)
                    </span>
                  )}
                  {sub.status === 'rejected' && (
                    <span className="rounded-full bg-rose-50 border border-rose-200 px-2.5 py-0.5 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-rose-700">
                      Reddedildi
                    </span>
                  )}
                </span>

                <div className="space-y-1 max-w-[75%]">
                  <h3 className="font-display text-lg font-semibold text-ink">
                    {sub.artisanName}
                  </h3>
                  <p className="text-xs text-ink/50">
                    {sub.craftType} · <strong>{sub.district}</strong>
                  </p>
                </div>

                <div className="border-t border-ink/10 pt-3 grid gap-4 md:grid-cols-[1fr_2fr]">
                  <div>
                    <p className="text-[0.62rem] uppercase tracking-[0.14em] text-ink/40">Öneren Bilgileri</p>
                    <p className="text-xs font-semibold text-ink mt-0.5">{sub.name}</p>
                    <p className="text-xs text-ink/60">{sub.email}</p>
                  </div>
                  <div>
                    <p className="text-[0.62rem] uppercase tracking-[0.14em] text-ink/40">Adres Bilgisi</p>
                    <p className="text-xs text-ink/75 mt-0.5 italic">{sub.address || 'Belirtilmemiş'}</p>
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-[0.62rem] uppercase tracking-[0.14em] text-ink/40">Öneri Gerekçesi & Hikâye</p>
                  <p className="text-sm leading-relaxed text-ink/75">{sub.whyIncluded}</p>
                </div>

                {sub.status === 'pending' && (
                  <div className="border-t border-ink/10 pt-4 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => handleAction(sub.id, 'rejected')}
                      className="rounded-sm border border-rose-200 bg-rose-50/50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-rose-700 hover:bg-rose-50"
                    >
                      Reddet
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAction(sub.id, 'approved')}
                      className="rounded-sm border border-emerald-500 bg-emerald-600 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-paper-light hover:bg-emerald-700"
                    >
                      Onayla & Atlasa Ekle
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </article>
  );
}
