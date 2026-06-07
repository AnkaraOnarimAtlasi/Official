import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { SubmissionForm } from '@/components/forms/SubmissionForm';
import { SITE } from '@/lib/constants/site';

export const metadata: Metadata = {
  title: 'Katkı Sağla · Yeni Nokta Öner',
  description: `${SITE.name} — Ankara'da bildiğiniz görünmeyen niş onarım duraklarını veya ustaları atlasa dahil edilmek üzere önerin.`,
  alternates: { canonical: '/katki-sagla' },
};

const STEPS = [
  { n: '01', title: 'Öneri', body: 'Birkaç satır bilgi ve varsa fotoğraf yeterlidir.' },
  { n: '02', title: 'Doğrulama', body: 'Atlas saha ekibi ustayla iletişime geçer, izin alır.' },
  { n: '03', title: 'Yayın', body: 'Onaydan sonra ilgili haritaya işlenir ve atlasa dahil olur.' },
];

const GUIDELINES = [
  'Atılmak yerine onarılan, restore edilen veya nesneye ikinci hayat veren atölyeler.',
  'Hikâyesi, uzmanlığı ve kayboluş riski olan niş zanaatlar.',
  'Birebir, tanıdığınız veya doğrudan ziyaret ettiğiniz noktalar.',
];

const NOT_FIT = [
  'Tek tip seri tamir zincirleri (hızlı tamir, telefon onarımı vb.).',
  'Doğrulanmamış ya da kulaktan dolma adresler.',
  'İzin alınmadan paylaşılan kişisel iletişim bilgileri.',
];

export default function KatkiSaglaPage() {
  const breadcrumb = [
    { label: 'Atlas', href: '/atlas' },
    { label: 'Katkı Sağla · Yeni Nokta Öner' },
  ];

  return (
    <article>
      {/* Üst arşiv bandı */}
      <div className="border-b border-border/70 bg-paper">
        <div className="mx-auto flex max-w-layout items-center justify-between gap-6 px-5 py-3 text-[0.68rem] uppercase tracking-[0.22em] text-ink/55 md:px-8">
          <span>Katkı · saha araması açıktır</span>
          <span className="hidden sm:inline">Küratöryel doğrulama gerektirir</span>
          <span>KVKK · honeypot · Turnstile</span>
        </div>
      </div>

      <div className="mx-auto max-w-layout px-5 pt-8 md:px-8">
        <Breadcrumb items={breadcrumb} />
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-layout px-5 pb-12 pt-6 md:px-8 md:pt-10">
        <div className="grid items-end gap-8 border-b border-ink/15 pb-10 md:grid-cols-12">
          <div className="md:col-span-8">
            <p className="archive-label text-ink/55">Katkı Sağla</p>
            <h1 className="display-1 mt-3 text-5xl leading-[0.95] text-ink md:text-6xl lg:text-[5.2rem]">
              Görünmeyen
              <br />
              bir nokta
              <br />
              <span className="italic text-[--atlas-red-deep]">öner.</span>
            </h1>
          </div>
          <p className="max-w-prose text-[0.97rem] leading-relaxed text-ink/75 md:col-span-4">
            Bildiğin bir usta, atölye veya zanaat durağını yaz. Önerin saha
            doğrulamasından sonra atlasa dahil edilebilir; ağa bir bağ daha
            eklersin.
          </p>
        </div>
      </section>

      {/* Süreç adımları */}
      <section className="border-y border-border bg-paper-light">
        <div className="mx-auto grid max-w-layout grid-cols-1 gap-px overflow-hidden border-y border-ink/10 bg-ink/10 md:grid-cols-3">
          {STEPS.map((s) => (
            <div key={s.n} className="flex flex-col gap-3 bg-paper-light p-6 md:p-8">
              <span className="archive-label text-[--atlas-accent]">{s.n}</span>
              <h3 className="font-display text-xl font-semibold tracking-editorial text-ink">
                {s.title}
              </h3>
              <p className="text-[0.93rem] leading-relaxed text-ink/70">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Form + kılavuz */}
      <section className="mx-auto max-w-layout px-5 py-20 md:px-8 md:py-28">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          {/* Sol — kılavuz */}
          <aside className="lg:col-span-4">
            <p className="archive-label text-ink/55">Kürasyon kılavuzu</p>
            <h2 className="display-2 mt-3 text-3xl text-ink md:text-4xl">
              Hangi noktalar atlasa girer?
            </h2>

            <div className="mt-8">
              <p className="archive-label text-[--atlas-accent]">Uygun</p>
              <ul className="mt-3 space-y-3">
                {GUIDELINES.map((g) => (
                  <li key={g} className="flex gap-3 text-[0.95rem] leading-relaxed text-ink/80">
                    <span aria-hidden className="mt-2 inline-block h-1 w-5 shrink-0 bg-[--atlas-accent]" />
                    <span>{g}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8">
              <p className="archive-label text-ink/55">Uygun değil</p>
              <ul className="mt-3 space-y-3">
                {NOT_FIT.map((g) => (
                  <li key={g} className="flex gap-3 text-[0.95rem] leading-relaxed text-ink/65">
                    <span aria-hidden className="mt-2 inline-block h-1 w-5 shrink-0 bg-ink/25" />
                    <span>{g}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="mt-10 hand-note text-base text-ink/60">
              Atlas yaşayan bir sistemdir — her doğrulanmış öneri sistemi büyütür.
            </p>
          </aside>

          {/* Sağ — form */}
          <div className="lg:col-span-8">
            <div className="rounded-sm border border-ink/15 bg-paper-light p-6 shadow-paper md:p-10">
              <div className="mb-6 flex items-center justify-between border-b border-ink/15 pb-4">
                <p className="archive-label text-ink/55">Yeni Nokta · saha formu</p>
                <span className="inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.22em] text-ink/55">
                  <span aria-hidden className="block h-1.5 w-1.5 rounded-full bg-[--atlas-accent]" />
                  taslak gönderimi
                </span>
              </div>
              <SubmissionForm />
            </div>

            <p className="mt-4 text-[0.78rem] uppercase tracking-[0.22em] text-ink/55">
              Form gönderildiğinde tarafımıza ulaşır · kişisel veriler yalnızca
              doğrulama amacıyla kullanılır.
            </p>
          </div>
        </div>
      </section>
    </article>
  );
}
