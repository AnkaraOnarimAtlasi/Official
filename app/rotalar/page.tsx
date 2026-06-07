import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { FilterableRoutesList } from '@/components/atlas/FilterableRoutesList';
import { LAYERS } from '@/lib/constants/layers';
import { MOCK_ROUTES } from '@/lib/constants/mockRoutes';
import { SITE } from '@/lib/constants/site';

export const metadata: Metadata = {
  title: 'Rotalar · Keşif Güzergâhları',
  description: `${SITE.name} — Ankara'nın sokaklarındaki onarım duraklarını birbirine bağlayan tematik keşif rotaları.`,
  alternates: { canonical: '/rotalar' },
};

export default function RotalarPage() {
  const breadcrumb = [
    { label: 'Atlas', href: '/atlas' },
    { label: 'Rotalar · Keşif Güzergâhları' },
  ];

  const totalDistance = MOCK_ROUTES.reduce((acc, r) => acc + r.distanceKm, 0);
  const totalTime = MOCK_ROUTES.reduce((acc, r) => acc + r.estimatedDurationMinutes, 0);

  return (
    <article>
      {/* Üst arşiv bandı */}
      <div className="border-b border-border/70 bg-paper">
        <div className="mx-auto flex max-w-layout items-center justify-between gap-6 px-5 py-3 text-[0.68rem] uppercase tracking-[0.22em] text-ink/55 md:px-8">
          <span>Atlas · Keşif güzergâhları</span>
          <span className="hidden sm:inline">Yavaş yürüyüş · saha kullanımı</span>
          <span className="tabular-nums">
            {MOCK_ROUTES.length} rota · ≈{totalDistance.toFixed(0)} km
          </span>
        </div>
      </div>

      <div className="mx-auto max-w-layout px-5 pt-8 md:px-8">
        <Breadcrumb items={breadcrumb} />
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-layout px-5 pb-12 pt-6 md:px-8 md:pt-10">
        <div className="grid items-end gap-8 border-b border-ink/15 pb-10 md:grid-cols-12">
          <div className="md:col-span-8">
            <p className="archive-label text-ink/55">Gezinti</p>
            <h1 className="display-1 mt-3 text-5xl leading-[0.95] text-ink md:text-6xl lg:text-[5.4rem]">
              Keşif rotaları.
            </h1>
            <p className="hand-note mt-4 text-xl text-ink/65 md:text-2xl">
              katman katman yürünür kent
            </p>
          </div>
          <p className="max-w-prose text-[0.97rem] leading-relaxed text-ink/75 md:col-span-4">
            Her rota bir haritanın izini takip eder. Yavaş yürüyüş, ustaya
            uğrama, nesneyi göz hizasında okuma için tasarlandı. Saha
            doğrulaması tamamlanmamış rotalar “Taslak” olarak işaretlidir.
          </p>
        </div>

        <dl className="mt-8 grid grid-cols-2 gap-x-8 gap-y-3 border-y border-ink/15 py-4 text-sm sm:grid-cols-4">
          <Stat label="Rota" value={String(MOCK_ROUTES.length)} />
          <Stat label="Toplam mesafe" value={`${totalDistance.toFixed(1)} km`} />
          <Stat label="Toplam süre" value={`${Math.round(totalTime / 60)} sa+`} />
          <Stat label="Katman" value={String(LAYERS.length)} />
        </dl>
      </section>

      {/* Filtreli liste */}
      <section className="mx-auto max-w-layout px-5 pb-20 md:px-8 md:pb-28">
        <FilterableRoutesList routes={MOCK_ROUTES} layers={LAYERS} />
      </section>

      {/* Saha kuralı */}
      <section className="border-t border-border bg-paper-deep/35">
        <div className="mx-auto max-w-layout px-5 py-14 md:px-8 md:py-20">
          <div className="grid items-end gap-8 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-7">
              <p className="archive-label text-ink/55">Saha kuralı</p>
              <h2 className="display-2 mt-3 text-3xl text-ink md:text-4xl">
                Önce ustaya haber ver.
              </h2>
            </div>
            <p className="max-w-prose text-[0.97rem] leading-relaxed text-ink/75 md:col-span-5">
              Rota üzerindeki atölyelerin bir kısmı randevuyla çalışır. Yola
              çıkmadan önce ilgili durak sayfasındaki ziyaret durumunu kontrol
              et. Atlas, ustanın izniyle yayınlanmış bilgilerle çalışır;
              gizliliği ve günlük çalışma akışını ön planda tutar.
            </p>
          </div>
        </div>
      </section>
    </article>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="archive-label text-ink/55">{label}</dt>
      <dd className="mt-1 font-display text-2xl text-ink tabular-nums">{value}</dd>
    </div>
  );
}
