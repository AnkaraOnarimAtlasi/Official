import type { Route } from '@/lib/types';

/**
 * Taslak rota verileri — her katman için bir örnek rota.
 * Saha doğrulaması bekleniyor; mesafe ve süre tahminîdir.
 */
export const MOCK_ROUTES: Route[] = [
  {
    slug: 'kagit-yolu',
    layerSlug: 'kagit-sanati',
    title: 'Kâğıt Yolu',
    subtitle: 'Mücellitten hattata — kâğıt eksenli zanaat güzergâhı',
    description:
      "Ulus'tan Altındağ'a uzanan bu kısa rota, kâğıt sanatlarının üç farklı yüzünü bir araya getirir. Saha doğrulaması bekleniyor.",
    estimatedDurationMinutes: 90,
    distanceKm: 2.5,
    startArea: 'Ulus',
    endArea: 'Altındağ',
    difficulty: 'easy',
    isFeatured: true,
    isPublished: false,
    stopSlugs: [
      'kagit-sanati-durak-01',
      'kagit-sanati-durak-02',
      'kagit-sanati-durak-03',
    ],
  },
  {
    slug: 'onarim-halkasi',
    layerSlug: 'nesneyi-onaranlar',
    title: 'Onarım Halkası',
    subtitle: "Saat, kasket, deri — Ankara'nın tamir ağı",
    description:
      "Ulus'tan Çayyolu'na uzanan bu güzergâh, nesne onarımı ekseninde farklı zanaatları keşfettirir. Saha doğrulaması bekleniyor.",
    estimatedDurationMinutes: 120,
    distanceKm: 8.0,
    startArea: 'Ulus',
    endArea: 'Çayyolu',
    difficulty: 'medium',
    isFeatured: false,
    isPublished: false,
    stopSlugs: [
      'nesneyi-onaranlar-durak-01',
      'nesneyi-onaranlar-durak-02',
      'nesneyi-onaranlar-durak-03',
    ],
  },
  {
    slug: 'el-sanatlari-rotasi',
    layerSlug: 'geleneksel-el-sanatlari',
    title: 'El Sanatları Rotası',
    subtitle: 'Dokuma, çini, cam — geleneksel üretim yolculuğu',
    description:
      "Hacı Bayram'dan Ayrancı'ya uzanan bu rota, Ankara'nın geleneksel el sanatlarını bir güzergâhta toplar. Saha doğrulaması bekleniyor.",
    estimatedDurationMinutes: 100,
    distanceKm: 4.5,
    startArea: 'Hacı Bayram',
    endArea: 'Ayrancı',
    difficulty: 'easy',
    isFeatured: false,
    isPublished: false,
    stopSlugs: [
      'geleneksel-el-sanatlari-durak-01',
      'geleneksel-el-sanatlari-durak-02',
      'geleneksel-el-sanatlari-durak-03',
    ],
  },
  {
    slug: 'metal-ahsap-guzergahi',
    layerSlug: 'metal-ahsap',
    title: 'Metal – Ahşap Güzergâhı',
    subtitle: 'Bıçak, tesbih, sedef — malzeme ustalarının izi',
    description:
      "Hacı Bayram'dan Gölbaşı'na doğru metal ve ahşap zanaatının örneklerini keşfettiren rota. Saha doğrulaması bekleniyor.",
    estimatedDurationMinutes: 110,
    distanceKm: 12.0,
    startArea: 'Hacı Bayram',
    endArea: 'Gölbaşı',
    difficulty: 'hard',
    isFeatured: false,
    isPublished: false,
    stopSlugs: [
      'metal-ahsap-durak-01',
      'metal-ahsap-durak-02',
      'metal-ahsap-durak-03',
    ],
  },
];

/** Slug'a göre rota bulur. */
export const routeBySlug = (slug: string): Route | undefined =>
  MOCK_ROUTES.find((r) => r.slug === slug);
