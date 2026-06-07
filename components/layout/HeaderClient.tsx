'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils/cn';
import { SITE } from '@/lib/constants/site';

export function HeaderClient() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <div className="lg:hidden">
      {/* Hamburger Toggle Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative z-50 flex h-10 w-10 items-center justify-center rounded-sm border border-ink/10 bg-paper-light text-ink focus-visible:outline-2"
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        aria-label="Menüyü aç/kapat"
      >
        <span className="relative h-4 w-5 flex flex-col justify-between">
          <span
            className={cn(
              'h-[1.5px] w-full bg-ink transition-transform duration-300 ease-atlas origin-top-left',
              isOpen && 'rotate-45 translate-x-[3px] translate-y-[-1px]'
            )}
          />
          <span
            className={cn(
              'h-[1.5px] w-full bg-ink transition-opacity duration-200 ease-atlas',
              isOpen && 'opacity-0'
            )}
          />
          <span
            className={cn(
              'h-[1.5px] w-full bg-ink transition-transform duration-300 ease-atlas origin-bottom-left',
              isOpen && '-rotate-45 translate-x-[3px] translate-y-[1px]'
            )}
          />
        </span>
      </button>

      {/* Mobile Menu Overlay */}
      <div
        id="mobile-menu"
        className={cn(
          'fixed inset-0 z-40 flex flex-col bg-paper px-6 py-24 transition-transform duration-300 ease-atlas',
          isOpen ? 'translate-y-0' : '-translate-y-full'
        )}
      >
        {/* Navigation Links */}
        <nav aria-label="Mobil Birincil" className="flex-1">
          <ul className="flex flex-col gap-6 text-center">
            {SITE.primaryNav.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      'font-display text-2xl font-semibold tracking-editorial transition-colors',
                      isActive ? 'text-ink' : 'text-ink/60 hover:text-ink'
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* CTA Button in Menu */}
        <div className="pt-8 text-center space-y-4">
          <Link
            href="/katki-sagla"
            className="inline-flex w-full justify-center rounded-full border border-ink bg-ink px-6 py-3.5 text-sm font-semibold tracking-wide text-paper-light transition-colors duration-200 ease-atlas hover:bg-[--atlas-red-deep] hover:border-[--atlas-red-deep]"
          >
            Nokta Öner
          </Link>
          <p className="text-[0.62rem] uppercase tracking-[0.16em] text-ink/40">
            Ankara Onarım Atlası · 2026
          </p>
        </div>
      </div>
    </div>
  );
}
