import type { Story } from '@/lib/types';

/**
 * Ankara Onarım Atlası — Saha Dosyaları ve Hikâyeler
 * Usta portföyleri (Emine Süsoy, Mustafa Özcan, Mehmet Karslı, Dost Kitabevi)
 * kullanıcının birebir örnek metinleriyle doldurulmuştur.
 * Diğer kategorilerdeki hikâyeler ise projenin editoryal yazı diline uygun olarak üretilmiştir.
 */
const HAND_WRITTEN_STORIES: Story[] = [
  /* ─── Usta Portreleri (master-portrait) ─── */
  {
    slug: 'mucellit-mehmet-karsli',
    title: 'Zamana Direnen Bir Mücellithane: Mehmet Karslı',
    excerpt:
      "Ankara'nın sahaflar cenneti Adilhan Kitapçılar Çarşısı'ndaki mütevazı atölyesinde zamana direnen Mücellit Mehmet Karslı, yarım asrı aşan meslek hayatıyla kitapların ömrüne ömür katan asırlık bir çınardır.",
    body:
      "Ankara'nın sahaflar cenneti Adilhan Kitapçılar Çarşısı'ndaki mütevazı atölyesinde zamana direnen Mücellit Mehmet Karslı, yarım asrı aşan meslek hayatıyla kitapların ömrüne ömür katan asırlık bir çınardır. Kültür ve Turizm Bakanlığı tarafından \"Yaşayan İnsan Hazineleri\" ödülüne layık görülen usta, nostaljik radyosundan yükselen Zeki Müren nağmeleri eşliğinde yıpranmış sayfaları ince ince dikiyor, kalıp, işkence ve yekşah gibi kadim aletlerle kitaplara adeta yeni birer elbise giydiriyor. Geleneksel usta-çırak ekolünden gelerek klasik cilt sanatını günümüze taşıyan Karslı, hem paha biçilemez el yazması eserlerin ve eski belgelerin restorasyonunu yapıyor hem de Ankara'nın bu saklı kültür mirasını gelecek nesillere aktarmaya devam ediyor.\n\nYerin Adı: Mücellithane\nKonum: Kızılay Adilhan Çarşısı İçi",
    storyType: 'master-portrait',
    layerSlug: 'kagit-sanati',
    stopSlug: 'mucellit-mehmet-karsli',
    heroImage: null,
    publishedAt: '2026-06-07T14:23:00Z',
    isFeatured: true,
    isPublished: true,
    readingTimeMinutes: 5,
  },
  {
    slug: 'emine-susoy-tezhip',
    title: 'Altın ve Sabrın Buluşması: Emine Süsoy Tezhip Atölyesi',
    excerpt:
      "Ulucanlar Cezaevi Sanat Sokağı'nda geleneksel Türk süsleme sanatlarına can veren Emine Süsoy, tescilli bir Kültür Bakanlığı sanatçısı ve ödüllü bir tezhip ustasıdır.",
    body:
      "Ankara'nın önemli mekanlarından Ulucanlar Cezaevi Sanat Sokağı'nda geleneksel Türk süsleme sanatlarına can veren Emine Süsoy, tescilli bir Kültür Bakanlığı sanatçısı ve ödüllü bir tezhip ustasıdır. Kendine has neşeli, samimi ve adeta bir aile sıcaklığındaki atölyesinde kadim kağıt aharatlama tekniklerinden altın işlemelere uzanan asırlık bir mirası yaşatan Süsoy, hem özgün eserler üretiyor hem de bu zarif sanatı geleceğe aktaracak yeni nesil sanatkarlar yetiştiriyor; kısacası Ankara'nın sanat damarlarına estetik ve hayat aşılıyor.\n\nAdres: Ulucanlar Cezaevi Müzesi Sanat Sokağı No: 3, Altındağ / Ankara",
    storyType: 'master-portrait',
    layerSlug: 'kagit-sanati',
    stopSlug: 'emine-susoy-tezhip',
    heroImage: null,
    publishedAt: '2026-06-07T14:20:00Z',
    isFeatured: false,
    isPublished: true,
    readingTimeMinutes: 4,
  },
  {
    slug: 'mustafa-ozcan-kaligrafi',
    title: 'Harflere Hayat Veren Kalem: Mustafa Özcan Kaligrafi Atölyesi',
    excerpt:
      "Ankara Hamamönü'nde harflere hayat veren Kaligraf Mustafa Özcan, geleneksel ve modern yazı sanatını başkentte yaşatan usta bir sanatkardır.",
    body:
      "Ankara Hamamönü'nde harflere hayat veren Kaligraf Mustafa Özcan, geleneksel ve modern yazı sanatını başkentte yaşatan usta bir sanatkardır. Kurucusu olduğu atölyesinde, sabır ve estetiği buluşturarak Latin kaligrafisinden tasavvufi tasarımlara uzanan geniş bir yelpazede hem özgün eserler üretiyor hem de eski yazıların ve belgelerin onarımını gerçekleştiriyor.\n\nAdres: Hamamönü Hacettepe, Tanış Sk. No.1/11, Altındağ",
    storyType: 'master-portrait',
    layerSlug: 'kagit-sanati',
    stopSlug: 'mustafa-ozcan-kaligrafi',
    heroImage: null,
    publishedAt: '2026-06-07T14:20:00Z',
    isFeatured: false,
    isPublished: true,
    readingTimeMinutes: 4,
  },
  {
    slug: 'dost-kitabevi',
    title: 'Karanfil Sokak\'ın Kâğıt Kokusu: Dost Kitabevi',
    excerpt:
      "Ankara Kızılay'da, Karanfil Sokak'ta bulunan Dost Kitabevi, 1977 yılından beri şehrin en bilinen bağımsız kitapçılarından biri ve önemli bir buluşma noktasıdır.",
    body:
      "Ankara Kızılay'da, Karanfil Sokak'ta bulunan Dost Kitabevi, 1977 yılından beri şehrin en bilinen bağımsız kitapçılarından biri ve önemli bir buluşma noktasıdır. İnternetten kitap alışverişinin yaygınlaşmasına rağmen fiziki olarak kitaplara dokunup kâğıt kokusunu alabileceğiniz bu mekân, hem geniş arşiviyle hem de önündeki alanıyla Ankaralılar için klasik bir merkez niteliğindedir. Türkiye'de barkod sistemini ilk kullanan kitabevi olarak yayıncılık sektörüne de öncülük eden işletme, kentin kültürel geçmişinde önemli bir pay sahibi olup bağımsız yayıncılık geleneğini sürdürmeye devam ediyor.\n\nAdres: Karanfil Sokak, Kızılay, Çankaya / Ankara",
    storyType: 'master-portrait',
    layerSlug: 'kagit-sanati',
    stopSlug: 'dost-kitapevi',
    heroImage: null,
    publishedAt: '2026-06-07T14:39:00Z',
    isFeatured: false,
    isPublished: true,
    readingTimeMinutes: 3,
  },

  /* ─── Nesne Anlatıları (object-story) ─── */
  {
    slug: 'dededen-kalan-zaman-makinesi',
    title: 'Dedesinden Kalan Bir Zaman Makinesi: Köstekli Cep Saati',
    excerpt:
      "Ankara Kalesi'nin altındaki küçük atölyesinde, bir asırlık köstekli cep saatinin paslanmış çarklarını sabırla hayata döndüren bir onarım öyküsü.",
    body:
      "Ulus'un dik yokuşlarından birinde, daracık bir dükkânın camından sızan sarı ışıkta, büyüteçli gözlüğüyle pirinç bir çarkı temizleyen ustanın tezgâhına bir cep saati konur. Sahibi, dedesinden miras kalan bu saatin uzun yıllardır sessiz olduğunu söyler. Usta saati açtığında, içindeki zaman mekanizmasının toz ve nem yüzünden donduğunu görür. \"Saat sadece zamanı göstermez,\" der usta parmaklarının arasındaki minik vidayı sıkıştırırken, \"içinde sahibinin kalp atışlarını, beklediği günleri saklar.\" Mekanik saatin dişlileri tek tek sökülür, özel yağlarla temizlenir, kırık zemberek aslına uygun bir çelik tel ile yeniden sarılır. Üç gün süren bu mikro cerrahi müdahalenin ardından, atölyenin sessizliğini saatin o tanıdık, tok 'tıkırtısı' doldurur. Nesne onarılmış, sahibinin dedesiyle kurduğu bağ zamana karşı yeniden kurulmuştur.",
    storyType: 'object-story',
    layerSlug: 'nesneyi-onaranlar',
    stopSlug: 'nesneyi-onaranlar-durak-01',
    heroImage: null,
    publishedAt: '2026-06-07T10:00:00Z',
    isFeatured: false,
    isPublished: true,
    readingTimeMinutes: 4,
  },
  {
    slug: 'analog-leica-donusu',
    title: 'Körüklerin ve Merceklerin Peşinde: Bir Leica\'nın Dönüşü',
    excerpt:
      "Balkanoğlu İşhanı'nın tozlu raflarında, perdesi yırtılmış ve merceği puslanmış 1954 model bir Leica'nın yeniden ışığı yakalama serüveni.",
    body:
      "Kızılay'ın en eski işhanlarından birinin çatı katında, Hüseyin Usta'nın masasında duran 1954 model Leica IIIf, yılların yorgunluğunu üzerinde taşımaktadır. Enstantane perdesi yıpranmış, vizörü Ankara'nın isiyle kaplanmış bu analog makine, artık ışığı geçirmemektedir. Genç bir fotoğraf meraklısının bitpazarından bulup getirdiği bu gövde, Hüseyin Usta için çözülmesi gereken bir bulmacadır. \"Eski makinelerin bir ruhu vardır,\" der usta, cımbızla deklanşör yayını düzeltirken, \"onları hayata döndürdüğünde, Ankara'nın elli yıl önceki ışığını bugüne taşırsın.\" Leica'nın ipek perdesi, ustanın elindeki hassas dokunuşlarla yenilenir. Mercekler özel solüsyonlarla pussuzlaştırılır. Birkaç deneme çekiminden sonra, deklanşörün o kendinden emin 'klik' sesi duyulur. Bu klik sesi, bir nesnenin çöpe gitmekten kurtulup kentin yeni anılarını kaydetmeye hazırlandığının ilanıdır.",
    storyType: 'object-story',
    layerSlug: 'hafizayi-onaranlar',
    stopSlug: 'tek-flas-huseyin',
    heroImage: null,
    publishedAt: '2026-06-07T11:15:00Z',
    isFeatured: false,
    isPublished: true,
    readingTimeMinutes: 5,
  },

  /* ─── Saha Günlükleri (field-journal) ─── */
  {
    slug: 'samanpazari-yokusu-saha-notlari',
    title: 'Samanpazarı Yokuşunda Zanaatın Peşinde: İlk Saha Günlüğü',
    excerpt:
      "Ankara Kalesi'ne tırmanan dik sokaklarda, bakır sesleri ve ahşap kokuları arasında yaptığımız ilk saha araştırmasının editoryal notları.",
    body:
      "Saha araştırmamızın ilk gününde, sabahın erken saatlerinde Samanpazarı'nın Arnavut kaldırımlı yokuşuna adım atıyoruz. Amacımız, sadece tabelası olan dükkânları değil, hanların iç avlularına gizlenmiş, unutulmaya yüz tutmuş ustaları bulmak. İlk durağımız, elinde yarım asırlık çekiçle bakıra şekil veren bir usta oluyor. Çekicin ritmik sesi, sokağın gürültüsünü bastırıyor. Usta bize bakırı onarmanın, onun üzerindeki yaşanmışlığı silmeden sadece yorgunluğunu almak olduğunu anlatıyor. Birkaç sokak yukarıda, küçük bir dükkânda hasır-söğüt ören başka bir sanatkârla karşılaşıyoruz. Söğüt dallarını suya yatırıp yumuşatırken, \"Bu dallar Ankara'nın derelerinden toplanırdı eskiden,\" diyor iç geçirerek. Bu saha günlüğü, kentin sadece binalardan değil, bu sokaklarda yankılanan zanaat seslerinden ve el emeğinin kokusundan oluştuğunu bir kez daha hatırlatıyor bize.",
    storyType: 'field-journal',
    layerSlug: 'geleneksel-el-sanatlari',
    stopSlug: 'geleneksel-el-sanatlari-durak-01',
    heroImage: null,
    publishedAt: '2026-06-07T09:00:00Z',
    isFeatured: false,
    isPublished: true,
    readingTimeMinutes: 6,
  },
  {
    slug: 'adil-han-carsisi-kagit-sesi',
    title: 'Adil Han Çarşısı\'nın Koridorlarında Kâğıdın Sesi',
    excerpt:
      "Ulus'un tarih kokan çarşılarından Adil Han'da, eski kitap kokuları ve mürekkep izleri arasında kaydettiğimiz saha gözlemleri.",
    body:
      "Ulus'un kalbinde yer alan Adil Han Kitapçılar Çarşısı, dışarıdaki modern dünyanın hızına inat kendi yavaş zamanını yaşayan bir ada gibi. Çarşıya adım atar atmaz sizi karşılayan o yoğun eski kitap kokusu, adeta zamanı geriye sarıyor. Koridorlarda yürürken, dükkânların önündeki sehpalarda çay içip eski baskıları inceleyen insanları görüyoruz. Burada kâğıt, sadece üzerine yazı yazılan bir malzeme değil; kentin entelektüel hafızasını, geçmişin mektuplarını ve unutulmuş şiirlerini taşıyan yaşayan bir organizma. Bir sahafın tozlu rafından aldığımız eski bir Ankara rehberini incelerken, sayfaların arasına sıkışmış eski bir sinema biletini buluyoruz. İşte bu küçük kâğıt parçaları bile, şehrin gündelik yaşam tarihinin en sadık şahitleri. Adil Han, Ankara'nın kâğıt hafızasını onaran ve onu bugüne taşıyan sessiz bir kale.",
    storyType: 'field-journal',
    layerSlug: 'kagit-sanati',
    stopSlug: 'mucellit-mehmet-karsli',
    heroImage: null,
    publishedAt: '2026-06-07T08:30:00Z',
    isFeatured: false,
    isPublished: true,
    readingTimeMinutes: 5,
  },

  /* ─── Onarım Teknikleri (repair-technique) ─── */
  {
    slug: 'kagit-omrunu-uzatan-ahar-teknigi',
    title: 'Kağıdın Ömrünü Uzatan Kadim Dokunuş: Ahar Tekniği',
    excerpt:
      "Yazma eserlerin yüzyıllar boyunca bozulmadan kalmasını sağlayan, nişasta ve yumurta akıyla yapılan geleneksel kağıt aharatlama yöntemi.",
    body:
      "Geleneksel kâğıt sanatlarında ve restorasyon süreçlerinde kâğıdın dayanıklılığını artırmak için kullanılan en kadim tekniklerden biri \"ahar\"dır. Ahar, kâğıdın yüzeyine uygulanan ve mürekkebin kâğıt lifleri arasına kontrolsüzce dağılmasını engelleyen koruyucu bir tabakadır. Yapımı büyük bir sabır gerektirir: Buğday nişastası suyla kaynatılarak süzülür, ardından yumurta akı ve şap ile hazırlanan karışımla birleştirilir. Bu karışım kâğıda ince katlar halinde sürülür ve kurumaya bırakılır. Kuruyan kâğıtlar, \"mühre\" adı verilen düzgün bir çakıl taşı veya cam aletle bastırılarak cilalanır. Bu teknik sayesinde kâğıt hem neme ve zamana karşı direnç kazanır hem de üzerine yazılan yazının düzeltilmesine imkân tanır. Bugün atölyelerde hâlâ kullanılan bu yöntem, geçmişin el yazması eserlerinin günümüze kadar sapasağlam ulaşmasının en büyük sırrıdır.",
    storyType: 'repair-technique',
    layerSlug: 'kagit-sanati',
    stopSlug: 'emine-susoy-tezhip',
    heroImage: null,
    publishedAt: '2026-06-07T12:00:00Z',
    isFeatured: false,
    isPublished: true,
    readingTimeMinutes: 4,
  },
  {
    slug: 'demire-su-verme-bileme-teknigi',
    title: 'Demire Su Verme ve Bileme: Ankara Bıçakçılığının Sırları',
    excerpt:
      "Hacı Bayram atölyelerinde demirin ateşle imtihanı: Doğru su verme derecesi ve çeliğin ömrünü belirleyen geleneksel bileme ritüelleri.",
    body:
      "Bir metalin keskin bir bıçağa dönüşmesi, sadece onu kesmek veya dövmekle bitmez; bıçağın asıl karakteri \"su verme\" aşamasında belirlenir. Ankara'nın Hacı Bayram bölgesindeki metal ustaları, çeliği ocakta kırmızı-turuncu bir renge ulaşana kadar ısıtırlar. This sıcaklık derecesi, ustanın göz kararı tecrübesiyle ölçülür. Isınan çelik, ani bir hareketle suya veya özel yağ banyosuna daldırılır. Bu ani soğuma, çeliğin moleküler yapısını sertleştirerek ona dayanıklılık kazandırır. Su vermenin ardından gelen \"menevişleme\" işlemi ise bıçağın kırılganlığını alır. Son aşama olan bileme ise bir zanaatkârın sabrını sınar. Farklı kum büyüklüklerine sahip sulu bileme taşlarında, bıçak milimetrik açılarla saatlerce sürülür. Ustalar, \"İyi bileme bıçağa sadece keskinlik vermez, demirin ruhunu açığa çıkarır,\" derler. Bu teknikler, metalin ömrünü nesiller boyu uzatan birer kimya ve sabır dansıdır.",
    storyType: 'repair-technique',
    layerSlug: 'metal-ahsap',
    stopSlug: 'metal-ahsap-durak-01',
    heroImage: null,
    publishedAt: '2026-06-07T13:00:00Z',
    isFeatured: false,
    isPublished: true,
    readingTimeMinutes: 4,
  },

  /* ─── Kayıp Zanaatlar (lost-crafts) ─── */
  {
    slug: 'ulus-sokaklarinda-son-dikisler-kasket-zanaati',
    title: 'Ulus Sokaklarinda Son Dikişler: Klasik Kasket Zanaatı',
    excerpt:
      "Ankara'da kasket takma kültürünün gerilemesiyle birlikte, el yapımı yün ve keten kasket üreten son atölyelerin sessiz vedası.",
    body:
      "Cumhuriyet'in ilk yıllarından itibaren Ankara'da gündelik giyimin ve kentsel kimliğin ayrılmaz bir parçası olan kasketler, şimdilerde sadece eski fotoğraflarda ve birkaç yaşlı ustanın tezgâhında yaşıyor. Ulus'un arkalarındaki dar sokaklarda yer alan Ali Usta'nın atölyesi, bu kaybolmakta olan zanaatın son kalelerinden biri. Yün, kaşmir ve keten kumaşları eski kalıplara göre kesen, iç astarını büyük bir özenle diken usta, artık yeni çırak yetiştirememekten yakınıyor. \"Eskiden herkesin kafasında bir kasket olurdu, memuru da esnafı da buraya gelirdi,\" diyor tezgâhındaki antika dikiş makinesini göstererek. Hazır giyimin yaygınlaşması ve kasket takma alışkanlığının kaybolmasıyla, el yapımı kasketçilik zanaatı da tarihin sayfalarına karışmak üzere. Ali Usta'nın diktiği her kasket, aslında Ankara'nın o eski, şık ve ağırbaşlı sokak kültürünün son temsilcileridir.",
    storyType: 'lost-crafts',
    layerSlug: 'nesneyi-onaranlar',
    stopSlug: 'nesneyi-onaranlar-durak-02',
    heroImage: null,
    publishedAt: '2026-06-07T15:00:00Z',
    isFeatured: false,
    isPublished: true,
    readingTimeMinutes: 5,
  },
  {
    slug: 'sazliklarin-sessizligi-hasir-sogut-oruculugu',
    title: 'Sazlıkların Sessizliği: İç Anadolu\'nun Hasır-Söğüt Örücülüğü',
    excerpt:
      "Ankara derelerinin söğüt dallarından ve sazlıklarından doğan, plastik ürünlerin gölgesinde kalarak unutulmaya yüz tutmuş bir örgü sanatı.",
    body:
      "Bir zamanlar İç Anadolu'nun derelerinden ve sulak alanlarından toplanan söğüt dalları ve sazlıklar, ustaların ellerinde sepetlere, ekmekliklere, hasır yolluklara dönüşürdü. Ankara'nın Samanpazarı bölgesinde bu sanatı sürdüren son birkaç dükkân kaldı. Hasır örücülüğü, tamamen doğayla kurulan bir bağa dayanır; dalın doğru mevsimde kesilmesi, suda bekletilerek esnetilmesi ve el yordamıyla örülmesi gerekir. Ancak plastik ve metal ev eşyalarının ucuzlaması, bu doğal ve sürdürülebilir zanaatı neredeyse tamamen bitme noktasına getirdi. Usta, \"Plastik sepet kırıldığında çöp olur, doğaya zarar verir; hasır sepet ise eskidikçe güzelleşir, ömrü bittiğinde toprağa geri döner,\" diyerek hasırın ekolojik değerini vurguluyor. Bu zanaatın kaybolması, sadece bir mesleğin değil, doğayla kurulan o kadim sürdürülebilir yaşam bilgisinin de kaybı anlamına geliyor.",
    storyType: 'lost-crafts',
    layerSlug: 'geleneksel-el-sanatlari',
    stopSlug: 'geleneksel-el-sanatlari-durak-02',
    heroImage: null,
    publishedAt: '2026-06-07T16:00:00Z',
    isFeatured: false,
    isPublished: true,
    readingTimeMinutes: 4,
  },
];

/* ─── Programatik Kayıp Zanaatlar Üretimi (63 adet eklenerek toplamda 65 adet olmaktadır) ─── */
const LOST_CRAFTS_NAMES = [
  'Nallıhan İpek İğne Oyası',
  'Beypazarı Gümüş Telkari',
  'Kızılcahamam Çam Kolonyacılığı',
  'Samanpazarı Semerciliği',
  'Ulus Bakırcılığı',
  'Karaköy Sepet Örücülüğü',
  'Kale İçi Yamanmacılığı',
  'Ankara Taş Duvarcılığı',
  'Geleneksel Yemeni Yapımı',
  'Kemangerlik (Yay Yapımı)',
  'Eskici Keçeciliği',
  'Süpürge Bağlama Ustası',
  'Ahşap Oyma Zanaatı',
  'Eski Daktilo Restorasyonu',
  'Gramofon Onarımı',
  'Lüle Taşı İşlemeciliği',
  'Muz Lifinden Hasır Örme',
  'Geleneksel Ebru Zanaatı',
  'Kök Boya Dokumacılığı',
  'Tarihi Çan Yapımı',
  'Keçe Çizme Yapımı',
];

const GENERATED_LOST_CRAFTS: Story[] = Array.from({ length: 63 }).map((_, index) => {
  const id = index + 3; // 1 ve 2 el yazısıyla ekli
  const craftName = LOST_CRAFTS_NAMES[index % LOST_CRAFTS_NAMES.length];
  
  const title = `Kayıp Zanaatın Peşinde: ${craftName} (Saha Kaydı No. ${id})`;
  const excerpt = `Ankara'da zamana ve endüstriyel üretime karşı direnen, yok olma tehlikesi altındaki ${craftName} zanaatının derinlemesine saha incelemesi.`;
  const body = `Bu editoryal dosya, Ankara'nın tarihsel ve kültürel dokusunda derin izler bırakmış olan ${craftName} zanaatını ve onun son temsilcilerini belgelemektedir. Saha ekibimizin yaptığı araştırmalar sonucunda, zanaatın geçmişteki altın yılları ve bugünkü son temsilcilerinin karşılaştığı zorluklar kayıt altına alınmıştır.\n\nOnarım ve yaşatma kültürü açısından, bu zanaatın taşıdığı teknik ve estetik mirasın gelecek kuşaklara aktarılması hayati önem taşımaktadır.`;

  return {
    slug: `kayip-zanaat-detay-${id}`,
    title,
    excerpt,
    body,
    storyType: 'lost-crafts',
    layerSlug: 'geleneksel-el-sanatlari',
    stopSlug: null,
    heroImage: null,
    publishedAt: new Date(Date.now() - id * 24 * 60 * 60 * 1000).toISOString(),
    isFeatured: false,
    isPublished: true,
    readingTimeMinutes: Math.floor(Math.random() * 3) + 3,
  };
});

export const MOCK_STORIES: Story[] = [...HAND_WRITTEN_STORIES, ...GENERATED_LOST_CRAFTS];

/** Slug'a göre hikâye bulur. */
export const storyBySlug = (slug: string): Story | undefined =>
  MOCK_STORIES.find((s) => s.slug === slug);
