'use client';

import { useState } from 'react';
import { Html } from '@react-three/drei';
import { cn } from '@/lib/utils/cn';
import type { Stop } from '@/lib/types';

interface HotspotMarkerProps {
  stop: Stop;
  position: [number, number, number];
  onClick: () => void;
  layerColor: string;
}

export function HotspotMarker({ stop, position, onClick, layerColor }: HotspotMarkerProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <group position={position}>
      <Html
        distanceFactor={4.5} // Scale size with camera distance
        center
        zIndexRange={[10, 20]}
      >
        <div
          className="relative flex items-center justify-center"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Pulsing ring */}
          <span
            className="absolute h-6 w-6 animate-ping rounded-full opacity-60"
            style={{ backgroundColor: layerColor }}
          />

          {/* Core clickable marker dot */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
            className="group relative flex h-4.5 w-4.5 items-center justify-center rounded-full border border-paper-light bg-paper shadow-paper transition-all duration-200 hover:scale-110 active:scale-95 focus:outline-none"
            aria-label={`${stop.name} durağını görüntüle`}
          >
            <span
              className="h-2 w-2 rounded-full transition-transform duration-200 group-hover:scale-125"
              style={{ backgroundColor: layerColor }}
            />
          </button>

          {/* Minimalist tooltip */}
          <div
            className={cn(
              'absolute bottom-full mb-2.5 left-1/2 -translate-x-1/2 pointer-events-none transition-all duration-200 ease-atlas origin-bottom whitespace-nowrap bg-paper-light border border-ink/15 rounded-sm p-3 shadow-sheet text-center z-50',
              hovered ? 'scale-100 opacity-100 translate-y-0' : 'scale-90 opacity-0 translate-y-1'
            )}
          >
            <span className="font-display text-xs font-semibold text-ink block">
              {stop.name}
            </span>
            <span className="archive-label text-[0.6rem] text-ink/50 tracking-[0.14em] block mt-0.5">
              {stop.craft} · {stop.district}
            </span>
            {/* Tooltip arrow */}
            <span className="absolute top-full left-1/2 -translate-x-1/2 border-x-4 border-t-4 border-x-transparent border-t-ink/15" />
            <span className="absolute top-[calc(full-1px)] left-1/2 -translate-x-1/2 border-x-[3px] border-t-[3px] border-x-transparent border-t-paper-light" />
          </div>
        </div>
      </Html>
    </group>
  );
}
