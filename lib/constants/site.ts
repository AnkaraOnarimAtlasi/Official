export const SITE = {
  name: 'Ankara Onarım Atlası',
  tagline:
    'Şehir sadece inşa edilen değil, onarılarak sürdürülen bir sistemdir.',
  description:
    'Ankara’nın görünmeyen onarım ağlarını, ustalarını ve zanaatlarını katmanlı haritalar üzerinden keşfet. Bir katman seç, ustalarla tanış, nesnelerin hikâyesini sürdür.',
  url: 'https://onarimatlasi.example',
  locale: 'tr-TR',
  primaryNav: [
    { href: '/atlas', label: 'Atlas' },
    { href: '/rotalar', label: 'Rotalar' },
    { href: '/hikayeler', label: 'Hikâyeler' },
    { href: '/atlas-edinin', label: 'Atlası Edin' },
    { href: '/katki-sagla', label: 'Katkı Sağla' },
    { href: '/proje', label: 'Proje' },
  ],
} as const;

export const MOBILE_DOCK = [
  { href: '/atlas', label: 'Keşfet' },
  { href: '/atlas#harita', label: 'Harita' },
  { href: '/katki-sagla', label: 'Öner' },
] as const;
