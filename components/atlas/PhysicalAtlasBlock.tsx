'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { AtlasButton, AtlasIconArrow } from '@/components/ui/AtlasButton';
import { LAYERS } from '@/lib/constants/layers';

const FAN_INTERVAL = 3000;

export function PhysicalAtlasBlock() {
  return (
    <section
      aria-labelledby="physical-atlas-title"
      className="relative isolate overflow-hidden border-t border-border bg-paper-light"
    >
      {/* Float keyframe — sadece iç wrapper'a uygulanır, konumlandırmayla çakışmaz */}
      <style>{`
        @keyframes harita-bob {
          0%,100% { transform: translateY(0px) rotate(0.3deg); }
          50%      { transform: translateY(-11px) rotate(-0.3deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .harita-bob { animation: none !important; }
        }
      `}</style>

      <div className="mx-auto max-w-layout px-5 py-20 md:px-8 md:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">

          {/* Sol — şartname + QR */}
          <div className="lg:col-span-5">
            <p className="archive-label text-ink/55">Fiziksel Atlas · Edisyon 01</p>
            <h2
              id="physical-atlas-title"
              className="display-2 mt-3 text-4xl text-ink md:text-5xl lg:text-[3.6rem]"
            >
              Atlası eline al.
              <br />
              <span className="italic text-[--atlas-red-deep]">Rotayı yanında taşı.</span>
            </h2>
            <p className="mt-6 max-w-prose text-base leading-relaxed text-ink/75 md:text-[1.05rem]">
              Dijital atlas, basılı katmanların yansımasıdır. Her fiziksel harita
              sınırlı sayıda basılır; üzerindeki QR kodlar doğrudan ilgili
              dijital rotaya bağlanır. Atlası eline alan okur, sahaya çıkmak
              için bir kılavuz; kütüphane rafına koyacağı arşivlik bir nesne
              kazanır.
            </p>

            <dl className="mt-8 divide-y divide-ink/10 border-y border-ink/15">
              <Spec label="Form"    value="4 katlı harita · cebe sığar" />
              <Spec label="Kağıt"  value="120 g krem mat · asitsiz" />
              <Spec label="Boyut"  value="48 × 64 cm açık · 16 × 24 kapalı" />
              <Spec label="Baskı"  value="2 renk ofset · risograf vurgular" />
              <Spec label="Edisyon" value="01 · sınırlı 250 set · numaralandırılmış" />
            </dl>

            <div className="mt-8 flex items-center gap-5">
              <QRCodeGlyph />
              <p className="max-w-[24ch] text-sm leading-snug text-ink/70">
                Haritanın köşesindeki QR kodu paylaşılan dijital rotayı açar.
                İnternet yoksa harita tek başına kullanılabilir.
              </p>
            </div>

            <div className="mt-9 flex flex-wrap gap-3">
              <AtlasButton href="/atlas-edinin" variant="primary">
                Dağıtım Noktalarını Gör
                <AtlasIconArrow />
              </AtlasButton>
              <AtlasButton href="/proje" variant="ghost">
                Proje hakkında
              </AtlasButton>
            </div>
          </div>

          {/* Sağ — canlı harita yelpazesi */}
          <div className="lg:col-span-7">
            <HaritaFan />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── HaritaFan (harita yelpazesi) ─────────────────── */

function HaritaFan() {
  const [active, setActive]   = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const [paused, setPaused]   = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const m = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(m.matches);
    const h = () => setReduced(m.matches);
    m.addEventListener('change', h);
    return () => m.removeEventListener('change', h);
  }, []);

  useEffect(() => {
    if (reduced || paused) return;
    const id = setInterval(() => {
      setActive((p) => (p + 1) % LAYERS.length);
    }, FAN_INTERVAL);
    return () => clearInterval(id);
  }, [reduced, paused, active]);

  const total = LAYERS.length;
  const mid   = (total - 1) / 2;

  return (
    /*
      Kapsayıcı: sabit yükseklik, overflow-visible.
      Kartlar bottom-center'dan origin-bottom ile rotateZ yaparak
      doğal yelpaze oluşturur.
    */
    <div
      className="relative mx-auto select-none overflow-visible"
      style={{ height: 400, maxWidth: 580 }}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => { setPaused(false); setHovered(null); }}
    >
      {/* Masa gölgesi */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-2 left-[5%] right-[5%] h-6 rounded-full blur-2xl"
        style={{ backgroundColor: 'rgba(20,20,20,0.12)' }}
      />

      {LAYERS.map((layer, idx) => {
        const isActive  = active === idx;
        const isHovered = hovered === idx;

        /*
          Yelpaze açısı: ortadaki kart dik, kenar kartlar ±{max}° döner.
          Active kart sıfır açıya çekilir ve yukarı kalkar.
        */
        const MAX_ANGLE = 18;
        const fanAngle  = (idx - mid) * (MAX_ANGLE / mid);
        const angle     = isActive ? 0 : isHovered ? fanAngle * 0.4 : fanAngle;

        /*
          Yatay kayma: aktif kartta ortaya çekilir,
          hover'da hafif ayrılır.
        */
        const fanX   = (idx - mid) * 28;
        const shiftX = isActive ? 0 : isHovered ? fanX * 0.6 : fanX;

        /*
          Dikey: aktif kart 50px yukarı, hover 24px.
        */
        const shiftY = isActive ? -50 : isHovered ? -24 : 0;

        const scaleV = isActive ? 1.06 : isHovered ? 1.02 : 1.0;
        const zIdx   = isActive ? 50 : isHovered ? 40 : idx + 1;

        /* Float bob — iç wrapper'da, dış transform'la çakışmaz */
        const bobDuration = 3.2 + idx * 0.4;
        const bobDelay    = idx * 0.55;
        const shouldBob   = !isActive && !isHovered && !reduced;

        return (
          <button
            key={layer.slug}
            type="button"
            aria-pressed={isActive}
            aria-label={`Harita ${layer.number} · ${layer.title}`}
            className="absolute bottom-8 left-1/2 w-[46%] cursor-pointer
                       focus-visible:outline-none focus-visible:ring-2"
            style={{
              aspectRatio: '3 / 4',
              transformOrigin: 'bottom center',
              transform: `
                translateX(calc(-50% + ${shiftX}px))
                translateY(${shiftY}px)
                rotateZ(${angle}deg)
                scale(${scaleV})
              `,
              transition: 'transform 600ms cubic-bezier(0.22,1,0.36,1)',
              zIndex: zIdx,
            }}
            onPointerEnter={() => setHovered(idx)}
            onPointerLeave={() => setHovered(null)}
            onClick={() => setActive(idx)}
          >
            {/* İç wrapper — sadece float bob animasyonu */}
            <div
              className="harita-bob relative h-full w-full overflow-hidden rounded-[3px] border"
              style={{
                borderColor: isActive
                  ? `color-mix(in oklab, ${layer.colorHex} 60%, rgba(20,20,20,0.15))`
                  : 'rgba(20,20,20,0.22)',
                boxShadow: isActive
                  ? `0 24px 56px -12px color-mix(in oklab, ${layer.colorHex} 36%, transparent), 0 8px 20px -6px rgba(20,20,20,0.18)`
                  : isHovered
                  ? '0 16px 40px -10px rgba(20,20,20,0.20)'
                  : '0 4px 18px -4px rgba(20,20,20,0.13)',
                animation: shouldBob
                  ? `harita-bob ${bobDuration}s ease-in-out ${bobDelay}s infinite`
                  : 'none',
                transition: 'box-shadow 400ms ease, border-color 400ms ease',
              }}
            >
              <Image
                src={layer.mapImage}
                alt={`Harita ${layer.number}: ${layer.title}`}
                fill
                sizes="(min-width: 1024px) 28vw, 50vw"
                className="object-cover"
                loading={idx < 2 ? 'eager' : 'lazy'}
              />

              {/* Üst renkli bant */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0"
                style={{ height: isActive ? 4 : 3, backgroundColor: layer.colorHex,
                         transition: 'height 300ms ease' }}
              />

              {/* Renk overlay — aktif/hover */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 transition-opacity duration-400"
                style={{
                  background: `linear-gradient(180deg, color-mix(in oklab, ${layer.colorHex} 10%, transparent) 0%, transparent 50%)`,
                  opacity: isActive ? 1 : isHovered ? 0.5 : 0,
                }}
              />

              {/* Alt etiket */}
              <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between
                                     gap-2 border-t border-ink/15 bg-paper-light/95 px-3 py-2 backdrop-blur-sm">
                <span className="text-[0.58rem] uppercase tracking-[0.18em] text-ink/65">
                  Harita {layer.number}
                </span>
                <span
                  className="hand-note text-[0.68rem] normal-case tracking-normal transition-colors duration-300"
                  style={{ color: isActive ? layer.colorHex : 'var(--atlas-muted)' }}
                >
                  {layer.shortTitle}
                </span>
              </figcaption>
            </div>
          </button>
        );
      })}

      {/* Dot navigator */}
      <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 items-center gap-2" aria-hidden>
        {LAYERS.map((layer, i) => (
          <button
            key={layer.slug}
            type="button"
            onClick={() => setActive(i)}
            className="focus-visible:outline-none"
            title={`Harita ${layer.number}`}
          >
            <span
              className="block rounded-full transition-all duration-300"
              style={{
                width:           active === i ? 18 : 5,
                height:          5,
                backgroundColor: active === i ? layer.colorHex : 'rgba(20,20,20,0.18)',
              }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────── Yardımcılar ─────────────────── */

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline gap-4 py-2.5">
      <dt className="w-24 shrink-0 text-[0.7rem] uppercase tracking-[0.22em] text-ink/55">{label}</dt>
      <dd className="text-[0.95rem] text-ink/85">{value}</dd>
    </div>
  );
}

function QRCodeGlyph() {
  const on = [0,1,2,3,4,5,6,7,11,13,14,18,21,23,25,27,28,30,33,35,37,39,42,44,46,47,48];
  return (
    <div className="grid h-20 w-20 shrink-0 grid-cols-7 grid-rows-7 gap-[2px] rounded-sm border border-ink/25 bg-paper-light p-2 shadow-paper">
      {Array.from({ length: 49 }).map((_, i) => (
        <span
          key={i}
          className="block"
          style={{ backgroundColor: on.includes(i) ? 'var(--atlas-ink)' : 'transparent' }}
        />
      ))}
    </div>
  );
}
