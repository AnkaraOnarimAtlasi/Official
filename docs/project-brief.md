# Project Brief

> Bu, `Proje Detayları.txt`'nin damıtılmış geliştirici versiyonudur. Tam metin için orijinale bakın.

## Tek Cümle
Ankara'nın görünmeyen onarım ağlarını, fiziksel katmanlı bir atlasın dijital olarak yaşayan karşılığına çeviren editoryal, arşivsel ve interaktif web ürünü.

## Hedef Kitle
- Ankara'da yaşayan, sürdürülebilirlik ve zanaat kültürüne ilgili genç-yetişkin okur
- Akademisyen, kültür kurumu, jüri (proje sayfası odakta)
- Saha kullanıcısı (mobil cep, ustaya gitmek isteyen)

## Birincil Yolculuklar
1. **Keşif**: ana sayfa → katman → durak → yön tarif
2. **Katkı**: ana sayfa → katkı sağla → form (pending)
3. **Atlas edinimi**: ana sayfa → atlas-edinin → dağıtım noktası
4. **Akademik inceleme**: ana sayfa → proje (manifesto, yöntem, ekip)

## Faz Planı
- **Faz 0**: Repo & asset audit — *tamamlandı*
- **Faz 1**: Foundation (Next.js, design tokens, ana sayfa) — *bu turda*
- **Faz 2**: Statik premium sayfalar (atlas, katman detay, hikâyeler, proje)
- **Faz 3**: 3D Living Atlas (React Three Fiber)
- **Faz 4**: Supabase backend + submission akışı
- **Faz 5**: Admin panel + hotspot editor
- **Faz 6**: Production readiness (a11y, perf, SEO, Playwright)

## Kabul Kriterleri (release)
- Site hazır template gibi görünmüyor
- 4 fiziksel pafta 3D deneyimin merkezinde
- Katman → durak → yön tarif yolculuğu çalışıyor
- Submission gönderilebiliyor (pending kalıyor)
- Mobilde saha kullanımı sorunsuz
- TS/lint/build clean, kritik a11y violation yok, RLS aktif

## Subagent Çalışma Protokolü

| Faz | Çağrılan Subagent'lar |
|---|---|
| 0 — Keşif | creative-director, experience-architect, fullstack-data-architect |
| 1 — Art direction & wireframe | creative-director, experience-architect |
| 2 — Teknik temel | fullstack-data-architect, security-reviewer |
| 3 — 3D prototip | webgl-scene-engineer, creative-director, performance-accessibility-qa |
| 4 — İçerik & akışlar | content-curator, experience-architect, fullstack-data-architect |
| 5 — Admin & moderasyon | fullstack-data-architect, security-reviewer |
| 6 — Release | performance-accessibility-qa, security-reviewer, creative-director |
