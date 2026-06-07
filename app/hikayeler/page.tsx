import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { AtlasButton, AtlasIconArrow } from '@/components/ui/AtlasButton';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { DraftBadge } from '@/components/ui/DraftBadge';
import { LAYERS } from '@/lib/constants/layers';
import { MOCK_STORIES } from '@/lib/constants/mockStories';
import { SITE } from '@/lib/constants/site';

export const metadata: Metadata = {
  title: 'Hikâyeler · Saha Dosyaları',
  description: `${SITE.name} — Ankara'nın onarım kültürünün izini süren usta portreleri, nesne hikâyeleri ve saha araştırma günlükleri.`,
  alternates: { canonical: '/hikayeler' },
};

const STORY_TYPES: Record<string, string> = {
  'master-portrait': 'Usta Portresi',
  'object-story': 'Nesne Hikâyesi',
  'repair-technique': 'Onarım Tekniği',
  'field-journal': 'Saha Güncesi',
  'lost-crafts': 'Kayıp Zanaat',
  'atlas-update': 'Atlas Güncellemesi',
};

const CATEGORIES = [
  { key: 'all', label: 'Tümü' },
  { key: 'master-portrait', label: 'Usta Portreleri' },
  { key: 'object-story', label: 'Nesne Anlatıları' },
  { key: 'field-journal', label: 'Saha Günlükleri' },
  { key: 'repair-technique', label: 'Onarım Teknikleri' },
  { key: 'lost-crafts', label: 'Kayıp Zanaatlar' },
];

interface PageProps {
  searchParams: Promise<{ type?: string }>;
}

export default async function HikayelerPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const activeType = typeof params.type === 'string' ? params.type : 'all';

  const filteredStories = activeType === 'all'
    ? MOCK_STORIES
    : MOCK_STORIES.filter((s) => s.storyType === activeType);

  const featured = filteredStories.find((s) => s.isFeatured) ?? filteredStories[0];
  const rest = filteredStories.filter((s) => s.slug !== featured?.slug);
  const featuredLayer = featured ? LAYERS.find((l) => l.slug === featured.layerSlug) : null;

  const breadcrumb = [
    { label: 'Atlas', href: '/atlas' },
    { label: 'Hikâyeler · Saha Dosyaları' },
  ];

  return (
    <article>
      {/* Üst arşiv bandı */}
      <div className="border-b border-border/70 bg-paper">
        <div className="mx-auto flex max-w-layout items-center justify-between gap-6 px-5 py-3 text-[0.68rem] uppercase tracking-[0.22em] text-ink/55 md:px-8">
          <span>Editoryal arşiv · Saha dosyaları</span>
          <span className="hidden sm:inline">Her dosya ayrı bir izle açılır</span>
          <span className="tabular-nums">{MOCK_STORIES.length} dosya · {activeType === 'all' ? 'Tümü' : CATEGORIES.find(c => c.key === activeType)?.label}</span>
        </div>
      </div>

      <div className="mx-auto max-w-layout px-5 pt-8 md:px-8">
        <Breadcrumb items={breadcrumb} />
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-layout px-5 pb-12 pt-6 md:px-8 md:pt-10">
        <div className="grid items-end gap-8 border-b border-ink/15 pb-10 md:grid-cols-12">
          <div className="md:col-span-8">
            <p className="archive-label text-ink/55">Hikâyeler</p>
            <h1 className="display-1 mt-3 text-5xl leading-[0.95] text-ink md:text-6xl lg:text-[5.6rem]">
              Saha dosyaları.
            </h1>
            <p className="hand-note mt-4 text-xl text-ink/65 md:text-2xl">
              usta portresi · nesne hikâyesi · saha güncesi
            </p>
          </div>
          <p className="max-w-prose text-[0.97rem] leading-relaxed text-ink/75 md:col-span-4">
            Atlas haritalarının arkasındaki insan ve nesne hikâyeleri.
            Editoryal arşiv küratöryel doğrulamayla genişler; her yeni dosya
            görünmeyen bir bağı kayıt altına alır.
          </p>
        </div>
      </section>

      {/* Kategori filtreleri (interaktif) */}
      <section className="mx-auto max-w-layout px-5 pb-10 md:px-8">
        <ul className="flex flex-wrap items-center gap-2">
          {CATEGORIES.map((c) => {
            const isActive = activeType === c.key;
            const href = c.key === 'all' ? '/hikayeler' : `/hikayeler?type=${c.key}`;
            const count = c.key === 'all'
              ? MOCK_STORIES.length
              : MOCK_STORIES.filter((s) => s.storyType === c.key).length;

            return (
              <li key={c.key}>
                <Link
                  href={href}
                  className={
                    isActive
                      ? 'inline-flex items-center gap-2 rounded-full border border-ink bg-ink px-3.5 py-1.5 text-[0.72rem] font-medium tracking-wide text-paper-light cursor-pointer select-none transition-colors'
                      : 'inline-flex items-center gap-2 rounded-full border border-ink/20 bg-paper-light px-3.5 py-1.5 text-[0.72rem] font-medium tracking-wide text-ink/75 cursor-pointer select-none transition-all hover:border-ink hover:text-ink hover:shadow-sm'
                  }
                >
                  {c.label}
                  <span
                    className={
                      isActive
                        ? 'rounded-full bg-paper-light/20 px-1.5 text-[0.65rem] tabular-nums text-paper-light'
                        : 'rounded-full bg-ink/10 px-1.5 text-[0.65rem] tabular-nums text-ink/60'
                    }
                  >
                    {count}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Featured story — büyük editoryal blok */}
      {featured && (
        <section
          aria-labelledby="featured-story"
          className="border-y border-border bg-paper-light"
        >
          <div className="mx-auto grid max-w-layout grid-cols-1 gap-10 px-5 py-16 md:grid-cols-12 md:gap-14 md:px-8 md:py-20">
            <figure className="md:col-span-7">
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-ink/25 shadow-sheet">
                {featuredLayer ? (
                  <Image
                    src={featuredLayer.mapImage}
                    alt={`Harita — ${featuredLayer.title}`}
                    fill
                    sizes="(min-width: 768px) 60vw, 100vw"
                    className="object-cover opacity-95"
                    priority
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-paper">
                    <span className="archive-label text-ink/30">Görsel bekleniyor</span>
                  </div>
                )}
                {featuredLayer && (
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-1"
                    style={{ backgroundColor: featuredLayer.colorHex }}
                  />
                )}
                <span className="absolute left-3 top-3 rounded-sm bg-paper-light/90 px-2 py-1 text-[0.62rem] uppercase tracking-[0.2em] text-ink/75">
                  Öne Çıkan Dosya
                </span>
              </div>
            </figure>
            <div className="flex flex-col justify-center gap-5 md:col-span-5">
              <p className="archive-label text-ink/55">
                Saha Dosyası · {STORY_TYPES[featured.storyType] ?? 'Hikâye'}
              </p>
              <h2
                id="featured-story"
                className="display-2 text-3xl text-ink md:text-4xl lg:text-[3rem] leading-none"
              >
                {featured.title}
              </h2>
              <p className="max-w-prose text-base leading-relaxed text-ink/80 line-clamp-4">
                {featured.excerpt}
              </p>
              <div className="flex flex-wrap items-center gap-3">
                {featuredLayer && (
                  <span className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-paper px-3 py-1 text-[0.72rem] text-ink/75">
                    <span
                      aria-hidden
                      className="block h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: featuredLayer.colorHex }}
                    />
                    Katman {featuredLayer.number} · {featuredLayer.title}
                  </span>
                )}
                <span className="text-[0.72rem] uppercase tracking-[0.2em] text-ink/55">
                  {featured.readingTimeMinutes} dk okuma
                </span>
                {!featured.isPublished && <DraftBadge />}
              </div>
              <div className="pt-2">
                <AtlasButton href={`/hikayeler/${featured.slug}`} variant="primary">
                  Dosyayı Aç
                  <AtlasIconArrow />
                </AtlasButton>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Hikâye listesi */}
      <section className="mx-auto max-w-layout px-5 py-16 md:px-8 md:py-24">
        <header className="mb-10 flex items-end justify-between border-b border-ink/15 pb-6">
          <div>
            <p className="archive-label text-ink/55">Arşiv İndeksi</p>
            <h2 className="display-2 mt-2 text-3xl text-ink md:text-4xl">
              {activeType === 'all' ? 'Tüm dosyalar.' : `${CATEGORIES.find(c => c.key === activeType)?.label}.`}
            </h2>
          </div>
          <p className="hand-note text-base text-ink/55">
            {rest.length} dosya listeleniyor
          </p>
        </header>

        {rest.length > 0 ? (
          <ol className="divide-y divide-ink/10 border-y border-ink/10">
            {rest.map((story, i) => {
              const layer = LAYERS.find((l) => l.slug === story.layerSlug);
              return (
                <li key={story.slug}>
                  <Link
                    href={`/hikayeler/${story.slug}`}
                    className="group grid grid-cols-12 items-center gap-4 py-6 transition-colors hover:bg-paper-light md:py-8"
                  >
                    <span className="col-span-2 font-display text-3xl font-semibold tabular-nums text-ink/55 md:text-4xl">
                      {String(i + 2).padStart(2, '0')}
                    </span>
                    <div className="col-span-10 md:col-span-7">
                      <p className="archive-label text-ink/55">
                        {STORY_TYPES[story.storyType] ?? 'Hikâye'}
                      </p>
                      <h3 className="mt-1 font-display text-xl font-semibold tracking-editorial text-ink transition-colors group-hover:text-[--atlas-red-deep] md:text-2xl">
                        {story.title}
                      </h3>
                      <p className="mt-1 line-clamp-2 text-[0.92rem] text-ink/65">
                        {story.excerpt}
                      </p>
                    </div>
                    <div className="col-span-12 flex items-center justify-between gap-3 md:col-span-3 md:justify-end md:text-right">
                      {layer && (
                        <span className="inline-flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.18em] text-ink/55">
                          <span
                            aria-hidden
                            className="block h-1.5 w-1.5 rounded-full"
                            style={{ backgroundColor: layer.colorHex }}
                          />
                          Harita {layer.number}
                        </span>
                      )}
                      <span className="hidden text-[0.72rem] uppercase tracking-[0.18em] text-ink/55 md:inline">
                        {story.readingTimeMinutes} dk
                      </span>
                      {!story.isPublished && <DraftBadge />}
                    </div>
                  </Link>
                </li>
              );
            })}
          </ol>
        ) : (
          <div className="py-12 text-center rounded-sm border border-dashed border-ink/20 bg-paper-light/40">
            <p className="hand-note text-lg text-ink/60">Bu kategoride listelenecek başka dosya bulunmuyor.</p>
          </div>
        )}
      </section>

      {/* Kürasyon notu */}
      <section className="border-t border-border bg-paper-deep/35">
        <div className="mx-auto max-w-layout px-5 py-16 md:px-8 md:py-20">
          <div className="grid items-end gap-8 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-7">
              <p className="archive-label text-ink/55">Kürasyon notu</p>
              <h2 className="display-2 mt-3 text-3xl text-ink md:text-4xl">
                Her hikâye, izinli bir kayıttır.
              </h2>
            </div>
            <p className="max-w-prose text-[0.97rem] leading-relaxed text-ink/75 md:col-span-5">
              Atlas editoryal arşivi akademik araştırmalar, saha ziyaretleri ve
              birebir görüşmelerle genişler. Hiçbir hikâye usta veya nesne
              sahibinin yazılı izni alınmadan yayınlanmaz. Doğrulanmamış
              dosyalar “Taslak” rozetiyle açıkça işaretlenir.
            </p>
          </div>
        </div>
      </section>
    </article>
  );
}
