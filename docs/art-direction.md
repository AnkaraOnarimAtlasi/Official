# Art Direction

> Bu belge görsel kimliğin değişmez yön belgesidir. `app/globals.css` ve `tailwind.config.ts` bu kararların kod tarafıdır.

## Sanat Yönü Cümlesi
Ankara Onarım Atlası, **dijital ortamda açılan lüks bir arşiv masası** gibi hissettirir: krem baskı kâğıdı, ince mürekkep, gözlem notları. Modern fakat editoryal, ciddi fakat genç, analog fakat çağdaş.

## Palet

### Kâğıt yüzeyi
- `--atlas-paper` `#F1E8CF` — birincil arka plan
- `--atlas-paper-light` `#FAF3DC` — kart, panel
- `--atlas-paper-deep` `#E7DCBB` — ikincil bölüm

### Mürekkep
- `--atlas-ink` `#1A1714` — gövde
- `--atlas-soft` `#3B332C` — ikincil metin
- `--atlas-muted` `#6E6457` — meta, eyebrow

### Katman renkleri (fiziksel atlastan örneklenmiş)
- `--layer-paper-arts` `#5C3B8E` (mor) — Kağıt Sanatı
- `--layer-object-repair` `#8A4A1F` (sepia) — Nesneyi Onaranlar
- `--layer-traditional-crafts` `#1A3F8F` (indigo) — Geleneksel El Sanatları
- `--layer-metal-wood` `#B85A1C` (terracotta) — Metal-Ahşap

### Editoryal aksanlar
- `--atlas-red-deep` `#5E1B12` — manifesto vurgusu
- `--atlas-accent` `#9E1B17` — sınırlı CTA aksanı

## Tipografi
- **Display** — `Fraunces` (Google Fonts, variable opsz+SOFT); başlıklar, manifesto, büyük rakamlar
- **Sans** — `Inter` (variable); gövde, nav, etiket
- **Hand** — `Caveat`; saha notu aksanı, mikro kullanım (sayfa başına ≤3 yer)
- **Archive label** — `Inter` 0.18em letter-spacing, küçük caps look — eyebrow ve meta

### Type scale
- Display 1: 5xl → 7xl (responsive) — sadece hero h1
- Display 2: 3xl → 5xl — section heading
- Lead: text-xl–text-2xl, font-display, leading-snug
- Body: text-base–text-lg
- Meta/archive: text-xs uppercase 0.18em

## Doku
- `paper-grain` — radial gradient + multiply blend, opacity 0.35; sadece geniş hero/section'larda
- `paper-vignette` — sayfa kenar sıcaklığı
- Üst üste basmaz, mobilde otomatik daha hafif (CSS only — perf maliyeti minimum)

## Motion
- 150–300ms, `ease-atlas` (`cubic-bezier(0.22, 1, 0.36, 1)`)
- Sayfa geçişlerinde fade + ufak translate
- Hover: opacity/ölçek değil — kenar, gölge ya da renk
- `prefers-reduced-motion: reduce` → tüm büyük geçişler durur

## Bileşen Dili
- Kart = arşiv fişi: ince border, krem zemin, üst kenarda renkli mürekkep bandı (katman rengi), iç tipografi editoryal
- Buton = "rounded-full" sıcak form, mürekkep yazıyla
- Tag/chip = düz, ince border, ikon yok
- İkonlar = sadece SVG (stroke 1.5px), Heroicons veya custom; **emoji yasak**

## Yasak Görseller
- Gradient'li glassmorph kartlar
- Neon glow, parlama, dönen aksesuar
- 3D dünya küresi
- Karanlık ana tema (light sabit)
- Fotoğraf üstüne mor/turkuaz "AI-art" filtresi
- Aynı sayfada 3+ font kullanımı (display + sans + hand'in dışında ekleme yok)

## Kabul Test Soruları
1. Bu ekran başka herhangi bir kültür/portfolyo sitesinde de aynı şekilde olabilir mi? → **EVET ise düşür**.
2. Krem kâğıt + mürekkep ana yüzeyde okunuyor mu?
3. Katman rengi yalnızca semantik kullanılmış mı?
4. Doku okumayı engelliyor mu?
5. Hand-note aksanı 3'ten fazla yerde mi? → **fazlaysa azalt**.
