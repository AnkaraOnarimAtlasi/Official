import type { DistributionPoint } from '@/lib/types';

/**
 * Taslak dağıtım noktaları — pilot henüz başlamadı.
 * Tüm noktalar out-of-stock ve isPublished: false olarak işaretlenmiştir.
 */
export const MOCK_DISTRIBUTION: DistributionPoint[] = [
  {
    name: 'CerModern',
    category: 'cultural-center',
    district: 'Çankaya',
    address: 'Altınsoy Cd. No:3, 06520 Çankaya/Ankara',
    availabilityStatus: 'out-of-stock',
    notes: 'Pilot henüz başlamadı — ön görüşme planlanıyor.',
    isPublished: false,
  },
  {
    name: 'ODTÜ Kütüphanesi',
    category: 'university',
    district: 'Çankaya',
    address: 'ODTÜ Kampüsü, Üniversiteler Mah., 06800 Çankaya/Ankara',
    availabilityStatus: 'out-of-stock',
    notes: 'Pilot henüz başlamadı — kampüs erişim izni gerekiyor.',
    isPublished: false,
  },
  {
    name: 'Hacettepe Güzel Sanatlar',
    category: 'university',
    district: 'Altındağ',
    address: 'Hacettepe Üniversitesi Beytepe Kampüsü, Güzel Sanatlar Fakültesi',
    availabilityStatus: 'out-of-stock',
    notes: 'Pilot henüz başlamadı — fakülte yönetimiyle iletişime geçilecek.',
    isPublished: false,
  },
  {
    name: 'CSO Ada Ankara',
    category: 'cultural-center',
    district: 'Çankaya',
    address: 'Opera Meydanı, Atatürk Bulvarı, 06100 Çankaya/Ankara',
    availabilityStatus: 'out-of-stock',
    notes: 'Pilot henüz başlamadı — fuaye alanı için ön onay bekleniyor.',
    isPublished: false,
  },
  {
    name: 'Yüzen Kuzu',
    category: 'cafe',
    district: 'Çankaya',
    address: 'Güvenevler, Yeşilyurt Sk. 33/A, 06690 Çankaya/Ankara',
    availabilityStatus: 'out-of-stock',
    notes: 'Pilot henüz başlamadı.',
    isPublished: false,
  },
  {
    name: 'Dost Kitabevi',
    category: 'bookstore',
    district: 'Çankaya',
    address: 'Kızılay, Karanfil Sk. No:11, 06420 Çankaya/Ankara',
    availabilityStatus: 'out-of-stock',
    notes: 'Pilot henüz başlamadı.',
    isPublished: false,
  },
];
