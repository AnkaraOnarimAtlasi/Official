'use client';

import { useEffect, useRef } from 'react';
import type { MapStop } from '@/lib/constants/mapStops';

import 'leaflet/dist/leaflet.css';

interface Props {
  stops: MapStop[];
  colorHex: string;
  layerNumber: string;
}

export default function AtlasLiveMap({ stops, colorHex, layerNumber }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef       = useRef<import('leaflet').Map | null>(null);

  /*
   * Component uses key={layer.slug} in parent — it fully unmounts/remounts on
   * each layer change. So one effect handles everything: init + markers.
   * No race condition: stops/colorHex are captured via closure at mount time.
   */
  useEffect(() => {
    if (!containerRef.current) return;
    let mounted = true;

    import('leaflet').then((L) => {
      if (!mounted || !containerRef.current) return;

      const map = L.map(containerRef.current!, {
        center:    [39.9199, 32.8543],
        zoom:      13,
        zoomControl: false,
        attributionControl: false,
      });

      L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
        { subdomains: 'abcd', maxZoom: 19 }
      ).addTo(map);

      L.control.attribution({ prefix: false, position: 'bottomright' })
        .addAttribution('© <a href="https://carto.com">CARTO</a> · © <a href="https://openstreetmap.org">OSM</a>')
        .addTo(map);

      L.control.zoom({ position: 'bottomleft' }).addTo(map);

      mapRef.current = map;

      if (stops.length === 0) return;

      const visitLabel: Record<string, string> = {
        open:        '🟢 Açık · Ziyaret Edilebilir',
        appointment: '🟡 Randevuyla',
        archive:     '⚪ Yalnızca Arşiv',
      };

      stops.forEach((stop, idx) => {
        const svgIcon = L.divIcon({
          className: '',
          iconSize:  [36, 44],
          iconAnchor: [18, 44],
          popupAnchor: [0, -48],
          html: `<div style="
              position:relative;width:36px;height:44px;
              filter:drop-shadow(0 3px 6px rgba(0,0,0,0.22));
            ">
            <svg viewBox="0 0 36 44" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 2C10.268 2 4 8.268 4 16c0 10.5 14 26 14 26S32 26.5 32 16C32 8.268 25.732 2 18 2z"
                fill="${colorHex}" stroke="white" stroke-width="2"/>
              <circle cx="18" cy="16" r="6.5" fill="white"/>
              <text x="18" y="20.5" text-anchor="middle"
                font-family="Georgia,serif" font-size="7.5" font-weight="700"
                fill="${colorHex}">${String(idx + 1).padStart(2, '0')}</text>
            </svg>
          </div>`,
        });

        const popup = L.popup({
          maxWidth: 260,
          className: `atlas-popup-${layerNumber}`,
          offset: [0, -8],
        }).setContent(`
          <div style="font-family:system-ui,sans-serif;padding:2px 0">
            <div style="font-size:.6rem;text-transform:uppercase;letter-spacing:.18em;color:${colorHex};margin-bottom:4px">
              Harita ${layerNumber} · ${stop.craft}
            </div>
            <div style="font-size:1rem;font-weight:700;color:#141414;line-height:1.2;margin-bottom:6px">
              ${stop.name}
            </div>
            <div style="font-size:.75rem;color:#555;line-height:1.4;margin-bottom:8px">
              ${stop.address}
            </div>
            <div style="font-size:.7rem;color:#444">${visitLabel[stop.visit] ?? stop.visit}</div>
          </div>
        `);

        L.marker([stop.lat, stop.lng], { icon: svgIcon })
          .bindPopup(popup)
          .addTo(map);
      });

      if (stops.length === 1) {
        map.setView([stops[0].lat, stops[0].lng], 15, { animate: false });
      } else {
        const bounds = L.latLngBounds(stops.map((s) => [s.lat, s.lng]));
        map.fitBounds(bounds, { padding: [48, 48], animate: false, maxZoom: 15 });
      }
    });

    return () => {
      mounted = false;
      mapRef.current?.remove();
      mapRef.current = null;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div ref={containerRef} className="h-full w-full" />

      <style>{`
        .atlas-popup-${layerNumber} .leaflet-popup-content-wrapper {
          border-radius: 12px;
          border: 1px solid color-mix(in srgb, ${colorHex} 30%, rgba(20,20,20,.10));
          box-shadow: 0 8px 32px -8px color-mix(in srgb, ${colorHex} 25%, transparent),
                      0 2px 8px rgba(20,20,20,.08);
          padding: 14px 16px;
        }
        .atlas-popup-${layerNumber} .leaflet-popup-content { margin: 0; }
        .atlas-popup-${layerNumber} .leaflet-popup-tip { background: white; }
        .atlas-popup-${layerNumber} .leaflet-popup-close-button {
          color: rgba(20,20,20,.35); font-size: 16px; top: 8px; right: 10px;
        }
      `}</style>
    </>
  );
}
