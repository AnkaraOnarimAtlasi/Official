export type LayerColorKey =
  | 'paper-arts'
  | 'object-repair'
  | 'traditional-crafts'
  | 'metal-wood'
  | 'memory-repair';

export interface Layer {
  number: string;
  slug: string;
  title: string;
  shortTitle: string;
  subtitle: string;
  crafts: string[];
  colorKey: LayerColorKey;
  colorHex: string;
  description: string;
  sensoryTheme: string;
  regions: string[];
  stopCount: number;
  mapImage: string;
}

export interface Stop {
  slug: string;
  name: string;
  craft: string;
  district: string;
  layerSlug: string;
  shortDescription: string;
  visitStatus: 'open' | 'by-appointment' | 'archive-only' | 'unknown';
  permissionConfirmed: boolean;
  isPublished: boolean;
  mapX?: number; // 0-100 percentage
  mapY?: number; // 0-100 percentage
}

/* ─── Phase 2: ek tipler ─── */

export type StoryType =
  | 'master-portrait'
  | 'object-story'
  | 'repair-technique'
  | 'field-journal'
  | 'lost-crafts'
  | 'atlas-update';

export type DistributionCategory =
  | 'university'
  | 'cafe'
  | 'library'
  | 'cultural-center'
  | 'bookstore'
  | 'other';

export type AvailabilityStatus = 'in-stock' | 'low' | 'out-of-stock';

export type ModerationStatus = 'pending' | 'approved' | 'rejected' | 'duplicate';

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Route {
  slug: string;
  layerSlug: string;
  title: string;
  subtitle: string;
  description: string;
  estimatedDurationMinutes: number;
  distanceKm: number;
  startArea: string;
  endArea: string;
  difficulty: Difficulty;
  isFeatured: boolean;
  isPublished: boolean;
  stopSlugs: string[];
}

export interface Story {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  storyType: StoryType;
  layerSlug: string | null;
  stopSlug: string | null;
  heroImage: string | null;
  publishedAt: string | null;
  isFeatured: boolean;
  isPublished: boolean;
  readingTimeMinutes: number;
}

export interface DistributionPoint {
  name: string;
  category: DistributionCategory;
  district: string;
  address: string;
  availabilityStatus: AvailabilityStatus;
  notes: string;
  isPublished: boolean;
}
