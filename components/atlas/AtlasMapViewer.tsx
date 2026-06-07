'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { DrawerSheet } from '@/components/ui/DrawerSheet';
import { DraftBadge } from '@/components/ui/DraftBadge';
import { AtlasButton, AtlasIconArrow } from '@/components/ui/AtlasButton';
import { LAYERS } from '@/lib/constants/layers';
import type { Stop } from '@/lib/types';

// Dynamically import WebGL canvas with ssr: false
const AtlasCanvas = dynamic(() => import('@/components/three/AtlasCanvas'), {
  ssr: false,
  loading: () => (
    <div className="flex w-full h-[65vh] sm:h-[70vh] lg:h-[75vh] items-center justify-center bg-paper-deep/20 rounded-sm border border-ink/10 shadow-inner">
      <span className="archive-label text-ink/30 animate-pulse">Tuval Hazırlanıyor...</span>
    </div>
  ),
});

export function AtlasMapViewer() {
  const [use3D, setUse3D] = useState(true);
  const [webGLSupported, setWebGLSupported] = useState(false);
  const [selectedLayerSlug, setSelectedLayerSlug] = useState<string | null>(null);
  const [selectedStop, setSelectedStop] = useState<Stop | null>(null);

  // Check WebGL support on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const canvas = document.createElement('canvas');
        const support = !!(
          window.WebGL2RenderingContext &&
          (canvas.getContext('webgl2') || canvas.getContext('webgl'))
        );
        setWebGLSupported(support);
        setUse3D(support); // Enable 3D by default if supported
      } catch {
        setWebGLSupported(false);
        setUse3D(false);
      }
    }
  }, []);

  return (
    <div className="space-y-6">
      {/* View Toggle Bar */}
      {webGLSupported && (
        <div className="flex items-center justify-between border-b border-ink/10 pb-4">
          <p className="text-xs text-ink/50 uppercase tracking-[0.14em]">
            Görünüm: <span className="font-semibold text-ink">{use3D ? 'İnteraktif 3D' : 'Statik Haritalar'}</span>
          </p>
          <button
            type="button"
            onClick={() => {
              setUse3D(!use3D);
              setSelectedLayerSlug(null);
            }}
            className="rounded-full border border-ink/20 bg-paper-light px-3 py-1.5 text-xs font-semibold text-ink shadow-paper transition-all hover:bg-paper active:scale-95"
          >
            {use3D ? 'Grid Görünümüne Geç' : '3D Görünümüne Geç'}
          </button>
        </div>
      )}

      {/* 3D Map or 2x2 Grid Falling Back */}
      {use3D && webGLSupported ? (
        <div className="relative">
          {/* Main 3D Canvas */}
          <AtlasCanvas
            selectedLayerSlug={selectedLayerSlug}
            onSelectLayer={setSelectedLayerSlug}
            onSelectStop={setSelectedStop}
          />
          
          {/* Helper caption overlays */}
          {!selectedLayerSlug && (
            <div className="absolute bottom-4 right-4 pointer-events-none z-10 hidden sm:block">
              <div className="rounded-sm border border-ink/15 bg-paper-light/95 px-3 py-2 text-[0.62rem] text-ink/50 shadow-paper max-w-[220px] text-right">
                💡 <strong>İpucu:</strong> Haritayı seçmek için üzerine tıklayın. Çevreyi gözlemlemek için fareyle sürükleyin.
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Static 2x2 Grid View Fallback */
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
          {LAYERS.map((layer) => (
            <Link
              key={layer.slug}
              href={`/atlas/${layer.slug}`}
              className="group relative block aspect-[4/3] overflow-hidden rounded-sm border border-ink/15 shadow-paper transition-shadow duration-300 ease-atlas hover:shadow-sheet focus-visible:outline-2"
              aria-label={`Katman ${layer.number}: ${layer.title} haritasını aç`}
            >
              <Image
                src={layer.mapImage}
                alt={`Katman ${layer.number}: ${layer.title} haritası`}
                fill
                sizes="(min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 ease-atlas group-hover:scale-[1.03]"
              />
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 block h-1.5"
                style={{ backgroundColor: layer.colorHex }}
              />
              <span className="absolute bottom-0 left-0 right-0 flex items-end gap-3 bg-gradient-to-t from-[rgba(26,23,20,0.65)] via-[rgba(26,23,20,0.3)] to-transparent px-5 pb-5 pt-12 md:px-6 md:pb-6">
                <span
                  className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-sm font-semibold text-paper-light md:h-12 md:w-12 md:text-base"
                  style={{ backgroundColor: layer.colorHex }}
                >
                  {layer.number}
                </span>
                <span className="flex flex-col gap-0.5">
                  <span className="font-display text-xl font-semibold leading-tight text-paper-light md:text-2xl">
                    {layer.title}
                  </span>
                  <span className="text-[0.7rem] uppercase tracking-[0.14em] text-paper-light/70">
                    {layer.stopCount} durak · {layer.regions.length} bölge
                  </span>
                </span>
              </span>
            </Link>
          ))}
        </div>
      )}

      {/* Detail sidebar stop information drawer */}
      <DrawerSheet
        isOpen={selectedStop !== null}
        onClose={() => setSelectedStop(null)}
        title={selectedStop?.name || 'Durak Bilgisi'}
      >
        {selectedStop && (
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-paper px-2.5 py-1 text-xs font-semibold text-ink border border-ink/10">
                {selectedStop.district}
              </span>
              <DraftBadge />
            </div>

            <div className="space-y-1">
              <p className="text-[0.65rem] uppercase tracking-[0.14em] text-ink/40">Zanaat / Onarım Türü</p>
              <p className="font-display text-base font-semibold text-ink">{selectedStop.craft}</p>
            </div>

            <div className="space-y-1">
              <p className="text-[0.65rem] uppercase tracking-[0.14em] text-ink/40">Açıklama</p>
              <p className="text-sm leading-relaxed text-ink/75">{selectedStop.shortDescription}</p>
            </div>

            <div className="border-t border-ink/10 pt-4 flex flex-col gap-3 sm:flex-row sm:justify-between items-center">
              <Link
                href={`/atlas/${selectedStop.layerSlug}`}
                className="text-xs font-semibold uppercase tracking-[0.14em] text-ink/65 hover:text-ink hover:underline"
              >
                Katman Haritasını İncele →
              </Link>
              <AtlasButton href="/rotalar" variant="primary">
                Rotayı Gör
                <AtlasIconArrow />
              </AtlasButton>
            </div>
          </div>
        )}
      </DrawerSheet>
    </div>
  );
}
