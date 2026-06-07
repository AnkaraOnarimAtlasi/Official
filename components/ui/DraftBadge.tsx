import { cn } from '@/lib/utils/cn';

interface DraftBadgeProps {
  className?: string;
}

export function DraftBadge({ className }: DraftBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-sm border border-ink/15 px-2.5 py-1 text-[0.68rem] leading-none text-ink/55',
        className,
      )}
    >
      <svg
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        width="12"
        height="12"
        aria-hidden
        className="shrink-0"
      >
        <path d="M11.5 1.5l3 3L5 14H2v-3L11.5 1.5z" />
      </svg>
      Taslak · Saha doğrulaması bekleniyor
    </span>
  );
}
