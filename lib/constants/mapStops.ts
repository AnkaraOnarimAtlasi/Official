/**
 * Fiziksel pafta haritalarından okunan gerçek durak verileri.
 * Koordinatlar yaklaşık — saha doğrulaması gerekir.
 * Adres bilgileri pafta görsellerinden çekilmiştir.
 */

export interface MapStop {
  id: string;
  name: string;
  craft: string;
  address: string;
  district: string;
  layerSlug: string;
  lat: number;
  lng: number;
  visit: 'open' | 'appointment' | 'archive';
}

export const MAP_STOPS: MapStop[] = [
  /* ── Katman 01: Kağıt Sanatı ─────────────────────────── */
  {
    id: 'mustafa-ozcan-kaligrafi',
    name: 'Mustafa Özcan Kaligrafi Atölyesi',
    craft: 'Hat (kaligrafi)',
    address: 'Tanış Sk. No:1/11, 06230 Altındağ',
    district: 'Hamamönü',
    layerSlug: 'kagit-sanati',
    lat: 39.9410,
    lng: 32.8508,
    visit: 'appointment',
  },
  {
    id: 'emine-susoy-tezhip',
    name: 'Emine Süsoy Tezhip Atölyesi',
    craft: 'Tezhip',
    address: 'Ulucami Sanat Sokağı No:3, Altındağ',
    district: 'Ulus',
    layerSlug: 'kagit-sanati',
    lat: 39.9425,
    lng: 32.8515,
    visit: 'appointment',
  },
  {
    id: 'dost-kitapevi',
    name: 'Dost Kitapevi',
    craft: 'Kitap / kırtasiye',
    address: 'Kızılay',
    district: 'Kızılay',
    layerSlug: 'kagit-sanati',
    lat: 39.9202,
    lng: 32.8537,
    visit: 'open',
  },
  {
    id: 'mucellit-mehmet-karsli',
    name: 'Mücellit Mehmet Karslı',
    craft: 'Mücellit (cilt sanatı)',
    address: 'Adilhan Çarşısı, Kızılay',
    district: 'Kızılay',
    layerSlug: 'kagit-sanati',
    lat: 39.9190,
    lng: 32.8530,
    visit: 'open',
  },

  /* ── Katman 02: Nesneyi Onaranlar ────────────────────── */
  {
    id: 'ali-bozdag-kasket',
    name: 'Ali Bozdağ — Bozdağ Kasket',
    craft: 'Şapka yapımı & onarımı',
    address: 'Kale İçi, Ankara',
    district: 'Kale İçi',
    layerSlug: 'nesneyi-onaranlar',
    lat: 39.9455,
    lng: 32.8625,
    visit: 'open',
  },
  {
    id: 'murat-ates-derihane',
    name: 'Murat Ateş — Derihane',
    craft: 'Deri işleme & onarım',
    address: 'Kale İçi, Ankara',
    district: 'Kale İçi',
    layerSlug: 'nesneyi-onaranlar',
    lat: 39.9448,
    lng: 32.8618,
    visit: 'open',
  },
  {
    id: 'ahmet-parlato-tulum',
    name: 'Ahmet Parlato — Tulum Yapımı',
    craft: 'Deri işçiliği',
    address: 'Ulus Sanayi Caddesi, Ulus',
    district: 'Ulus',
    layerSlug: 'nesneyi-onaranlar',
    lat: 39.9360,
    lng: 32.8510,
    visit: 'appointment',
  },
  {
    id: 'ismail-saritas-kok',
    name: 'İsmail Sarıtaş',
    craft: 'Tamir atölyesi',
    address: 'Kök Çarşısı, Müşaviriyeti Cad., Kızılay',
    district: 'Kızılay',
    layerSlug: 'nesneyi-onaranlar',
    lat: 39.9195,
    lng: 32.8550,
    visit: 'open',
  },

  /* ── Katman 03: Geleneksel El Sanatları ──────────────── */
  {
    id: 'raziye-basegmez-hali',
    name: 'Raziye Başeğmez',
    craft: 'Halı dokuma',
    address: 'Ulucane Sanat Sokağı',
    district: 'Hacı Bayram',
    layerSlug: 'geleneksel-el-sanatlari',
    lat: 39.9422,
    lng: 32.8518,
    visit: 'appointment',
  },
  {
    id: 'kadizade-samanpazari',
    name: 'Kadızade Samanpazarı',
    craft: 'Hasır-söğüt sanatı',
    address: 'Samanpazarı',
    district: 'Samanpazarı',
    layerSlug: 'geleneksel-el-sanatlari',
    lat: 39.9388,
    lng: 32.8535,
    visit: 'open',
  },
  {
    id: 'menekse-bilgic-cam',
    name: 'Menekşe Bilgiç',
    craft: 'Cam atölyesi',
    address: 'Sakarya, Fener Sk. No:1, Altındağ',
    district: 'Altındağ',
    layerSlug: 'geleneksel-el-sanatlari',
    lat: 39.9432,
    lng: 32.8545,
    visit: 'appointment',
  },
  {
    id: 'baraka-seramik',
    name: 'Baraka Seramik Evi',
    craft: 'Seramik',
    address: 'Hoşdere Caddesi, Ayrancı',
    district: 'Ayrancı',
    layerSlug: 'geleneksel-el-sanatlari',
    lat: 39.9035,
    lng: 32.8650,
    visit: 'open',
  },
  {
    id: 'gunsu-gungor-patchwork',
    name: 'Günsu Güngör — GC Patchwork',
    craft: 'Korkyama (patchwork)',
    address: 'Avcılar Mahsi Sk. No:2, Çankaya',
    district: 'Çankaya',
    layerSlug: 'geleneksel-el-sanatlari',
    lat: 39.9060,
    lng: 32.8600,
    visit: 'open',
  },

  /* ── Katman 04: Metal – Ahşap ────────────────────────── */
  {
    id: 'bulbul-tesbih',
    name: 'Bülbül Tesbih',
    craft: 'Tesbih',
    address: 'Tesbihçiler Çarşısı içi, Hacıbayram',
    district: 'Hacı Bayram',
    layerSlug: 'metal-ahsap',
    lat: 39.9425,
    lng: 32.8515,
    visit: 'open',
  },
  {
    id: 'abdul-samet-urgün',
    name: 'Abdül Samet Ürgün — Tesbih Atölyesi',
    craft: 'Tesbih',
    address: 'Ankara Kalesi',
    district: 'Kale',
    layerSlug: 'metal-ahsap',
    lat: 39.9460,
    lng: 32.8640,
    visit: 'appointment',
  },
  {
    id: 'burak-ucar-bicakci',
    name: 'Burak Uçar Atölye — Bıçakçı',
    craft: 'Bıçakçı',
    address: 'Gölbaşı',
    district: 'Gölbaşı',
    layerSlug: 'metal-ahsap',
    lat: 39.7918,
    lng: 32.8058,
    visit: 'appointment',
  },

  /* ── Katman 05: Hafızayı Onaranlar ───────────────────── */
  {
    id: 'antika-radyocu-tuncay',
    name: 'Antika Radyocu — Tuncay Usta',
    craft: 'Radyo & plak tamiri',
    address: 'Mahmut Esat Bozkurt Cd. No:75, Çankaya',
    district: 'Çankaya',
    layerSlug: 'hafizayi-onaranlar',
    lat: 39.9065,
    lng: 32.8555,
    visit: 'open',
  },
  {
    id: 'ankara-kukla-karagoz',
    name: 'Ankara Kukla ve Karagöz Atölyesi',
    craft: 'Kukla & gölge oyunu',
    address: 'Beşikkaya 2015. Sk. Altındağ',
    district: 'Altındağ',
    layerSlug: 'hafizayi-onaranlar',
    lat: 39.9440,
    lng: 32.8610,
    visit: 'appointment',
  },
  {
    id: 'tek-flas-huseyin',
    name: 'Tek Flaş — Hüseyin Usta',
    craft: 'Analog fotoğraf makinesi tamiri',
    address: 'Menekşe-1 Sk. Balkanoğlu İşhanı No:7/50, Kızılay',
    district: 'Kızılay',
    layerSlug: 'hafizayi-onaranlar',
    lat: 39.9200,
    lng: 32.8548,
    visit: 'open',
  },
];

export const stopsByLayer = (layerSlug: string) =>
  MAP_STOPS.filter((s) => s.layerSlug === layerSlug);
