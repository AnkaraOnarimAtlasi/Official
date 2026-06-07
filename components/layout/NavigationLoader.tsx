'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { GoatLoader } from '@/components/ui/GoatLoader';

/**
 * NavigationLoader — sayfa geçişlerinde keçi loader'ı gösterir.
 *
 * Mantık:
 *  1. Internal link tıklanınca anında göster + başlangıç zamanını kaydet
 *  2. Pathname değişince (navigasyon tamamlandı): kalan süreyi hesapla
 *  3. MIN_MS dolana kadar bekle → fade-out → kaldır
 *
 * Böylece hızlı sayfalarda da tam 2 sn gösterilir.
 */

const MIN_MS   = 2000; // minimum gösterim süresi
const FADE_MS  = 400;  // fade-out süresi

export function NavigationLoader() {
  const pathname   = usePathname();
  const [show, setShow] = useState(false);
  const [fade, setFade] = useState(false);
  const startRef   = useRef<number>(0);
  const prevPath   = useRef(pathname);
  const t1Ref      = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const t2Ref      = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  /* ── Link tıklamalarını yakala ─────────────────────────────── */
  useEffect(() => {
    const onCapture = (e: MouseEvent) => {
      const anchor = (e.target as Element).closest('a[href]') as HTMLAnchorElement | null;
      if (!anchor) return;

      const href = anchor.getAttribute('href') ?? '';

      /* Dış link, hash, mail, tel → atla */
      if (
        !href ||
        href.startsWith('http') ||
        href.startsWith('//') ||
        href.startsWith('#') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:')
      ) return;

      /* Aynı sayfa → atla */
      if (href === pathname || href === window.location.pathname) return;

      startRef.current = Date.now();
      clearTimeout(t1Ref.current);
      clearTimeout(t2Ref.current);
      setFade(false);
      setTimeout(() => {
        setShow(true);
      }, 0);
    };

    document.addEventListener('click', onCapture, true);
    return () => document.removeEventListener('click', onCapture, true);
  }, [pathname]);

  /* ── Pathname değişince kalan süreyi bekle → kapat ──────────── */
  useEffect(() => {
    if (pathname === prevPath.current) return;
    prevPath.current = pathname;
    if (!show) return;

    const elapsed   = Date.now() - startRef.current;
    const remaining = Math.max(0, MIN_MS - elapsed);

    t1Ref.current = setTimeout(() => setFade(true), remaining);
    t2Ref.current = setTimeout(() => { setShow(false); setFade(false); }, remaining + FADE_MS);

    return () => {
      clearTimeout(t1Ref.current);
      clearTimeout(t2Ref.current);
    };
  }, [pathname, show]);

  /* ── Güvenlik Zaman Aşımı (Safety Timeout) ──────────────────── */
  // Eğer navigasyon bir şekilde takılır veya pathname değişmezse, 
  // 3.5 saniye sonra yükleniyor ekranını otomatik olarak kaldır.
  useEffect(() => {
    if (!show) return;
    const safetyTimer = setTimeout(() => {
      setFade(true);
      const hideTimer = setTimeout(() => {
        setShow(false);
        setFade(false);
      }, FADE_MS);
      return () => clearTimeout(hideTimer);
    }, 3500);

    return () => clearTimeout(safetyTimer);
  }, [show]);

  if (!show) return null;

  return (
    <div
      style={{
        position:      'fixed',
        inset:          0,
        zIndex:         99998,
        opacity:        fade ? 0 : 1,
        transition:     `opacity ${FADE_MS}ms ease`,
        pointerEvents:  fade ? 'none' : 'auto',
      }}
    >
      <GoatLoader />
    </div>
  );
}
