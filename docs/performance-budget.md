# Performance Budget

## Hedefler (mobil, Slow 4G + low CPU)
| Metric | Hedef |
|---|---|
| Lighthouse Performance | ≥ 85 |
| LCP | ≤ 2.5s |
| CLS | < 0.1 |
| INP | < 200ms |
| Total Blocking Time | < 200ms |

## JS bütçesi
- Ana sayfa ilk yük JS ≤ 200 KB gz (canvas hariç)
- Atlas sayfası ilk yük (canvas dahil) ≤ 450 KB gz
- Diğer sayfalarda ortak chunk maksimize edilir; lazy import nadir

## Görsel bütçesi
- Hero atlas yığını: 4 pafta toplam ≤ 1.2 MB (AVIF/WebP)
- Inspection mode: aktif katman ≤ 1.5 MB, diğerleri thumb (≤ 300 KB)
- Source JPEG'ler doğrudan serve edilmez; `next/image` ile optimizasyon

## 3D bütçesi
- High quality: Adaptive DPR 1–2, postprocessing minimum, frameloop="demand"
- Balanced: DPR 1–1.5, postprocessing kapalı
- Reduced/mobile: CSS perspective fallback veya çok hafif sahne
- WebGL context oluşturulamıyorsa → static fallback < 100ms

## Animasyon
- 1–2 element/sayfa görünümünde maksimum animasyon
- Transform + opacity dışına çıkma
- `prefers-reduced-motion` ile durdur

## İzleme
- Vercel Analytics (Core Web Vitals)
- Sentry (release sonrası — Faz 6)
- Periodic Lighthouse CI (release öncesi zorunlu)
