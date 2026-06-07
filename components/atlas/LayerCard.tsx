import Image from 'next/image';
import Link from 'next/link';
import { AtlasIconArrow } from '@/components/ui/AtlasButton';
import type { Layer } from '@/lib/types';

interface LayerCardProps {
  layer: Layer;
  index: number;
}

export function LayerCard({ layer, index }: LayerCardProps) {
  return (
    <article
      className="group relative flex flex-col overflow-hidden rounded-sm border border-ink/15 bg-paper-light shadow-paper transition-shadow duration-300 ease-atlas hover:shadow-sheet"
      aria-labelledby={`layer-${layer.slug}-title`}
    >
      {/* Renkli üst kenar — fiziksel etiket bandı */}
      <span
        aria-hidden
        className="block h-1.5 w-full"
        style={{ backgroundColor: layer.colorHex }}
      />

      <div className="relative aspect-[4/3] overflow-hidden border-b border-ink/10 bg-paper">
        <Image
          src={layer.mapImage}
          alt={`Katman ${layer.number}: ${layer.title} haritası`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-atlas group-hover:scale-[1.03]"
          loading={index < 2 ? 'eager' : 'lazy'}
        />
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6 md:p-7">
        <div className="flex items-center justify-between">
          <span
            className="archive-label"
            style={{ color: layer.colorHex }}
          >
            Katman {layer.number}
          </span>
          <span className="text-[0.7rem] uppercase tracking-[0.18em] text-ink/55">
            {layer.stopCount} durak
          </span>
        </div>

        <h3
          id={`layer-${layer.slug}-title`}
          className="font-display text-2xl font-semibold leading-tight tracking-editorial text-ink md:text-3xl"
        >
          {layer.title}
        </h3>

        <p className="hand-note text-base text-ink/65">{layer.subtitle}</p>

        <p className="text-sm leading-relaxed text-ink/75">
          {layer.description}
        </p>

        <ul className="flex flex-wrap gap-1.5 pt-2">
          {layer.crafts.slice(0, 4).map((craft) => (
            <li
              key={craft}
              className="rounded-full border border-ink/20 px-2.5 py-0.5 text-[0.7rem] text-ink/70"
            >
              {craft}
            </li>
          ))}
        </ul>

        <footer className="mt-auto flex items-center justify-between gap-4 pt-4">
          <p className="text-[0.7rem] uppercase tracking-[0.16em] text-ink/55">
            {layer.regions.slice(0, 3).join(' → ')}
          </p>
          <Link
            href={`/atlas/${layer.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-ink underline-offset-4 hover:underline"
            aria-label={`${layer.title} katmanını aç`}
          >
            Rotayı Aç
            <AtlasIconArrow />
          </Link>
        </footer>
      </div>
    </article>
  );
}
