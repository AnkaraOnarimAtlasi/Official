'use client';

import dynamic from 'next/dynamic';

const BookCanvas = dynamic(() => import('@/components/three/BookCanvas'), {
  ssr: false,
  loading: () => (
    <div className="flex w-full aspect-[4/3] items-center justify-center bg-paper-light rounded-sm border border-ink/10 shadow-inner">
      <span className="archive-label text-ink/30 animate-pulse">Tuval Hazırlanıyor...</span>
    </div>
  ),
});

export function BookMockup() {
  return <BookCanvas />;
}
