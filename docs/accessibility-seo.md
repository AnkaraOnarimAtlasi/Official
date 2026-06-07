# Accessibility & SEO

## Accessibility — sabit kurallar
1. **Canvas asla tek bilgi kanalı değildir.** 3D sahneden gelen tüm önemli içerik HTML olarak da bulunur (katman listesi, durak listesi, manifesto).
2. **Klavye**: tüm CTA, nav, form alanları Tab/Shift+Tab ile erişilebilir; focus halkası `--atlas-ink` outline 2px / offset 3px.
3. **Renk yalnız bilgi taşımaz**: katman rengi yanında başlık/etiket; durum yanında ikon/metin.
4. **Kontrast**: gövde ≥ 4.5:1; büyük başlık ≥ 3:1. Mor `#5C3B8E`, sepia `#8A4A1F`, indigo `#1A3F8F`, terracotta `#B85A1C` krem kâğıt üzerinde gövde olarak değil sadece **eyebrow/badge** olarak kullanılır (4.5:1 sağlamaz).
5. **Form**: her input'a `<label>`, error `aria-live="polite"` veya `role="alert"`, focus management ilk hatalı alana.
6. **Reduced motion**: global CSS `prefers-reduced-motion` ile transition/animation 0.001ms, scroll-behavior auto.
7. **Alt metinler**: anlam taşıyan görselde anlamlı `alt`, dekoratif olanda `alt=""`.
8. **Heading hiyerarşisi**: her sayfada bir h1, sıralı iniş.
9. **Skip link**: `<a href="#main">Ana içeriğe atla</a>` her sayfada.

## Accessibility — sayfa bazlı eklemeler
- **Atlas**: harita içeriğine paralel "durak liste görünümü" sekmesi
- **Durak**: yön tarif CTA her zaman görünür, telefon varsa `tel:` link
- **Form**: çok adımlı submission'da progress göstergesi + her adımda geri

## SEO
- Türkçe `lang="tr"`, locale `tr-TR`
- Her sayfa: title, description, OG image (Faz 2'de OG image generator)
- Canonical: `metadataBase` + path
- Robots: production'da `index,follow`; preview'da `noindex`
- `sitemap.xml`: dinamik (`app/sitemap.ts`) — Faz 4 sonrası
- Structured data:
  - LocalBusiness (durak sayfalarında, izin varsa)
  - Article (hikâye sayfalarında)
  - BreadcrumbList

## Yasak
- `tabindex` > 0
- `pointer-events: none` ile button'ı görünüşte aktif bırakmak
- Placeholder'ı tek label yerine kullanmak
- Renk + sadece ikon ile (yazısız) aksiyon iletmek
