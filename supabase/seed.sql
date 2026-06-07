-- seed.sql
-- Ankara Onarım Atlası — başlangıç verisi.
-- Yalnızca fiziksel atlas paftalarında basılı, doğrulanmış katmanlar ve duraklar.
-- Tüm duraklar is_published=false (taslak) başlar; admin onayı sonrası yayına alınır.

-- LAYERS
insert into layers (slug, title, short_title, color_key, color_hex, subtitle, description, sensory_theme, map_texture_url, map_fallback_image_url, order_index, is_published) values
('kagit-sanati', 'Kağıt Sanatı', 'Kağıt', 'paper-arts', '#5C3B8E',
 'mücellit · hat · tezhip',
 'Ulus’tan Adilhan’a uzanan kâğıt eksenli zanaatlar: cildi yeniden diken eller, hat ile bir cümleyi yavaşlatan ustalar, tezhibin sabırlı süslemesi.',
 'Kâğıt, mürekkep, sayfa, sayfa kıvrımı, sayfa kenarı',
 '/atlas/source/katman-01-kagit-sanati.jpeg',
 '/atlas/source/katman-01-kagit-sanati.jpeg',
 1, true),
('nesneyi-onaranlar', 'Nesneyi Onaranlar', 'Nesne', 'object-repair', '#8A4A1F',
 'tamir · restorasyon · mekanik · analog',
 'Atılmak yerine onarılan, tanıdık ustaların elinde yeniden hayat bulan nesneler: kasketten gözlüğe, tulumdan deriye Ankara’nın mekanik kalbi.',
 'Yağ, vida, mekanizma, dişli, deri, kayış',
 '/atlas/source/katman-02-nesneyi-onaranlar.jpeg',
 '/atlas/source/katman-02-nesneyi-onaranlar.jpeg',
 2, true),
('geleneksel-el-sanatlari', 'Geleneksel El Sanatları', 'El Sanatı', 'traditional-crafts', '#1A3F8F',
 'dokuma · çini · cam · hasır',
 'Ankara’nın geleneksel el sanatları ağı: Hacı Bayram’dan Ayrancı’ya uzanan dokumacılar, cam üfleyenler, hasır-söğüt ustaları.',
 'Dokuma, lif, sırlı yüzey, cam, hasır',
 '/atlas/source/katman-03-geleneksel-el-sanatlari.jpeg',
 '/atlas/source/katman-03-geleneksel-el-sanatlari.jpeg',
 3, true),
('metal-ahsap', 'Metal – Ahşap', 'Metal & Ahşap', 'metal-wood', '#B85A1C',
 'bıçak · tesbih · oyma',
 'Kale’den Gölbaşı’na uzanan metal ve ahşap zanaatı: bir bıçağın keskinliğini, bir tesbihin tanesini, sedefin parıltısını yaşatan ustalar.',
 'Demir, su verme, ahşap talaşı, sedef parıltısı',
 '/atlas/source/katman-04-metal-ahsap.jpeg',
 '/atlas/source/katman-04-metal-ahsap.jpeg',
 4, true);

-- STOPS — paftalarda basılı isimler. is_published=false ile başlar (saha doğrulaması bekleniyor).
-- Adres alanları yalnızca paftalarda görünür biçimde verildiyse doldurulmuştur.

-- Katman 01: Kağıt Sanatı
insert into stops (slug, name, craft_type, layer_id, district, address, visit_status, is_published) values
('emine-susoy-tezhip', 'Emine Süsoy Tezhip Atölyesi', 'Tezhip (süsleme sanatı)',
 (select id from layers where slug = 'kagit-sanati'),
 'Altındağ', 'Uluconlar Sanat Sokağı, Uluconlar Cezaevi Müzesi Sanat Sokağı No: 5',
 'by-appointment', false),
('mustafa-ozcan-kaligrafi', 'Mustafa Özcan Kaligrafi Atölyesi', 'Hat (kaligrafi)',
 (select id from layers where slug = 'kagit-sanati'),
 'Altındağ', 'Hamamönü Hocettepe, Tarış Sk. No:1/11',
 'by-appointment', false),
('mucellithane-mehmet-karsli', 'Mücellithane Mehmet Karslı', 'Mücellit (cilt sanatı)',
 (select id from layers where slug = 'kagit-sanati'),
 'Altındağ', 'Adilhan Çarşısı, Kızılay',
 'unknown', false),
('dost-kitabevi', 'Dost Kitabevi', 'Kitap / kırtasiye',
 (select id from layers where slug = 'kagit-sanati'),
 'Kızılay', null,
 'open', false);

-- Katman 02: Nesneyi Onaranlar
insert into stops (slug, name, craft_type, layer_id, district, address, visit_status, is_published) values
('ali-bozdag-kasket', 'Ali Bozdağ — Bozdağ Kasket', 'Şapka yapımı ve onarımı',
 (select id from layers where slug = 'nesneyi-onaranlar'),
 'Kale', 'Kale İçi, Ankara', 'open', false),
('dernhane-deri-isleme', 'Murat Ateş Deri İşleme Sanatçısı — Dernhane', 'Deri işçiliği',
 (select id from layers where slug = 'nesneyi-onaranlar'),
 'Kale', 'Kale İçi, Ankara', 'open', false),
('ahmet-parlamis-tulum', 'Ahmet Parlamış Tulum Yapımı', 'Müzik enstrümanı (onarım)',
 (select id from layers where slug = 'nesneyi-onaranlar'),
 'Ulus', 'Ulus Sanayi Caddesi', 'unknown', false),
('ismail-saritas-gozluk', 'İsmail Sarıtaş — Ankara Gözlük Tamir Merkezi', 'Analog mekanizma (gözlük)',
 (select id from layers where slug = 'nesneyi-onaranlar'),
 'Kızılay', 'Kök Çarşısı, Meşrutiyet Cd.', 'open', false),
('cayyolu-tamir-atolyesi', 'Çayyolu Tamir Atölyesi', 'Tamir atölyesi (onarım)',
 (select id from layers where slug = 'nesneyi-onaranlar'),
 'Çankaya', 'Çayyolu', 'unknown', false);

-- Katman 03: Geleneksel El Sanatları
insert into stops (slug, name, craft_type, layer_id, district, address, visit_status, is_published) values
('raziye-basegmez-dokuma', 'Razıye Başeğmez — Halı Dokuma', 'Dokuma (halı)',
 (select id from layers where slug = 'geleneksel-el-sanatlari'),
 'Altındağ', 'Uluconlar Sanat Sokağı', 'by-appointment', false),
('kadizade-hasir-sogut', 'Kadızade Samanpazarı — Hasır-Söğüt Sanatı', 'Hasır-söğüt',
 (select id from layers where slug = 'geleneksel-el-sanatlari'),
 'Altındağ', 'Samanpazarı', 'open', false),
('menekse-bilgic-cam', 'Menekşe Bilgiç — Cam Atölyesi', 'Cam sanatı',
 (select id from layers where slug = 'geleneksel-el-sanatlari'),
 'Altındağ', 'Sakarya, Konya Sok. No: 8',
 'by-appointment', false),
('gunsu-gungor-patchwork', 'Günsu Güngör — GC Patchwork', 'Korkyama (patchwork)',
 (select id from layers where slug = 'geleneksel-el-sanatlari'),
 'Çankaya', 'Aziziye Mh., Platin Sk. No:2', 'by-appointment', false),
('baraka-seramik-evi', 'Baraka Seramik Evi', 'Çini (seramik)',
 (select id from layers where slug = 'geleneksel-el-sanatlari'),
 'Çankaya', 'Adıyun Çıkmazı, Ayrancı, Haydere Cd.', 'open', false);

-- Katman 04: Metal-Ahşap
insert into stops (slug, name, craft_type, layer_id, district, address, visit_status, is_published) values
('bulbul-tesbih', 'Bülbül Tesbih', 'Tesbih ustası',
 (select id from layers where slug = 'metal-ahsap'),
 'Altındağ', 'Hacıbayram Tesbihçiler Çarşısı', 'open', false),
('abdul-samet-tesbih', 'Abdul Samet Ürün — Tesbih Atölyesi', 'Tesbih ustası',
 (select id from layers where slug = 'metal-ahsap'),
 'Altındağ', 'Ankara Kalesi', 'by-appointment', false),
('burak-ucar-bicakci', 'Burak Uçar Atölye — Bıçakçı', 'Bıçakçı',
 (select id from layers where slug = 'metal-ahsap'),
 'Gölbaşı', 'Gölbaşı, Ankara', 'by-appointment', false),
('sedefkar', 'Sedefkar', 'Sedef işlemeciliği / ahşap oyma',
 (select id from layers where slug = 'metal-ahsap'),
 'Çankaya', 'Ayrancı, Ankara', 'unknown', false);
