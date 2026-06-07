-- 0001_initial_schema.sql
-- Ankara Onarım Atlası — başlangıç şeması
-- Tüm tablolar RLS açık; policies.sql ayrı dosyada uygulanır.

create extension if not exists "pgcrypto";

-- Enum'lar
create type visit_status as enum ('open', 'by-appointment', 'archive-only', 'unknown');
create type moderation_status as enum ('pending', 'approved', 'rejected', 'duplicate');
create type asset_type as enum ('image', 'video', 'audio', 'document');
create type difficulty as enum ('easy', 'medium', 'hard');
create type route_type as enum ('linear', 'loop', 'thematic', 'archive-only');
create type story_type as enum ('master-portrait', 'object-story', 'technique', 'field-journal', 'lost-craft', 'atlas-update');
create type distribution_category as enum ('university', 'cafe', 'library', 'cultural-center', 'bookstore', 'other');
create type availability_status as enum ('in-stock', 'low', 'out-of-stock');

-- Updated_at trigger
create or replace function set_updated_at() returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- layers
create table layers (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  short_title text,
  color_key text not null,
  color_hex text not null check (color_hex ~ '^#[0-9A-Fa-f]{6}$'),
  subtitle text,
  description text,
  manifesto_text text,
  sensory_theme text,
  cover_image_url text,
  map_texture_url text,
  map_fallback_image_url text,
  order_index int not null default 0,
  is_published bool not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index layers_published_order_idx on layers (is_published, order_index);
create trigger trg_layers_updated before update on layers
  for each row execute function set_updated_at();

-- routes
create table routes (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  layer_id uuid references layers(id) on delete set null,
  title text not null,
  subtitle text,
  description text,
  estimated_duration_minutes int,
  distance_km numeric(5,2),
  start_area text,
  end_area text,
  difficulty difficulty,
  route_type route_type,
  map_overlay_data jsonb,
  is_featured bool not null default false,
  is_published bool not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index routes_layer_published_idx on routes (layer_id, is_published);
create trigger trg_routes_updated before update on routes
  for each row execute function set_updated_at();

-- stops
create table stops (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  craft_type text,
  short_description text,
  editorial_story text,
  layer_id uuid references layers(id) on delete set null,
  district text,
  address text,
  latitude numeric(9,6),
  longitude numeric(9,6),
  visit_status visit_status not null default 'unknown',
  appointment_required bool not null default false,
  public_phone text,
  public_social_url text,
  directions_url text,
  hero_image_url text,
  permission_confirmed bool not null default false,
  is_published bool not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index stops_layer_published_idx on stops (layer_id, is_published);
create index stops_district_idx on stops (district);
create trigger trg_stops_updated before update on stops
  for each row execute function set_updated_at();

-- route_stops
create table route_stops (
  id uuid primary key default gen_random_uuid(),
  route_id uuid not null references routes(id) on delete cascade,
  stop_id uuid not null references stops(id) on delete cascade,
  order_index int not null default 0,
  map_x numeric(5,2) check (map_x between 0 and 100),
  map_y numeric(5,2) check (map_y between 0 and 100),
  annotation text,
  created_at timestamptz not null default now(),
  unique (route_id, stop_id)
);
create index route_stops_route_order_idx on route_stops (route_id, order_index);

-- stories
create table stories (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text,
  body text,
  story_type story_type,
  layer_id uuid references layers(id) on delete set null,
  stop_id uuid references stops(id) on delete set null,
  hero_image_url text,
  published_at timestamptz,
  is_featured bool not null default false,
  is_published bool not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index stories_published_idx on stories (is_published, published_at desc);
create trigger trg_stories_updated before update on stories
  for each row execute function set_updated_at();

-- media_assets
create table media_assets (
  id uuid primary key default gen_random_uuid(),
  asset_type asset_type not null,
  file_url text not null,
  alt_text text,
  caption text,
  credit text,
  stop_id uuid references stops(id) on delete cascade,
  story_id uuid references stories(id) on delete cascade,
  layer_id uuid references layers(id) on delete cascade,
  is_public bool not null default false,
  created_at timestamptz not null default now()
);
create index media_stop_idx on media_assets (stop_id);
create index media_story_idx on media_assets (story_id);
create index media_layer_idx on media_assets (layer_id);

-- submissions
create table submissions (
  id uuid primary key default gen_random_uuid(),
  submitted_by_name text not null,
  submitted_by_email text not null,
  place_name text not null,
  district text,
  address_description text,
  craft_type text,
  reason_for_submission text not null,
  source_url text,
  photo_url text,
  moderation_status moderation_status not null default 'pending',
  moderation_notes text,
  created_at timestamptz not null default now()
);
create index submissions_moderation_idx on submissions (moderation_status, created_at desc);

-- distribution_points
create table distribution_points (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category distribution_category,
  district text,
  address text,
  latitude numeric(9,6),
  longitude numeric(9,6),
  availability_status availability_status not null default 'in-stock',
  notes text,
  is_published bool not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index distribution_published_idx on distribution_points (is_published);
create trigger trg_distribution_updated before update on distribution_points
  for each row execute function set_updated_at();

-- Audit (admin işlemleri)
create table audit_log (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid,
  action text not null,
  entity_type text not null,
  entity_id uuid,
  details jsonb,
  created_at timestamptz not null default now()
);
create index audit_created_idx on audit_log (created_at desc);

-- RLS aktif (policies.sql ile politikalar uygulanır)
alter table layers enable row level security;
alter table routes enable row level security;
alter table stops enable row level security;
alter table route_stops enable row level security;
alter table stories enable row level security;
alter table media_assets enable row level security;
alter table submissions enable row level security;
alter table distribution_points enable row level security;
alter table audit_log enable row level security;
