'use client';

import { cn } from '@/lib/utils/cn';

interface FilterChipProps {
  label: string;
  isActive?: boolean;
  onClick?: () => void;
  color?: string;
  className?: string;
}

export function FilterChip({
  label,
  isActive = false,
  onClick,
  color,
  className,
}: FilterChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isActive}
      className={cn(
        'inline-flex items-center rounded-full border px-3.5 py-1.5 text-[0.72rem] font-medium tracking-wide transition-colors duration-200 ease-atlas',
        isActive
          ? 'border-transparent text-paper-light'
          : 'border-ink/20 bg-transparent text-ink/70 hover:border-ink/40 hover:text-ink',
        className,
      )}
      style={
        isActive && color
          ? { backgroundColor: color }
          : isActive
            ? { backgroundColor: 'var(--atlas-ink)', color: 'var(--atlas-paper-light)' }
            : undefined
      }
    >
      {label}
    </button>
  );
}
