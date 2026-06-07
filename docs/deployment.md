# Deployment

## Production
- **Frontend**: Vercel (GitHub `main` branch → production)
- **Backend**: Supabase (managed Postgres + Storage + Auth)
- **DNS / Domain**: TBD
- **Preview**: Vercel her PR ve branch push'unda otomatik preview

## Neden GitHub Pages değil?
Site dinamik içerik (Supabase reads), submission formu (Supabase inserts), admin paneli ve dinamik SEO meta gerektirir. GitHub Pages saf statik hosting olduğundan production için uygun değildir.

## Opsiyonel: Static Exhibition Build
Jüri sunumu / offline demo için, Supabase bağımlı sayfalar fallback seed verisiyle build edilen ayrı bir `next build` output'u üretilebilir. Bu **production'ın yerine geçmez**.

## Environment
| Variable | Public? | Açıklama |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | ✓ | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✓ | Anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | ✗ | Server-only |
| `NEXT_PUBLIC_SITE_URL` | ✓ | Canonical/OG |
| `TURNSTILE_SECRET_KEY` | ✗ | Form doğrulama |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | ✓ | Form widget |

## Adımlar (Faz 4 ile aktif)
1. Supabase project oluştur → `supabase/migrations/*.sql` apply
2. RLS policies + seed import
3. Storage bucket oluştur, policy ekle
4. Vercel project + env variables
5. GitHub repo → Vercel bağla
6. Custom domain
7. Lighthouse + axe + Playwright smoke
8. Production go-live

## Rollback
- Vercel: önceki deployment'a one-click revert
- Supabase: migration `down` script veya snapshot restore
- `main` branch hotfix flow: branch → PR → review → merge → auto deploy
