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
    <div className="relative w-full aspect-[4/3] rounded-sm border border-ink/10 bg-paper-light shadow-inner overflow-hidden">
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="archive-label text-ink/30 animate-pulse">Tuval Hazırlanıyor...</span>
      </div>
    </div>
  );
}

// Beautiful 2D Static Cover Fallback
function BookFallback({ currentPage, imageUrl }: { currentPage: number; imageUrl: string }) {
  return (
    <div className="relative w-full aspect-[4/3] rounded-sm border border-ink/15 bg-paper shadow-sheet overflow-hidden select-none">
      <div className="absolute inset-0 flex items-center justify-center p-8 bg-[#ebdcb7]/10">
        <div className="relative aspect-[1.39] w-[82%] max-w-[420px] rounded-sm border border-ink/20 shadow-sheet overflow-hidden">
          <Image
            src={imageUrl}
            alt="Ankara Onarım Atlası Sayfa Görseli"
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
          {currentPage === 0 ? 'Ön Kapak' : currentPage === 6 ? 'Arka Kapak' : `Harita ${currentPage}`}
        </span>
      </div>
    </div>
  );
}

export function BookMockup() {
  const [webGLSupported, setWebGLSupported] = useState<boolean | null>(null);
  const [currentPage, setCurrentPage] = useState(0);

  const pageNames = [
    'Ön Kapak',
    'Harita 1: Kağıt Sanatı',
    'Harita 2: Nesneyi Onaranlar',
    'Harita 3: Geleneksel El Sanatları',
    'Harita 4: Metal ve Ahşap',
    'Harita 5: Hafızayı Onaranlar',
    'Arka Kapak',
  ];

  const pageImages = [
    '/atlas/front-cover.webp',
    '/atlas/source/katman-01-kagit-sanati.jpeg',
    '/atlas/source/katman-02-nesneyi-onaranlar.jpeg',
    '/atlas/source/katman-03-geleneksel-el-sanatlari.jpeg',
    '/atlas/source/katman-04-metal-ahsap.jpeg',
    '/atlas/source/katman-05-hafizayi-onaranlar.jpeg',
    '/atlas/back-cover.webp',
  ];

  // Check WebGL availability on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const canvas = document.createElement('canvas');
        const support = !!(
          (window.WebGLRenderingContext || (window as any).WebGL2RenderingContext) &&
          (canvas.getContext('webgl') || canvas.getContext('experimental-webgl') || canvas.getContext('webgl2'))
        );
        setWebGLSupported(support);
      } catch {
        setWebGLSupported(false);
      }
    } else {
      setWebGLSupported(false);
    }
  }, []);

  const handlePrev = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : pageNames.length - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev < pageNames.length - 1 ? prev + 1 : 0));
  };

  // While checking WebGL, render loading placeholder
  if (webGLSupported === null) {
    return <BookLoading />;
  }

  // If supported, render interactive 3D book cover, otherwise render 2D static cover
  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Interactive 3D or 2D Mockup */}
      {webGLSupported ? (
        <BookCanvas currentPage={currentPage} onFlipPage={handleNext} />
      ) : (
        <BookFallback currentPage={currentPage} imageUrl={pageImages[currentPage]} />
      )}

      {/* Navigation Controls */}
      <div className="flex items-center justify-between gap-4 rounded-sm border border-ink/15 bg-paper-light px-4 py-3 shadow-paper">
        <button
          onClick={handlePrev}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/10 hover:border-ink/20 bg-paper hover:bg-paper-deep text-ink/75 transition-colors"
          aria-label="Önceki Sayfa"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="text-center flex-1">
          <span className="archive-label text-[0.62rem] text-ink/45 block tracking-[0.2em] uppercase">
            Sayfa {currentPage + 1} / {pageNames.length}
          </span>
          <span className="font-display text-sm font-semibold text-ink mt-0.5 block tracking-editorial">
            {pageNames[currentPage]}
          </span>
        </div>

        <button
          onClick={handleNext}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/10 hover:border-ink/20 bg-paper hover:bg-paper-deep text-ink/75 transition-colors"
          aria-label="Sonraki Sayfa"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
