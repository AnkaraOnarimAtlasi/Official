'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense, useState } from 'react';
import { PaperSheetMesh } from './PaperSheetMesh';
import { CameraRig } from './CameraRig';
import { SceneLoader } from './SceneLoader';
import { LAYERS } from '@/lib/constants/layers';
import { MOCK_STOPS } from '@/lib/constants/mockStops';
import type { Stop } from '@/lib/types';

interface AtlasCanvasProps {
  selectedLayerSlug: string | null;
  onSelectLayer: (slug: string | null) => void;
  onSelectStop: (stop: Stop) => void;
}

// Fixed vertical stacking layout for the 4 physical sheets
const LAYER_POSITIONS: Record<string, number> = {
  'kagit-sanati': 1.0,
  'nesneyi-onaranlar': 0.35,
  'geleneksel-el-sanatlari': -0.3,
  'metal-ahsap': -0.95,
};

export default function AtlasCanvas({
  selectedLayerSlug,
  onSelectLayer,
  onSelectStop,
}: AtlasCanvasProps) {
  const [loaderComplete, setLoaderComplete] = useState(false);

  // Group stops by their layer slugs
  const stopsByLayer = (layerSlug: string) => {
    return MOCK_STOPS.filter((stop) => stop.layerSlug === layerSlug);
  };

  return (
    <div className="relative w-full h-[65vh] sm:h-[70vh] lg:h-[75vh] bg-paper-deep/20 rounded-sm border border-ink/10 overflow-hidden shadow-inner">
      {/* Editorial overlay loading screen */}
      <SceneLoader onComplete={() => setLoaderComplete(true)} />

      {/* WebGL Canvas */}
      <Canvas
        shadows
        camera={{ position: [0, 5, 8], fov: 42 }}
        className="w-full h-full bg-[#ebdcb7]/30"
        onPointerDown={(e) => {
          // Reset view if user clicks on the empty space (background)
          if (e.target === e.currentTarget) {
            onSelectLayer(null);
          }
        }}
      >
        {/* Soft scene lighting */}
        <ambientLight intensity={1.1} />
        
        {/* Desk reading lamp light casting soft shadows */}
        <directionalLight
          position={[5, 10, 3]}
          intensity={1.5}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-bias={-0.0001}
        />
        
        {/* Soft fill light */}
        <directionalLight position={[-5, 3, -2]} intensity={0.4} />

        <Suspense fallback={null}>
          <group position={[0, -0.2, 0]}>
            {/* The 4 stacked paper layers */}
            {LAYERS.map((layer) => (
              <PaperSheetMesh
                key={layer.slug}
                layer={layer}
                baseY={LAYER_POSITIONS[layer.slug] ?? 0}
                selectedLayerSlug={selectedLayerSlug}
                onSelect={(slug) => onSelectLayer(slug)}
                stops={stopsByLayer(layer.slug)}
                onSelectStop={onSelectStop}
              />
            ))}
          </group>
          
          {/* Smooth camera interpolation rig */}
          <CameraRig
            selectedLayerSlug={selectedLayerSlug}
            layerPositions={LAYER_POSITIONS}
          />
        </Suspense>
      </Canvas>

      {/* Double click instruction watermark */}
      {selectedLayerSlug && loaderComplete && (
        <div className="absolute top-4 left-4 z-10 pointer-events-none animate-fade-in">
          <button
            type="button"
            className="pointer-events-auto rounded-sm border border-ink/15 bg-paper-light px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-ink/60 shadow-paper hover:bg-paper active:scale-95 transition-all"
            onClick={() => onSelectLayer(null)}
          >
            ← Masa Düzenine Dön
          </button>
        </div>
      )}
    </div>
  );
}
