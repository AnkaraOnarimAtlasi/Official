# Security

## Secret hijyeni
- `.env`, `.env.local`, `.env.*.local` **gitignore**'da; commit yasak.
- `.env.example` placeholders ile commit edilir.
- `NEXT_PUBLIC_*` içine yalnızca client'ta açıkça gerekli değerler (anon key, site key) konur.
- `SUPABASE_SERVICE_ROLE_KEY` sadece server runtime (server action, route handler, scripts).

## Supabase RLS
- Tüm tablolar `ENABLE ROW LEVEL SECURITY`.
- Public okuma: yalnızca `is_published = true` filtresine sahip policy.
- `submissions`:
  - `INSERT` anon allowed (with required fields validated server-side)
  - `SELECT`, `UPDATE`, `DELETE` anon **denied**
- `admin` operations: server tarafında auth.uid() + role kontrolü.

## Form güvenliği
- Honeypot alanı zorunlu
- Production'da Cloudflare Turnstile
- Rate limit: IP başına dakikada 3 deneme (Upstash Redis veya Supabase'de basit tablo)
- Server tarafında Zod ile yeniden doğrulama
- Email field için MX/format kontrolü

## Storage
- Bucket'lar private default
- Public read yalnızca `media_assets.is_public = true` ile eşleşen objelerde
- Usta fotoğrafları izin alınana kadar signed URL ile sınırlı erişim

## Bağımlılık
- `npm audit` her PR'da
- Major version bump'larda manual review
- Renovate/Dependabot (Faz 6)

## Logging
- Sentry (Faz 6) — PII filtreli
- Admin işlemleri audit tablosuna yazılır
- Submission içeriği log'lara çıkmaz, sadece ID + status

## Deploy öncesi blocker check listesi
- [ ] `git grep -nE "SUPABASE_SERVICE_ROLE|sk_live|sk_test"` boş
- [ ] `.next/standalone` veya build output'ta secret string yok
- [ ] RLS policies tüm tablolar için aktif
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` Anon role'üne bağlı, başka değil
- [ ] Admin endpoint unauthenticated istekte 401 dönüyor
- [ ] Submission rate limit smoke testi yeşil
