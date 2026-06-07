'use client';

import { useState } from 'react';
import { AtlasIconArrow } from '@/components/ui/AtlasButton';

export interface StopItem {
  name: string;
  craft: string;
  district: string;
  note: string;
  visit: 'open' | 'appointment' | 'archive';
}

const VISIT_CONFIG = {
  open: { label: 'Açık · Ziyaret Edilebilir', dot: '#22c55e' },
  appointment: { label: 'Randevuyla', dot: '#f59e0b' },
  archive: { label: 'Yalnızca Arşiv', dot: '#94a3b8' },
};

interface StopCardsProps {
  stops: StopItem[];
  colorHex: string;
}

export function StopCards({ stops, colorHex }: StopCardsProps) {
  const [hovered, setHovered] = useState<number | null>(null);
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <ol className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {stops.map((stop, i) => {
        const isHovered = hovered === i;
        const isExpanded = expanded === i;
        const visit = VISIT_CONFIG[stop.visit];

        return (
          <li key={`${stop.name}-${i}`}>
            <article
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => setExpanded(isExpanded ? null : i)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setExpanded(isExpanded ? null : i);
                }
              }}
              role="button"
              tabIndex={0}
              aria-expanded={isExpanded}
              aria-label={`${stop.name} — ${stop.craft}, ${stop.district}`}
              className="group relative cursor-pointer select-none overflow-hidden rounded-xl transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-none focus-visible:ring-2"
              style={{
                /* Glassmorphism base */
                background: isHovered || isExpanded
                  ? `linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.70) 100%)`
                  : 'rgba(255,255,255,0.60)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: `1px solid ${isHovered || isExpanded
                  ? `color-mix(in oklab, ${colorHex} 40%, transparent)`
                  : 'rgba(20,20,20,0.10)'}`,
                boxShadow: isHovered || isExpanded
                  ? `0 12px 40px -12px color-mix(in oklab, ${colorHex} 28%, transparent), 0 4px 16px -4px rgba(20,20,20,0.12)`
                  : '0 2px 12px -4px rgba(20,20,20,0.08)',
                transform: isHovered && !isExpanded ? 'translateY(-3px)' : 'translateY(0)',
              }}
            >
              {/* Tinted glow layer */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(80% 80% at 30% 0%, color-mix(in oklab, ${colorHex} 12%, transparent) 0%, transparent 100%)`,
                  opacity: isHovered || isExpanded ? 1 : 0,
                }}
              />

              {/* Ghosted background number */}
              <span
                aria-hidden
                className="pointer-events-none absolute right-3 top-2 font-display font-bold leading-none select-none transition-all duration-500"
                style={{
                  fontSize: isExpanded ? '4.5rem' : '5.5rem',
                  color: colorHex,
                  opacity: isHovered || isExpanded ? 0.10 : 0.055,
                  lineHeight: 1,
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>

              {/* Top color accent line */}
              <div
                aria-hidden
                className="absolute inset-x-0 top-0 h-[2px] transition-all duration-500"
                style={{
                  background: `linear-gradient(90deg, ${colorHex}, color-mix(in oklab, ${colorHex} 40%, transparent))`,
                  opacity: isHovered || isExpanded ? 1 : 0.4,
                }}
              />

              <div className="relative p-6">
                {/* Header row */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex flex-col gap-1">
                    <span
                      className="archive-label transition-colors duration-300"
                      style={{ color: colorHex }}
                    >
                      Durak {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="font-display text-[1.2rem] font-semibold leading-snug tracking-[-0.02em] text-ink">
                      {stop.name}
                    </h3>
                  </div>

                  {/* Expand/collapse icon */}
                  <span
                    aria-hidden
                    className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-300"
                    style={{
                      borderColor: isExpanded
                        ? colorHex
                        : 'rgba(20,20,20,0.12)',
                      background: isExpanded
                        ? colorHex
                        : 'transparent',
                      transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
                    }}
                  >
                    <AtlasIconArrow
                      style={{
                        color: isExpanded ? '#fff' : colorHex,
                        width: 12,
                        height: 12,
                      }}
                    />
                  </span>
                </div>

                {/* Craft tag */}
                <span
                  className="mt-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[0.72rem] font-medium"
                  style={{
                    background: `color-mix(in oklab, ${colorHex} 10%, transparent)`,
                    color: colorHex,
                    border: `1px solid color-mix(in oklab, ${colorHex} 25%, transparent)`,
                  }}
                >
                  <span
                    aria-hidden
                    className="block h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: colorHex }}
                  />
                  {stop.craft}
                </span>

                {/* Note — always visible */}
                <p className="mt-4 text-[0.92rem] leading-relaxed text-ink/70">
                  {stop.note}
                </p>

                {/* Expanded content */}
                <div
                  className="overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{
                    maxHeight: isExpanded ? '200px' : '0px',
                    opacity: isExpanded ? 1 : 0,
                  }}
                >
                  <div className="mt-5 space-y-3 border-t pt-4" style={{ borderColor: `color-mix(in oklab, ${colorHex} 20%, transparent)` }}>
                    <div className="flex items-center gap-2 text-[0.82rem] text-ink/65">
                      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" className="h-3.5 w-3.5 shrink-0">
                        <path d="M8 2C5.79 2 4 3.79 4 6c0 3 4 8 4 8s4-5 4-8c0-2.21-1.79-4-4-4z" />
                        <circle cx="8" cy="6" r="1.5" />
                      </svg>
                      {stop.district}
                    </div>
                    <div className="flex items-center gap-2 text-[0.82rem]">
                      <span
                        aria-hidden
                        className="block h-1.5 w-1.5 rounded-full"
                        style={{ backgroundColor: visit.dot }}
                      />
                      <span style={{ color: visit.dot }}>{visit.label}</span>
                    </div>
                    <p className="text-[0.78rem] text-ink/50">
                      Adres ve iletişim bilgileri saha doğrulaması sonrası yayınlanır.
                    </p>
                  </div>
                </div>

                {/* Footer — always visible */}
                <div className="mt-5 flex items-center justify-between border-t pt-3 text-[0.72rem] uppercase tracking-[0.18em]" style={{ borderColor: 'rgba(20,20,20,0.08)' }}>
                  <span className="text-ink/50">{stop.district}</span>
                  {!isExpanded && (
                    <span
                      className="flex items-center gap-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      style={{ color: colorHex }}
                    >
                      Detay
                      <AtlasIconArrow style={{ width: 10, height: 10 }} />
                    </span>
                  )}
                  {isExpanded && (
                    <span className="text-ink/40 normal-case tracking-normal">
                      Kapat
                    </span>
                  )}
                </div>
              </div>
            </article>
          </li>
        );
      })}
    </ol>
  );
}
