import type { Metadata } from 'next';
import Link from 'next/link';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { AtlasButton, AtlasIconArrow } from '@/components/ui/AtlasButton';
import { AtlasMapViewer } from '@/components/atlas/AtlasMapViewer';
import { LAYERS } from '@/lib/constants/layers';
import { SITE } from '@/lib/constants/site';

export const metadata: Metadata = {
  title: 'Atlas',
  description: `${SITE.name} — Ankara'nın görünmeyen onarım ağlarını katmanlı haritalar üzerinden keşfet. Dört katman, dört dünya.`,
  alternates: { canonical: '/atlas' },
};

export default function AtlasPage() {
  return (
    <article className="paper-grain">
      {/* Hero heading */}
      <section className="mx-auto max-w-layout px-5 pb-8 pt-16 md:px-8 md:pt-24">
        <SectionHeading
          eyebrow="Keşif"
          title="Yaşayan Atlas"
          description="Ankara'nın görünmeyen onarım ağlarını keşfet."
          align="center"
        />
      </section>

      {/* Main Map Viewer (3D + Static fallback toggle) */}
      <section className="mx-auto max-w-layout px-5 pb-16 md:px-8">
        <AtlasMapViewer />
      </section>

      {/* Layer selector cards — mini */}
      <section className="border-y border-ink/10 bg-paper-deep/40">
        <div className="mx-auto max-w-layout px-5 py-12 md:px-8 md:py-16">
          <h2 className="archive-label mb-8 text-center text-ink/60">
            Katmanlar
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:gap-4">
            {LAYERS.map((layer) => (
              <Link
                key={layer.slug}
                href={`/atlas/${layer.slug}`}
                className="group flex flex-col items-center gap-3 rounded-sm border border-ink/15 bg-paper-light px-4 py-5 text-center shadow-paper transition-all duration-200 ease-atlas hover:border-ink/30 hover:shadow-sheet md:px-5 md:py-6"
              >
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold text-paper-light"
                  style={{ backgroundColor: layer.colorHex }}
                >
                  {layer.number}
                </span>
                <span className="font-display text-sm font-semibold tracking-editorial text-ink md:text-base">
                  {layer.shortTitle}
                </span>
                <span className="hand-note text-xs text-ink/60">
                  {layer.subtitle}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3D notice */}
      <section className="mx-auto max-w-layout px-5 py-12 text-center md:px-8 md:py-16">
        <div className="mx-auto max-w-prose rounded-sm border border-ink/15 bg-paper-light px-6 py-8 shadow-paper md:px-10 md:py-10">
          <p className="archive-label mb-3 text-ink/50">Yakında</p>
          <p className="font-display text-lg font-semibold tracking-editorial text-ink md:text-xl">
            İnteraktif 3D atlas deneyimi yakında
          </p>
          <p className="mt-3 text-sm leading-relaxed text-ink/70 md:text-base">
            Şimdilik haritaları keşfet, katmanları incele, rotaları planla.
            Üç boyutlu atlas deneyimi bir sonraki fazda etkinleşecek.
          </p>
          <div className="mt-6">
            <AtlasButton href="/rotalar" variant="secondary">
              Rotaları Keşfet
              <AtlasIconArrow />
            </AtlasButton>
          </div>
        </div>
      </section>
    </article>
  );
}
