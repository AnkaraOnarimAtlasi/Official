import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { DraftBadge } from '@/components/ui/DraftBadge';
import { AtlasButton, AtlasIconArrow } from '@/components/ui/AtlasButton';
import { MOCK_STORIES, storyBySlug } from '@/lib/constants/mockStories';
import { LAYERS, layerBySlug } from '@/lib/constants/layers';
import { MOCK_STOPS } from '@/lib/constants/mockStops';
import { SITE } from '@/lib/constants/site';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return MOCK_STORIES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const story = storyBySlug(slug);
  if (!story) return {};
  return {
    title: story.title,
    description: story.excerpt,
    alternates: { canonical: `/hikayeler/${slug}` },
    openGraph: {
      title: `${story.title} · ${SITE.name}`,
      description: story.excerpt,
    },
  };
}

const STORY_TYPES: Record<string, string> = {
  'master-portrait': 'Usta Portresi',
  'object-story': 'Nesne Hikâyesi',
  'repair-technique': 'Onarım Tekniği',
  'field-journal': 'Saha Güncesi',
  'lost-crafts': 'Kayıp Zanaat',
  'atlas-update': 'Atlas Güncellemesi',
};

export default async function StoryDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const story = storyBySlug(slug);
  if (!story) notFound();

  const layer = story.layerSlug ? layerBySlug(story.layerSlug) : null;
  const stop = story.stopSlug ? MOCK_STOPS.find((s) => s.slug === story.stopSlug) : null;
  const typeLabel = STORY_TYPES[story.storyType] ?? 'Hikâye';
  const accent = layer?.colorHex ?? 'var(--atlas-accent)';

  // Önceki / sonraki hikâye (basit)
  const idx = MOCK_STORIES.findIndex((s) => s.slug === story.slug);
  const next = MOCK_STORIES[(idx + 1) % MOCK_STORIES.length];
  const prev = MOCK_STORIES[(idx - 1 + MOCK_STORIES.length) % MOCK_STORIES.length];

  const breadcrumb = [
    { label: 'Atlas', href: '/atlas' },
    { label: 'Hikâyeler', href: '/hikayeler' },
    { label: story.title },
  ];

  return (
    <article>
      {/* Üst arşiv bandı */}
      <div className="border-b border-border/70 bg-paper">
        <div className="mx-auto flex max-w-layout items-center justify-between gap-6 px-5 py-3 text-[0.68rem] uppercase tracking-[0.22em] text-ink/55 md:px-8">
          <span>Saha Dosyası · {typeLabel}</span>
          {layer && (
            <span className="hidden sm:inline">Harita {layer.number} · {layer.title}</span>
          )}
          <span className="tabular-nums">{story.readingTimeMinutes} dk · taslak</span>
        </div>
      </div>

      <div className="mx-auto max-w-layout px-5 pt-8 md:px-8">
        <Breadcrumb items={breadcrumb} />
      </div>

      {/* Hero — büyük başlık, tek sütun magazine */}
      <section className="mx-auto max-w-layout px-5 pb-12 pt-6 md:px-8 md:pt-12">
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-wrap items-center gap-3">
            <span
              className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[0.72rem] uppercase tracking-[0.22em]"
              style={{
                borderColor: accent,
                color: accent,
              }}
            >
              <span
                aria-hidden
                className="block h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: accent }}
              />
              {typeLabel}
            </span>
            {!story.isPublished && <DraftBadge />}
          </div>

          <h1 className="display-1 mt-6 text-[2.6rem] leading-[0.97] text-ink sm:text-5xl md:text-6xl lg:text-[4.8rem]">
            {story.title}
          </h1>

          <p className="hand-note mt-6 text-xl text-ink/65 md:text-2xl">
            {story.excerpt}
          </p>

          <ul className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-2 border-y border-ink/15 py-3 text-[0.72rem] uppercase tracking-[0.22em] text-ink/55">
            <li className="flex items-center gap-2">
              <span>Yazar</span>
              <span className="text-ink/85 normal-case tracking-normal">Atlas saha ekibi</span>
            </li>
            <li className="flex items-center gap-2">
              <span>Süre</span>
              <span className="text-ink/85 normal-case tracking-normal tabular-nums">
                {story.readingTimeMinutes} dk
              </span>
            </li>
            {layer && (
              <li className="flex items-center gap-2">
                <span>Katman</span>
                <span className="text-ink/85 normal-case tracking-normal">
                  {layer.title}
                </span>
              </li>
            )}
            {stop && (
              <li className="flex items-center gap-2">
                <span>Durak</span>
                <span className="text-ink/85 normal-case tracking-normal">{stop.name}</span>
              </li>
            )}
          </ul>
        </div>
      </section>

      {/* Hero görsel */}
      <section className="mx-auto max-w-layout px-5 pb-16 md:px-8">
        <figure className="relative mx-auto max-w-5xl">
          <div className="relative aspect-[16/9] overflow-hidden rounded-sm border border-ink/20 bg-paper shadow-sheet">
            {layer ? (
              <Image
                src={layer.mapImage}
                alt={`Harita — ${layer.title}`}
                fill
                priority
                sizes="(min-width: 1024px) 80vw, 100vw"
                className="object-cover opacity-95"
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <span className="archive-label text-ink/30">Görsel bekleniyor</span>
              </div>
            )}
            <span
              aria-hidden
              className="absolute inset-x-0 top-0 h-1"
              style={{ backgroundColor: accent }}
            />
            <span className="absolute left-3 top-3 rounded-sm bg-paper-light/90 px-2 py-1 text-[0.62rem] uppercase tracking-[0.2em] text-ink/75 backdrop-blur-[1px]">
              {layer ? `Harita ${layer.number}` : 'Kontak baskı'} · görsel taslak
            </span>
          </div>
          <figcaption className="mt-3 flex items-center justify-between text-[0.78rem] text-ink/55">
            <span>
              {layer ? `${layer.regions.slice(0, 2).join(' · ')}` : 'Saha · konum bekleniyor'}
            </span>
            <span className="hand-note text-base normal-case" style={{ color: accent }}>
              fotoğraf bekleniyor
            </span>
          </figcaption>
        </figure>
      </section>

      {/* Gövde */}
      <section className="mx-auto max-w-layout px-5 pb-20 md:px-8 md:pb-28">
        <div className="mx-auto max-w-3xl">
          {/* Saha doğrulama uyarısı */}
          <aside
            className="mb-10 rounded-sm border-l-2 bg-paper-light px-5 py-4 text-[0.93rem] leading-relaxed text-ink/75"
            style={{ borderColor: accent }}
          >
            <p className="archive-label" style={{ color: accent }}>
              Saha durumu
            </p>
            <p className="mt-2">
              Bu dosya saha doğrulaması ve röportaj deşifre aşamasındadır. Usta
              rızası ve fotoğraf izni alındıktan sonra özgün editoryal metin,
              ses kayıtları ve arşiv belgeleri bu alanda yayınlanır.
            </p>
          </aside>

          {/* Drop-cap'li gövde */}
          <div className="space-y-7 text-[1.02rem] leading-[1.75] text-ink/85">
            <p className="font-display text-xl leading-snug text-ink md:text-2xl">
              <span
                className="float-left mr-3 mt-1 font-display text-6xl font-bold leading-[0.85]"
                style={{ color: accent }}
              >
                {story.title.charAt(0)}
              </span>
              {story.excerpt}
            </p>
            <p className="whitespace-pre-line">{story.body}</p>
            <p className="text-ink/65">
              Ankara Onarım Atlası, görünmeyen onarım ağlarını izinli kayıtla
              belgeler. Hiçbir usta, atölye veya bireysel hikâye doğrulama ve
              rıza alınmadan yayına çıkmaz. Bu dosya yayına alındığında bu uyarı
              kalkar.
            </p>
          </div>

          {/* Pull-quote */}
          <blockquote
            className="my-12 border-l-2 pl-6 font-display text-2xl italic leading-snug text-ink/85 md:text-3xl"
            style={{ borderColor: accent }}
          >
            “Onarmak, nesneye bir cümle daha söyletmektir.”
            <footer className="mt-3 text-[0.78rem] not-italic uppercase tracking-[0.22em] text-ink/55">
              — Saha defteri · ön deşifre
            </footer>
          </blockquote>

          {/* Bağlantılı belgeler */}
          {(layer || stop) && (
            <section
              aria-labelledby="related-docs"
              className="border-t border-ink/15 pt-10"
            >
              <h2
                id="related-docs"
                className="archive-label text-ink/55"
              >
                Bağlantılı belgeler
              </h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {layer && (
                  <Link
                    href={`/atlas/${layer.slug}`}
                    className="group flex items-center gap-4 rounded-sm border border-ink/15 bg-paper-light p-4 shadow-paper transition-all hover:border-ink/35 hover:shadow-sheet"
                  >
                    <span className="relative block h-16 w-16 shrink-0 overflow-hidden rounded-sm border border-ink/15">
                      <Image
                        src={layer.mapImage}
                        alt=""
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                      <span
                        aria-hidden
                        className="absolute inset-x-0 top-0 h-0.5"
                        style={{ backgroundColor: layer.colorHex }}
                      />
                    </span>
                    <span className="flex min-w-0 flex-col">
                      <span className="archive-label text-ink/55">
                        Harita {layer.number}
                      </span>
                      <span className="truncate font-display text-base font-semibold tracking-editorial text-ink">
                        {layer.title}
                      </span>
                      <span className="hand-note text-sm text-ink/55">
                        {layer.subtitle}
                      </span>
                    </span>
                    <AtlasIconArrow className="ml-auto text-ink/40 transition-colors group-hover:text-ink" />
                  </Link>
                )}
                {stop && (
                  <div className="rounded-sm border border-ink/15 bg-paper-light p-4 shadow-paper">
                    <p className="archive-label text-ink/55">Durak</p>
                    <p className="mt-1 font-display text-base font-semibold tracking-editorial text-ink">
                      {stop.name}
                    </p>
                    <p className="hand-note text-sm text-ink/55">
                      {stop.craft} · {stop.district}
                    </p>
                  </div>
                )}
              </div>
            </section>
          )}
        </div>
      </section>

      {/* Önceki / sonraki */}
      <nav
        aria-label="Hikâye gezintisi"
        className="border-t border-border bg-paper-deep/35"
      >
        <div className="mx-auto grid max-w-layout grid-cols-1 gap-px overflow-hidden border-y border-ink/10 bg-ink/10 md:grid-cols-2">
          <NavCard direction="prev" story={prev} />
          <NavCard direction="next" story={next} />
        </div>
      </nav>

      {/* Geri dön + CTA */}
      <section>
        <div className="mx-auto flex max-w-layout flex-col items-center gap-4 px-5 py-12 sm:flex-row sm:justify-between md:px-8">
          <Link
            href="/hikayeler"
            className="inline-flex items-center gap-2 text-sm text-ink/70 underline-offset-4 hover:text-ink hover:underline"
          >
            <AtlasIconArrow className="rotate-180" />
            Tüm dosyalara dön
          </Link>
          <AtlasButton href="/katki-sagla" variant="primary">
            Sen de bir hikâye öner
            <AtlasIconArrow />
          </AtlasButton>
        </div>
      </section>
    </article>
  );
}

function NavCard({
  direction,
  story,
}: {
  direction: 'prev' | 'next';
  story: typeof MOCK_STORIES[number];
}) {
  const isNext = direction === 'next';
  const layer = story.layerSlug ? LAYERS.find((l) => l.slug === story.layerSlug) : null;
  return (
    <Link
      href={`/hikayeler/${story.slug}`}
      className={`group flex items-center gap-5 bg-paper-light p-6 transition-colors hover:bg-paper md:p-10 ${
        isNext ? 'md:flex-row-reverse md:text-right' : ''
      }`}
    >
      {layer && (
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-sm border border-ink/15 md:h-24 md:w-24">
          <Image src={layer.mapImage} alt="" fill sizes="96px" className="object-cover" />
          <span
            aria-hidden
            className="absolute inset-x-0 top-0 h-0.5"
            style={{ backgroundColor: layer.colorHex }}
          />
        </div>
      )}
      <div className="min-w-0 flex-1">
        <span className="archive-label text-ink/55">
          {isNext ? 'Sonraki Dosya' : 'Önceki Dosya'}
        </span>
        <h3 className="mt-1 line-clamp-2 font-display text-lg font-semibold tracking-editorial text-ink md:text-xl">
          {story.title}
        </h3>
      </div>
      <span className="hidden text-ink/40 transition-colors group-hover:text-ink md:block">
        <AtlasIconArrow className={isNext ? '' : 'rotate-180'} />
      </span>
    </Link>
  );
}
