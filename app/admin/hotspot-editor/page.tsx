'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { LAYERS } from '@/lib/constants/layers';
import { MOCK_STOPS } from '@/lib/constants/mockStops';
import type { Stop } from '@/lib/types';

export default function AdminHotspotEditorPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [selectedLayerSlug, setSelectedLayerSlug] = useState('kagit-sanati');
  const [stops, setStops] = useState<Stop[]>(MOCK_STOPS);
  const [selectedStopSlug, setSelectedStopSlug] = useState('');
  
  const [mapX, setMapX] = useState<number | null>(null);
  const [mapY, setMapY] = useState<number | null>(null);
  const [message, setMessage] = useState('');
  
  const mapRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const session = localStorage.getItem('adminSession');
    if (session !== 'active') {
      router.push('/admin/giris');
    } else {
      setAuthenticated(true);
    }
  }, [router]);

  const activeLayer = LAYERS.find((l) => l.slug === selectedLayerSlug);
  const filteredStops = stops.filter((s) => s.layerSlug === selectedLayerSlug);

  // When selected stop changes, populate coordinates
  const handleStopChange = (slug: string) => {
    setSelectedStopSlug(slug);
    const stop = stops.find((s) => s.slug === slug);
    if (stop && stop.mapX !== undefined && stop.mapY !== undefined) {
      setMapX(stop.mapX);
      setMapY(stop.mapY);
    } else {
      setMapX(null);
      setMapY(null);
    }
    setMessage('');
  };

  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!selectedStopSlug) {
      setMessage('Lütfen koordinat atamak için önce bir durak seçin.');
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    // Round to 1 decimal place
    setMapX(Math.round(x * 10) / 10);
    setMapY(Math.round(y * 10) / 10);
    setMessage('');
  };

  const handleSave = () => {
    if (!selectedStopSlug || mapX === null || mapY === null) return;

    setStops((prev) =>
      prev.map((s) =>
        s.slug === selectedStopSlug ? { ...s, mapX, mapY } : s
      )
    );
    
    // In a real DB we would call a Supabase update.
    // For now we simulate write success
    setMessage('Koordinatlar başarıyla kaydedildi! 3D haritada güncellendi.');
  };

  const handleLogout = () => {
    localStorage.removeItem('adminSession');
    router.push('/admin/giris');
  };

  if (!authenticated) {
    return (
      <div className="flex h-[80vh] items-center justify-center bg-paper">
        <span className="archive-label text-ink/30 animate-pulse">Doğrulanıyor...</span>
      </div>
    );
  }

  return (
    <article className="paper-grain min-h-screen py-8 md:py-12">
      <div className="mx-auto max-w-layout px-5 md:px-8">
        
        {/* Admin Navigation Header */}
        <div className="flex flex-col gap-4 border-b border-ink/10 pb-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <span className="archive-label text-ink/50">Küratör Paneli</span>
            <h1 className="font-display text-2xl font-semibold tracking-editorial text-ink md:text-3xl">
              Hotspot Koordinat Editörü
            </h1>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/admin/oneriler"
              className="rounded-sm border border-ink/15 bg-paper-light px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-ink hover:bg-paper"
            >
              Öneriler
            </Link>
            <Link
              href="/admin/hotspot-editor"
              className="rounded-sm border border-ink bg-ink px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-paper-light"
            >
              Hotspot Editörü
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-sm border border-[--atlas-red-deep]/20 bg-paper-light px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[--atlas-red-deep] hover:bg-[--atlas-red-deep]/5"
            >
              Güvenli Çıkış
            </button>
          </div>
        </div>

        {/* Editor workspace split */}
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_2fr] items-start">
          
          {/* Left panel: selection & inputs */}
          <div className="rounded-sm border border-ink/15 bg-paper-light p-6 shadow-paper space-y-6">
            <h2 className="font-display text-lg font-semibold text-ink">
              Durak & Katman Seçin
            </h2>

            <div className="space-y-4">
              {/* Select Layer */}
              <div className="space-y-1.5">
                <label className="archive-label text-ink/50 text-[0.65rem]">1. Katman Seçin</label>
                <select
                  value={selectedLayerSlug}
                  onChange={(e) => {
                    setSelectedLayerSlug(e.target.value);
                    setSelectedStopSlug('');
                    setMapX(null);
                    setMapY(null);
                    setMessage('');
                  }}
                  className="w-full rounded-sm border border-ink/15 bg-paper px-3 py-2 text-sm text-ink outline-none"
                >
                  {LAYERS.map((layer) => (
                    <option key={layer.slug} value={layer.slug}>
                      {layer.title} (Katman {layer.number})
                    </option>
                  ))}
                </select>
              </div>

              {/* Select Stop */}
              <div className="space-y-1.5">
                <label className="archive-label text-ink/50 text-[0.65rem]">2. Onarım Durağı Seçin</label>
                <select
                  value={selectedStopSlug}
                  onChange={(e) => handleStopChange(e.target.value)}
                  className="w-full rounded-sm border border-ink/15 bg-paper px-3 py-2 text-sm text-ink outline-none"
                >
                  <option value="">-- Durak Seçin --</option>
                  {filteredStops.map((stop) => (
                    <option key={stop.slug} value={stop.slug}>
                      {stop.name} ({stop.craft})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Coordinates indicator display */}
            <div className="border-t border-ink/10 pt-4 space-y-3">
              <h3 className="archive-label text-ink/50">Koordinat Değerleri</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-sm bg-paper p-3 text-center border border-ink/5">
                  <p className="text-[0.6rem] uppercase tracking-[0.14em] text-ink/40">X Koordinatı (left)</p>
                  <p className="font-display text-lg font-semibold text-ink mt-0.5">
                    {mapX !== null ? `%${mapX}` : '--'}
                  </p>
                </div>
                <div className="rounded-sm bg-paper p-3 text-center border border-ink/5">
                  <p className="text-[0.6rem] uppercase tracking-[0.14em] text-ink/40">Y Koordinatı (top)</p>
                  <p className="font-display text-lg font-semibold text-ink mt-0.5">
                    {mapY !== null ? `%${mapY}` : '--'}
                  </p>
                </div>
              </div>

              {message && (
                <div className="rounded-sm border border-emerald-100 bg-emerald-50/50 p-3 text-center text-xs text-emerald-800 font-medium">
                  {message}
                </div>
              )}

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={!selectedStopSlug || mapX === null || mapY === null}
                  className="w-full rounded-sm border border-ink bg-ink py-2.5 text-center text-xs font-semibold uppercase tracking-[0.14em] text-paper-light hover:bg-[--atlas-red-deep] hover:border-[--atlas-red-deep] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  Koordinatları Kaydet
                </button>
              </div>
            </div>
          </div>

          {/* Right panel: interactive map preview clicker */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold text-ink">
                Görsel Konumlandırma Haritası
              </h2>
              <span className="text-[0.65rem] uppercase tracking-[0.12em] text-ink/40">
                Katman Haritası Önizleme
              </span>
            </div>

            {activeLayer && (
              <div
                ref={mapRef}
                onClick={handleMapClick}
                className="group relative aspect-[4/3] w-full cursor-crosshair overflow-hidden rounded-sm border border-ink/15 shadow-paper bg-paper-deep"
              >
                <Image
                  src={activeLayer.mapImage}
                  alt={`${activeLayer.title} haritası`}
                  fill
                  sizes="(min-width: 1024px) 66vw, 100vw"
                  className="object-cover pointer-events-none select-none"
                  priority
                />
                
                {/* Colored top band */}
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 block h-1"
                  style={{ backgroundColor: activeLayer.colorHex }}
                />

                {/* Hotspot indicator dot overlay */}
                {mapX !== null && mapY !== null && (
                  <div
                    className="absolute flex h-5 w-5 -translate-x-1/2 -translate-y-1/2 items-center justify-center pointer-events-none z-10"
                    style={{ left: `${mapX}%`, top: `${mapY}%` }}
                  >
                    <span className="absolute h-5 w-5 animate-ping rounded-full opacity-60" style={{ backgroundColor: activeLayer.colorHex }} />
                    <span className="relative h-3 w-3 rounded-full border border-paper-light shadow-paper" style={{ backgroundColor: activeLayer.colorHex }} />
                  </div>
                )}
                
                {/* Fallback tooltip when not selecting stop */}
                {!selectedStopSlug && (
                  <div className="absolute inset-0 bg-ink/50 backdrop-blur-[2px] flex items-center justify-center text-center p-6 transition-all duration-300">
                    <p className="text-paper-light max-w-xs font-display text-base leading-relaxed">
                      Lütfen harita üzerinde konumlandırmaya başlamak için sol taraftan bir durak seçin.
                    </p>
                  </div>
                )}
              </div>
            )}
            
            <p className="text-xs text-ink/40 leading-relaxed text-center">
              💡 Harita üzerinde tıklayarak usta durağının yerini seçin. Pin konumu yüzde oranlarıyla anında hesaplanacaktır.
            </p>
          </div>

        </div>

      </div>
    </article>
  );
}
