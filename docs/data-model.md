# Data Model

> Tüm tablolar Supabase Postgres üzerinde. RLS zorunlu; public okumalar `is_published = true` filtresine bağlı.

## `layers`
Atlas katmanları (N tane; bugün 4).

| col | type | notes |
|---|---|---|
| id | uuid pk | |
| slug | text unique | url-safe |
| title | text | |
| short_title | text | |
| color_key | text | enum kontrolü policy/check |
| color_hex | text | `#RRGGBB` |
| subtitle | text | "mücellit · hat · tezhip" |
| description | text | |
| manifesto_text | text | |
| sensory_theme | text | |
| cover_image_url | text | |
| map_texture_url | text | yüksek çözünürlüklü |
| map_fallback_image_url | text | |
| order_index | int | |
| is_published | bool default false | |
| created_at | timestamptz | |
| updated_at | timestamptz | |

## `routes`
Katman içinde veya katmanlar arası rota.

| col | type | notes |
|---|---|---|
| id | uuid pk | |
| slug | text unique | |
| layer_id | uuid fk → layers | nullable (cross-layer rotalar için) |
| title | text | |
| subtitle | text | |
| description | text | |
| estimated_duration_minutes | int | |
| distance_km | numeric | |
| start_area | text | |
| end_area | text | |
| difficulty | text | enum: easy/medium/hard |
| route_type | text | enum |
| map_overlay_data | jsonb | path, hotspot positions |
| is_featured | bool | |
| is_published | bool | |
| created_at | timestamptz | |
| updated_at | timestamptz | |

## `stops`
Usta, atölye, onarım durağı.

| col | type | notes |
|---|---|---|
| id | uuid pk | |
| slug | text unique | |
| name | text | |
| craft_type | text | |
| short_description | text | |
| editorial_story | text | |
| layer_id | uuid fk → layers | |
| district | text | |
| address | text | nullable (izin yoksa) |
| latitude | numeric | nullable |
| longitude | numeric | nullable |
| visit_status | text | enum: open/by-appointment/archive-only/unknown |
| appointment_required | bool | |
| public_phone | text | nullable |
| public_social_url | text | nullable |
| directions_url | text | |
| hero_image_url | text | |
| permission_confirmed | bool default false | |
| is_published | bool default false | |
| created_at | timestamptz | |
| updated_at | timestamptz | |

## `route_stops`
Rota → durak (sıralı). `map_x`/`map_y` fiziksel pafta üzerinde yüzde tabanlı hotspot konumu.

| col | type | notes |
|---|---|---|
| id | uuid pk | |
| route_id | uuid fk → routes on delete cascade | |
| stop_id | uuid fk → stops | |
| order_index | int | |
| map_x | numeric | 0–100 yüzde |
| map_y | numeric | 0–100 yüzde |
| annotation | text | nullable |
| created_at | timestamptz | |

## `stories`
Editoryal saha dosyaları.

| col | type | notes |
|---|---|---|
| id | uuid pk | |
| slug | text unique | |
| title | text | |
| excerpt | text | |
| body | text | markdown |
| story_type | text | enum |
| layer_id | uuid fk → layers | nullable |
| stop_id | uuid fk → stops | nullable |
| hero_image_url | text | |
| published_at | timestamptz | |
| is_featured | bool | |
| is_published | bool | |

## `media_assets`
Fotoğraf, video, ses, belge varlıkları.

| col | type | notes |
|---|---|---|
| id | uuid pk | |
| asset_type | text | enum |
| file_url | text | Supabase Storage url |
| alt_text | text | |
| caption | text | |
| credit | text | |
| stop_id | uuid fk → stops | nullable |
| story_id | uuid fk → stories | nullable |
| layer_id | uuid fk → layers | nullable |
| is_public | bool default false | |

## `submissions`
Kullanıcı önerileri — public insert, public select **yasak**.

| col | type | notes |
|---|---|---|
| id | uuid pk | |
| submitted_by_name | text | |
| submitted_by_email | text | |
| place_name | text | |
| district | text | |
| address_description | text | |
| craft_type | text | |
| reason_for_submission | text | |
| source_url | text | nullable |
| photo_url | text | nullable |
| moderation_status | text | enum: pending/approved/rejected/duplicate |
| moderation_notes | text | |
| created_at | timestamptz | |

## `distribution_points`
Fiziksel atlasın bulunabileceği yerler.

| col | type | notes |
|---|---|---|
| id | uuid pk | |
| name | text | |
| category | text | enum: university/cafe/library/cultural-center/other |
| district | text | |
| address | text | |
| latitude | numeric | |
| longitude | numeric | |
| availability_status | text | enum: in-stock/low/out-of-stock |
| notes | text | |
| is_published | bool default false | |

## İndeksler (planlı)
- `layers(slug)`, `layers(is_published, order_index)`
- `routes(slug)`, `routes(layer_id, is_published)`
- `stops(slug)`, `stops(layer_id, is_published)`, `stops(district)`
- `stories(slug)`, `stories(layer_id, is_published, published_at desc)`
- `submissions(moderation_status, created_at desc)`
