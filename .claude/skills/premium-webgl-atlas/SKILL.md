---
name: premium-webgl-atlas
description: Atlas paftalarının 3D/WebGL sahnesinde sanat yönetimi, progressive loading, adaptive quality ve fallback stratejisini zorunlu kılar. Canvas veya 3D component yazılırken/değiştirilirken çalışır.
---

# premium-webgl-atlas

## Ne zaman devreye girer
- Three.js / React Three Fiber sahnesi yazılırken
- Harita paftası texture pipeline'ı tasarlanırken
- Kamera, ışık, postprocessing kararı alınırken
- Mobil/performans optimizasyonu yapılırken

## Sabit ilkeler
1. **Fiziksel kâğıt levha hissi** — paftalar cam değil, krem baskı kâğıdıdır. Hafif yüzey kabarıklığı (subtle normal map), kenar gölgesi, gerçek kâğıt kalınlığı.
2. **Adaptive quality** — `high`, `balanced`, `reduced` üç seviye. Adaptive DPR (`@react-three/drei` AdaptiveDpr) zorunlu. Mobilde postprocessing kapalı.
3. **Progressive texture** — açılışta düşük/orta çözünürlük, katman seçildiğinde yüksek çözünürlük progressive yüklenir. 4 pafta aynı anda full-res GPU'ya gitmez.
4. **HTML fallback** — WebGL desteklenmiyorsa `AtlasFallbackViewer` (statik yüksek kaliteli poster + CSS perspective) gösterilir. Tüm kritik bilgi (manifesto, katman başlıkları, CTA) gerçek HTML.
5. **Reduced motion** — `prefers-reduced-motion` ile kamera hareketleri durur, paftalar sabit yığın gösterilir.
6. **Kontrollü kamera** — oyun benzeri serbest dönüş yok. Scroll/pointer'a bağlı, throttled, dampened. Y ekseninde aşırı dönüş yasak.

## Performans bütçesi
- Hero canvas: ≤ 1.5 MB toplam texture (4 pafta düşük res)
- Inspection mode: aktif katman ≤ 1.5 MB, diğerleri ≤ 300 KB thumbnail
- 60 FPS hedef desktop high; mobil 30+ FPS yeterli (frameloop="demand" tercih)
- İlk LCP'yi 3D bloklamaz; canvas `dynamic({ ssr: false })` ile yüklenir
- WebGL context oluşturulamıyorsa fallback < 100ms içinde görünür

## Kabul kriterleri
- [ ] Sahne kullanılmayan frame'de re-render etmiyor (`frameloop="demand"`).
- [ ] AdaptiveDpr ve AdaptiveEvents aktif.
- [ ] Tüm kritik metin HTML olarak DOM'da; canvas'tan bağımsız erişilebilir.
- [ ] WebGL yok senaryosunda site kırılmıyor.
- [ ] Reduced motion modunda animasyon durmuş veya çok yumuşamış.
- [ ] Texture memory kullanımı dev tools'da ölçülüp belgelenmiş.

## Yasak
- Otomatik orbit/rotation
- Bloom + film grain + chromatic aberration kombinasyonu (bir tanesi yeterli; mobilde kapat)
- Aynı anda 4 yüksek çözünürlük texture
- Canvas içine asıl bilgi metni gömmek
