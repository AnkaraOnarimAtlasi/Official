import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { DraftBadge } from '@/components/ui/DraftBadge';
import { AtlasButton, AtlasIconArrow } from '@/components/ui/AtlasButton';
import { layerBySlug } from '@/lib/constants/layers';
import { MOCK_ROUTES, routeBySlug } from '@/lib/constants/mockRoutes';
import { MOCK_STOPS } from '@/lib/constants/mockStops';
import { SITE } from '@/lib/constants/site';

interface PageProps {
  params: Promise<{ route: string }>;
}

export function generateStaticParams() {
  return MOCK_ROUTES.map((r) => ({ route: r.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { route: slug } = await params;
  const route = routeBySlug(slug);
  if (!route) return {};
  return {
    title: `${route.title} · Güzergâh`,
    description: route.description,
    alternates: { canonical: `/rotalar/${slug}` },
    openGraph: {
      title: `${route.title} · ${SITE.name}`,
      description: route.description,
    },
  };
}

const DIFFICULTY: Record<string, { label: string; bars: number }> = {
  easy: { label: 'Kolay', bars: 1 },
  medium: { label: 'Orta', bars: 2 },
  hard: { label: 'Zor', bars: 3 },
};

export default async function RouteDetailPage({ params }: PageProps) {
  const { route: slug } = await params;
  const route = routeBySlug(slug);
  if (!route) notFound();

  const layer = layerBySlug(route.layerSlug);
  const accent = layer?.colorHex ?? 'var(--atlas-accent)';
  const stops = route.stopSlugs
    .map((s) => MOCK_STOPS.find((m) => m.slug === s))
    .filter((s): s is NonNullable<typeof s> => !!s);
  const difficulty = DIFFICULTY[route.difficulty] ?? { label: route.difficulty, bars: 1 };

  const idx = MOCK_ROUTES.findIndex((r) => r.slug === route.slug);
  const next = MOCK_ROUTES[(idx + 1) % MOCK_ROUTES.length];

  const breadcrumb = [
    { label: 'Atlas', href: '/atlas' },
    { label: 'Rotalar', href: '/rotalar' },
    { label: route.title },
  ];

  return (
    <article>
      {/* Üst arşiv bandı */}
      <div className="border-b border-border/70 bg-paper">
        <div className="mx-auto flex max-w-layout items-center justify-between gap-6 px-5 py-3 text-[0.68rem] uppercase tracking-[0.22em] text-ink/55 md:px-8">
          <span>Güzergâh · {layer ? `Harita ${layer.number}` : 'Atlas'}</span>
          <span className="hidden sm:inline tabular-nums">
            {route.distanceKm} km · {route.estimatedDurationMinutes} dk
          </span>
          <span className="tabular-nums">{stops.length} durak · taslak</span>
        </div>
      </div>

      <div className="mx-auto max-w-layout px-5 pt-8 md:px-8">
        <Breadcrumb items={breadcrumb} />
      </div>

      {/* Hero */}
      <section
        aria-labelledby="route-title"
        className="border-b border-border"
        style={{
          background: layer
            ? `linear-gradient(180deg, var(--atlas-paper) 0%, color-mix(in oklab, ${accent} 7%, var(--atlas-paper)) 100%)`
            : undefined,
        }}
      >
        <div className="mx-auto grid max-w-layout grid-cols-1 gap-10 px-5 pb-16 pt-8 md:px-8 md:pb-24 md:pt-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <p className="archive-label" style={{ color: accent }}>
              {layer ? `Harita ${layer.number} · ${layer.title}` : 'Atlas güzergâhı'}
            </p>
            <h1
              id="route-title"
              className="display-1 mt-4 text-[2.6rem] leading-[0.95] text-ink sm:text-5xl md:text-6xl lg:text-[5rem]"
            >
              {route.title}
            </h1>
            <p className="hand-note mt-5 text-xl text-ink/65 md:text-2xl">
              {route.subtitle}
            </p>
            <p className="mt-7 max-w-prose text-base leading-relaxed text-ink/80 md:text-[1.05rem]">
              {route.description}
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <AtlasButton href="#guzergah" variant="primary">
                Güzergâhı İncele
                <AtlasIconArrow />
              </AtlasButton>
              <AtlasButton href="/rotalar" variant="secondary">
                Tüm rotalar
              </AtlasButton>
              <DraftBadge />
            </div>
          </div>

          {/* Şartname kartı */}
          <aside className="lg:col-span-5">
            <div className="rounded-sm border border-ink/20 bg-paper-light p-6 shadow-paper md:p-8">
              <p className="archive-label text-ink/55">Rota şartnamesi</p>
              <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-4">
                <Spec label="Mesafe" value={`${route.distanceKm} km`} />
                <Spec label="Süre" value={`${route.estimatedDurationMinutes} dk`} />
                <Spec label="Başlangıç" value={route.startArea} />
                <Spec label="Bitiş" value={route.endArea} />
                <Spec label="Durak" value={String(stops.length)} />
                <Spec
                  label="Zorluk"
                  value={
                    <span className="inline-flex items-center gap-2">
                      {difficulty.label}
                      <span aria-hidden className="inline-flex gap-0.5">
                        {[1, 2, 3].map((b) => (
                          <span
                            key={b}
                            className="block h-2 w-1 rounded-sm"
                            style={{
                              backgroundColor:
                                b <= difficulty.bars ? accent : 'var(--atlas-border)',
                            }}
                          />
                        ))}
                      </span>
                    </span>
                  }
                />
              </dl>
              <button
                type="button"
                disabled
                aria-disabled="true"
                className="mt-7 w-full cursor-not-allowed rounded-full border border-ink/25 bg-paper px-4 py-2.5 text-[0.78rem] uppercase tracking-[0.18em] text-ink/55"
              >
                Yol Tarifi Al · yakında
              </button>
            </div>
          </aside>
        </div>
      </section>

      {/* Harita + güzergâh */}
      <section
        id="guzergah"
        aria-labelledby="map-title"
        className="border-b border-border"
      >
        <div className="mx-auto max-w-layout px-5 py-20 md:px-8 md:py-24">
          <header className="grid items-end gap-8 border-b border-ink/15 pb-10 md:grid-cols-12">
            <div className="md:col-span-7">
              <p className="archive-label text-ink/55">Bölüm I</p>
              <h2 id="map-title" className="display-2 mt-3 text-3xl text-ink md:text-4xl lg:text-[3rem]">
                Haritadaki iz.
              </h2>
            </div>
            <p className="hand-note max-w-prose text-lg text-ink/60 md:col-span-5">
              Aşağıdaki haritada durakların yaklaşık konumları gösterilir; gerçek
              konumlar saha doğrulamasıyla netleşir.
            </p>
          </header>

          <figure className="mt-10">
            <div className="relative aspect-[16/9] overflow-hidden rounded-sm border border-ink/20 bg-paper shadow-sheet">
              {layer && (
                <Image
                  src={layer.mapImage}
                  alt={`Harita — ${layer.title}`}
                  fill
                  sizes="100vw"
                  className="object-cover"
                  priority
                />
              )}
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-1"
                style={{ backgroundColor: accent }}
              />
              {/* Mock güzergâh çizgisi (SVG) */}
              <svg
                aria-hidden
                viewBox="0 0 100 56"
                preserveAspectRatio="none"
                className="absolute inset-0 h-full w-full"
              >
                <path
                  d="M 12 14 C 30 8, 40 28, 52 26 S 78 36, 88 44"
                  fill="none"
                  stroke={accent}
                  strokeWidth="0.4"
                  strokeDasharray="1.4 1.4"
                />
              </svg>
              {/* Mock durak pinleri */}
              {stops.map((_, i) => {
                const positions = [
                  { x: 12, y: 25 },
                  { x: 32, y: 22 },
                  { x: 52, y: 47 },
                  { x: 72, y: 58 },
                  { x: 88, y: 78 },
                ];
                const p = positions[i] ?? { x: 50, y: 50 };
                return (
                  <span
                    key={i}
                    aria-hidden
                    className="absolute flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-paper-light text-[0.65rem] font-bold text-paper-light shadow-paper"
                    style={{
                      left: `${p.x}%`,
                      top: `${p.y}%`,
                      backgroundColor: accent,
                    }}
                  >
                    {i + 1}
                  </span>
                );
              })}
            </div>
            <figcaption className="mt-3 flex items-center justify-between text-[0.78rem] text-ink/55">
              <span>{route.startArea} → {route.endArea}</span>
              <span className="hand-note text-base normal-case" style={{ color: accent }}>
                yaklaşık konumlar · taslak
              </span>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Timeline */}
      <section aria-labelledby="timeline-title">
        <div className="mx-auto max-w-layout px-5 py-20 md:px-8 md:py-24">
          <header className="grid items-end gap-8 border-b border-ink/15 pb-10 md:grid-cols-12">
            <div className="md:col-span-7">
              <p className="archive-label text-ink/55">Bölüm II</p>
              <h2 id="timeline-title" className="display-2 mt-3 text-3xl text-ink md:text-4xl lg:text-[3rem]">
                Durak durak.
              </h2>
            </div>
            <p className="hand-note max-w-prose text-lg text-ink/60 md:col-span-5">
              Önerilen yürüyüş sırası — her durakta bir nesne, bir el, bir hafıza.
            </p>
          </header>

          <ol className="relative mt-10">
            {/* dikey çizgi */}
            <span
              aria-hidden
              className="absolute left-[18px] top-3 hidden h-[calc(100%-2rem)] w-px md:block"
              style={{ backgroundColor: 'var(--atlas-border-strong)' }}
            />
            {stops.map((stop, i) => (
              <li key={stop.slug} className="relative flex gap-6 pb-10 md:pl-0">
                <span
                  className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 bg-paper-light font-display text-sm font-semibold shadow-paper tabular-nums"
                  style={{ borderColor: accent, color: accent }}
                >
                  {i + 1}
                </span>
                <article className="flex-1 rounded-sm border border-ink/15 bg-paper-light p-5 shadow-paper md:p-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <h3 className="font-display text-xl font-semibold tracking-editorial text-ink md:text-2xl">
                      {stop.name}
                    </h3>
                    <DraftBadge />
                  </div>
                  <p className="hand-note mt-1 text-sm text-ink/55">
                    {stop.craft} · {stop.district}
                  </p>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-ink/75">
                    {stop.shortDescription}
                  </p>
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-ink/15 pt-3 text-[0.72rem] uppercase tracking-[0.18em] text-ink/55">
                    <span>Durak {String(i + 1).padStart(2, '0')} / {String(stops.length).padStart(2, '0')}</span>
                    {layer && (
                      <Link
                        href={`/atlas/${layer.slug}`}
                        className="normal-case tracking-normal text-ink/80 underline-offset-4 hover:text-ink hover:underline"
                      >
                        Haritayı aç →
                      </Link>
                    )}
                  </div>
                </article>
              </li>
            ))}
          </ol>

          <p className="mt-2 max-w-prose rounded-sm border border-ink/15 bg-paper-light px-5 py-4 text-[0.93rem] leading-relaxed text-ink/65">
            <strong className="text-ink">Saha kuralı:</strong> Atölyelerin bir kısmı
            randevuyla çalışır. Yola çıkmadan önce ilgili durağı kontrol et;
            ustaların günlük çalışma akışını gözet.
          </p>
        </div>
      </section>

      {/* Sonraki rota */}
      {next && (
        <nav aria-label="Rota gezintisi" className="border-t border-border bg-paper-deep/35">
          <div className="mx-auto max-w-layout px-5 md:px-8">
            <Link
              href={`/rotalar/${next.slug}`}
              className="group flex flex-col items-start gap-3 py-10 transition-colors hover:bg-paper-light/50 md:flex-row md:items-center md:justify-between md:py-14"
            >
              <div>
                <p className="archive-label text-ink/55">Sonraki Güzergâh</p>
                <h3 className="mt-2 font-display text-2xl font-semibold tracking-editorial text-ink md:text-3xl lg:text-[2.4rem]">
                  {next.title}
                </h3>
                <p className="hand-note mt-1 text-base text-ink/55">{next.subtitle}</p>
              </div>
              <span className="inline-flex items-center gap-2 text-sm font-medium text-ink/80 underline-offset-4 group-hover:text-ink group-hover:underline">
                Aç
                <AtlasIconArrow />
              </span>
            </Link>
          </div>
        </nav>
      )}

      {/* Geri dön */}
      <section>
        <div className="mx-auto flex max-w-layout flex-col items-center gap-4 px-5 py-12 sm:flex-row sm:justify-between md:px-8">
          <Link
            href="/rotalar"
            className="inline-flex items-center gap-2 text-sm text-ink/70 underline-offset-4 hover:text-ink hover:underline"
          >
            <AtlasIconArrow className="rotate-180" />
            Tüm rotalara dön
          </Link>
          <AtlasButton href="/katki-sagla" variant="primary">
            Yeni Durak Öner
            <AtlasIconArrow />
          </AtlasButton>
        </div>
      </section>
    </article>
  );
}

function Spec({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <dt className="archive-label text-ink/55">{label}</dt>
      <dd className="mt-1 font-display text-lg font-semibold tracking-editorial text-ink">
        {value}
      </dd>
    </div>
  );
}
