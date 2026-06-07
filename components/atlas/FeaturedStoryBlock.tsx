'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { AtlasIconArrow } from '@/components/ui/AtlasButton';

/**
 * FeaturedStoryBlock — Tek kart, her 7 saniyede otomatik rotasyon.
 */

interface StopEntry {
  globalNum: number;
  layerNumber: string;
  layerSlug: string;
  layerTitle: string;
  colorHex: string;
  name: string;
  craft: string;
  district: string;
  note: string;
  visit: 'open' | 'appointment' | 'archive';
}

const ALL_STOPS: StopEntry[] = [
  /* ── Katman 01: Kağıt Sanatı ────────────────────────────── */
  {
    globalNum: 1, layerNumber: '01', layerSlug: 'kagit-sanati',
    layerTitle: 'Kağıt Sanatı', colorHex: '#5C3B8E',
    name: 'Mücellit · Adilhan tezgâhı',
    craft: 'Mücellit', district: 'Ulus · Adilhan',
    note: "Cilt onarımı ve sayfa dikişi; yarım asırlık tezgâh. Sayfaların dikiş ipliği, zamanla sökülen ciltleri geri kavuşturur. Her kitap, ustanın elinden ikinci bir hayat alır.",
    visit: 'open',
  },
  {
    globalNum: 2, layerNumber: '01', layerSlug: 'kagit-sanati',
    layerTitle: 'Kağıt Sanatı', colorHex: '#5C3B8E',
    name: 'Hat atölyesi',
    craft: 'Hat', district: 'Hamamönü',
    note: "Reed kalemler, mürekkep, çırak dengesi. Harfin zarafeti burada öğretilir; bir nesil bir sonrakine kalemin ağırlığını devreder. Yazmanın yavaşlığı, dikkat eğitiminin ta kendisidir.",
    visit: 'appointment',
  },
  {
    globalNum: 3, layerNumber: '01', layerSlug: 'kagit-sanati',
    layerTitle: 'Kağıt Sanatı', colorHex: '#5C3B8E',
    name: 'Tezhip stüdyosu',
    craft: 'Tezhip', district: 'Adilhan Çarşısı',
    note: "Altın varak ve mineral pigmentlerle sayfa kenarlarına işlenen sessiz zafer. Tezhip, sabırsızlığa yer bırakmaz; bir motifin tamamlanması günler alır.",
    visit: 'appointment',
  },
  {
    globalNum: 4, layerNumber: '01', layerSlug: 'kagit-sanati',
    layerTitle: 'Kağıt Sanatı', colorHex: '#5C3B8E',
    name: 'Kırtasiyeci · sayfa hafızası',
    craft: 'Kitap & kırtasiye', district: 'Altındağ',
    note: "Eski defter, kalem, mürekkep arşivi. Burada kâğıt bir malzeme değil, korunmaya değer bir nesnedir. Kapağı açıldığında geçmiş ellerin izi kalır.",
    visit: 'open',
  },

  /* ── Katman 02: Nesneyi Onaranlar ───────────────────────── */
  {
    globalNum: 5, layerNumber: '02', layerSlug: 'nesneyi-onaranlar',
    layerTitle: 'Nesneyi Onaranlar', colorHex: '#8A4A1F',
    name: 'Kasket tamircisi',
    craft: 'Şapka yapımı', district: 'Ulus',
    note: "Şapkanın kalıbına ikinci hayat veren bir cep dükkânı. Kumaş, dikiş, kaplı tasarım — bir şapkada bir insanın hikâyesi yatar.",
    visit: 'open',
  },
  {
    globalNum: 6, layerNumber: '02', layerSlug: 'nesneyi-onaranlar',
    layerTitle: 'Nesneyi Onaranlar', colorHex: '#8A4A1F',
    name: 'Saat ustası',
    craft: 'Analog mekanizma', district: 'Kale İçi',
    note: "Yay, zemberek, taş — mikro mekanik müdahale. Zamanı durduran bir saat, ustanın elinde yeniden akar. Her vites dönüşü bir hesaptır.",
    visit: 'appointment',
  },
  {
    globalNum: 7, layerNumber: '02', layerSlug: 'nesneyi-onaranlar',
    layerTitle: 'Nesneyi Onaranlar', colorHex: '#8A4A1F',
    name: 'Deri atölyesi',
    craft: 'Deri işçiliği', district: 'Kök Çarşısı',
    note: "Kayış, kemer, çanta restorasyonu. Derisinin kokusunu hâlâ taşıyan bir çanta, atan ellerin anısıdır; onarılınca anlat sürer.",
    visit: 'open',
  },
  {
    globalNum: 8, layerNumber: '02', layerSlug: 'nesneyi-onaranlar',
    layerTitle: 'Nesneyi Onaranlar', colorHex: '#8A4A1F',
    name: 'Enstrüman onarımı',
    craft: 'Müzik enstrümanı', district: 'Çayyolu',
    note: "Akort, gövde, tel — ses bakım çalışmaları. Bir çalınan nota hata verince, atölyede tüm gövde yeniden dinlenir.",
    visit: 'appointment',
  },
  {
    globalNum: 9, layerNumber: '02', layerSlug: 'nesneyi-onaranlar',
    layerTitle: 'Nesneyi Onaranlar', colorHex: '#8A4A1F',
    name: 'Gözlük tamircisi',
    craft: 'Tamir atölyesi', district: 'Ulus',
    note: "Vida, menteşe, çerçeve onarımı. Bakışın netliği bazen bir tornavidanın ucundadır. Gözlüğün sahibini aynı gözle döndürmek, küçük ama somut bir onarımdır.",
    visit: 'open',
  },
  {
    globalNum: 10, layerNumber: '02', layerSlug: 'nesneyi-onaranlar',
    layerTitle: 'Nesneyi Onaranlar', colorHex: '#8A4A1F',
    name: 'Mekanik bakım',
    craft: 'Tamir atölyesi', district: 'Kale İçi',
    note: "Eski yelpazelerden tıraş makinelerine bakım. Kullanılabilir bir nesneyi atmak yerine onarmak, sadece tutumluluğun değil bir duruşun da göstergesidir.",
    visit: 'open',
  },

  /* ── Katman 03: Geleneksel El Sanatları ─────────────────── */
  {
    globalNum: 11, layerNumber: '03', layerSlug: 'geleneksel-el-sanatlari',
    layerTitle: 'El Sanatları', colorHex: '#2D6A4F',
    name: 'Halı dokuma atölyesi',
    craft: 'Dokuma (halı)', district: 'Hacı Bayram',
    note: "Yün, doğal boya, geleneksel motif. Bir halının bir metrekare dokuma haftalarca sürebilir. Desen sadece estetik değil, bölgenin belleğini taşır.",
    visit: 'appointment',
  },
  {
    globalNum: 12, layerNumber: '03', layerSlug: 'geleneksel-el-sanatlari',
    layerTitle: 'El Sanatları', colorHex: '#2D6A4F',
    name: 'Çini ustası',
    craft: 'Çini (seramik)', district: 'Samanpazarı',
    note: "Sırlı yüzey, mineral renk, fırın. Kil, ustaların elinde yüksek ısıya girer ve bir daha değişmez. Çini, ateşin dönüştürdüğü toprağın anlatısıdır.",
    visit: 'appointment',
  },
  {
    globalNum: 13, layerNumber: '03', layerSlug: 'geleneksel-el-sanatlari',
    layerTitle: 'El Sanatları', colorHex: '#2D6A4F',
    name: 'Cam üfleme atölyesi',
    craft: 'Cam sanatı', district: 'Aziziye',
    note: "Sıcak cam, üflemeli formlar. Bir nefes saniyeler içinde katı bir forma dönüşür. Her üfleme tekrarlanamaz; cam zanaati, tekrarsızlığın sanatıdır.",
    visit: 'appointment',
  },
  {
    globalNum: 14, layerNumber: '03', layerSlug: 'geleneksel-el-sanatlari',
    layerTitle: 'El Sanatları', colorHex: '#2D6A4F',
    name: 'Hasır örgücüsü',
    craft: 'Hasır-söğüt', district: 'Ayrancı',
    note: "Söğüt çubuğu kesilir, nemlendirilir, örneğe sarılıp dikişle tutturulur. Sepet ve hasır; ormandan el atölyesine uzanan yoldur.",
    visit: 'open',
  },
  {
    globalNum: 15, layerNumber: '03', layerSlug: 'geleneksel-el-sanatlari',
    layerTitle: 'El Sanatları', colorHex: '#2D6A4F',
    name: 'Korkyama (patchwork)',
    craft: 'Korkyama', district: 'Samanpazarı',
    note: "Yamama ile yeniden kurulan kumaş. Parça parça birikmiş parçalar bir araya getirildiğinde yeni bir anlam oluşturur. Atılması gereken kumaş olmaz.",
    visit: 'open',
  },
  {
    globalNum: 16, layerNumber: '03', layerSlug: 'geleneksel-el-sanatlari',
    layerTitle: 'El Sanatları', colorHex: '#2D6A4F',
    name: 'Kilim dokuma',
    craft: 'Dokuma', district: 'Hacı Bayram',
    note: "Düz dokuma, geleneksel desen. Renkli ipliğin ritmik yatay geçişi, bir neslin birikmiş örgü bilgisini taşır.",
    visit: 'appointment',
  },

  /* ── Katman 04: Metal & Ahşap ───────────────────────────── */
  {
    globalNum: 17, layerNumber: '04', layerSlug: 'metal-ahsap',
    layerTitle: 'Metal & Ahşap', colorHex: '#7A3B2E',
    name: 'Bıçakçı dükkânı',
    craft: 'Bıçakçı', district: 'Hacı Bayram',
    note: "Su verme, bileme, kabza işleme. Bir bıçak, demirden çok bir ilişkidir: sahibinin işi, yemeği, eskarpini — ustanın bilgisi ona siner.",
    visit: 'open',
  },
  {
    globalNum: 18, layerNumber: '04', layerSlug: 'metal-ahsap',
    layerTitle: 'Metal & Ahşap', colorHex: '#7A3B2E',
    name: 'Tesbih ustası',
    craft: 'Tesbih', district: 'Kale',
    note: "Kemik, gümüş, oltu — tane tane el işi. Her tane tornalanır, delinir, dizilir. Tesbih, tane sayısı kadar sabrın ürünü; elden ele geçen bir nesnenin ağırlığıdır.",
    visit: 'appointment',
  },
  {
    globalNum: 19, layerNumber: '04', layerSlug: 'metal-ahsap',
    layerTitle: 'Metal & Ahşap', colorHex: '#7A3B2E',
    name: 'Ahşap oymacı',
    craft: 'Oyma', district: 'Gölbaşı',
    note: "Şamdandan dolaba — geleneksel motifler. Tahtanın satıhını kazan keski, deseni yüzey hafızasına işler. Her kazıma bir kararın izidir.",
    visit: 'appointment',
  },
  {
    globalNum: 20, layerNumber: '04', layerSlug: 'metal-ahsap',
    layerTitle: 'Metal & Ahşap', colorHex: '#7A3B2E',
    name: 'Sedef işlemecisi',
    craft: 'Sedef', district: 'Ayrancı',
    note: "İnce kakma, parlatma, ahşap üzerine sedef. Işıkla değişen rengi, nesneye zamanla dönüşümü anlatır. Sedef, denizden karaya taşınmış bir tarih parçasıdır.",
    visit: 'archive',
  },

  /* ── Katman 05: Hafızayı Onaranlar ─────────────────────── */
  {
    globalNum: 21, layerNumber: '05', layerSlug: 'hafizayi-onaranlar',
    layerTitle: 'Hafızayı Onaranlar', colorHex: '#1A6B5C',
    name: 'Antika Radyocu · Tuncay Usta',
    craft: 'Radyo & plak tamiri', district: 'Çankaya · Mahmut Esat Bozkurt Cd.',
    note: "General Elektronik imzalı antika radyolar ve plak çalarlar; Tuncay Usta'nın elleri şehrin ses hafızasını tamir eder. Her bobin bir radyo yayınının izi; her tamir, o sesin bir kez daha çatlamadan akmasını sağlar.",
    visit: 'open',
  },
  {
    globalNum: 22, layerNumber: '05', layerSlug: 'hafizayi-onaranlar',
    layerTitle: 'Hafızayı Onaranlar', colorHex: '#1A6B5C',
    name: 'Ankara Kukla ve Karagöz Atölyesi',
    craft: 'Kukla & gölge oyunu', district: 'Altındağ · Beşikkaya',
    note: "Şafak Yılmaz'ın 2015'te kurduğu atölye; deriden kesilmiş Karagöz figürleri ve kukla yapım eğitimi. Gölge perdesi bir yüzey değil, belleği taşıma aracıydı; burada o gelenek yaşatılır.",
    visit: 'appointment',
  },
  {
    globalNum: 23, layerNumber: '05', layerSlug: 'hafizayi-onaranlar',
    layerTitle: 'Hafızayı Onaranlar', colorHex: '#1A6B5C',
    name: 'Tek Flaş · Hüseyin Usta',
    craft: 'Analog fotoğraf makinesi tamiri', district: 'Kızılay · Balkanoğlu İşhanı',
    note: "Menekşe Sokak'ta yarım asrı aşkın süredir analog makinelere hayat veren karanlık oda ve tamir tezgâhı. Filmli fotoğrafın hatayı barındıran yapısı, Hüseyin Usta'nın elinde bir ustalığa dönüşür.",
    visit: 'open',
  },
];

const VISIT_LABEL: Record<string, string> = {
  open:        'Açık',
  appointment: 'Randevuyla',
  archive:     'Yalnızca Arşiv',
};

const VISIT_DOT: Record<string, string> = {
  open:        '#2D6A4F',
  appointment: '#8A4A1F',
  archive:     '#888',
};

const INTERVAL_MS = 7000;

export function FeaturedStoryBlock() {
  const [idx, setIdx]       = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback((next: number) => {
    setVisible(false);
    setTimeout(() => {
      setIdx(next);
      setVisible(true);
    }, 220);
  }, []);

  const prev = useCallback(() => {
    goTo((idx - 1 + ALL_STOPS.length) % ALL_STOPS.length);
  }, [idx, goTo]);

  const next = useCallback(() => {
    goTo((idx + 1) % ALL_STOPS.length);
  }, [idx, goTo]);

  /* Otomatik ilerleme */
  useEffect(() => {
    if (paused) return;
    intervalRef.current = setInterval(() => {
      setIdx((prev) => (prev + 1) % ALL_STOPS.length);
      setVisible(true);
    }, INTERVAL_MS);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [paused, idx]);

  /* Progress bar animasyonu — index değişince sıfırla */
  useEffect(() => {
    if (!progressRef.current || paused) return;
    const el = progressRef.current;
    el.style.transition = 'none';
    el.style.width = '0%';
    // reflow tetikle
    void el.offsetWidth;
    el.style.transition = `width ${INTERVAL_MS}ms linear`;
    el.style.width = '100%';
  }, [idx, paused]);

  const stop = ALL_STOPS[idx];

  return (
    <section
      aria-labelledby="stops-section-title"
      className="relative bg-paper"
    >
      <div className="mx-auto max-w-layout px-5 py-20 md:px-8 md:py-28">

        {/* Başlık şeridi */}
        <div className="mb-14 border-b border-ink/15 pb-10">
          <p className="archive-label text-ink/50">Arşiv İncelemesi · Durak Notları</p>
          <h2
            id="stops-section-title"
            className="display-2 mt-3 text-3xl text-ink md:text-4xl lg:text-[3.2rem]"
          >
            Saha{' '}
            <span className="italic" style={{ color: 'var(--atlas-red-deep, #5C3B8E)' }}>
              Gözlemleri.
            </span>
          </h2>
          <p className="mt-4 max-w-[52ch] text-base leading-relaxed text-ink/60 md:text-[1.05rem]">
            Her adres bir zanaat, her zanaat bir kentin direneğidir. Beş katmandan
            yirmi üç durak — otomatik döngü.
          </p>
        </div>

        {/* Kart alanı */}
        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Progress bar */}
          <div className="mb-5 h-[2px] w-full overflow-hidden rounded-full bg-ink/8">
            <div
              ref={progressRef}
              className="h-full rounded-full"
              style={{ backgroundColor: stop.colorHex, width: '0%' }}
            />
          </div>

          {/* Tek kart */}
          <article
            className="relative rounded-2xl border bg-paper-light p-7 shadow-paper
                       transition-all duration-200 md:p-9"
            style={{
              borderColor: `color-mix(in oklab, ${stop.colorHex} 22%, rgba(20,20,20,0.10))`,
              borderLeftColor: stop.colorHex,
              borderLeftWidth: 4,
              opacity:    visible ? 1 : 0,
              transform:  visible ? 'translateY(0)' : 'translateY(8px)',
              transition: 'opacity 220ms ease, transform 220ms ease, border-color 400ms ease',
            }}
          >
            {/* Üst satır: zanaat etiketi + katman rozeti */}
            <div className="mb-4 flex items-center justify-between gap-4">
              <p
                className="text-[0.62rem] font-semibold uppercase tracking-[0.2em]"
                style={{ color: stop.colorHex }}
              >
                {stop.craft} · {stop.layerTitle}
              </p>
              <span
                className="shrink-0 rounded-full px-3 py-1 text-[0.62rem] font-semibold
                           uppercase tracking-[0.18em] whitespace-nowrap"
                style={{
                  backgroundColor: `${stop.colorHex}12`,
                  color: stop.colorHex,
                  border: `1px solid ${stop.colorHex}28`,
                }}
              >
                K{stop.layerNumber}
              </span>
            </div>

            {/* Numara + başlık */}
            <div className="flex items-start gap-5">
              <span
                className="shrink-0 font-display text-[3.5rem] font-bold leading-none
                           tabular-nums md:text-[4.5rem]"
                style={{ color: `${stop.colorHex}30` }}
              >
                {String(stop.globalNum).padStart(2, '0')}
              </span>
              <div className="min-w-0 pt-1">
                <h3 className="font-display text-2xl font-semibold tracking-tight text-ink md:text-3xl">
                  {stop.name}
                </h3>
                <p className="mt-1 text-sm text-ink/50">{stop.district}</p>
              </div>
            </div>

            {/* Hikaye notu */}
            <p className="mt-5 max-w-[68ch] text-[0.95rem] leading-relaxed text-ink/70 md:text-base">
              {stop.note}
            </p>

            {/* Alt aksiyonlar */}
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1
                           text-[0.7rem] font-medium"
                style={{
                  backgroundColor: `${VISIT_DOT[stop.visit]}15`,
                  color: VISIT_DOT[stop.visit],
                  border: `1px solid ${VISIT_DOT[stop.visit]}30`,
                }}
              >
                <span
                  className="block h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: VISIT_DOT[stop.visit] }}
                />
                {VISIT_LABEL[stop.visit]}
              </span>

              <Link
                href={`/atlas/${stop.layerSlug}`}
                className="text-[0.78rem] underline-offset-4 transition-colors duration-150
                           hover:underline"
                style={{ color: stop.colorHex }}
              >
                Harita {stop.layerNumber} &rarr;
              </Link>
            </div>

            {/* Duraklat bildirimi */}
            {paused && (
              <span
                className="absolute right-4 top-4 rounded-full px-2.5 py-1
                           text-[0.62rem] font-medium uppercase tracking-[0.14em]
                           bg-ink/6 text-ink/35 border border-ink/10"
              >
                Duraklı
              </span>
            )}
          </article>

          {/* Alt nav: geri · sayaç · ileri */}
          <div className="mt-6 flex items-center justify-between gap-4">
            {/* Geri */}
            <button
              type="button"
              onClick={prev}
              aria-label="Önceki durak"
              className="flex h-10 w-10 items-center justify-center rounded-full border
                         border-ink/15 bg-paper-light text-ink/40 transition-all duration-200
                         hover:border-ink/30 hover:text-ink"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5"
                      strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {/* Sayaç + layer dots */}
            <div className="flex flex-col items-center gap-2">
              <span className="text-[0.72rem] tabular-nums text-ink/40">
                {String(idx + 1).padStart(2, '0')} / {ALL_STOPS.length}
              </span>
              {/* Katman göstergesi: 5 ince çizgi */}
              <div className="flex items-center gap-1">
                {['#5C3B8E','#8A4A1F','#2D6A4F','#7A3B2E','#1A6B5C'].map((c, li) => {
                  const layerNum = String(li + 1).padStart(2, '0');
                  const isCurrentLayer = stop.layerNumber === layerNum;
                  return (
                    <span
                      key={c}
                      className="block h-1 rounded-full transition-all duration-400"
                      style={{
                        width:           isCurrentLayer ? 24 : 8,
                        backgroundColor: isCurrentLayer ? c : `${c}35`,
                      }}
                    />
                  );
                })}
              </div>
            </div>

            {/* İleri */}
            <button
              type="button"
              onClick={next}
              aria-label="Sonraki durak"
              className="flex h-10 w-10 items-center justify-center rounded-full border
                         border-ink/15 bg-paper-light text-ink/40 transition-all duration-200
                         hover:border-ink/30 hover:text-ink"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5"
                      strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Alt CTA */}
        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-ink/15 pt-8">
          <p className="text-sm text-ink/50">
            {ALL_STOPS.length} durak · 5 katman · saha doğrulaması bekleniyor
          </p>
          <Link
            href="/atlas"
            className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-5 py-2.5
                       text-sm text-ink/70 transition-all duration-200
                       hover:border-ink/40 hover:bg-paper-light hover:text-ink"
          >
            Tüm atlası gör
            <AtlasIconArrow />
          </Link>
        </div>
      </div>
    </section>
  );
}
