import type { Metadata } from 'next';
import { AtlasButton, AtlasIconArrow } from '@/components/ui/AtlasButton';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { DraftBadge } from '@/components/ui/DraftBadge';
import { CantaMockupsCarousel } from '@/components/atlas/CantaMockupsCarousel';
import { BookMockup } from '@/components/atlas/BookMockup';
import { MOCK_DISTRIBUTION } from '@/lib/constants/mockDistribution';
import { SITE } from '@/lib/constants/site';

export const metadata: Metadata = {
  title: 'Atlası Edin · Fiziksel Eser',
  description: `${SITE.name} — Basılı Ankara Onarım Atlası haritalarını edinebileceğiniz dağıtım noktaları ve fiziksel yayın detayları.`,
  alternates: { canonical: '/atlas-edinin' },
};

const CATEGORY_LABELS: Record<string, string> = {
  university: 'Üniversite',
  'cultural-center': 'Kültür Merkezi',
  cafe: 'Kafe / Kitabevi',
  library: 'Kütüphane',
  other: 'Diğer',
};

const AVAILABILITY_LABELS: Record<string, string> = {
  'in-stock': 'Stokta Var',
  low: 'Azaldı',
  'out-of-stock': 'Henüz Başlamadı',
};

const AVAILABILITY_DOT: Record<string, string> = {
  'in-stock': 'bg-emerald-700',
  low: 'bg-amber-600',
  'out-of-stock': 'bg-[--atlas-red-deep]',
};

const SPECS = [
  { label: 'Form', value: '4 katlı harita · cebe sığar' },
  { label: 'Kağıt', value: '120 g krem mat · asitsiz' },
  { label: 'Boyut', value: '48 × 64 cm açık · 16 × 24 cm kapalı' },
  { label: 'Baskı', value: '2 renk ofset · risograf vurgular' },
  { label: 'Edisyon', value: 'Edisyon 01 · sınırlı 250 set · numaralandırılmış' },
  { label: 'QR', value: 'Her harita köşesinde · doğrudan dijital rotaya' },
];

export default function AtlasEdininPage() {
  const breadcrumb = [
    { label: 'Atlas', href: '/atlas' },
    { label: 'Atlası Edin · Fiziksel Eser' },
  ];

  return (
    <article>
      {/* Üst arşiv bandı */}
      <div className="border-b border-border/70 bg-paper">
        <div className="mx-auto flex max-w-layout items-center justify-between gap-6 px-5 py-3 text-[0.68rem] uppercase tracking-[0.22em] text-ink/55 md:px-8">
          <span>Fiziksel Atlas · Edisyon 01</span>
          <span className="hidden sm:inline">Sınırlı baskı · 250 set</span>
          <span className="tabular-nums">{MOCK_DISTRIBUTION.length} dağıtım noktası</span>
        </div>
      </div>

      <div className="mx-auto max-w-layout px-5 pt-8 md:px-8">
        <Breadcrumb items={breadcrumb} />
      </div>

      {/* Hero — şartname yanına 3D kitap */}
      <section className="mx-auto max-w-layout px-5 pb-20 pt-8 md:px-8 md:pb-28 md:pt-14">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="archive-label text-ink/55">Fiziksel Eser</p>
            <h1 className="display-1 mt-4 text-5xl leading-[0.95] text-ink sm:text-6xl lg:text-[5.4rem]">
              Atlası
              <br />
              <span className="italic text-[--atlas-red-deep]">eline al.</span>
            </h1>
            <p className="hand-note mt-6 text-xl text-ink/65 md:text-2xl">
              krem kâğıt · mürekkep · dört harita
            </p>
            <p className="mt-7 max-w-prose text-base leading-relaxed text-ink/80 md:text-[1.05rem]">
              Ankara Onarım Atlası, sadece ekranda gezilecek bir web sitesi
              olarak tasarlanmadı. Projenin kalbi krem kâğıda basılmış, dört
              katmanlı katlı harita setidir. Her sayfanın köşesindeki QR kod
              ilgili dijital rotayı açar; harita tek başına da kullanılabilir.
            </p>

            {/* Şartname tablosu */}
            <dl className="mt-9 divide-y divide-ink/10 border-y border-ink/15">
              {SPECS.map((s) => (
                <div key={s.label} className="flex items-baseline gap-4 py-2.5">
                  <dt className="w-24 shrink-0 text-[0.7rem] uppercase tracking-[0.22em] text-ink/55">
                    {s.label}
                  </dt>
                  <dd className="text-[0.95rem] text-ink/85">{s.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-9 flex flex-wrap gap-3">
              <AtlasButton href="#dagitim" variant="primary">
                Dağıtım Noktalarını Gör
                <AtlasIconArrow />
              </AtlasButton>
              <AtlasButton href="/iletisim" variant="ghost">
                Kurumsal istek
              </AtlasButton>
            </div>
          </div>

          {/* Sağ — 3D Kitap Keşif Tuvali */}
          <div className="lg:col-span-7 lg:pl-16">
            <BookMockup />
          </div>
        </div>
      </section>

      {/* ── Yeni Bölüm: Onarım Atlası Eşyaları (Bez Çantalar) ──────────────── */}
      <section className="relative overflow-hidden border-t border-border bg-paper-deep/30" data-bg="#eef7f5">
        <div className="mx-auto max-w-layout px-5 py-20 md:px-8 md:py-28">
          <div className="mb-14 border-b border-ink/15 pb-10">
            <p className="archive-label text-ink/50">Saha Eşyaları</p>
            <h2 className="display-2 mt-3 text-3xl text-ink md:text-4xl lg:text-[3.2rem]">
              Onarım{' '}
              <span className="italic" style={{ color: 'var(--layer-traditional-crafts, #1a3f8f)' }}>
                Çantaları.
              </span>
            </h2>
            <p className="mt-4 max-w-[54ch] text-base leading-relaxed text-ink/65 md:text-[1.05rem]">
              Saha çalışmalarımızda zanaat katmanlarının renklerini ve manifestomuzu taşıyan, 
              sınırlı sayıda üretilmiş ham bez heybe tasarımlarımız.
            </p>
          </div>
          <CantaMockupsCarousel />
        </div>
      </section>

      {/* QR akışı şeridi */}
      <section className="border-y border-border bg-paper-light">
        <div className="mx-auto grid max-w-layout grid-cols-1 gap-px overflow-hidden border-y border-ink/10 bg-ink/10 md:grid-cols-3">
          <Step n="01" title="Haritayı al" body="Anlaşmalı kurumlardan ücretsiz edin. Her edisyon numaralıdır." />
          <Step n="02" title="QR'ı okut" body="Harita köşesindeki kod ilgili dijital rotayı doğrudan açar." />
          <Step n="03" title="Sahaya çık" body="Yol tarifi, durak hikâyesi ve usta bilgisi yanında olur." />
        </div>
      </section>

      {/* Dağıtım noktaları */}
      <section id="dagitim" aria-labelledby="dagitim-title">
        <div className="mx-auto max-w-layout px-5 py-20 md:px-8 md:py-28">
          <header className="grid items-end gap-8 border-b border-ink/15 pb-10 md:grid-cols-12">
            <div className="md:col-span-7">
              <p className="archive-label text-ink/55">Saha</p>
              <h2
                id="dagitim-title"
                className="display-2 mt-3 text-4xl text-ink md:text-5xl lg:text-6xl"
              >
                Dağıtım noktaları.
              </h2>
            </div>
            <p className="hand-note max-w-prose text-lg text-ink/60 md:col-span-5">
              Pilot dağıtım üniversite, kütüphane ve kültür kurumlarıyla başlar.
            </p>
          </header>

          {/* Durum şeridi */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-3 rounded-sm border border-ink/15 bg-paper-light px-5 py-4 text-sm text-ink/70">
            <span className="inline-flex items-center gap-2 text-[0.78rem] uppercase tracking-[0.18em] text-ink">
              <span aria-hidden className="block h-2 w-2 rounded-full bg-[--atlas-red-deep]" />
              Pilot dağıtım · başlamadı
            </span>
            <span className="text-[0.85rem] text-ink/65">
              Tarihler netleştikçe noktaların stok durumu buradan güncellenir.
            </span>
          </div>

          <ul className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {MOCK_DISTRIBUTION.map((point, i) => (
              <li key={`${point.name}-${i}`}>
                <article className="flex h-full flex-col rounded-sm border border-ink/15 bg-paper-light p-5 shadow-paper">
                  <div className="flex items-start justify-between gap-3">
                    <span className="archive-label text-ink/55">
                      {CATEGORY_LABELS[point.category] ?? point.category}
                    </span>
                    <DraftBadge />
                  </div>
                  <h3 className="mt-3 font-display text-lg font-semibold leading-snug tracking-editorial text-ink">
                    {point.name}
                  </h3>
                  <p className="hand-note mt-1 text-sm text-ink/55">
                    {point.district}
                  </p>
                  <p className="mt-3 flex-1 text-[0.9rem] leading-relaxed text-ink/70">
                    {point.address}
                  </p>
                  <div className="mt-4 flex items-center justify-between border-t border-ink/15 pt-3 text-[0.72rem] uppercase tracking-[0.18em] text-ink/55">
                    <span>Durum</span>
                    <span className="inline-flex items-center gap-2 text-ink/80">
                      <span
                        aria-hidden
                        className={`block h-1.5 w-1.5 rounded-full ${AVAILABILITY_DOT[point.availabilityStatus] ?? 'bg-ink/40'}`}
                      />
                      {AVAILABILITY_LABELS[point.availabilityStatus] ?? point.availabilityStatus}
                    </span>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Kurumsal istek şeridi */}
      <section className="border-t border-border bg-ink text-paper-light">
        <div className="mx-auto max-w-layout px-5 py-16 md:px-8 md:py-20">
          <div className="grid items-end gap-8 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <p className="archive-label text-paper-light/55">Kurumsal istek</p>
              <h2 className="display-2 mt-3 text-3xl text-paper-light md:text-4xl lg:text-[3rem]" style={{ lineHeight: '1.15' }}>
                Üniversite, kütüphane veya kültür merkezi misiniz?
              </h2>
              <p className="mt-5 max-w-prose text-[0.97rem] leading-relaxed text-paper-light/80">
                Atlasın bir sonraki edisyonu için kurumsal istek alıyoruz.
                Etkinlik, sergi veya eğitim kapsamında set talep edebilir,
                ortak dağıtım önerisi gönderebilirsiniz.
              </p>
            </div>
            <div className="lg:col-span-5 lg:justify-self-end">
              <AtlasButton
                href="/iletisim"
                variant="secondary"
                className="border-paper-light bg-paper-light text-ink hover:bg-paper hover:border-paper"
              >
                Bize Yaz
                <AtlasIconArrow />
              </AtlasButton>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}

function Step({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <div className="flex flex-col gap-3 bg-paper-light p-6 md:p-8">
      <span className="archive-label text-ink/55">{n}</span>
      <h3 className="font-display text-xl font-semibold tracking-editorial text-ink">
        {title}
      </h3>
      <p className="text-[0.93rem] leading-relaxed text-ink/70">{body}</p>
    </div>
  );
}


