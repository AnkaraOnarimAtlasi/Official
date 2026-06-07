# Architecture

## Stack
- **Next.js 15** (App Router, RSC default)
- **React 19**
- **TypeScript** strict
- **Tailwind CSS 3** + CSS variables (design tokens)
- **next/font/google** — Fraunces, Inter, Caveat
- **Supabase** Postgres + Storage + Auth (Faz 4+)
- **React Three Fiber + drei** (Faz 3)
- **Zod + React Hook Form** (form layer — Faz 4)
- **Playwright** smoke tests (Faz 6)
- **Vercel** production deploy

## Server / Client ayrımı
- Default: Server Component (RSC)
- `'use client'` yalnızca: form etkileşimi, React Three Fiber canvas, focus/event-heavy UI
- Veri okuma: server action veya RSC içinde Supabase server client
- Veri yazma: server action veya route handler (POST), client'tan asla servis key kullanılmaz

## Route Mimari (`app/`)
```
/                  ana sayfa
/atlas             interaktif atlas
/atlas/[layer]     katman detay
/rotalar           tüm rotalar
/rotalar/[route]   rota detay
/duraklar/[stop]   durak (usta) profili
/hikayeler         editoryal arşiv
/hikayeler/[slug]
/atlas-edinin      fiziksel atlas + dağıtım
/katki-sagla       submission formu
/proje             hakkında / manifesto / yöntem / ekip
/iletisim
/admin             auth-gated
  /admin/giris
  /admin/duraklar
  /admin/rotalar
  /admin/hikayeler
  /admin/oneriler
  /admin/dagitim-noktalari
/api/...           route handlers (submissions, admin actions)
```

## Component Kategorileri
- `components/layout/` — Header, Footer, MobileDock, PageTransition
- `components/ui/` — AtlasButton, LayerBadge, SectionHeading, EditorialCard...
- `components/atlas/` — AtlasHero, LayerCard, LayersGrid, ManifestoBlock,
  PhysicalAtlasBlock, SubmissionCTA, (Faz 3) AtlasMapViewer, HotspotMarker
- `components/three/` — Faz 3: AtlasCanvas, AtlasScene, PaperSheetMesh,
  AdaptiveQuality, SceneLoader, SceneFallback
- `components/forms/` — Faz 4: SubmissionForm, SubmissionSuccess
- `components/admin/` — Faz 5

## Veri Akışı
```
Client (RSC)
  └─> server query (Supabase server client, RLS public read)
       └─> Postgres (is_published = true)
Client (form)
  └─> server action ('use server')
       ├─> Zod parse
       ├─> rate limit + honeypot/Turnstile check
       └─> insert (Supabase service client, pending)
```

## Performans Stratejisi
- 3D canvas: dynamic import, ssr: false, intersection-observer lazy mount
- Texture: progressive (thumb → mobile → optimized → original on inspection)
- `next/image` ile responsive, AVIF/WebP
- Bundle: route-based splitting (Next default), `optimizePackageImports` clsx/tw-merge
- Reduced motion: motion preferences global hook ile algılanır, sahne moduna karar verir

## Faz 3 — 3D Sahne Yapısı (planlanan)
```
<AtlasCanvas>             dynamic, ssr:false
  <AdaptiveQuality>       high | balanced | reduced
  <CameraRig>             scroll + pointer damped
  <LayerStackScene>       4 PaperSheetMesh, statik konumlanma
    <PaperSheetMesh>      her pafta için: PlaneGeometry + paper material
  <MapInspectionScene>    layer seçildiğinde aktif
    <HotspotMarker>       map_x, map_y yüzde tabanlı pin
  <SceneLoader>           progressive texture yöneticisi
<AtlasFallbackViewer>     WebGL yok / reduced motion durumu
```
