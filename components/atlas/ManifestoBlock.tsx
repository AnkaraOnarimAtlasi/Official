/**
 * ManifestoBlock — Phase 2 rebuild.
 *
 * Sayfa içinde "ara duraklama". Editoryal kuralcı sayfa düzeni:
 * iki sütun değil, üç sütun + marjinalia. Büyük tipografi okurun
 * elini tutar; sağ marjinaldeki saha notu manifestonun el yazısı
 * imzasıdır. Tüm dekor kâğıt-mürekkep palette içinde kalır.
 */
export function ManifestoBlock() {
  return (
    <section
      aria-labelledby="manifesto-title"
      className="relative isolate overflow-hidden border-y border-border bg-paper-deep/45"
    >
      {/* Hafif arka süs: ince ayraç rule line */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/2 hidden h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-ink/15 to-transparent md:block"
      />

      <div className="mx-auto max-w-layout px-5 py-20 md:px-8 md:py-32">
        <div className="grid gap-12 md:grid-cols-12 md:gap-10 lg:gap-16">
          {/* Eyebrow kolon */}
          <aside className="md:col-span-3">
            <p className="archive-label text-ink/55">Manifesto · I</p>
            <p className="mt-3 hand-note text-2xl leading-tight text-[--atlas-red-deep]">
              “Bir şehri tanımak için bazen ana caddeden çıkmak gerekir.”
            </p>
            <p className="mt-4 text-[0.7rem] uppercase tracking-[0.22em] text-ink/45">
              — Ankara, saha notu
            </p>
          </aside>

          {/* Ana metin */}
          <div className="md:col-span-9 lg:col-span-8 lg:col-start-4">
            <h2
              id="manifesto-title"
              className="display-1 text-4xl text-ink md:text-5xl lg:text-[4.2rem]"
              style={{ lineHeight: '1.15' }}
            >
              Şehir{' '}
              <span className="italic">inşa edilen</span>
              {' '}değil,{' '}
              <span className="italic text-[--atlas-red-deep]">onarılarak</span>{' '}
              <span className="italic">sürdürülen</span> bir
              sistemdir.
            </h2>

            {/* drop-cap'li gövde */}
            <div className="mt-10 grid gap-8 md:grid-cols-2 md:gap-10">
              <p className="font-sans text-[1.05rem] leading-relaxed text-ink/90">
                Ankara’nın görünen yüzeyi yalnızca inşa edilenlerden ibaret değildir. Modern ve planlı kentin arka planında başka bir şehir daha yaşar: Küçük atölyeler, sabırlı eller, dağınık adresler ve nesnelere ikinci bir hayat veren ustalar.
              </p>
              <div className="space-y-5 text-[1.05rem] leading-relaxed text-ink/80">
                <p>
                  Bu atlas, bu ikinci şehri görünür kılmak için hazırlandı. Niş
                  onarım ustalarını, kaybolmaya yüz tutmuş zanaatları ve
                  nesnelere ikinci bir hayat veren mekânları katmanlı haritalar
                  üzerinden belgeliyoruz.
                </p>
                <p className="text-ink/65">
                  Atlas bir başlangıçtır. Saha doğrulaması yapılan her yeni
                  durak bu sistemi büyütür; her hikâye, görünmeyen bir bağı kayıt
                  altına alır.
                </p>
              </div>
            </div>

            {/* Anlam imza barı */}
            <ul className="mt-12 grid gap-4 border-t border-ink/15 pt-6 text-[0.78rem] uppercase tracking-[0.22em] text-ink/55 sm:grid-cols-3">
              <li className="flex items-center gap-3">
                <span aria-hidden className="block h-px w-6 bg-ink/40" />
                ONAR · KEŞFET · PAYLAŞ
              </li>
              <li className="flex items-center gap-3">
                <span aria-hidden className="block h-px w-6 bg-ink/40" />
                ROTADAN DENEYİME
              </li>
              <li className="flex items-center gap-3">
                <span aria-hidden className="block h-px w-6 bg-ink/40" />
                YAŞAYAN KENT HAFIZASI
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
