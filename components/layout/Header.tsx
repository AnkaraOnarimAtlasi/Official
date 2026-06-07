import Link from 'next/link';
import Image from 'next/image';
import { SITE } from '@/lib/constants/site';
import { HeaderClient } from '@/components/layout/HeaderClient';

/**
 * Header — galeri beyazı zemin, dört harita rengi bir aksan şeridi olarak.
 * Logo: kompakt monogram (A•O•A) + tipografik kilitleme.
 */
export function Header() {
  return (
    <header
      className="sticky top-0 z-[1100]"
      style={{
        backgroundColor: 'rgba(255,255,255,0.60)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(20,20,20,0.07)',
      }}
    >
      {/* Üst aksan şeridi — beş harita rengi yan yana */}
      <div aria-hidden className="flex h-[3px] w-full">
        <span className="h-full flex-1 bg-[var(--layer-paper-arts)]" />
        <span className="h-full flex-1 bg-[var(--layer-object-repair)]" />
        <span className="h-full flex-1 bg-[var(--layer-traditional-crafts)]" />
        <span className="h-full flex-1 bg-[var(--layer-metal-wood)]" />
        <span className="h-full flex-1 bg-[var(--layer-memory-repair)]" />
      </div>

      <div className="mx-auto flex max-w-layout items-center justify-between gap-6 px-5 py-2 md:px-8">
        <Link
          href="/"
          className="group flex items-center"
          aria-label={`${SITE.name} ana sayfa`}
        >
          <Image
            src="/logo.png"
            alt={SITE.name}
            width={240}
            height={120}
            priority
            className="h-16 md:h-20 w-auto object-contain transition-opacity duration-200 group-hover:opacity-80"
          />
        </Link>

        {/* Desktop Nav */}
        <nav aria-label="Birincil" className="hidden lg:block">
          <ul className="flex items-center gap-7 text-[0.94rem]">
            {SITE.primaryNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="relative text-ink/75 transition-colors duration-200 ease-atlas hover:text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/katki-sagla"
            className="hidden items-center gap-2 rounded-full border border-ink bg-ink px-4 py-2 text-xs font-medium tracking-wide text-paper-light transition-colors duration-200 ease-atlas hover:bg-[--atlas-red-deep] hover:border-[--atlas-red-deep] md:inline-flex"
          >
            <span
              aria-hidden
              className="block h-1.5 w-1.5 rounded-full bg-[--atlas-accent]"
            />
            Nokta Öner
          </Link>

          {/* Mobile hamburger menu */}
          <HeaderClient />
        </div>
      </div>
    </header>
  );
}
