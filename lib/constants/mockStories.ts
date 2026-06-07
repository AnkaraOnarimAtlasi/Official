import type { Story } from '@/lib/types';

/**
 * Taslak hikâye verileri — editoryal içerik hazırlanacak.
 * Gerçek usta isimleri veya kişisel hikâyeler kullanılmamıştır.
 */
export const MOCK_STORIES: Story[] = [
  {
    slug: 'usta-portesi-taslak-01',
    title: 'Bir Mücellidin Günlüğü (Taslak)',
    excerpt:
      "Ankara'nın son mücellitlerinden birinin atölyesine kısa bir bakış.",
    body: 'Saha doğrulaması bekleniyor — editoryal içerik hazırlanacak.',
    storyType: 'master-portrait',
    layerSlug: 'kagit-sanati',
    stopSlug: 'kagit-sanati-durak-01',
    heroImage: null,
    publishedAt: null,
    isFeatured: true,
    isPublished: false,
    readingTimeMinutes: 5,
  },
  {
    slug: 'nesne-hikayesi-taslak-01',
    title: 'Dedesinin Saati (Taslak)',
    excerpt:
      'Üç kuşak geçiren bir cep saatinin onarım serüveni.',
    body: 'Saha doğrulaması bekleniyor — editoryal içerik hazırlanacak.',
    storyType: 'object-story',
    layerSlug: 'nesneyi-onaranlar',
    stopSlug: 'nesneyi-onaranlar-durak-01',
    heroImage: null,
    publishedAt: null,
    isFeatured: false,
    isPublished: false,
    readingTimeMinutes: 4,
  },
  {
    slug: 'saha-guncesi-taslak-01',
    title: 'Samanpazarı Saha Notları (Taslak)',
    excerpt:
      'Geleneksel el sanatları katmanı için yapılan ilk saha ziyaretinin notları.',
    body: 'Saha doğrulaması bekleniyor — editoryal içerik hazırlanacak.',
    storyType: 'field-journal',
    layerSlug: 'geleneksel-el-sanatlari',
    stopSlug: null,
    heroImage: null,
    publishedAt: null,
    isFeatured: false,
    isPublished: false,
    readingTimeMinutes: 3,
  },
];

/** Slug'a göre hikâye bulur. */
export const storyBySlug = (slug: string): Story | undefined =>
  MOCK_STORIES.find((s) => s.slug === slug);
