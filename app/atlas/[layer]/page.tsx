import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { AtlasButton, AtlasIconArrow } from '@/components/ui/AtlasButton';
import { StopCards } from '@/components/atlas/StopCards';
import type { StopItem } from '@/components/atlas/StopCards';
import { LAYERS, layerBySlug } from '@/lib/constants/layers';
import { SITE } from '@/lib/constants/site';

/* ---------- Static params ---------- */

export function generateStaticParams() {
  return LAYERS.map((l) => ({ layer: l.slug }));
}

/* ---------- Dynamic metadata ---------- */

interface PageProps {
  params: Promise<{ layer: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { layer: slug } = await params;
  const layer = layerBySlug(slug);
  if (!layer) return {};

  return {
    title: `${layer.title} — Harita ${layer.number}`,
    description: layer.description,
    alternates: { canonical: `/atlas/${slug}` },
    openGraph: {
      title: `${layer.title} · ${SITE.name}`,
      description: layer.description,
    },
  };
}

/* ---------- Inline placeholder stops (draft) ---------- */

function getStops(layerSlug: string): StopItem[] {
  const map: Record<string, StopItem[]> = {
    'kagit-sanati': [
      { name: 'Mücellit · Adilhan tezgâhı', craft: 'Mücellit', district: 'Ulus · Adilhan', note: 'Cilt onarımı ve sayfa dikişi; yarım asırlık tezgâh.', visit: 'open' },
      { name: 'Hat atölyesi', craft: 'Hat', district: 'Hamamönü', note: 'Reed kalemler, mürekkep, çırak dengesi.', visit: 'appointment' },
      { name: 'Tezhip stüdyosu', craft: 'Tezhip', district: 'Adilhan Çarşısı', note: 'Altın varak ve mineral pigmentlerle süsleme.', visit: 'appointment' },
      { name: 'Kırtasiyeci · sayfa hafızası', craft: 'Kitap & kırtasiye', district: 'Altındağ', note: 'Eski defter, kalem, mürekkep arşivi.', visit: 'open' },
    ],
    'nesneyi-onaranlar': [
      { name: 'Kasket tamircisi', craft: 'Şapka yapımı', district: 'Ulus', note: 'Şapkanın kalıbına ikinci hayat veren bir cep dükkânı.', visit: 'open' },
      { name: 'Saat ustası', craft: 'Analog mekanizma', district: 'Kale İçi', note: 'Yay, zemberek, taş — mikro mekanik müdahale.', visit: 'appointment' },
      { name: 'Deri atölyesi', craft: 'Deri işçiliği', district: 'Kök Çarşısı', note: 'Kayış, kemer, çanta restorasyonu.', visit: 'open' },
      { name: 'Enstrüman onarımı', craft: 'Müzik enstrümanı', district: 'Çayyolu', note: 'Akort, gövde, tel — ses bakım çalışmaları.', visit: 'appointment' },
      { name: 'Gözlük tamircisi', craft: 'Tamir atölyesi', district: 'Ulus', note: 'Vida, menteşe, çerçeve onarımı.', visit: 'open' },
      { name: 'Mekanik bakım', craft: 'Tamir atölyesi', district: 'Kale İçi', note: 'Eski yelpazelerden traş makinelerine bakım.', visit: 'open' },
    ],
    'geleneksel-el-sanatlari': [
      { name: 'Halı dokuma atölyesi', craft: 'Dokuma (halı)', district: 'Hacı Bayram', note: 'Yün, doğal boya, geleneksel motif.', visit: 'appointment' },
      { name: 'Çini ustası', craft: 'Çini (seramik)', district: 'Samanpazarı', note: 'Sırlı yüzey, mineral renk, fırın.', visit: 'appointment' },
      { name: 'Cam üfleme atölyesi', craft: 'Cam sanatı', district: 'Aziziye', note: 'Sıcak cam, üflemeli formlar.', visit: 'appointment' },
      { name: 'Hasır örgücü', craft: 'Hasır-söğüt', district: 'Ayrancı', note: 'Söğüt çubuğu, sepet, hasır.', visit: 'open' },
      { name: 'Korkyama (patchwork)', craft: 'Korkyama', district: 'Samanpazarı', note: 'Yamamayla yeniden kurulan kumaş.', visit: 'open' },
      { name: 'Kilim dokuma', craft: 'Dokuma', district: 'Hacı Bayram', note: 'Düz dokuma, geleneksel desen.', visit: 'appointment' },
    ],
    'metal-ahsap': [
      { name: 'Bıçakçı dükkânı', craft: 'Bıçakçı', district: 'Hacı Bayram', note: 'Su verme, bileme, kabza işleme.', visit: 'open' },
      { name: 'Tesbih ustası', craft: 'Tesbih', district: 'Kale', note: 'Kemik, gümüş, oltu — tane tane el işi.', visit: 'appointment' },
      { name: 'Ahşap oymacı', craft: 'Oyma', district: 'Gölbaşı', note: 'Şamdandan dolaba — geleneksel motifler.', visit: 'appointment' },
      { name: 'Sedef işlemecisi', craft: 'Sedef', district: 'Ayrancı', note: 'İnce kakma, parlatma, ahşap üzerine sedef.', visit: 'archive' },
    ],
    /* Katman 05 — haritadan okunan gerçek ustalar */
    'hafizayi-onaranlar': [
      {
        name: 'Antika Radyocu · Tuncay Usta',
        craft: 'Radyo & plak tamiri',
        district: 'Çankaya · Mahmut Esat Bozkurt Cd.',
        note: "General Elektronik imzalı antika radyolar ve plak çalarlar; Tuncay Usta'nın elleri şehrin ses hafızasını tamir eder.",
        visit: 'open',
      },
      {
        name: 'Ankara Kukla ve Karagöz Atölyesi',
        craft: 'Kukla & gölge oyunu',
        district: 'Altındağ · Beşikkaya',
        note: "Şafak Yılmaz'ın 2015'te kurduğu atölye; deriden kesilmiş Karagöz figürleri ve kukla yapım eğitimi.",
        visit: 'appointment',
      },
      {
        name: 'Tek Flaş · Hüseyin Usta',
        craft: 'Analog fotoğraf makinesi tamiri',
        district: 'Kızılay · Balkanoğlu İşhanı',
        note: "Menekşe Sokak'ta yarım asrı aşkın süredir analog makinelere hayat veren karanlık oda ve tamir tezgâhı.",
        visit: 'open',
      },
    ],
  };
  return map[layerSlug] ?? [];
}

/* ---------- Page ---------- */

export default async function LayerDetailPage({ params }: PageProps) {
  const { layer: slug } = await params;
  const layer = layerBySlug(slug);
  if (!layer) notFound();

  const stops = getStops(slug);
  const idx = LAYERS.findIndex((l) => l.slug === slug);
  const next = LAYERS[(idx + 1) % LAYERS.length];
  const prev = LAYERS[(idx - 1 + LAYERS.length) % LAYERS.length];

  return (
    <article>
      {/* Üst arşiv bandı */}
      <div className="border-b border-border/70 bg-paper">
        <div className="mx-auto flex max-w-layout items-center justify-between gap-6 px-5 py-3 text-[0.68rem] uppercase tracking-[0.22em] text-ink/55 md:px-8">
          <span>Atlas · Harita {layer.number}</span>
          <span className="hidden sm:inline">{layer.regions.slice(0, 3).join(' → ')}</span>
          <span className="tabular-nums">{stops.length} durak · taslak</span>
        </div>
      </div>

      {/* Hero — split: harita görseli + başlık */}
      <section
        aria-labelledby="layer-title"
        className="relative isolate overflow-hidden border-b border-border bg-paper-light"
      >
        <div className="mx-auto grid max-w-layout grid-cols-1 gap-10 px-5 pb-16 pt-12 md:px-8 md:pb-24 md:pt-16 lg:grid-cols-12 lg:gap-16">
          {/* Sol — başlık */}
          <div className="lg:col-span-6 lg:pt-10">
            <p className="archive-label" style={{ color: layer.colorHex }}>
              Harita {layer.number} · {layer.shortTitle}
            </p>
            <h1
              id="layer-title"
              className="display-1 mt-5 text-5xl leading-[0.95] text-ink sm:text-6xl lg:text-[5.6rem]"
            >
              {layer.title}
            </h1>
            <p className="hand-note mt-6 text-xl text-ink/65 md:text-2xl">
              {layer.subtitle}
            </p>
            <p className="mt-8 max-w-prose text-base leading-relaxed text-ink/80 md:text-[1.05rem]">
              {layer.description}
            </p>

            {/* Şartname tablosu */}
            <dl className="mt-9 grid grid-cols-2 gap-x-8 gap-y-3 border-t border-ink/15 pt-6 text-sm sm:grid-cols-4">
              <Stat label="Durak" value={`${stops.length}+`} />
              <Stat label="Bölge" value={String(layer.regions.length)} />
              <Stat label="Zanaat" value={String(layer.crafts.length)} />
              <Stat label="Durum" value="Taslak" />
            </dl>

            <div className="mt-10 flex flex-wrap gap-3">
              <AtlasButton href="/rotalar" variant="primary">
                Rotayı Başlat
                <AtlasIconArrow />
              </AtlasButton>
              <AtlasButton href="/atlas" variant="secondary">
                Tüm atlas
              </AtlasButton>
            </div>
          </div>

          {/* Sağ — büyük harita */}
          <figure className="lg:col-span-6">
            <div
              className="relative aspect-[5/6] overflow-hidden rounded-sm border border-ink/25 bg-paper shadow-sheet"
            >
              <Image
                src={layer.mapImage}
                alt={`Harita ${layer.number}: ${layer.title}`}
                fill
                priority
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-1.5"
                style={{ backgroundColor: layer.colorHex }}
              />
              <span className="absolute left-3 top-3 inline-flex items-center gap-2 rounded-sm bg-paper-light/90 px-2 py-1 text-[0.62rem] uppercase tracking-[0.2em] text-ink/75 backdrop-blur-[1px]">
                <span
                  aria-hidden
                  className="block h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: layer.colorHex }}
                />
                Harita {layer.number}
              </span>
              {/* Mock hotspots */}
              {[
                { x: 30, y: 30 },
                { x: 62, y: 48 },
                { x: 78, y: 70 },
                { x: 22, y: 70 },
                { x: 50, y: 80 },
              ].slice(0, stops.length).map((p, i) => (
                <span
                  key={i}
                  aria-hidden
                  className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-paper-light shadow-paper"
                  style={{
                    left: `${p.x}%`,
                    top: `${p.y}%`,
                    backgroundColor: layer.colorHex,
                  }}
                />
              ))}
              <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between border-t border-ink/15 bg-paper-light/95 px-4 py-2 text-[0.7rem] uppercase tracking-[0.18em] text-ink/65">
                <span>{layer.regions.slice(0, 3).join(' · ')}</span>
                <span className="hand-note text-base normal-case tracking-normal" style={{ color: layer.colorHex }}>
                  {layer.shortTitle}
                </span>
              </figcaption>
            </div>
          </figure>
        </div>
      </section>

      {/* Bölüm I — Duyusal tema (atmosphere strip) */}
      <section
        aria-labelledby="sensory-title"
        className="border-b border-border"
        style={{
          background: `linear-gradient(180deg, var(--atlas-paper) 0%, color-mix(in oklab, ${layer.colorHex} 8%, var(--atlas-paper)) 100%)`,
        }}
      >
        <div className="mx-auto max-w-layout px-5 py-20 md:px-8 md:py-24">
          <div className="grid gap-10 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-4">
              <p className="archive-label text-ink/55">Bölüm I</p>
              <h2
                id="sensory-title"
                className="display-2 mt-3 text-3xl text-ink md:text-4xl lg:text-[3rem]"
              >
                Duyusal tema.
              </h2>
            </div>
            <div className="md:col-span-8">
              <p className="font-display text-2xl leading-snug text-ink/90 md:text-3xl">
                <span className="italic" style={{ color: layer.colorHex }}>
                  {layer.sensoryTheme}
                </span>
              </p>
              <ul className="mt-8 flex flex-wrap gap-2">
                {layer.crafts.map((c) => (
                  <li
                    key={c}
                    className="rounded-full border border-ink/20 bg-paper-light px-3 py-1 text-[0.78rem] text-ink/75"
                  >
                    {c}
                  </li>
                ))}
              </ul>
              <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-[0.78rem] uppercase tracking-[0.2em] text-ink/55">
                {layer.regions.map((r) => (
                  <li key={r} className="flex items-center gap-2">
                    <span
                      aria-hidden
                      className="block h-1 w-3"
                      style={{ backgroundColor: layer.colorHex }}
                    />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Bölüm II — Duraklar (glass cards) */}
      <section
        aria-labelledby="stops-title"
        className="border-b border-border relative overflow-hidden"
        style={{
          background: `linear-gradient(160deg,
            color-mix(in oklab, ${layer.colorHex} 5%, var(--atlas-paper)) 0%,
            var(--atlas-paper) 40%,
            color-mix(in oklab, ${layer.colorHex} 3%, var(--atlas-paper)) 100%)`,
        }}
      >
        {/* Arka plan dekor: büyük renk dairesi */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full blur-[120px]"
          style={{
            background: `color-mix(in oklab, ${layer.colorHex} 12%, transparent)`,
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-20 -left-20 h-[300px] w-[300px] rounded-full blur-[80px]"
          style={{
            background: `color-mix(in oklab, ${layer.colorHex} 8%, transparent)`,
          }}
        />

        <div className="relative mx-auto max-w-layout px-5 py-20 md:px-8 md:py-28">
          <header className="grid items-end gap-8 border-b pb-10 md:grid-cols-12"
            style={{ borderColor: `color-mix(in oklab, ${layer.colorHex} 20%, rgba(20,20,20,0.10))` }}
          >
            <div className="md:col-span-7">
              <p className="archive-label text-ink/55">Bölüm II</p>
              <h2 id="stops-title" className="display-2 mt-3 text-4xl text-ink md:text-5xl lg:text-6xl">
                Harita üzerindeki duraklar.
              </h2>
            </div>
            <div className="md:col-span-5">
              <p className="hand-note text-lg text-ink/60">
                Kartlara tıklayarak detay bilgisini aç. Duraklar saha doğrulamasında.
              </p>
              <p className="mt-2 archive-label text-ink/45">
                Tıkla · detayı aç · kapat
              </p>
            </div>
          </header>

          <StopCards stops={stops} colorHex={layer.colorHex} />

          <p
            className="mt-10 max-w-prose rounded-xl px-5 py-4 text-[0.92rem] leading-relaxed text-ink/65"
            style={{
              background: 'rgba(255,255,255,0.60)',
              backdropFilter: 'blur(8px)',
              border: `1px solid rgba(20,20,20,0.08)`,
            }}
          >
            <strong className="text-ink">Saha kuralı:</strong> Adres, telefon ve
            kişi fotoğrafları yalnızca ustanın yazılı izniyle yayınlanır.
            Doğrulanmamış bilgiler atlasa girmez.
          </p>
        </div>
      </section>

      {/* Bölüm III — İlgili hikâyeler placeholder */}
      <section aria-labelledby="related-title">
        <div className="mx-auto max-w-layout px-5 py-20 md:px-8 md:py-28">
          <header className="grid items-end gap-8 border-b border-ink/15 pb-10 md:grid-cols-12">
            <div className="md:col-span-7">
              <p className="archive-label text-ink/55">Bölüm III</p>
              <h2 id="related-title" className="display-2 mt-3 text-4xl text-ink md:text-5xl lg:text-6xl">
                İlgili hikâyeler.
              </h2>
            </div>
            <p className="hand-note max-w-prose text-lg text-ink/60 md:col-span-5">
              Saha doğrulaması tamamlandıkça hikâyeler bu alanda yayınlanır.
            </p>
          </header>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <article
                key={i}
                className="flex flex-col gap-3 rounded-sm border border-dashed border-ink/25 bg-paper-light/70 p-6"
              >
                <span className="archive-label text-ink/45">Hikâye · taslak</span>
                <span className="block aspect-[4/3] rounded-sm border border-ink/15 bg-paper" />
                <p className="font-display text-lg font-semibold tracking-editorial text-ink/70">
                  Yakında yayınlanacak
                </p>
                <p className="text-[0.9rem] leading-relaxed text-ink/55">
                  {layer.title} katmanına ait usta portresi · saha doğrulaması bekleniyor.
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Önceki / sonraki harita */}
      <nav
        aria-label="Harita gezintisi"
        className="border-t border-border bg-paper-deep/35"
      >
        <div className="mx-auto grid max-w-layout grid-cols-1 gap-px overflow-hidden border-y border-ink/10 bg-ink/10 md:grid-cols-2">
          <HaritaNav direction="prev" layer={prev} />
          <HaritaNav direction="next" layer={next} />
        </div>
      </nav>
    </article>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="archive-label text-ink/55">{label}</dt>
      <dd className="mt-1 font-display text-2xl text-ink tabular-nums">{value}</dd>
    </div>
  );
}

function HaritaNav({
  direction,
  layer,
}: {
  direction: 'prev' | 'next';
  layer: typeof LAYERS[number];
}) {
  const isNext = direction === 'next';
  return (
    <Link
      href={`/atlas/${layer.slug}`}
      className={`group relative flex items-center gap-6 bg-paper-light p-6 transition-colors hover:bg-paper md:p-10 ${
        isNext ? 'md:flex-row-reverse md:text-right' : ''
      }`}
    >
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-sm border border-ink/15 md:h-28 md:w-28">
        <Image src={layer.mapImage} alt="" fill sizes="112px" className="object-cover" />
        <span
          aria-hidden
          className="absolute inset-x-0 top-0 h-1"
          style={{ backgroundColor: layer.colorHex }}
        />
      </div>
      <div className="min-w-0 flex-1">
        <span className="archive-label text-ink/55">
          {isNext ? 'Sonraki Harita' : 'Önceki Harita'}
        </span>
        <h3 className="mt-1 font-display text-2xl font-semibold tracking-editorial text-ink md:text-3xl">
          {layer.title}
        </h3>
        <p className="hand-note text-base text-ink/55">{layer.subtitle}</p>
      </div>
      <span className="hidden text-ink/40 transition-transform group-hover:text-ink md:block">
        <AtlasIconArrow className={isNext ? '' : 'rotate-180'} />
      </span>
    </Link>
  );
}
