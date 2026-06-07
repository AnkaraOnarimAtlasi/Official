import Link from 'next/link';
import { AtlasButton, AtlasIconArrow } from '@/components/ui/AtlasButton';

/**
 * SubmissionCTA — Phase 2 rebuild.
 *
 * Dark editorial band — kâğıdın "mürekkep" karşılığı. Sol tarafta
 * büyük çağrı, sağda form-affordance: sahte bir input kutusu okuyucuyu
 * "Yeni Nokta Öner" sayfasına davet eder. Submit etmez; yalnızca
 * görsel olarak formun varlığını sezdirir, gerçek form /katki-sagla
 * sayfasındadır.
 */
export function SubmissionCTA() {
  return (
    <section
      aria-labelledby="submission-cta-title"
      className="relative isolate overflow-hidden text-paper-light"
      style={{
        backgroundColor: 'rgba(14,14,14,0.82)',
        backdropFilter:  'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
      }}
    >
      {/* Hafif kâğıt grain — koyu üstte ince bir doku */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-screen"
        style={{
          backgroundImage:
            'radial-gradient(rgba(241,232,207,0.25) 1px, transparent 1px)',
          backgroundSize: '4px 4px',
        }}
      />

      <div className="mx-auto max-w-layout px-5 py-20 md:px-8 md:py-28">
        {/* Üst arşiv şeridi — ışıklı */}
        <div className="mb-10 flex flex-wrap items-center justify-between gap-3 border-y border-paper-light/15 py-3 text-[0.7rem] uppercase tracking-[0.22em] text-paper-light/55 md:mb-14">
          <span>Katkı · Saha Araması Açıktır</span>
          <span className="hidden sm:inline">Küratöryel İnceleme · Doğrulama Gerektirir</span>
          <span className="tabular-nums">Katkı Sağla</span>
        </div>

        <div className="grid items-end gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Sol — başlık */}
          <div className="lg:col-span-7">
            <p className="hand-note text-2xl text-paper-light/70">
              Ankara&apos;nın gözden kaçırdığı bir el var mı?
            </p>
            <h2
              id="submission-cta-title"
              className="display-1 mt-4 text-4xl text-paper-light md:text-5xl lg:text-[4.2rem]"
            >
              Görünmeyen bir
              <br />
              onarım noktası mı{' '}
              <span className="italic text-[--atlas-accent]">biliyorsun?</span>
            </h2>
            <p className="mt-6 max-w-prose text-base leading-relaxed text-paper-light/75 md:text-[1.05rem]">
              Bir usta, atölye veya zanaat durağı öner. Önerilen noktalar
              küratöryel saha doğrulaması ve editoryal inceleme sonrasında
              atlasa dahil edilebilir. Her öneri, görünmeyen ağa bir bağ daha
              ekler.
            </p>

            {/* Süreç adımları */}
            <ol className="mt-9 grid gap-4 text-sm text-paper-light/75 sm:grid-cols-3">
              <Step n="01" title="Öneri" body="Birkaç satır bilgi ve varsa fotoğraf." />
              <Step n="02" title="Doğrulama" body="Atlas ekibi ustayla iletişime geçer." />
              <Step n="03" title="Yayın" body="Onaydan sonra ilgili haritaya işlenir." />
            </ol>
          </div>

          {/* Sağ — fake form affordance card */}
          <div className="lg:col-span-5">
            <Link
              href="/katki-sagla"
              aria-label="Yeni nokta önermek için Katkı Sağla sayfasını aç"
              className="group block rounded-sm border border-paper-light/20 bg-paper-light/[0.04] p-6 transition-all duration-300 hover:border-paper-light/45 hover:bg-paper-light/[0.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paper-light/40"
            >
              <div className="flex items-center justify-between text-[0.7rem] uppercase tracking-[0.22em] text-paper-light/55">
                <span>Yeni Nokta · Taslak Form</span>
                <span aria-hidden className="block h-1.5 w-1.5 rounded-full bg-[--atlas-accent]" />
              </div>

              <FakeField label="Usta / Atölye Adı" placeholder="örn. Mahmut Saraciye" />
              <FakeField label="Bölge" placeholder="örn. Ulus · Saraçlar Sokağı" />
              <FakeField label="Zanaat" placeholder="örn. Deri İşçiliği" />
              <FakeField label="Neden atlasa dahil edilmeli?" placeholder="Bir-iki cümle yeterli." multiline />

              <div className="mt-6 flex items-center justify-between gap-3">
                <span className="text-[0.7rem] uppercase tracking-[0.22em] text-paper-light/45">
                  Form, Katkı Sağla Sayfasında Açılır
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-paper-light bg-paper-light px-4 py-2 text-sm font-medium text-ink transition-colors duration-200 group-hover:bg-paper group-hover:border-paper">
                  Yeni Nokta Öner
                  <AtlasIconArrow />
                </span>
              </div>
            </Link>

            <p className="mt-4 text-[0.78rem] uppercase tracking-[0.22em] text-paper-light/45">
              Honeypot · Turnstile · KVKK ile Korunur
            </p>
          </div>
        </div>

        {/* Altta yardımcı CTA satırı */}
        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-paper-light/15 pt-6 text-sm text-paper-light/75">
          <p className="hand-note text-lg text-paper-light/60">
            Atlas yaşayan bir sistemdir — Büyütmek istersen yanımıza gel.
          </p>
          <AtlasButton
            href="/iletisim"
            variant="secondary"
            className="border-paper-light/40 bg-transparent text-paper-light hover:border-paper-light hover:bg-paper-light/10"
          >
            İletişime Geç
          </AtlasButton>
        </div>
      </div>
    </section>
  );
}

function Step({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <li className="border-t border-paper-light/15 pt-3">
      <span className="archive-label text-paper-light/55">{n} · {title}</span>
      <p className="mt-2 leading-snug text-paper-light/80">{body}</p>
    </li>
  );
}

function FakeField({
  label,
  placeholder,
  multiline,
}: {
  label: string;
  placeholder: string;
  multiline?: boolean;
}) {
  return (
    <div className="mt-5">
      <p className="text-[0.7rem] uppercase tracking-[0.22em] text-paper-light/55">
        {label}
      </p>
      <div
        aria-hidden
        className={`mt-2 rounded-sm border border-paper-light/15 bg-paper-light/[0.03] px-3 py-2 text-sm text-paper-light/55 transition-colors group-hover:border-paper-light/30 ${
          multiline ? 'min-h-[3.5rem]' : ''
        }`}
      >
        {placeholder}
      </div>
    </div>
  );
}
