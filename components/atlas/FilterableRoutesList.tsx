'use client';

import { useState } from 'react';
import { FilterChip } from '@/components/ui/FilterChip';
import { EditorialCard } from '@/components/ui/EditorialCard';
import type { Route, Layer } from '@/lib/types';

interface FilterableRoutesListProps {
  routes: Route[];
  layers: Layer[];
}

export function FilterableRoutesList({ routes, layers }: FilterableRoutesListProps) {
  const [selectedLayer, setSelectedLayer] = useState<string | null>(null);

  const filteredRoutes = selectedLayer
    ? routes.filter((r) => r.layerSlug === selectedLayer)
    : routes;

  return (
    <div className="space-y-10">
      {/* Filter chips */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <FilterChip
          label="Tümü"
          isActive={selectedLayer === null}
          onClick={() => setSelectedLayer(null)}
        />
        {layers.map((layer) => (
          <FilterChip
            key={layer.slug}
            label={layer.shortTitle}
            isActive={selectedLayer === layer.slug}
            onClick={() => setSelectedLayer(layer.slug)}
            color={layer.colorHex}
          />
        ))}
      </div>

      {/* Routes Grid */}
      {filteredRoutes.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {filteredRoutes.map((route) => {
            const layer = layers.find((l) => l.slug === route.layerSlug);
            const difficultyLabel =
              route.difficulty === 'easy'
                ? 'Kolay'
                : route.difficulty === 'medium'
                  ? 'Orta'
                  : 'Zor';

            return (
              <EditorialCard
                key={route.slug}
                href={`/rotalar/${route.slug}`}
                image={layer?.mapImage}
                imageAlt={`${route.title} haritası`}
                eyebrow={layer?.title}
                eyebrowColor={layer?.colorHex}
                title={route.title}
                subtitle={route.subtitle}
                description={route.description}
                meta={`${route.distanceKm} km · ${route.estimatedDurationMinutes} dk · ${difficultyLabel}`}
                ctaLabel="Güzergâhı Gör"
                isDraft={!route.isPublished}
              />
            );
          })}
        </div>
      ) : (
        <div className="rounded-sm border border-ink/15 bg-paper-light p-8 text-center shadow-paper">
          <p className="text-ink/60">Bu katmanda henüz rota tanımlanmamış.</p>
        </div>
      )}
    </div>
  );
}
