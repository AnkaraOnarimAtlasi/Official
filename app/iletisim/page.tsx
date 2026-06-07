import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { AtlasButton, AtlasIconArrow } from '@/components/ui/AtlasButton';
import { SITE } from '@/lib/constants/site';

export const metadata: Metadata = {
  title: 'İletişim · Saha Ofisi',
  description: `${SITE.name} — Ankara Onarım Atlası araştırma ekibi ve yaratıcıları ile iletişime geçin.`,
  alternates: { canonical: '/iletisim' },
};

const TOPICS = [
  {
    title: 'Saha & araştırma',
    body: 'Yeni bir nokta önerin veya saha doğrulamasında destek olun.',
    cta: { href: '/katki-sagla', label: 'Yeni Nokta Öner' },
  },
  {
    title: 'Kurumsal & dağıtım',
    body: 'Üniversite, kütüphane veya kültür kurumu olarak basılı edisyondan set talep edin.',
    cta: { href: '/atlas-edinin', label: 'Dağıtım sayfası' },
  },
  {
    title: 'Akademik · basın',
    body: 'Proje hakkında röportaj, alıntı, makale veya iş birliği talebiniz için yazın.',
    cta: null,
  },
];

export default function IletisimPage() {
  const breadcrumb = [
    { label: 'Atlas', href: '/atlas' },
    { label: 'İletişim · Saha Ofisi' },
  ];

  return (
    <article>
      {/* Üst arşiv bandı */}
      <div className="border-b border-border/70 bg-paper">
        <div className="mx-auto flex max-w-layout items-center justify-between gap-6 px-5 py-3 text-[0.68rem] uppercase tracking-[0.22em] text-ink/55 md:px-8">
          <span>Saha Ofisi · İletişim</span>
          <span className="hidden sm:inline">Ankara · Cilt I · Edisyon 01</span>
          <span className="tabular-nums">Yanıt süresi · 5 iş günü</span>
        </div>
      </div>

      <div className="mx-auto max-w-layout px-5 pt-8 md:px-8">
        <Breadcrumb items={breadcrumb} />
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-layout px-5 pb-16 pt-6 md:px-8 md:pb-24 md:pt-12">
        <div className="grid items-end gap-10 border-b border-ink/15 pb-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-8">
            <p className="archive-label text-ink/55">Bağlantı</p>
            <h1 className="display-1 mt-3 text-5xl leading-[0.95] text-ink md:text-6xl lg:text-[5.6rem]">
              Saha ofisi
              <br />
              <span className="italic text-[--atlas-red-deep]">açıktır.</span>
            </h1>
            <p className="hand-note mt-5 text-xl text-ink/65 md:text-2xl">
              soru · öneri · iş birliği
            </p>
          </div>
          <p className="max-w-prose text-[0.97rem] leading-relaxed text-ink/75 md:col-span-4">
            Ankara Onarım Atlası bağımsız bir kent araştırması ve görsel
            iletişim tasarımı projesidir. Aşağıdaki kanaldan ekibe doğrudan
            ulaşabilirsiniz.
          </p>
        </div>
      </section>

      {/* Kartvizit + konu listesi */}
      <section className="mx-auto max-w-layout px-5 pb-20 md:px-8 md:pb-28">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          {/* Sol — kartvizit */}
          <aside className="lg:col-span-5">
            <div className="relative rounded-sm border border-ink/20 bg-paper-light p-8 shadow-paper md:p-10">
              {/* Köşe register markları */}
              <CornerMark className="left-3 top-3" />
              <CornerMark className="right-3 top-3 rotate-90" />
              <CornerMark className="bottom-3 left-3 -rotate-90" />
              <CornerMark className="bottom-3 right-3 rotate-180" />

              <p className="archive-label text-ink/55">Kartvizit · Saha ofisi</p>

              {/* 5 katman rozeti */}
              <div className="mt-4 flex gap-1">
                <span className="block h-1.5 w-10 rounded-sm bg-[var(--layer-paper-arts)]" />
                <span className="block h-1.5 w-10 rounded-sm bg-[var(--layer-object-repair)]" />
                <span className="block h-1.5 w-10 rounded-sm bg-[var(--layer-traditional-crafts)]" />
                <span className="block h-1.5 w-10 rounded-sm bg-[var(--layer-metal-wood)]" />
                <span className="block h-1.5 w-10 rounded-sm bg-[var(--layer-memory-repair)]" />
              </div>

              <h2 className="mt-6 font-display text-3xl font-semibold tracking-editorial text-ink md:text-4xl">
                Ankara Onarım Atlası
              </h2>
              <p className="hand-note mt-1 text-base text-ink/55">
                Cilt I · Edisyon 01 · 2025–2026
              </p>

              <dl className="mt-8 space-y-5 border-t border-ink/15 pt-6 text-sm">
                <Field
                  label="Proje sahipleri"
                  value="Pelin Çetintaş"
                />
                <Field
                  label="E-posta"
                  value={
                    <a
                      href="mailto:info@ankaraonarimatlasi.com"
                      className="font-medium text-ink underline underline-offset-4 hover:text-[--atlas-red-deep]"
                      style={{ fontFamily: 'var(--font-patrick)' }}
                    >
                      info@ankaraonarimatlasi.com
                    </a>
                  }
                />
                <Field
                  label="Saha alanı"
                  value="Ankara · Ulus · Samanpazarı · pasajlar · tarihî kent merkezi"
                />
                <Field
                  label="Yanıt süresi"
                  value="Genelde 5 iş günü içinde"
                />
              </dl>

              <p className="mt-8 border-t border-ink/15 pt-5 text-[0.78rem] uppercase tracking-[0.22em] text-ink/45">
                {SITE.url.replace(/^https?:\/\//, '')}
              </p>
            </div>
          </aside>

          {/* Sağ — konu listesi */}
          <div className="lg:col-span-7">
            <h2 className="display-2 text-3xl text-ink md:text-4xl lg:text-[3rem]" style={{ lineHeight: '1.15' }}>
              Hangi konuda yazmak istersin?
            </h2>
            <p className="mt-3 max-w-prose text-[0.97rem] leading-relaxed text-ink/75">
              Aşağıdaki üç konu sahanın çoğunu kapsar. Doğru kanaldan yazmak
              yanıt süresini kısaltır.
            </p>

            <ol className="mt-8 divide-y divide-ink/15 border-y border-ink/15">
              {TOPICS.map((t, i) => (
                <li key={t.title} className="grid grid-cols-12 items-center gap-6 py-6 md:py-8">
                  <span className="col-span-2 font-display text-3xl font-semibold tabular-nums text-ink/55 md:text-4xl">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="col-span-10 md:col-span-7">
                    <h3 className="font-display text-xl font-semibold tracking-editorial text-ink md:text-2xl">
                      {t.title}
                    </h3>
                    <p className="mt-2 max-w-prose text-[0.95rem] leading-relaxed text-ink/75">
                      {t.body}
                    </p>
                  </div>
                  <div className="col-span-12 md:col-span-3 md:justify-self-end">
                    {t.cta ? (
                      <Link
                        href={t.cta.href}
                        className="inline-flex items-center gap-2 text-sm font-medium text-ink underline-offset-4 hover:text-[--atlas-red-deep] hover:underline"
                      >
                        {t.cta.label}
                        <AtlasIconArrow />
                      </Link>
                    ) : (
                      <span className="text-[0.78rem] uppercase tracking-[0.22em] text-ink/55">
                        E-posta ile yazın
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-10 flex flex-wrap gap-3">
              <AtlasButton href="mailto:info@ankaraonarimatlasi.com" variant="primary">
                E-posta Yaz
                <AtlasIconArrow />
              </AtlasButton>
              <AtlasButton href="/katki-sagla" variant="secondary">
                Yeni Nokta Öner
              </AtlasButton>
            </div>
          </div>
        </div>
      </section>

      {/* Alt not */}
      <section className="border-t border-border bg-paper-deep/40">
        <div className="mx-auto grid max-w-layout grid-cols-1 gap-10 px-5 py-14 md:grid-cols-12 md:gap-16 md:px-8 md:py-20">
          <div className="md:col-span-7">
            <p className="archive-label text-ink/55">Gizlilik notu</p>
            <h2 className="display-2 mt-3 text-2xl text-ink md:text-3xl">
              Yazışmalar yalnızca proje kapsamında kullanılır.
            </h2>
          </div>
          <p className="max-w-prose text-[0.95rem] leading-relaxed text-ink/75 md:col-span-5">
            Bize ulaştığınız bilgiler yalnızca atlas iletişimi için saklanır;
            üçüncü taraflarla paylaşılmaz. Talep ettiğinizde silinir. Atlas
            yaşayan bir sistemdir; size yanıt verdiğimizde, ağa bir bağ daha
            eklemiş olursunuz.
          </p>
        </div>
      </section>
    </article>
  );
}

function Field({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div>
      <dt className="archive-label text-ink/55">{label}</dt>
      <dd className="mt-1 text-[0.98rem] text-ink/85">{value}</dd>
    </div>
  );
}

function CornerMark({ className = '' }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      className={`absolute text-ink/45 ${className}`}
    >
      <path d="M1 1h6M1 1v6" />
    </svg>
  );
}
