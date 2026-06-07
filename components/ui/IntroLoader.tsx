'use client';

import { useEffect, useState } from 'react';
import { GoatLoader } from './GoatLoader';

/**
 * IntroLoader — siteye ilk girişte 3 saniye gösterilir, sonra fade-out ile kaybolur.
 * sessionStorage ile oturum başına bir kez gösterilir.
 */
export function IntroLoader() {
  const [visible, setVisible] = useState(false);
  const [fading, setFading]   = useState(false);

  useEffect(() => {
    // Oturum başına sadece bir kez göster
    const seen = sessionStorage.getItem('intro-seen');
    if (seen) return;

    setVisible(true);
    sessionStorage.setItem('intro-seen', '1');

    // 3 saniye sonra fade-out başlat
    const fadeTimer = setTimeout(() => setFading(true), 3000);
    // Fade tamamlandıktan sonra DOM'dan kaldır (500ms)
    const hideTimer = setTimeout(() => setVisible(false), 3500);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      style={{
        position:   'fixed',
        inset:       0,
        zIndex:      99999,
        transition: 'opacity 500ms ease',
        opacity:     fading ? 0 : 1,
        pointerEvents: fading ? 'none' : 'auto',
      }}
    >
      <GoatLoader />
    </div>
  );
}
