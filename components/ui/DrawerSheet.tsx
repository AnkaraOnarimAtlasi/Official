'use client';

import { useEffect, useRef, useCallback } from 'react';
import { cn } from '@/lib/utils/cn';

interface DrawerSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export function DrawerSheet({ isOpen, onClose, title, children }: DrawerSheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      // Focus trap
      if (e.key === 'Tab' && sheetRef.current) {
        const focusable = sheetRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    },
    [onClose],
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';

      // Focus close button on open
      const timer = setTimeout(() => {
        const closeBtn = sheetRef.current?.querySelector<HTMLElement>('[data-drawer-close]');
        closeBtn?.focus();
      }, 100);

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = '';
        clearTimeout(timer);
      };
    }
  }, [isOpen, handleKeyDown]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-ink/40 transition-opacity duration-200 ease-atlas',
          isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
        )}
        onClick={onClose}
        aria-hidden
      />

      {/* Sheet */}
      <div
        ref={sheetRef}
        role="dialog"
        aria-modal={isOpen}
        aria-label={title ?? 'Çekmece menüsü'}
        className={cn(
          'fixed inset-x-0 bottom-0 z-50 flex max-h-[85vh] flex-col rounded-t-xl border-t border-ink/15 bg-paper-light shadow-sheet transition-transform duration-300 ease-atlas',
          isOpen ? 'translate-y-0' : 'translate-y-full',
        )}
      >
        {/* Drag indicator */}
        <div className="flex justify-center pb-1 pt-3">
          <span
            aria-hidden
            className="h-1 w-10 rounded-full bg-ink/20"
          />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 pb-3 pt-1">
          {title && (
            <h2 className="font-display text-lg font-semibold tracking-editorial text-ink">
              {title}
            </h2>
          )}
          <button
            type="button"
            data-drawer-close
            onClick={onClose}
            aria-label="Kapat"
            className="ml-auto -mr-1 flex h-8 w-8 items-center justify-center rounded-sm text-ink/60 transition-colors duration-150 ease-atlas hover:text-ink"
          >
            <svg
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              width="16"
              height="16"
              aria-hidden
            >
              <path d="M4 4l8 8M12 4l-8 8" />
            </svg>
          </button>
        </div>

        {/* Divider */}
        <div className="border-t border-ink/10" />

        {/* Content */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-4">
          {children}
        </div>
      </div>
    </>
  );
}
