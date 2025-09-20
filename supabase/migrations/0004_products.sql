-- products table (keeps your existing name 'product')
create table if not exists public.product (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  is_published boolean not null default true,

  slug text unique not null,
  name text not null,
  brand text default 'Unknown',
  description text default '',

  category text not null check (category in ('phone','tablet','laptop','accessory')),

  price_cents integer not null,
  compare_at_cents integer,         -- optional, can compute as 1.25x in UI when null

  images jsonb not null default '[]',      -- array of url strings
  variants jsonb not null default '[]',    -- matches your variants shape if you want
  specs jsonb not null default '[]',
  reviews jsonb not null default '[]',
  stock integer not null default 0
);

alter table public.product enable row level security;

-- Read for everyone
create policy "read_product" on public.product
for select using (true);

-- (Option A) If you will write using service role only, stop here (service role bypasses RLS)
-- (Option B) If you want signed-in admins to write, also add:
-- profiles(id uuid primary key, is_admin boolean default false)
create policy "admin_write_product" on public.product
for all to authenticated
using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin = true))
with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin = true));
