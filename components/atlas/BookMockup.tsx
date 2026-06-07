'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';

// Dynamically import WebGL BookCanvas with ssr: false
const BookCanvas = dynamic(() => import('@/components/three/BookCanvas'), {
  ssr: false,
  loading: () => <BookLoading />,
});

function BookLoading() {
  return (
    <div className="relative w-full pb-[75%] h-0 rounded-sm border border-ink/10 bg-paper-light shadow-inner overflow-hidden">
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="archive-label text-ink/30 animate-pulse">Tuval Hazırlanıyor...</span>
      </div>
    </div>
  );
}

// Beautiful 2D Static Cover Fallback
function BookFallback() {
  return (
    <div className="relative w-full pb-[75%] h-0 rounded-sm border border-ink/15 bg-paper shadow-sheet overflow-hidden select-none">
      <div className="absolute inset-0 flex items-center justify-center p-8 bg-[#ebdcb7]/10">
        <div className="relative aspect-[1.39] w-[82%] max-w-[420px] rounded-sm border border-ink/20 shadow-sheet overflow-hidden">
          <Image
            src="/atlas/front-cover.png"
            alt="Ankara Onarım Atlası Ön Kapak"
            fill
            sizes="(min-width: 1024px) 36vw, 50vw"
            className="object-cover"
            priority
          />
        </div>
      </div>
      
      {/* 2D indicator tag */}
      <div className="absolute bottom-3 right-3 pointer-events-none z-10">
        <span className="inline-flex items-center gap-1 rounded-sm bg-paper-light/90 px-2 py-1 text-[0.58rem] uppercase tracking-[0.16em] text-ink/65 backdrop-blur-[1px] border border-ink/10">
          Ön Kapak
        </span>
      </div>
    </div>
  );
}

export function BookMockup() {
  const [webGLSupported, setWebGLSupported] = useState<boolean | null>(null);

  // Check WebGL availability on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const canvas = document.createElement('canvas');
        const support = !!(
          window.WebGL2RenderingContext &&
          (canvas.getContext('webgl2') || canvas.getContext('webgl'))
        );
        setWebGLSupported(support);
      } catch {
        setWebGLSupported(false);
      }
    } else {
      setWebGLSupported(false);
    }
  }, []);

  // While checking WebGL, render loading placeholder
  if (webGLSupported === null) {
    return <BookLoading />;
  }

  // If supported, render interactive 3D book cover, otherwise render 2D static cover
  return webGLSupported ? <BookCanvas /> : <BookFallback />;
}
