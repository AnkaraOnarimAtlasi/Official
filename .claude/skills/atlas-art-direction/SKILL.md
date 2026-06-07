---
name: atlas-art-direction
description: Ankara Onarım Atlası'nın editoryal, arşivsel ve fiziksel atlas merkezli görsel kimliğini koruyan kalite kontrol skilli. Yeni sayfa, component, renk, tipografi veya motion kararı alınırken generic/template estetik üretimini engeller.
---

# atlas-art-direction

## Ne zaman devreye girer
- Yeni sayfa tasarımı önerilirken
- Yeni component stilleri yazılırken
- Renk, tipografi, ikonografi veya motion kararı alınırken
- Hero ya da hikâye blokları yeniden düzenlenirken
- Görsel "premium hissettirme" gerekçesiyle efekt eklenirken

## Sabit ilkeler
1. **Fiziksel atlas merkez** — beş katmanlı dijital macera değil, dört paftalı fiziksel atlasın yaşayan karşılığı tasarlanır. Atlas yığını, krem kâğıt yüzeyi ve katman mürekkep rengi her ekranda hissedilir.
2. **Krem kâğıt + mürekkep palet** — arka plan `--atlas-paper`/`--atlas-paper-deep`, metin `--atlas-ink`. Katman renkleri yalnızca semantik (ilgili katmanın etiketi, çizgisi, badge'i). Generic gradient/neon yasak.
3. **Editoryal tipografi** — `Fraunces` (display, axes opsz+SOFT) editoryal başlıklar; `Inter` gövde; `Caveat` sadece saha notu aksanı (asla başlık değil). Hand-note her sayfada en fazla 2-3 yerde kullanılır.
4. **Kontrollü boşluk** — `max-w-layout` (78rem), bölüm dikey ritmi 20-28 (py-20/py-28). Yoğun bilgi alanlarında 4/8 spacing skalası bozulmaz.
5. **Doku, dekor değil** — `paper-grain` ve `paper-vignette` ince katmanlardır; opacity 0.35'i geçmez, metnin okunurluğunu asla düşürmez. Mobilde daha sade.
6. **Motion**: 150–300ms, `ease-atlas` (cubic-bezier(0.22,1,0.36,1)). Sürekli loop animasyon, parlayan card, dönen 3D dünya yasak.

## Yasak yaklaşımlar
- Neon cyberpunk, NFT/crypto, glassmorphism abartısı, yapay 3D dünya küresi
- Emoji ikon, hazır template kartlar
- Karanlık mod (bu projede ileride opsiyonel "gece arşivi" olabilir; varsayılan light)
- 3D canvas'a görsel olmadan ışık/parıltı eklemek
- `text-gray-*` ile gri-üstü-gri pasif tipografi

## Kabul kriterleri (checklist)
- [ ] Sayfa ilk bakışta Ankara Onarım Atlası kimliğini taşıyor; başka herhangi bir kültür sitesine benzemiyor.
- [ ] Katman renkleri sadece semantik kullanılmış; rastgele dekoratif renk yok.
- [ ] Hand-note aksanı 2-3 kullanımla sınırlı.
- [ ] Doku ve gölge kontrollü; mobilde performansı düşürmüyor.
- [ ] Animasyon bilgisi taşıyor (cause-effect); dekoratif değil.
- [ ] `prefers-reduced-motion` ile sahne sakinleşiyor.

## Referans dosyalar
- `app/globals.css` — token sistemi
- `tailwind.config.ts` — semantic mapping
- `docs/art-direction.md` — yön belgesi
- `components/atlas/*` — referans implementasyon
