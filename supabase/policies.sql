-- policies.sql
-- Ankara Onarım Atlası — RLS politikaları.
-- Public anon: yalnızca yayınlanmış (is_published=true) içerikleri okur.
-- Submissions: anon insert OK, select/update/delete yasak.
-- Admin: auth.jwt() içinde role='admin' olan kullanıcılar.
--
-- Admin role'ü Supabase Auth tarafında custom claim ile set edilir
-- (örn. service-role bir trigger ile user_metadata.role='admin' yazar
-- ve JWT'ye yansır). Bu projede `auth.jwt()->>'role' = 'admin'` denetimi
-- jwt'nin payload'ında 'app_role' veya 'role' claim'i taşıdığını varsayar.

-- Helper: admin check
create or replace function is_admin() returns boolean as $$
  select coalesce(auth.jwt()->>'app_role' = 'admin', false);
$$ language sql stable;

-- ============================================================
-- LAYERS
-- ============================================================
create policy "layers_public_read"
  on layers for select to anon, authenticated
  using (is_published = true);

create policy "layers_admin_all"
  on layers for all to authenticated
  using (is_admin()) with check (is_admin());

-- ============================================================
-- ROUTES
-- ============================================================
create policy "routes_public_read"
  on routes for select to anon, authenticated
  using (is_published = true);

create policy "routes_admin_all"
  on routes for all to authenticated
  using (is_admin()) with check (is_admin());

-- ============================================================
-- STOPS
-- ============================================================
create policy "stops_public_read"
  on stops for select to anon, authenticated
  using (is_published = true);

create policy "stops_admin_all"
  on stops for all to authenticated
  using (is_admin()) with check (is_admin());

-- ============================================================
-- ROUTE_STOPS
-- ============================================================
create policy "route_stops_public_read"
  on route_stops for select to anon, authenticated
  using (
    exists (select 1 from routes r where r.id = route_stops.route_id and r.is_published = true)
    and exists (select 1 from stops s where s.id = route_stops.stop_id and s.is_published = true)
  );

create policy "route_stops_admin_all"
  on route_stops for all to authenticated
  using (is_admin()) with check (is_admin());

-- ============================================================
-- STORIES
-- ============================================================
create policy "stories_public_read"
  on stories for select to anon, authenticated
  using (is_published = true);

create policy "stories_admin_all"
  on stories for all to authenticated
  using (is_admin()) with check (is_admin());

-- ============================================================
-- MEDIA_ASSETS
-- ============================================================
create policy "media_public_read"
  on media_assets for select to anon, authenticated
  using (is_public = true);

create policy "media_admin_all"
  on media_assets for all to authenticated
  using (is_admin()) with check (is_admin());

-- ============================================================
-- SUBMISSIONS  (anon insert OK, select/update/delete yasak)
-- ============================================================
create policy "submissions_anon_insert"
  on submissions for insert to anon, authenticated
  with check (
    length(submitted_by_name) between 2 and 120
    and length(submitted_by_email) between 5 and 254
    and submitted_by_email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
    and length(place_name) between 2 and 200
    and length(reason_for_submission) between 10 and 4000
    and moderation_status = 'pending'
  );

-- Hiçbir public select yok — admin'ler servis tarafından okur.
create policy "submissions_admin_read"
  on submissions for select to authenticated
  using (is_admin());

create policy "submissions_admin_modify"
  on submissions for update to authenticated
  using (is_admin()) with check (is_admin());

create policy "submissions_admin_delete"
  on submissions for delete to authenticated
  using (is_admin());

-- ============================================================
-- DISTRIBUTION_POINTS
-- ============================================================
create policy "distribution_public_read"
  on distribution_points for select to anon, authenticated
  using (is_published = true);

create policy "distribution_admin_all"
  on distribution_points for all to authenticated
  using (is_admin()) with check (is_admin());

-- ============================================================
-- AUDIT_LOG  (sadece admin)
-- ============================================================
create policy "audit_admin_only"
  on audit_log for all to authenticated
  using (is_admin()) with check (is_admin());
