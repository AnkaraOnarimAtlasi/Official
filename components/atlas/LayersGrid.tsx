import Image from 'next/image';
import Link from 'next/link';
import { AtlasIconArrow } from '@/components/ui/AtlasButton';
import { LAYERS } from '@/lib/constants/layers';
import type { Layer } from '@/lib/types';

/**
 * LayersGrid — Phase 2 rebuild.
 *
 * Konsept: kart ızgarası yerine "arşiv indeksi". Sayfa açıldığında
 * dört katman büyük numaraları, ince ayraç çizgileri ve yan yana
 * dizilen tipografisiyle bir kütüphane kataloğu izlenimi verir.
 * İlk katman (Kağıt Sanatı) "open" durumdadır; geniş bir editoryal
 * spread olarak açılır. Diğerleri kısa indeks satırı olarak durur,
 * hover/focus ile zarif biçimde genişler.
 */
export function LayersGrid() {
  return (
    <section
      id="katmanlar"
      aria-labelledby="layers-index-title"
      className="border-y border-border bg-paper scroll-mt-24"
    >
      <div className="mx-auto max-w-layout px-5 py-20 md:px-8 md:py-28">
        {/* Section header — gazete tarzı iki sütun */}
        <header className="grid items-end gap-8 border-b border-ink/15 pb-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="archive-label text-ink/55">Cilt I · Bölüm 02</p>
            <h2
              id="layers-index-title"
              className="display-2 mt-3 text-4xl text-ink md:text-5xl lg:text-6xl"
            >
              Dört katman,
              <br className="hidden md:block" />
              <span className="italic" style={{ color: 'var(--atlas-red-deep)' }}>tek bir kent.</span>
            </h2>
          </div>
          <div className="md:col-span-5">
            <p className="hand-note text-lg text-ink/65">
              kağıt · nesne · el sanatı · metal-ahşap
            </p>
            <p className="mt-3 max-w-prose text-[0.95rem] leading-relaxed text-ink/75">
              Ankara Onarım Atlası dört tematik katman üzerinden okunur. Her
              katman kendi rengi, ritmi ve duyusal dünyasıyla ayrılır; ortak
              bir paydada — onarılarak sürdürülen kent — birleşir.
            </p>
          </div>
        </header>

        {/* Index list */}
        <ol className="mt-2">
          {LAYERS.map((layer, idx) => (
            <li key={layer.slug}>
              <LayerIndexRow layer={layer} index={idx} isFirst={idx === 0} />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ─────────────────────────── Row ─────────────────────────── */

interface RowProps {
  layer: Layer;
  index: number;
  isFirst: boolean;
}

function LayerIndexRow({ layer, isFirst }: RowProps) {
  return (
    <article
      className="group relative grid grid-cols-12 items-stretch border-b border-ink/10 transition-colors duration-500 hover:bg-paper-light"
      aria-labelledby={`layer-index-${layer.slug}-title`}
    >
      {/* Ortak alanlar */}
      {/* Sol: büyük indeks numarası */}
      <div className="col-span-3 flex items-start gap-3 py-8 md:col-span-2 md:py-12">
        <span
          aria-hidden
          className="mt-3 block h-3 w-1 rounded-sm transition-all duration-500 group-hover:h-10"
          style={{ backgroundColor: layer.colorHex }}
        />
        <span
          className="font-display text-6xl font-semibold leading-none tracking-editorial text-ink/85 transition-colors duration-500 group-hover:text-ink md:text-7xl lg:text-8xl"
          style={{ fontVariantNumeric: 'tabular-nums' }}
        >
          {layer.number}
        </span>
      </div>

      {/* Orta: başlık + saha notu + açıklama */}
      <div className="col-span-9 flex flex-col justify-center gap-3 py-8 md:col-span-6 md:py-12">
        <p className="archive-label" style={{ color: layer.colorHex }}>
          Katman · {layer.shortTitle}
        </p>
        <h3
          id={`layer-index-${layer.slug}-title`}
          className="font-display text-3xl font-semibold leading-[1.05] tracking-editorial text-ink md:text-4xl lg:text-[2.7rem]"
        >
          {layer.title}
        </h3>
        <p className="hand-note text-base text-ink/60">{layer.subtitle}</p>

        <p className="mt-1 max-w-[58ch] text-[0.96rem] leading-relaxed text-ink/75">
          {layer.description}
        </p>

        {/* Zanaat etiketleri */}
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {layer.crafts.map((c) => (
            <li
              key={c}
              className="rounded-full border border-ink/20 bg-paper-light px-2.5 py-0.5 text-[0.72rem] text-ink/75"
            >
              {c}
            </li>
          ))}
        </ul>

        <p className="mt-3 text-[0.72rem] uppercase tracking-[0.2em] text-ink/55">
          {layer.regions.join(' · ')}
        </p>
      </div>

      {/* Sağ: harita görseli + CTA */}
      <div className="col-span-12 flex flex-col justify-between gap-5 border-t border-ink/10 py-8 md:col-span-4 md:border-l md:border-t-0 md:py-12 md:pl-8">
        <Link
          href={`/atlas/${layer.slug}`}
          aria-label={`${layer.title} haritasına aç`}
          className="relative block aspect-[4/3] overflow-hidden rounded-sm border border-ink/20 shadow-paper transition-shadow duration-500 group-hover:shadow-sheet"
        >
          <Image
            src={layer.mapImage}
            alt={`Harita ${layer.number}: ${layer.title}`}
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover transition-transform duration-700 ease-atlas group-hover:scale-[1.04]"
            loading={isFirst ? 'eager' : 'lazy'}
          />
          {/* Renk harita bandı */}
          <span
            aria-hidden
            className="absolute inset-x-0 top-0 h-1"
            style={{ backgroundColor: layer.colorHex }}
          />
          {/* Harita bilgileri */}
          <span className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[0.62rem] uppercase tracking-[0.2em] text-paper-light">
            <span
              className="rounded-sm px-2 py-0.5"
              style={{ backgroundColor: layer.colorHex }}
            >
              Harita {layer.number}
            </span>
            <span className="rounded-sm bg-ink/80 px-2 py-0.5 tabular-nums">
              {layer.stopCount} durak
            </span>
          </span>
        </Link>

        <div className="flex items-center justify-between gap-3">
          <Link
            href={`/atlas/${layer.slug}`}
            className="inline-flex items-center gap-2 font-display text-base font-semibold tracking-editorial text-ink underline-offset-4 transition-colors hover:text-[--atlas-red-deep] hover:underline"
          >
            Rotayı Aç
            <AtlasIconArrow />
          </Link>
          <span
            aria-hidden
            className="hand-note text-base"
            style={{ color: layer.colorHex }}
          >
            {layer.shortTitle.toLowerCase()}
          </span>
        </div>
      </div>
    </article>
  );
}
