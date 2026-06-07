'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils/cn';
import { MOBILE_DOCK } from '@/lib/constants/site';

/* Simple SVG icons — stroke 1.5px, consistent with design system */

function IconCompass(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="22"
      height="22"
      aria-hidden
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <polygon
        points="16.24,7.76 14.12,14.12 7.76,16.24 9.88,9.88"
        fill="currentColor"
        stroke="none"
        opacity="0.2"
      />
      <polygon points="16.24,7.76 14.12,14.12 7.76,16.24 9.88,9.88" />
    </svg>
  );
}

function IconMap(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="22"
      height="22"
      aria-hidden
      {...props}
    >
      <path d="M1 6v16l7-4 8 4 7-4V2l-7 4-8-4-7 4z" />
      <path d="M8 2v16" />
      <path d="M16 6v16" />
    </svg>
  );
}

function IconPlusCircle(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="22"
      height="22"
      aria-hidden
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8v8M8 12h8" />
    </svg>
  );
}

const DOCK_ICONS: Record<string, React.ComponentType<React.ComponentProps<'svg'>>> = {
  '/atlas': IconCompass,
  '/atlas#harita': IconMap,
  '/katki-sagla': IconPlusCircle,
};

export function MobileDock() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Mobil gezinme"
      className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-around border-t border-ink/10 bg-paper pb-[env(safe-area-inset-bottom)] lg:hidden"
    >
      {MOBILE_DOCK.map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(item.href.split('#')[0]);
        const Icon = DOCK_ICONS[item.href];

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex flex-1 flex-col items-center gap-0.5 px-2 py-2.5 text-[0.6rem] uppercase tracking-[0.14em] transition-colors duration-150 ease-atlas',
              isActive ? 'text-ink' : 'text-ink/45 hover:text-ink/70',
            )}
            aria-current={isActive ? 'page' : undefined}
          >
            {Icon && <Icon />}
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
