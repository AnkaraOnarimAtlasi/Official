'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { AtlasButton, AtlasIconArrow } from '@/components/ui/AtlasButton';
import { LAYERS } from '@/lib/constants/layers';

/**
 * AtlasHero — Phase 2 yeniden inşa.
 *
 * Kavram: ekran bir "arşiv masası"dır. Sayfa açıldığında dört harita
 * üst üste yatık dururken kullanıcı pointer/scroll ile haritaları
 * yelpaze gibi ayırır. Köşelerde matbaa registration markları,
 * üstte arşiv indeksi, altta saha notları. Tipografi sayfayı taşır;
 * 3D dekor değil, kâğıdı taklit eden ışık-gölge yapar.
 *
 * Kabul kriterleri:
 *  - Manifesto ilk paint'te okunaklı (DOM içinde, canvas'ta değil).
 *  - prefers-reduced-motion açıkken haritalar statik yelpazede durur.
 *  - Mobilde haritalar küçük arşiv kartı olarak yatay scroll edilebilir.
 *  - Pointer yokken (touch / klavye) haritalar otomatik nazikçe nefes alır.
 */
const AUTO_INTERVAL = 5000; // ms

export function AtlasHero() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [pointer, setPointer] = useState({ x: 0.5, y: 0.5 });
  const [active, setActive] = useState(0);
  const [reduced, setReduced] = useState(false);
  const [paused, setPaused] = useState(false);
  // progress: 0→1 easing, resets on each harita change
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const m = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(m.matches);
    const onChange = () => setReduced(m.matches);
    m.addEventListener('change', onChange);
    return () => m.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    const el = stageRef.current;
    if (!el || reduced) return;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      setPointer({ x: Math.max(0, Math.min(1, x)), y: Math.max(0, Math.min(1, y)) });
    };
    const onLeave = () => setPointer({ x: 0.5, y: 0.5 });
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
    };
  }, [reduced]);

  // Otomatik geçiş — hover/reduced moddayken durur
  useEffect(() => {
    if (reduced || paused) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
      return;
    }

    setProgress(0);

    // Her ~50ms progress bar'ı ilerlet (0→1 in AUTO_INTERVAL ms)
    const TICK = 50;
    progressRef.current = setInterval(() => {
      setProgress((p) => Math.min(p + TICK / AUTO_INTERVAL, 1));
    }, TICK);

    // 5 saniyede aktif haritayı döndür
    intervalRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % LAYERS.length);
      setProgress(0);
    }, AUTO_INTERVAL);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [reduced, paused, active]); // active dep: manuel tıklamada timer sıfırlanır

  // Aktif haritayı dökümana renk olarak yay
  useEffect(() => {
    const c = LAYERS[active]?.colorHex ?? '#5c3b8e';
    document.documentElement.style.setProperty('--atlas-red-deep', c);
    document.documentElement.style.setProperty('--atlas-accent', c);
    return () => {
      document.documentElement.style.removeProperty('--atlas-red-deep');
      document.documentElement.style.removeProperty('--atlas-accent');
    };
  }, [active]);

  const today = new Intl.DateTimeFormat('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  }).format(new Date());

  return (
    <section className="relative isolate overflow-hidden paper-vignette">
      {/* Üst arşiv bandı */}
      <div className="border-b border-border/70">
        <div className="mx-auto flex max-w-layout items-center justify-between gap-6 px-5 py-3 text-[0.68rem] uppercase tracking-[0.22em] text-ink/55 md:px-8">
          <span>Arşiv · Saha Dosyası</span>
          <span className="hidden sm:inline">Ankara · Baskı 01 · {today}</span>
          <span className="tabular-nums">N 39°56′ · E 32°51′</span>
        </div>
      </div>

      <div className="mx-auto grid max-w-layout grid-cols-1 gap-10 px-5 pb-16 pt-12 md:px-8 md:pb-24 md:pt-16 lg:grid-cols-12 lg:gap-16">
        {/* Sol — editoryal sütun */}
        <div className="relative lg:col-span-6 lg:pt-8">
          <RegistrationMark className="absolute -left-2 -top-2 hidden text-ink/35 lg:block" />

          <p className="archive-label text-ink/60">Cilt I · Onarım Atlası</p>

          <h1 className="display-1 mt-7 text-[2.85rem] leading-[1.15] text-ink sm:text-6xl lg:text-[5.6rem]">
            <span className="block">Ankara</span>
            <span className="block">Onarım</span>
            <span className="block">
              <span
                className="bg-clip-text text-transparent transition-colors duration-700"
                style={{
                  backgroundImage: `linear-gradient(105deg, var(--atlas-ink) 0%, ${LAYERS[active].colorHex} 60%, var(--atlas-ink) 100%)`,
                }}
              >
                Atlası
              </span>
              <span className="text-ink">.</span>
            </span>
          </h1>


          <p className="mt-6 max-w-[48ch] hero-description">
            Ankara&apos;nın görünmeyen zanaat ağlarını, uzman ustalarını ve niş atölyelerini keşfe açıyoruz. Katmanlı atlas yapısıyla kullanıcıyı alternatif kent rotalarına davet ederken, kaybolmaya yüz tutmuş bilgi ve üretim kültürünü görünür kılıyoruz.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <AtlasButton href="/atlas" variant="primary">
              Atlası Aç
              <AtlasIconArrow />
            </AtlasButton>
            <AtlasButton href="#katmanlar" variant="secondary">
              Katmanları Keşfet
            </AtlasButton>
          </div>

          {/* Metadata table — fiziksel jenerik hissi */}
          <dl className="mt-12 grid max-w-md grid-cols-4 border-t border-ink/15">
            <Stat label="Katman" value="05" />
            <Stat label="Durak" value="20+" />
            <Stat label="Bölge" value="12" />
            <Stat label="Hikâye" value="07" />
          </dl>

          {/* Aşağı yönlü işaret */}
          <p className="mt-10 hidden items-center gap-3 text-[0.7rem] uppercase tracking-[0.22em] text-ink/50 lg:flex">
            <span aria-hidden className="block h-px w-10 bg-ink/40" />
            Aşağıda beş katman
          </p>
        </div>

        {/* Sağ — atlas sahnesi */}
        <div
          ref={stageRef}
          className="relative lg:col-span-6 lg:pt-10"
          onPointerEnter={() => setPaused(true)}
          onPointerLeave={() => setPaused(false)}
        >
          <RegistrationMark className="absolute -right-2 -top-2 hidden rotate-90 text-ink/35 lg:block" />
          <RegistrationMark className="absolute -bottom-2 -right-2 hidden rotate-180 text-ink/35 lg:block" />

          <AtlasStage
            pointer={pointer}
            active={active}
            onActiveChange={(i) => { setActive(i); setProgress(0); }}
            reduced={reduced}
          />

          {/* Saha notu */}
          <p
            className="hand-note mt-6 text-base lg:text-lg"
            style={{ color: LAYERS[active].colorHex }}
            aria-live="polite"
          >
            ✎ Aktif Harita · {LAYERS[active].number} {LAYERS[active].title}
          </p>

          {/* Dot navigator + progress çubuğu */}
          {!reduced && (
            <div className="mt-4 flex items-center gap-3" aria-hidden>
              {LAYERS.map((layer, i) => (
                <button
                  key={layer.slug}
                  type="button"
                  onClick={() => { setActive(i); setProgress(0); }}
                  className="group relative flex h-5 w-5 items-center justify-center focus-visible:outline-none"
                  title={`Harita ${layer.number}`}
                >
                  <span
                    className="block rounded-full transition-all duration-300"
                    style={{
                      width: active === i ? 20 : 6,
                      height: 6,
                      backgroundColor: active === i ? layer.colorHex : 'rgba(20,20,20,0.18)',
                    }}
                  />
                  {/* Aktif haritada progress overlay */}
                  {active === i && (
                    <span
                      className="absolute inset-y-0 left-0 my-auto h-1.5 rounded-full"
                      style={{
                        width: `${progress * 20}px`,
                        maxWidth: 20,
                        backgroundColor: 'rgba(255,255,255,0.55)',
                        pointerEvents: 'none',
                      }}
                    />
                  )}
                </button>
              ))}
              <span className="ml-1 text-[0.62rem] uppercase tracking-[0.18em] text-ink/40">
                {paused ? 'duraklatıldı' : 'otomatik'}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Alt arşiv bandı */}
      <div className="border-t border-border/70">
        <div className="mx-auto flex max-w-layout items-center justify-between gap-6 px-5 py-3 text-[0.68rem] uppercase tracking-[0.22em] text-ink/50 md:px-8">
          <span>Krem kâğıt · mürekkep · sınırlı baskı</span>
          <span className="hidden sm:inline">QR · dijital rotaya bağlanır</span>
          <span className="tabular-nums">{String(active + 1).padStart(2, '0')} / 05</span>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── Stage ─────────────────────────── */

interface StageProps {
  pointer: { x: number; y: number };
  active: number;
  onActiveChange: (i: number) => void;
  reduced: boolean;
}

function AtlasStage({ pointer, active, onActiveChange, reduced }: StageProps) {
  // pointer.x -> -1..1
  const px = (pointer.x - 0.5) * 2;
  const py = (pointer.y - 0.5) * 2;

  return (
    <div
      className="relative mx-auto aspect-[4/3] w-full max-w-[640px]"
      style={{ perspective: '1800px' }}
    >
      {/* Masa zemini — kâğıt dokusu */}
      <div
        aria-hidden
        className="absolute inset-0 rounded-[2px] bg-paper-deep/40"
        style={{ transform: 'translateZ(-40px)' }}
      />

      {LAYERS.map((layer, idx) => {
        const total = LAYERS.length;
        // Yelpaze açılımı: pasif hâlde haritalar 6° yelpaze, aktifte 12°
        const baseAngle = (idx - (total - 1) / 2) * (active === idx ? 3 : 6);
        const baseY = idx * -8;
        const baseX = idx * 14 - 18;
        const depth = idx * 16;
        const isActive = active === idx;
        const lift = isActive ? -22 : 0;
        const scale = isActive ? 1.04 : 0.97 - (total - idx - 1) * 0.012;

        // Pointer ile çok hafif tilt (mobil/reduced'da kapalı)
        const tiltY = reduced ? 0 : px * (isActive ? 8 : 3);
        const tiltX = reduced ? 0 : -py * (isActive ? 5 : 2);

        return (
          <button
            type="button"
            key={layer.slug}
            onClick={() => onActiveChange(idx)}
            onFocus={() => onActiveChange(idx)}
            aria-pressed={isActive}
            aria-label={`Harita ${layer.number} · ${layer.title}`}
            className="group absolute inset-0 origin-center rounded-[3px] focus-visible:outline-none"
            style={{
              transform: `translate3d(${baseX}px, ${baseY + lift}px, ${depth}px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) rotateZ(${baseAngle}deg) scale(${scale})`,
              transition: 'transform 700ms cubic-bezier(0.22, 1, 0.36, 1)',
              zIndex: isActive ? 50 : idx + 1,
            }}
          >
            <figure className="relative h-full w-full overflow-hidden rounded-[3px] border border-ink/25 bg-paper-light shadow-sheet">
              <Image
                src={layer.mapImage}
                alt={`Atlas haritası ${layer.number}: ${layer.title}`}
                fill
                priority={idx === 0}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="select-none object-cover"
              />
              {/* Renkli harita bandı */}
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-1"
                style={{ backgroundColor: layer.colorHex }}
              />
              {/* Harita üst metadata */}
              <span className="absolute left-3 top-3 inline-flex items-center gap-2 rounded-sm bg-paper-light/85 px-2 py-1 text-[0.62rem] uppercase tracking-[0.2em] text-ink/75 backdrop-blur-[1px]">
                <span aria-hidden className="block h-1.5 w-1.5 rounded-full" style={{ backgroundColor: layer.colorHex }} />
                Harita {layer.number}
              </span>
              {/* Harita alt etiketi */}
              <figcaption
                className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 border-t border-ink/15 bg-paper-light/95 px-3 py-2 text-[0.7rem] text-ink"
              >
                <span className="font-display font-semibold tracking-editorial">{layer.title}</span>
                <span className="hand-note text-sm text-ink/65">{layer.shortTitle}</span>
              </figcaption>
              {/* Köşe perforasyon */}
              <span aria-hidden className="absolute right-2 top-2 block h-2 w-2 rounded-full border border-ink/40 bg-paper-light/70" />
            </figure>
          </button>
        );
      })}

      {/* Sahne köşelerine ince registration */}
      <CornerTick className="absolute left-0 top-0 -translate-x-3 -translate-y-3" />
      <CornerTick className="absolute right-0 top-0 translate-x-3 -translate-y-3 rotate-90" />
      <CornerTick className="absolute bottom-0 right-0 translate-x-3 translate-y-3 rotate-180" />
      <CornerTick className="absolute bottom-0 left-0 -translate-x-3 translate-y-3 -rotate-90" />
    </div>
  );
}

/* ─────────────────────────── Atomic bits ─────────────────────────── */

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-r border-ink/10 px-3 py-3 last:border-r-0 first:pl-0">
      <dt className="text-[0.62rem] uppercase tracking-[0.2em] text-ink/55">{label}</dt>
      <dd className="mt-1 font-display text-2xl text-ink tabular-nums">{value}</dd>
    </div>
  );
}

function RegistrationMark({ className = '' }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      width="22"
      height="22"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="0.9"
    >
      <circle cx="12" cy="12" r="6.5" />
      <path d="M12 1.5v6M12 16.5v6M1.5 12h6M16.5 12h6" />
    </svg>
  );
}

function CornerTick({ className = '' }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      width="14"
      height="14"
      className={`text-ink/40 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
    >
      <path d="M2 2h8M2 2v8" />
    </svg>
  );
}
