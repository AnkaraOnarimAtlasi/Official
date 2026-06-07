import { cn } from '@/lib/utils/cn';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
}: SectionHeadingProps) {
  return (
    <header
      className={cn(
        'max-w-3xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      {eyebrow && (
        <p className="archive-label text-ink/60">{eyebrow}</p>
      )}
      <h2
        className={cn(
          'mt-3 font-display text-3xl font-semibold tracking-editorial text-ink md:text-4xl lg:text-5xl',
        )}
      >
        {title}
      </h2>
      {description && (
        <p className="mt-4 max-w-prose text-base leading-relaxed text-ink/75 md:text-lg">
          {description}
        </p>
      )}
    </header>
  );
}
