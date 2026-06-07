import type { LayerColorKey } from '@/lib/types';
import { cn } from '@/lib/utils/cn';

const COLOR_VAR: Record<LayerColorKey, string> = {
  'paper-arts': 'var(--layer-paper-arts)',
  'object-repair': 'var(--layer-object-repair)',
  'traditional-crafts': 'var(--layer-traditional-crafts)',
  'metal-wood': 'var(--layer-metal-wood)',
  'memory-repair': 'var(--layer-memory-repair)',
};

interface LayerBadgeProps {
  colorKey: LayerColorKey;
  number: string;
  label: string;
  className?: string;
}

export function LayerBadge({ colorKey, number, label, className }: LayerBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.18em]',
        className,
      )}
    >
      <span
        aria-hidden
        className="inline-block h-2 w-2 rounded-full"
        style={{ backgroundColor: COLOR_VAR[colorKey] }}
      />
      <span className="text-ink/70">Katman {number}</span>
      <span className="text-ink/30">·</span>
      <span className="font-medium text-ink/85">{label}</span>
    </span>
  );
}
