import type { Layer } from '@/lib/types';

/**
 * Ankara Onarım Atlası — fiziksel paftalardan derlenen beş katman.
 * Yeni katman eklemek için bu listeye ekleme yeterlidir;
 * UI bu listeyi sırayla okur, tip sabit kalır.
 */
export const LAYERS: Layer[] = [
  {
    number: '01',
    slug: 'kagit-sanati',
    title: 'Kağıt Sanatı',
    shortTitle: 'Kağıt',
    subtitle: 'mücellit · hat · tezhip',
    crafts: ['Mücellit', 'Hat', 'Tezhip', 'Kitap / kırtasiye'],
    colorKey: 'paper-arts',
    colorHex: '#5C3B8E',
    description:
      "Ulus'tan Adilhan'a uzanan kâğıt eksenli zanaatlar: cildi yeniden diken eller, hat ile bir cümleyi yavaşlatan ustalar, tezhibin sabırlı süslemesi.",
    sensoryTheme: 'Kâğıt, mürekkep, sayfa, sayfa kıvrımı, sayfa kenarı',
    regions: ['Ulus', 'Hamamönü', 'Adilhan Çarşısı', 'Altındağ'],
    stopCount: 4,
    mapImage: '/atlas/source/katman-01-kagit-sanati.png',
  },
  {
    number: '02',
    slug: 'nesneyi-onaranlar',
    title: 'Nesneyi Onaranlar',
    shortTitle: 'Nesne',
    subtitle: 'tamir · restorasyon · mekanik · analog',
    crafts: [
      'Tamir atölyesi',
      'Analog mekanizma',
      'Şapka yapımı',
      'Deri işçiliği',
      'Müzik enstrümanı (onarım)',
    ],
    colorKey: 'object-repair',
    colorHex: '#8A4A1F',
    description:
      "Atılmak yerine onarılan, tanıdık ustaların elinde yeniden hayat bulan nesneler: kasketten gözlüğe, tulumdan deriye Ankara'nın mekanik kalbi.",
    sensoryTheme: 'Yağ, vida, mekanizma, dişli, deri, kayış',
    regions: ['Ulus', 'Çayyolu', 'Kale İçi', 'Kök Çarşısı'],
    stopCount: 6,
    mapImage: '/atlas/source/katman-02-nesneyi-onaranlar.png',
  },
  {
    number: '03',
    slug: 'geleneksel-el-sanatlari',
    title: 'Geleneksel El Sanatları',
    shortTitle: 'El Sanatı',
    subtitle: 'dokuma · çini · cam · hasır',
    crafts: ['Dokuma (halı)', 'Korkyama (patchwork)', 'Çini (seramik)', 'Cam sanatı', 'Hasır-söğüt'],
    colorKey: 'traditional-crafts',
    colorHex: '#1A3F8F',
    description:
      "Ankara'nın geleneksel el sanatları ağı: Hacı Bayram'dan Ayrancı'ya uzanan dokumacılar, cam üfleyenler, hasır-söğüt ustaları.",
    sensoryTheme: 'Dokuma, lif, sırlı yüzey, cam, hasır',
    regions: ['Hacı Bayram', 'Samanpazarı', 'Aziziye', 'Ayrancı'],
    stopCount: 6,
    mapImage: '/atlas/source/katman-03-geleneksel-el-sanatlari.png',
  },
  {
    number: '04',
    slug: 'metal-ahsap',
    title: 'Metal – Ahşap',
    shortTitle: 'Metal & Ahşap',
    subtitle: 'bıçak · tesbih · oyma',
    crafts: ['Bıçakçı', 'Tesbih ustası', 'Ahşap oyma', 'Sedef işlemeciliği'],
    colorKey: 'metal-wood',
    colorHex: '#B85A1C',
    description:
      "Kale'den Gölbaşı'na uzanan metal ve ahşap zanaatı: bir bıçağın keskinliğini, bir tesbihin tanesini, sedefin parıltısını yaşatan ustalar.",
    sensoryTheme: 'Demir, su verme, ahşap talaşı, sedef parıltısı',
    regions: ['Hacı Bayram', 'Kale', 'Gölbaşı', 'Ayrancı'],
    stopCount: 4,
    mapImage: '/atlas/source/katman-04-metal-ahsap.png',
  },
  {
    number: '05',
    slug: 'hafizayi-onaranlar',
    title: 'Hafızayı Onaranlar',
    shortTitle: 'Hafıza',
    subtitle: 'plak · radyo · kukla · gölge oyunu · fotoğraf',
    crafts: [
      'Antika radyo & plak tamiri',
      'Kukla ve Karagöz atölyesi',
      'Analog fotoğraf makinesi tamiri',
      'Gölge oyunu',
    ],
    colorKey: 'memory-repair',
    colorHex: '#1A6B5C',
    description:
      "Sesin, görüntünün ve oyunun hafızasını taşıyan ustalar: Tuncay Usta'nın radyo tamiratından Şafak Yılmaz'ın kukla atölyesine, Hüseyin Usta'nın fotoğraf karanlık odasına uzanan analog bellek ağı.",
    sensoryTheme: 'Bakır bobin, vinil, objektif camı, kukla ipeği, gölge perdesi',
    regions: ['Kızılay', 'Altındağ', 'Çankaya', 'Ulus'],
    stopCount: 3,
    mapImage: '/atlas/source/katman-05-hafizayi-onaranlar.png',
  },
];

export const layerBySlug = (slug: string) => LAYERS.find((l) => l.slug === slug);
