import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { AtlasButton, AtlasIconArrow } from '@/components/ui/AtlasButton';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { LAYERS } from '@/lib/constants/layers';
import { SITE } from '@/lib/constants/site';

export const metadata: Metadata = {
  title: 'Proje · Saha Dosyası',
  description: `${SITE.name} — Ankara'daki görünmeyen niş onarım, zanaat ve bakım ağlarını haritalayan kent hafızası projesinin saha dosyası.`,
  alternates: { canonical: '/proje' },
};

const PROBLEMS = [
  {
    n: '01',
    label: 'Algısal Kopuş',
    title: 'Görünmeyen kent.',
    body: 'Ankara, özellikle genç kuşak için planlı semtler ve tüketim merkezlerinden ibaret algılanır. Oysa arka sokaklarda, eski pasajlarda kaybolmaya yüz tutmuş derin bir zanaat katmanı çalışır.',
  },
  {
    n: '02',
    label: 'Tek Tipleşme',
    title: 'Hızlı tüketim.',
    body: 'Bozulan nesne onarılmak yerine değiştirilir. Bu, nesnelerle kurulan kişisel bağı zayıflatır. Onarım, nesnenin hikâyesini ve kullanıcının biricikliğini sürdürmenin yoludur.',
  },
  {
    n: '03',
    label: 'Ekolojik Boşluk',
    title: 'Sürdürülebilirlik · soyut kalır.',
    body: 'Genç kullanıcılar ekolojik kaygıyı taşır ama bozulan bir nesneyle ne yapacaklarını bilmez. Atlas, soyut mesajların yerine somut bir kent kılavuzu sunar.',
  },
];

const GOALS = [
  {
    n: '01',
    title: 'Alternatif kent okuması',
    body: 'Ankara’yı yalnızca yeni inşa edilenler üzerinden değil; onarılan, korunan ve yaşatılan zanaat noktaları üzerinden okutmak.',
  },
  {
    n: '02',
    title: 'Niş küratörlük',
    body: 'Her dükkânı listeleyen sıradan bir rehber değil; uzmanlık, hikâye ve kayboluş riski taşıyan zanaatları seçmek.',
  },
  {
    n: '03',
    title: 'Nesiller arası temas',
    body: 'Ustaları kent hafızasının taşıyıcıları olarak konumlandırıp, genç kuşağın onlardan öğrenmesini sağlamak.',
  },
  {
    n: '04',
    title: 'Kentsel aktivasyon',
    body: 'Kullanıcıyı pasif okuyucudan aktif bir kent operatörüne dönüştürmek; rotaya çıkmak, ustaya gitmek, sahaya katılmak.',
  },
];

const METHOD = [
  { phase: 'I', name: 'Saha taraması', body: 'Bölge bölge gezi, mahalle dedektifliği, esnaftan esnafa tavsiye zinciri.' },
  { phase: 'II', name: 'Doğrulama', body: 'Usta ile ön görüşme, izin alımı, fotoğraf ve detay notları.' },
  { phase: 'III', name: 'Editoryal kayıt', body: 'Hikâye, harita konumu, zanaat sınıflandırması, atlas hücresi.' },
  { phase: 'IV', name: 'Yayın & büyütme', body: 'Dijital ve basılı yayım. Kullanıcı önerileriyle ağ büyütülür.' },
];

export default function ProjePage() {
  const breadcrumb = [
    { label: 'Atlas', href: '/atlas' },
    { label: 'Proje · Saha Dosyası' },
  ];

  return (
    <article className="paper-vignette">
      {/* Üst arşiv bandı */}
      <div className="border-b border-border/70">
        <div className="mx-auto flex max-w-layout items-center justify-between gap-6 px-5 py-3 text-[0.68rem] uppercase tracking-[0.22em] text-ink/55 md:px-8">
          <span>Saha Dosyası · Proje</span>
          <span className="hidden sm:inline">Cilt I · Bölüm 00</span>
          <span className="tabular-nums">F-000 / 2026</span>
        </div>
      </div>

      <div className="mx-auto max-w-layout px-5 pt-8 md:px-8">
        <Breadcrumb items={breadcrumb} />
      </div>

      {/* Hero / Manifesto */}
      <section className="mx-auto max-w-layout px-5 pb-20 pt-8 md:px-8 md:pb-28 md:pt-14">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <p className="archive-label text-ink/55">Manifesto</p>
            <h1 className="display-1 mt-4 text-[2.6rem] leading-[0.95] text-ink sm:text-5xl md:text-6xl lg:text-[5.4rem]">
              Şehir{' '}
              <span className="italic text-[--atlas-red-deep]">inşa edilen</span>{' '}
              değil, <span className="italic">onarılarak sürdürülen</span> bir
              sistemdir.
            </h1>
            <p className="hand-note mt-7 max-w-prose text-xl text-ink/70 md:text-2xl">
              bozulanı onaran, yıprananı iyileştiren, unutulanı koruyan, nesneleri
              ve hikâyeleri hayatta tutan insanlar…
            </p>
            <p className="mt-8 max-w-prose text-base leading-relaxed text-ink/80 md:text-[1.05rem]">
              Ankara Onarım Atlası, kentin görünmeyen niş onarım ve zanaat
              ağlarını katmanlı rotalar ve dijital keşif araçları aracılığıyla
              görünür kılan; genç kullanıcıyı tüketiciden aktif kent operatörüne
              dönüştürmeyi amaçlayan bir kent hafızası projesidir.
            </p>
          </div>

          {/* Künye */}
          <aside className="lg:col-span-5 lg:pt-4">
            <div className="rounded-sm border border-ink/20 bg-paper-light p-6 shadow-paper md:p-8">
              <p className="archive-label text-ink/55">Künye</p>
              <dl className="mt-4 grid grid-cols-3 gap-3 text-sm">
                <Field label="Tür" value="Kent araştırması · görsel iletişim tasarımı" />
                <Field label="Şehir" value="Ankara" />
                <Field label="Cilt" value="01" />
                <Field label="Katman" value="04" />
                <Field label="Durak" value="20+ · saha doğrulamasında" />
                <Field label="Edisyon" value="Sınırlı · 250 set" />
                <Field label="Yıl" value="2025–2026" />
                <Field label="Sürüm" value="0.1 · prototip" />
              </dl>
              <p className="mt-6 border-t border-ink/15 pt-4 text-[0.7rem] uppercase tracking-[0.22em] text-ink/50">
                Pelin Çetintaş
              </p>
            </div>

            <Link
              href="/iletisim"
              className="mt-4 inline-flex items-center gap-2 text-sm text-ink/70 underline-offset-4 hover:text-ink hover:underline"
            >
              İş birliği · iletişim
              <AtlasIconArrow />
            </Link>
          </aside>
        </div>
      </section>

      {/* Problem */}
      <section
        aria-labelledby="problem-title"
        className="border-y border-border bg-paper-deep/35"
      >
        <div className="mx-auto max-w-layout px-5 py-20 md:px-8 md:py-28">
          <header className="grid items-end gap-8 border-b border-ink/15 pb-10 md:grid-cols-12">
            <div className="md:col-span-7">
              <p className="archive-label text-ink/55">Bölüm I · Çıkış noktası</p>
              <h2
                id="problem-title"
                className="display-2 mt-3 text-4xl text-ink md:text-5xl lg:text-6xl"
              >
                Neden bir onarım atlası?
              </h2>
            </div>
            <p className="hand-note max-w-prose text-lg text-ink/65 md:col-span-5">
              Üç soru, üç boşluk, tek bir başlangıç noktası.
            </p>
          </header>

          <ol className="mt-2">
            {PROBLEMS.map((p) => (
              <li
                key={p.n}
                className="grid grid-cols-12 items-start border-b border-ink/10 py-10 md:py-12"
              >
                <div className="col-span-3 md:col-span-2">
                  <span
                    className="font-display text-5xl font-semibold leading-none text-ink/85 tabular-nums md:text-6xl"
                  >
                    {p.n}
                  </span>
                </div>
                <div className="col-span-9 md:col-span-10">
                  <p className="archive-label text-[--atlas-red-deep]">{p.label}</p>
                  <h3 className="mt-2 font-display text-2xl font-semibold tracking-editorial text-ink md:text-3xl">
                    {p.title}
                  </h3>
                  <p className="mt-3 max-w-prose text-[0.96rem] leading-relaxed text-ink/75 md:text-[1.02rem]">
                    {p.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Goals */}
      <section className="mx-auto max-w-layout px-5 py-20 md:px-8 md:py-28">
        <header className="grid items-end gap-8 border-b border-ink/15 pb-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="archive-label text-ink/55">Bölüm II · Niyet</p>
            <h2 className="display-2 mt-3 text-4xl text-ink md:text-5xl lg:text-6xl">
              Projenin amaçları.
            </h2>
          </div>
          <p className="hand-note max-w-prose text-lg text-ink/65 md:col-span-5">
            okumak · küratörlük · temas · eyleme geçirmek
          </p>
        </header>

        <ol className="mt-12 grid gap-x-12 gap-y-10 md:grid-cols-2 md:gap-x-16">
          {GOALS.map((g) => (
            <li key={g.n} className="border-t border-ink/15 pt-6">
              <div className="flex items-baseline gap-4">
                <span className="font-display text-3xl font-semibold text-[--atlas-red-deep] tabular-nums md:text-4xl">
                  {g.n}
                </span>
                <h3 className="font-display text-xl font-semibold tracking-editorial text-ink md:text-2xl">
                  {g.title}
                </h3>
              </div>
              <p className="mt-3 max-w-prose text-[0.96rem] leading-relaxed text-ink/75">
                {g.body}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* Katmanlar şeması */}
      <section
        aria-labelledby="layers-section"
        className="border-y border-border bg-paper-light"
      >
        <div className="mx-auto max-w-layout px-5 py-20 md:px-8 md:py-28">
          <header className="grid items-end gap-8 border-b border-ink/15 pb-10 md:grid-cols-12">
            <div className="md:col-span-7">
              <p className="archive-label text-ink/55">Bölüm III · Sistem</p>
              <h2
                id="layers-section"
                className="display-2 mt-3 text-4xl text-ink md:text-5xl lg:text-6xl"
              >
                Dört katmanlı atlas.
              </h2>
            </div>
            <p className="hand-note max-w-prose text-lg text-ink/65 md:col-span-5">
              Renk · ritim · duyusal dünya. Sistem ileride yeni katmanlara açıktır.
            </p>
          </header>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {LAYERS.map((layer) => (
              <article
                key={layer.slug}
                className="group flex flex-col overflow-hidden rounded-sm border border-ink/15 bg-paper shadow-paper transition-shadow duration-300 hover:shadow-sheet"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={layer.mapImage}
                    alt={`Harita ${layer.number}: ${layer.title}`}
                    fill
                    sizes="(min-width: 1024px) 22vw, (min-width: 768px) 45vw, 90vw"
                    className="object-cover transition-transform duration-700 ease-atlas group-hover:scale-[1.04]"
                  />
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-1"
                    style={{ backgroundColor: layer.colorHex }}
                  />
                  <span className="absolute left-2 top-2 inline-flex items-center gap-2 rounded-sm bg-paper-light/90 px-2 py-1 text-[0.62rem] uppercase tracking-[0.2em] text-ink/75">
                    <span
                      aria-hidden
                      className="block h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: layer.colorHex }}
                    />
                    Harita {layer.number}
                  </span>
                </div>
                <div className="flex flex-1 flex-col gap-2 p-5">
                  <h3 className="font-display text-lg font-semibold tracking-editorial text-ink">
                    {layer.title}
                  </h3>
                  <p className="hand-note text-sm text-ink/55">{layer.subtitle}</p>
                  <p className="mt-1 text-[0.85rem] leading-snug text-ink/70 line-clamp-3">
                    {layer.description}
                  </p>
                  <Link
                    href={`/atlas/${layer.slug}`}
                    className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-ink/85 underline-offset-4 hover:text-ink hover:underline"
                  >
                    Haritayı aç
                    <AtlasIconArrow />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Yöntem */}
      <section aria-labelledby="method-title">
        <div className="mx-auto max-w-layout px-5 py-20 md:px-8 md:py-28">
          <header className="grid items-end gap-8 border-b border-ink/15 pb-10 md:grid-cols-12">
            <div className="md:col-span-7">
              <p className="archive-label text-ink/55">Bölüm IV · Yöntem</p>
              <h2
                id="method-title"
                className="display-2 mt-3 text-4xl text-ink md:text-5xl lg:text-6xl"
              >
                Sahadan haritaya.
              </h2>
            </div>
            <p className="hand-note max-w-prose text-lg text-ink/65 md:col-span-5">
              Atlas, mahalle dedektifliğiyle başlar; izinli kayıt ile bitmez —
              kullanıcı önerisiyle büyür.
            </p>
          </header>

          <ol className="mt-12 grid gap-px overflow-hidden rounded-sm border border-ink/15 bg-ink/10 md:grid-cols-4">
            {METHOD.map((m) => (
              <li
                key={m.phase}
                className="flex flex-col gap-3 bg-paper-light p-6 md:p-7"
              >
                <span className="font-display text-3xl font-semibold text-[--atlas-red-deep] tabular-nums">
                  {m.phase}
                </span>
                <h3 className="font-display text-lg font-semibold tracking-editorial text-ink">
                  {m.name}
                </h3>
                <p className="text-[0.92rem] leading-relaxed text-ink/75">
                  {m.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Etki & sürdürülebilirlik şeridi */}
      <section className="border-y border-border bg-ink text-paper-light">
        <div className="mx-auto max-w-layout px-5 py-16 md:px-8 md:py-24">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <p className="archive-label text-paper-light/55">Bölüm V · Etki</p>
              <h2 className="display-2 mt-3 text-3xl text-paper-light md:text-4xl lg:text-[3.2rem]">
                Atlas yaşayan
                <br />
                <span className="italic text-[--atlas-accent]">bir sistemdir.</span>
              </h2>
              <p className="mt-6 max-w-prose text-[0.97rem] leading-relaxed text-paper-light/80">
                Atlas bir başlangıçtır. Saha doğrulaması yapılmış her yeni durak,
                küratöryel kabul edilen her hikâye sistemi büyütür. Genç kullanıcılar
                için bir kent kılavuzu; ustalar için bir görünürlük zemini; akademi
                ve kültür kurumları için bir referans arşividir.
              </p>
            </div>
            <ul className="grid gap-5 self-end lg:col-span-5">
              <Impact
                title="Genç kullanıcı"
                body="rotayı yürür, ustayla tanışır, nesneyi yaşatır."
              />
              <Impact
                title="Usta · atölye"
                body="görünürlük, talep ve nesiller arası temas kazanır."
              />
              <Impact
                title="Kültür kurumu"
                body="kent hafızasına bağlı yaşayan bir veri seti elde eder."
              />
            </ul>
          </div>
        </div>
      </section>

      {/* Ekip + CTA */}
      <section className="mx-auto max-w-layout px-5 py-20 md:px-8 md:py-28">
        <header className="grid items-end gap-8 border-b border-ink/15 pb-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="archive-label text-ink/55">Bölüm VI · Ekip</p>
            <h2 className="display-2 mt-3 text-4xl text-ink md:text-5xl lg:text-6xl">
              Proje saha ekibi.
            </h2>
          </div>
          <p className="hand-note max-w-prose text-lg text-ink/65 md:col-span-5">
            Araştırma · kürasyon · görsel iletişim · deneyim tasarımı.
          </p>
        </header>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <TeamCard
            name="Pelin Çetintaş"
            role="Araştırma · saha · görsel iletişim"
            note="Atlasın haritalarını ve editoryal dilini kurar."
          />
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 rounded-sm border border-ink/15 bg-paper-light p-6 md:p-8">
          <div>
            <p className="archive-label text-ink/55">İş birliği</p>
            <p className="mt-2 font-display text-xl font-semibold tracking-editorial text-ink">
              Atlasa bir durak, bir hikâye, bir destek ekle.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <AtlasButton href="/katki-sagla" variant="primary">
              Yeni Nokta Öner
              <AtlasIconArrow />
            </AtlasButton>
            <AtlasButton href="/iletisim" variant="secondary">
              İletişime Geç
            </AtlasButton>
          </div>
        </div>
      </section>
    </article>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-ink/10 pb-2 last:border-b-0">
      <dt className="archive-label text-ink/55">{label}</dt>
      <dd className="mt-1 text-ink/85">{value}</dd>
    </div>
  );
}

function Impact({ title, body }: { title: string; body: string }) {
  return (
    <li className="border-t border-paper-light/15 pt-4">
      <p className="archive-label text-paper-light/55">{title}</p>
      <p className="mt-2 text-[0.95rem] leading-snug text-paper-light/85">
        {body}
      </p>
    </li>
  );
}

function TeamCard({ name, role, note }: { name: string; role: string; note: string }) {
  return (
    <article className="flex flex-col gap-3 rounded-sm border border-ink/15 bg-paper-light p-6 shadow-paper md:p-8">
      <span aria-hidden className="block h-1 w-10 bg-[--atlas-red-deep]" />
      <h3 className="font-display text-2xl font-semibold tracking-editorial text-ink">
        {name}
      </h3>
      <p className="archive-label text-ink/55">{role}</p>
      <p className="text-[0.95rem] leading-relaxed text-ink/75">{note}</p>
    </article>
  );
}
