# Ankara Onarım Atlası — Proje Bağlamı

Bu dosya, Claude'un (ve herhangi bir geliştiricinin) projeye girer girmez okuması gereken **değişmez kurallar** kümesidir. Brief'in tamamı `Proje Detayları.txt` içindedir; `CLAUDE.md` ondan damıtılmış kalıcı yön belgesidir.

## Proje Tanımı

Ankara'nın görünmeyen niş onarım ve zanaat ağlarını **fiziksel atlas paftaları**, dijital rota deneyimleri, usta profilleri ve yaşayan bir arşiv aracılığıyla görünür kılan kültürel tasarım projesi. Web ürünü, fiziksel basılı atlasın yaşayan dijital karşılığıdır.

**Manifesto:** "Şehir sadece inşa edilen değil, onarılarak sürdürülen bir sistemdir."

## Atlas Yapısı (Sabit — Fiziksel Atlastan)

Brief'in hipotetik 5 katmanlı sistemi yerine **gerçek fiziksel atlas 4 katmandır**:

| # | Katman | Renk | Zanaatlar |
|---|---|---|---|
| 01 | Kağıt Sanatı | Mor `#5C3B8E` | mücellit, hat, tezhip, kitap/kırtasiye |
| 02 | Nesneyi Onaranlar | Sepia `#8A4A1F` | tamir, restorasyon, mekanik, analog |
| 03 | Geleneksel El Sanatları | İndigo `#1A3F8F` | dokuma, çini, cam, hasır-söğüt |
| 04 | Metal – Ahşap | Terracotta `#B85A1C` | bıçak, tesbih, oyma, sedef |

Veri modeli sabit 4 katman değil **N katmana açık** kurulur. Yeni katman/alt rota/koleksiyon eklenebilir.

## Değişmez İlkeler (Production Boyunca)

### Görsel kimlik
- Krem kâğıt + mürekkep paleti (`--atlas-paper`, `--atlas-ink` + 4 katman rengi)
- Editoryal tipografi: `Fraunces` (display), `Inter` (gövde), `Caveat` (saha notu aksanı, sınırlı)
- Doku (`paper-grain`, `paper-vignette`) kontrollü, opacity ≤ 0.35
- 4/8 spacing skalası
- **Yasak**: neon cyberpunk, NFT/crypto, glassmorphism abartısı, emoji ikonlar, dönen 3D dünya, hazır template estetik

### İçerik bütünlüğü
- Doğrulanmamış usta/adres/hikâye **uydurulmaz**; `is_published=false` ya da "Taslak / Saha doğrulaması bekleniyor" rozetiyle tutulur.
- Fiziksel atlas paftalarında basılı isimler/adresler doğrulanmış kabul edilir.
- Gerçek kişi portresi `permission_confirmed=true` olmadan yayınlanmaz.
- Kullanıcı önerileri (`submissions`) küratöryel inceleme olmadan atlasa girmez.

### Teknik
- Next.js App Router + TypeScript strict + Tailwind
- 3D sahne: React Three Fiber, `dynamic({ ssr: false })`, `frameloop="demand"`, AdaptiveDpr
- Backend: Supabase (Postgres + Storage + Auth), RLS zorunlu
- `SUPABASE_SERVICE_ROLE_KEY` **asla** client'a sızmaz
- `NEXT_PUBLIC_*` içine secret konulmaz
- Public form: honeypot + Turnstile (prod) + Zod server-side validation + rate limit
- 4 paftayı **aynı anda** full-res GPU'ya yüklemez; progressive

### Erişilebilirlik
- 3D canvas dekorartiftir; **tüm kritik bilgi** semantic HTML olarak bulunur
- `prefers-reduced-motion` aktifse büyük animasyonlar durur
- Klavye ile tüm CTA/nav/form erişilebilir
- Kontrast: gövde ≥ 4.5:1, büyük başlık ≥ 3:1

## Çalışma Protokolü

### Skills (`.claude/skills/`)
- `atlas-art-direction` — görsel kimlik kalite kontrolü
- `premium-webgl-atlas` — 3D sahne, performans, fallback
- `atlas-content-integrity` — gerçek/uydurma içerik ayrımı
- `supabase-security-review` — RLS, secret, form güvenliği
- `release-performance-a11y` — release öncesi tam tarama

### Subagents (`.claude/agents/`)
- `creative-director`, `experience-architect`, `webgl-scene-engineer`,
  `fullstack-data-architect`, `content-curator`, `security-reviewer`,
  `performance-accessibility-qa`

Faz protokolü: `docs/project-brief.md` § "Subagent Çalışma Protokolü".

## Klasör Yapısı

```
app/            Next.js App Router rotaları
components/     UI ve atlas bileşenleri (atlas/, ui/, layout/, three/, forms/, admin/)
lib/            constants, types, utils, supabase client, queries
public/         atlas görselleri, fotoğraflar, dokular
supabase/       migrations, policies, seed
docs/           kalıcı yön ve referans belgeleri
.claude/        skills ve agents
```

## Komutlar

```bash
npm run dev        # geliştirme sunucusu
npm run typecheck  # tsc --noEmit
npm run lint       # next lint
npm run build      # production build
```

## Brief'ten Verilen Değişmez Karar Noktaları

- **Deploy modeli**: Vercel + Supabase. GitHub Pages **değil** (dinamik içerik, admin, submission gerektirir).
- **Statik exhibition build**: opsiyonel, production'ın yerine geçmez.
- **Bu projede karanlık mod yok**: fiziksel kâğıt estetiği light tema gerektirir. İleride "gece arşivi" opsiyonel katman olabilir.
- **Mobil saha kullanımı önceliklidir**: bottom dock + büyük touch target + offline-friendly görüntüleme.

## Kullanıcıyı Durdurup Soracağın Durumlar

1. Yeni harita paftası / katman görseli gerekiyor
2. Usta isimleri, adresler, fotoğraflar doğrulanmamış
3. Logo / brand font dosyası
4. Supabase / Vercel hesap bilgileri
5. Yayın izni gerektiren gerçek kişi içeriği

Bunlar dışında: makul mühendislik kararlarını al, kayda geç, yürü.
