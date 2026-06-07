import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils/cn';
import { AtlasIconArrow } from '@/components/ui/AtlasButton';
import { DraftBadge } from '@/components/ui/DraftBadge';

interface EditorialCardProps {
  href: string;
  image?: string;
  imageAlt?: string;
  eyebrow?: string;
  eyebrowColor?: string;
  title: string;
  subtitle?: string;
  description?: string;
  meta?: string;
  ctaLabel?: string;
  isDraft?: boolean;
  className?: string;
}

export function EditorialCard({
  href,
  image,
  imageAlt,
  eyebrow,
  eyebrowColor,
  title,
  subtitle,
  description,
  meta,
  ctaLabel,
  isDraft = false,
  className,
}: EditorialCardProps) {
  return (
    <article
      className={cn(
        'group flex flex-col overflow-hidden rounded-sm border border-ink/15 bg-paper-light shadow-paper transition-shadow duration-300 ease-atlas hover:shadow-sheet',
        className,
      )}
    >
      {/* Colored top band — archive index tab */}
      <span
        aria-hidden
        className="block h-0.5 w-full"
        style={{ backgroundColor: eyebrowColor ?? 'var(--atlas-border-strong)' }}
      />

      {/* Optional image */}
      {image && (
        <div className="relative aspect-[4/3] overflow-hidden border-b border-ink/10 bg-paper">
          <Image
            src={image}
            alt={imageAlt ?? title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
            loading="lazy"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col gap-3 p-5 md:p-6">
        {/* Eyebrow + draft badge */}
        <div className="flex items-center gap-2">
          {eyebrow && (
            <span
              className="archive-label text-ink/55"
              style={eyebrowColor ? { color: eyebrowColor } : undefined}
            >
              {eyebrow}
            </span>
          )}
          {isDraft && <DraftBadge />}
        </div>

        {/* Title */}
        <h3 className="font-display text-xl font-semibold leading-tight tracking-editorial text-ink md:text-2xl">
          <Link
            href={href}
            className="after:absolute after:inset-0"
          >
            {title}
          </Link>
        </h3>

        {/* Subtitle (hand note style) */}
        {subtitle && (
          <p className="hand-note text-base text-ink/60">{subtitle}</p>
        )}

        {/* Description */}
        {description && (
          <p className="line-clamp-3 text-sm leading-relaxed text-ink/70">
            {description}
          </p>
        )}

        {/* Footer: meta + CTA */}
        <footer className="mt-auto flex items-center justify-between gap-3 pt-3">
          {meta && (
            <span className="text-[0.68rem] uppercase tracking-[0.16em] text-ink/45">
              {meta}
            </span>
          )}
          {ctaLabel && (
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-ink">
              {ctaLabel}
              <AtlasIconArrow />
            </span>
          )}
        </footer>
      </div>
    </article>
  );
}
