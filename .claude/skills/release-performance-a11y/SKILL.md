---
name: release-performance-a11y
description: Her milestone ve production deploy öncesi performans, responsive yapı, reduced motion, accessibility ve SEO kontrollerini çalıştırır. Build başarısız ya da kritik a11y/perf regresyonu varsa release durdurur.
---

# release-performance-a11y

## Ne zaman devreye girer
- Bir milestone tamamlandığında
- Production deploy hazırlığında
- 3D sahne, hero veya tipografi değiştikten sonra
- Yeni route eklendiğinde

## Kontroller

### Performans
- Lighthouse mobile: Performance ≥ 85, LCP ≤ 2.5s, CLS < 0.1, INP < 200ms
- Bundle: ilk JS ≤ 200KB gzipped (3D dışı sayfalarda)
- Atlas canvas yalnızca `/atlas*` rotalarında yükleniyor (dynamic import)
- Görseller WebP/AVIF; `next/image` ile responsive

### Accessibility
- Klavye ile tüm CTA, nav, form alanlarına erişim
- `prefers-reduced-motion` ile büyük animasyonlar duruyor
- Renk kontrastı: gövde ≥ 4.5:1, büyük başlık ≥ 3:1
- Tüm görseller anlamlı `alt` veya `alt=""` dekoratif
- Form field'larında `<label>`, error mesajları `role="alert"`
- Atlas canvas içeriği HTML liste olarak da erişilebilir

### Responsive
- 360px, 390px, 768px, 1024px, 1440px viewport'larda kontrol
- Horizontal scroll yok
- Touch target ≥ 44×44pt mobilde
- Bottom dock mobilde key aksiyonlara erişim sağlıyor

### SEO
- Her sayfada Türkçe title, description, OG
- `robots.txt`, `sitemap.xml` üretimi
- Canonical doğru
- Semantic heading hiyerarşisi (h1 her sayfada bir)

## Kabul kriterleri
- [ ] `npm run typecheck` clean
- [ ] `npm run lint` clean
- [ ] `npm run build` başarılı
- [ ] Lighthouse mobil ≥ 85
- [ ] axe-core kritik violation = 0
- [ ] Playwright smoke testleri yeşil
- [ ] WebGL fallback senaryosu manuel doğrulandı

## Acil durdurma sinyalleri
- Build hatası
- Kritik a11y violation (kontrast, klavye trap, missing label)
- LCP > 4s mobilde
- 3D canvas frame budget aşımı (>16ms ortalama, low-end)
