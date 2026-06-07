---
name: supabase-security-review
description: Supabase RLS, auth, environment variable, storage policy, public form spam koruması ve admin yetkilendirmesini denetler. Backend tarafında her geliştirmeden sonra ve her deploy öncesi devreye girer.
---

# supabase-security-review

## Ne zaman devreye girer
- Yeni tablo, view veya policy eklendiğinde
- Auth/admin akışı değiştiğinde
- Storage bucket veya signed URL kullanıldığında
- `.env`, server action veya route handler yazıldığında
- Production deploy öncesi zorunlu

## Kontrol listesi
1. **RLS zorunlu** — tüm public tablolarda RLS açık. Public okuma yalnızca `is_published = true`.
2. **Submissions tek yönlü** — public `insert` yapabilir; `select`/`update`/`delete` yasak. Honeypot + rate limit zorunlu.
3. **Admin claim** — admin yetkisi `auth.users.user_metadata` veya custom claim ile doğrulanır; `role = 'admin'` server tarafında kontrol edilir, client'a güvenilmez.
4. **Service role server-only** — `SUPABASE_SERVICE_ROLE_KEY` yalnızca server runtime'ında okunur. Client bundle'a kaçmadığı `next build` analiziyle doğrulanır.
5. **Storage policy** — public bucket'larda yalnızca yayınlanmış asset okuma; usta fotoğrafları izin durumuna göre signed URL.
6. **Form doğrulama** — Zod schema server tarafında yeniden doğrulanır; client doğrulama sadece UX içindir.
7. **Logging** — submission ve admin işlemleri audit tablosuna yazılır; PII log'a sızmaz.

## Kabul kriterleri
- [ ] `policies.sql` tüm tablolar için açık ve test edilmiş.
- [ ] `service_role` ile `anon` arasındaki ayrım net.
- [ ] `.env.example` güncel, `.env.local` commit edilmiyor.
- [ ] Submission rate limit (örn. IP başına dakikada 3 deneme) çalışıyor.
- [ ] Admin endpoint'leri unauthenticated istekte 401/403 döner.
- [ ] Storage bucket public read yalnızca `media_assets.is_public = true` ile sınırlı.

## Yasak
- `NEXT_PUBLIC_*` içine secret koymak
- `service_role` key'i istemci kodunda çağırmak
- RLS'i geçici olarak kapatıp "sonra açarız" demek
- Submission listesini public okumaya açmak
