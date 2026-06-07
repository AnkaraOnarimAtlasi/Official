import Link from 'next/link';
import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils/cn';

type Variant = 'primary' | 'secondary' | 'ghost';

interface AtlasButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  ariaLabel?: string;
}

const VARIANT_CLASSES: Record<Variant, string> = {
  primary:
    'bg-ink text-paper-light border-ink hover:bg-[--atlas-red-deep] hover:border-[--atlas-red-deep]',
  secondary:
    'bg-paper-light text-ink border-ink/30 hover:border-ink hover:bg-paper',
  ghost:
    'bg-transparent text-ink border-transparent hover:border-ink/30 hover:bg-paper-light',
};

export function AtlasButton({
  href,
  children,
  variant = 'primary',
  className,
  ariaLabel,
}: AtlasButtonProps) {
  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-full border px-6 py-3 text-sm font-medium tracking-wide transition-colors duration-200 ease-atlas focus-visible:outline-2',
        VARIANT_CLASSES[variant],
        className,
      )}
    >
      {children}
    </Link>
  );
}

export function AtlasIconArrow(props: ComponentProps<'svg'>) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="14"
      height="14"
      aria-hidden
      {...props}
    >
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}
