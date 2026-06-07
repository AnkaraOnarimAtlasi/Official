'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { AtlasButton, AtlasIconArrow } from '@/components/ui/AtlasButton';
import { LAYERS } from '@/lib/constants/layers';
import { stopsByLayer } from '@/lib/constants/mapStops';

/* Leaflet SSR kapalı */
const AtlasLiveMap = dynamic(() => import('@/components/atlas/AtlasLiveMap'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-paper-deep/40">
      <span className="archive-label animate-pulse text-ink/40">Harita yükleniyor…</span>
    </div>
  ),
});

const ROTATE_MS = 5000;

export function AtlasPreviewSection() {
  const [active, setActive]   = useState(0);
  const [paused, setPaused]   = useState(false);
  const intervalRef           = useRef<ReturnType<typeof setInterval> | null>(null);
  const layer = LAYERS[active];
  const stops = stopsByLayer(layer.slug);

  /* 5 saniyede bir sonraki katmana geç; hover'da dur */
  useEffect(() => {
    if (paused) return;
    intervalRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % LAYERS.length);
    }, ROTATE_MS);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [paused, active]);

  return (
    <section
      aria-labelledby="atlas-preview-title"
      className="relative transition-colors duration-700"
      style={{
        background: `color-mix(in oklab, ${layer.colorHex} 4%, var(--atlas-paper))`,
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto max-w-layout px-5 md:px-8">

        {/* ── Üst başlık şeridi ──────────────────────────────── */}
        <div className="flex items-end justify-between gap-6 border-b border-ink/10 py-8">
          <div>
            <p className="archive-label text-ink/50">Arşiv İncelemesi · Canlı Önizleme</p>
            <h2
              id="atlas-preview-title"
              className="display-2 mt-2 whitespace-nowrap text-xl text-ink sm:text-2xl lg:text-[1.75rem]"
            >
              Haritayı seç,{' '}
              <span
                className="italic transition-colors duration-500"
                style={{ color: layer.colorHex }}
              >
                kente bir kez daha bak.
              </span>
            </h2>
          </div>
          <p className="hidden max-w-[30ch] text-right text-sm leading-relaxed text-ink/55 lg:block">
            Aktif haritanın bölgeleri, zanaatları ve duyusal teması aşağıda açılır.
          </p>
        </div>

        {/* ── Ana grid: sol seçici + sağ panel ─────────────── */}
        <div className="grid grid-cols-1 gap-0 lg:grid-cols-[280px_1fr]">

          {/* ── Sol: katman seçici ─────────────────────────── */}
          <aside className="border-r border-ink/10 py-8 pr-6">
            <ol role="tablist" aria-label="Atlas haritaları" className="space-y-1">
              {LAYERS.map((l, idx) => {
                const isActive = idx === active;
                return (
                  <li key={l.slug}>
                    <button
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      aria-controls="atlas-preview-panel"
                      onClick={() => { setActive(idx); }}
                      className="group relative flex w-full items-center gap-3 rounded-lg px-3 py-3
                                 text-left transition-all duration-300
                                 hover:bg-paper-light/70
                                 focus-visible:outline-none focus-visible:ring-2
                                 aria-selected:bg-paper-light aria-selected:shadow-paper"
                    >
                      {/* Sol aksan çizgisi */}
                      <span
                        aria-hidden
                        className="absolute left-0 top-1/2 w-[3px] -translate-y-1/2 rounded-r-full
                                   transition-all duration-500"
                        style={{
                          height:          isActive ? '65%' : '0%',
                          backgroundColor: l.colorHex,
                        }}
                      />

                      {/* Numara */}
                      <span
                        aria-hidden
                        className="w-8 shrink-0 font-display text-[1.5rem] font-bold
                                   leading-none tabular-nums transition-colors duration-300"
                        style={{ color: isActive ? l.colorHex : 'rgba(20,20,20,0.15)' }}
                      >
                        {l.number}
                      </span>

                      {/* Thumbnail */}
                      <span
                        className="relative block h-11 w-14 shrink-0 overflow-hidden rounded border
                                   transition-all duration-300"
                        style={{
                          borderColor: isActive
                            ? `color-mix(in oklab, ${l.colorHex} 45%, transparent)`
                            : 'rgba(20,20,20,0.12)',
                        }}
                      >
                        <Image src={l.mapImage} alt="" fill sizes="56px" className="object-cover" />
                        <span
                          aria-hidden
                          className="absolute inset-x-0 top-0 h-[2px]"
                          style={{ backgroundColor: l.colorHex }}
                        />
                      </span>

                      {/* Metin */}
                      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                        <span
                          className="text-[0.6rem] font-medium uppercase tracking-[0.2em]
                                     transition-colors duration-300"
                          style={{ color: isActive ? l.colorHex : 'rgba(20,20,20,0.35)' }}
                        >
                          {l.shortTitle}
                        </span>
                        <span
                          className="truncate font-display text-[0.95rem] font-semibold
                                     leading-tight tracking-tight transition-colors duration-300"
                          style={{ color: isActive ? 'var(--atlas-ink)' : 'rgba(20,20,20,0.50)' }}
                        >
                          {l.title}
                        </span>
                      </span>

                      {/* Ok */}
                      <span
                        className="shrink-0 transition-all duration-300"
                        style={{
                          color:     isActive ? l.colorHex : 'transparent',
                          transform: isActive ? 'translateX(0)' : 'translateX(-4px)',
                        }}
                      >
                        <AtlasIconArrow />
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>

            {/* Duyusal tema notu */}
            <div className="mt-6 rounded-lg border border-ink/10 bg-paper-light/60 px-4 py-4">
              <p className="text-[0.7rem] uppercase tracking-[0.18em] text-ink/40">
                {layer.stopCount} durak · {layer.regions.length} bölge
              </p>
              <p className="mt-1.5 text-[0.82rem] leading-snug text-ink/60">
                {layer.sensoryTheme}
              </p>
            </div>
          </aside>

          {/* ── Sağ: harita + metadata (alt alta) ─────────────── */}
          <div
            id="atlas-preview-panel"
            role="tabpanel"
            className="flex min-w-0 flex-col py-8 pl-6 lg:pl-8"
          >

            {/* Harita kutusu — içerik OVERLAP YOK */}
            <div
              className="relative isolate overflow-hidden rounded-xl border"
              style={{
                height: 380,
                borderColor: `color-mix(in oklab, ${layer.colorHex} 25%, rgba(20,20,20,0.12))`,
                boxShadow: `0 0 0 1px color-mix(in oklab, ${layer.colorHex} 12%, transparent),
                            0 20px 48px -12px color-mix(in oklab, ${layer.colorHex} 15%, transparent)`,
                transition: 'border-color 500ms ease, box-shadow 500ms ease',
              }}
            >
              {/* Gerçek Ankara haritası */}
              <AtlasLiveMap
                key={layer.slug}
                stops={stops}
                colorHex={layer.colorHex}
                layerNumber={layer.number}
              />

              {/* Üst renkli şerit */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 z-[500] h-[4px]
                           transition-colors duration-500"
                style={{ backgroundColor: layer.colorHex }}
              />

              {/* Sol üst badge */}
              <span
                className="absolute left-3 top-3 z-[500] flex items-center gap-1.5 rounded-full
                           px-3 py-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.18em]
                           backdrop-blur-sm"
                style={{
                  background: `color-mix(in oklab, ${layer.colorHex} 10%, rgba(255,255,255,0.94))`,
                  color: layer.colorHex,
                  border: `1px solid color-mix(in oklab, ${layer.colorHex} 28%, transparent)`,
                }}
              >
                <span
                  aria-hidden
                  className="block h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: layer.colorHex }}
                />
                Harita {layer.number} · {layer.shortTitle} · {stops.length} durak
              </span>
            </div>

            {/* ── Metadata — haritanın ALTINDA ─────────────────── */}
            <div
              key={`meta-${layer.slug}`}
              className="mt-4 rounded-xl border bg-paper-light p-5"
              style={{
                borderColor: `color-mix(in oklab, ${layer.colorHex} 20%, rgba(20,20,20,0.10))`,
                borderTopColor: layer.colorHex,
                borderTopWidth: 3,
              }}
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                {/* Sol — başlık + bölgeler */}
                <div className="min-w-0">
                  <p
                    className="text-[0.6rem] font-semibold uppercase tracking-[0.2em]"
                    style={{ color: layer.colorHex }}
                  >
                    Aktif Harita
                  </p>
                  <h3 className="mt-1 font-display text-xl font-bold tracking-tight text-ink md:text-2xl">
                    {layer.title}
                  </h3>
                  <p className="hand-note mt-0.5 text-sm text-ink/50">{layer.subtitle}</p>

                  {/* Bölge pilleri */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {layer.regions.map((r) => (
                      <span
                        key={r}
                        className="rounded-full px-2.5 py-0.5 text-[0.68rem] font-medium"
                        style={{
                          background: `color-mix(in oklab, ${layer.colorHex} 10%, transparent)`,
                          color:      layer.colorHex,
                          border:     `1px solid color-mix(in oklab, ${layer.colorHex} 22%, transparent)`,
                        }}
                      >
                        {r}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Sağ — CTA */}
                <div className="flex shrink-0 flex-col items-end gap-2 pt-1">
                  <AtlasButton href={`/atlas/${layer.slug}`} variant="primary">
                    Rotayı Aç
                    <AtlasIconArrow />
                  </AtlasButton>
                  <Link
                    href="/atlas"
                    className="text-[0.78rem] text-ink/45 underline-offset-4
                               hover:text-ink hover:underline transition-colors"
                  >
                    Tüm atlas →
                  </Link>
                </div>
              </div>

              {/* Açıklama */}
              <p className="mt-3 text-[0.82rem] leading-relaxed text-ink/60">
                {layer.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
