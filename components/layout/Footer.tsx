import Link from 'next/link';
import { SITE } from '@/lib/constants/site';

export function Footer() {
  return (
    <footer
      className="mt-24"
      style={{
        backgroundColor: 'rgba(255,255,255,0.65)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderTop: '1px solid rgba(20,20,20,0.07)',
      }}
    >
      {/* Üst aksan şeridi — 5 harita rengi */}
      <div aria-hidden className="flex h-[3px] w-full">
        <span className="h-full flex-1 bg-[var(--layer-paper-arts)]" />
        <span className="h-full flex-1 bg-[var(--layer-object-repair)]" />
        <span className="h-full flex-1 bg-[var(--layer-traditional-crafts)]" />
        <span className="h-full flex-1 bg-[var(--layer-metal-wood)]" />
        <span className="h-full flex-1 bg-[var(--layer-memory-repair)]" />
      </div>


      <div className="mx-auto max-w-layout px-5 py-16 md:px-8 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          {/* Manifesto */}
          <div className="md:col-span-5">
            <p className="archive-label text-ink/55">Manifesto</p>
            <p className="mt-4 font-display text-2xl leading-snug tracking-editorial text-ink md:text-[1.7rem]">
              {SITE.tagline}
            </p>
            <p className="mt-5 max-w-md text-[0.95rem] leading-relaxed text-ink/70">
              Ankara Onarım Atlası, görünmeyen niş onarım ve zanaat ağlarını
              katmanlı haritalar, usta profilleri ve editoryal saha dosyaları
              aracılığıyla yaşatan bir kültürel tasarım projesidir.
            </p>
          </div>

          {/* Atlas nav */}
          <nav aria-label="Site haritası" className="md:col-span-3">
            <p className="archive-label text-ink/55">Atlas</p>
            <ul className="mt-4 space-y-2.5 text-[0.95rem] text-ink/80">
              {SITE.primaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="underline-offset-4 transition-colors hover:text-ink hover:underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* İletişim */}
          <div className="md:col-span-4">
            <p className="archive-label text-ink/55">Saha Ofisi</p>
            <ul className="mt-4 space-y-2.5 text-[0.95rem] text-ink/80">
              <li>
                <Link href="/iletisim" className="underline-offset-4 hover:text-ink hover:underline">
                  Proje ekibine ulaş
                </Link>
              </li>
              <li>
                <Link href="/katki-sagla" className="underline-offset-4 hover:text-ink hover:underline">
                  Nokta öner
                </Link>
              </li>
              <li>
                <Link href="/atlas-edinin" className="underline-offset-4 hover:text-ink hover:underline">
                  Fiziksel atlası edin
                </Link>
              </li>
              <li>
                <a
                  href="mailto:info@ankaraonarimatlasi.com"
                  className="underline-offset-4 hover:text-ink hover:underline"
                >
                  info@ankaraonarimatlasi.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Alt şerit */}
        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-ink/15 pt-6 text-[0.78rem] uppercase tracking-[0.18em] text-ink/55 md:flex-row md:items-center">
          <p className="normal-case tracking-normal">
            © {new Date().getFullYear()} {SITE.name}. Tüm içerikler küratöryel
            izinle yayınlanmıştır.
          </p>
          <p className="hand-note text-base normal-case tracking-normal text-[--atlas-accent]">
            Ankara, bir onarım sistemidir.
          </p>
        </div>
      </div>
    </footer>
  );
}
