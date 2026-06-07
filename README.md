# Ankara Onarım Atlası

> Şehir sadece inşa edilen değil, onarılarak sürdürülen bir sistemdir.

Ankara'nın görünmeyen niş onarım ve zanaat ağlarını **fiziksel atlas paftaları**, dijital rota deneyimleri, usta profilleri ve yaşayan bir arşiv aracılığıyla görünür kılan kültürel tasarım projesinin web ürünü.

## Stack
Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS · React Three Fiber (Faz 3) · Supabase (Faz 4) · Vercel

## Geliştirme

```bash
npm install
npm run dev
# → http://localhost:3000
```

Diğer komutlar:
```bash
npm run typecheck
npm run lint
npm run build
```

## Yapı
```
app/             Next.js App Router rotaları
components/      UI ve atlas bileşenleri
lib/             constants, types, utils
public/atlas/    fiziksel atlas paftaları
supabase/        migrations, policies, seed
docs/            kalıcı yön/referans belgeleri
.claude/         skills + subagents (proje seviyesinde)
CLAUDE.md        proje bağlamı — değişmez kurallar
```

## Önemli Belgeler
- [`CLAUDE.md`](./CLAUDE.md) — proje bağlamı, değişmez kurallar
- [`docs/project-brief.md`](./docs/project-brief.md) — özet brief + faz planı
- [`docs/architecture.md`](./docs/architecture.md) — teknik mimari
- [`docs/art-direction.md`](./docs/art-direction.md) — görsel kimlik kararları
- [`docs/data-model.md`](./docs/data-model.md) — Supabase şeması
- [`docs/security.md`](./docs/security.md) — güvenlik kuralları
- [`docs/deployment.md`](./docs/deployment.md) — deploy süreci

## Lisans ve İçerik
Tüm görsel ve metin içerikleri küratöryel izinle yayınlanmıştır. Atlas paftaları, usta isimleri, fotoğraflar ve hikâyeler proje sahibinin telif hakkı kapsamındadır.
