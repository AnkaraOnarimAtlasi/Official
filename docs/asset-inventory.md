# Asset Inventory

## Mevcut (`public/atlas/source/`)

| Dosya | Boyut | Katman | Kaynak |
|---|---|---|---|
| `katman-01-kagit-sanati.jpeg` | ~362 KB | Kağıt Sanatı (mor) | kullanıcının fiziksel atlası |
| `katman-02-nesneyi-onaranlar.jpeg` | ~397 KB | Nesneyi Onaranlar (sepia) | kullanıcının fiziksel atlası |
| `katman-03-geleneksel-el-sanatlari.jpeg` | ~418 KB | Geleneksel El Sanatları (indigo) | kullanıcının fiziksel atlası |
| `katman-04-metal-ahsap.jpeg` | ~339 KB | Metal-Ahşap (terracotta) | kullanıcının fiziksel atlası |

## Eksik / Henüz İstenmemiş

### Görsel
- [ ] **Yüksek çözünürlüklü atlas paftaları** (TIFF/PNG ≥ 3000px). Mevcut JPEG'ler ekran kullanımı için yeterli ancak 3D inspection mode için ideal değil.
- [ ] **Fiziksel atlasın objeleştirilmiş fotoğrafı** (kapalı/açık, masaya konmuş halde) — `/atlas-edinin` ve hero için
- [ ] **Usta atölyelerinden fotoğraflar** — yayınlanabilir olanların izin notu ile
- [ ] **Hikâye/saha günlüğü fotoğrafları**

### Marka
- [ ] Logo (varsa) — şu an header'da gradient katman bloğu placeholder
- [ ] Resmi font dosyası (lisanslı) — şu an Google Fonts (Fraunces + Inter + Caveat)

### İçerik
- [ ] Saha doğrulanmış usta listesi (ad, zanaat, açık/kapalı, randevu durumu, sosyal medya)
- [ ] Her durak için kısa editoryal açıklama (1-3 cümle)
- [ ] Dağıtım noktası listesi (üniversite, kültür merkezi, kafe, kütüphane)

### Teknik
- [ ] Supabase proje URL'i + anon key + service role key (Faz 4)
- [ ] Vercel deploy hesabı
- [ ] (prod) Turnstile site key + secret

## Asset Pipeline (planlanan)

```
public/atlas/
├── source/        original yüksek çözünürlük (commit'lenmez ideal)
├── optimized/     desktop WebP (1600px max)
├── mobile/        mobile WebP (800px max)
└── thumbnails/    list/grid kullanımı (320px)
```

Faz 3'te `scripts/optimize-atlas-assets.ts` ile sharp tabanlı pipeline kurulur.

## Mevcut Sürümde Kullanım
Bu faz'da görseller `next/image` üzerinden doğrudan `source/` JPEG'lerinden serve edilir. Next.js otomatik AVIF/WebP dönüşümü ve responsive sizes uygular. Optimize edilmiş asset pipeline Faz 3 ile birlikte gelir.
