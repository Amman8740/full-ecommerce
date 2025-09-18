-- 0001_init.sql
create table if not exists brand (
  id uuid primary key default gen_random_uuid(),
  name text unique not null,
  created_at timestamptz default now()
);

create table if not exists condition_grade (
  id smallint primary key,
  code text unique not null,
  label text not null,
  description text
);

create table if not exists product (
  id uuid primary key default gen_random_uuid(),
  brand_id uuid references brand(id) on delete set null,
  name text not null,
  slug text unique not null,
  description text,
  is_published boolean default false,
  created_at timestamptz default now()
);

create table if not exists variant (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references product(id) on delete cascade,
  storage_gb int,
  color text,
  sku text unique
);

create table if not exists price (
  id uuid primary key default gen_random_uuid(),
  variant_id uuid references variant(id) on delete cascade,
  grade_id smallint references condition_grade(id) on delete cascade,
  amount_cents int not null,
  currency text default 'GBP',
  unique(variant_id, grade_id)
);

create table if not exists inventory (
  id uuid primary key default gen_random_uuid(),
  variant_id uuid references variant(id) on delete cascade,
  grade_id smallint references condition_grade(id) on delete cascade,
  qty int default 0,
  unique(variant_id, grade_id)
);

create table if not exists image (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references product(id) on delete cascade,
  url text not null,
  alt text,
  sort int
);

create table if not exists spec (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references product(id) on delete cascade,
  key text,
  value text,
  sort int
);

create table if not exists customer (
  id uuid primary key default gen_random_uuid(),
  user_id uuid unique,
  email text,
  full_name text,
  phone text,
  created_at timestamptz default now()
);

create table if not exists address (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references customer(id) on delete cascade,
  line1 text,
  city text,
  postcode text,
  country text,
  is_default boolean
);

create table if not exists "order" (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references customer(id) on delete set null,
  status text default 'pending',
  subtotal_cents int default 0,
  shipping_cents int default 0,
  discount_cents int default 0,
  total_cents int default 0,
  currency text default 'GBP',
  payment_intent_id text,
  provider text,
  placed_at timestamptz,
  created_at timestamptz default now()
);

create table if not exists order_item (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references "order"(id) on delete cascade,
  variant_id uuid references variant(id),
  grade_id smallint references condition_grade(id),
  qty int,
  unit_cents int
);

create table if not exists discount_code (
  id uuid primary key default gen_random_uuid(),
  code text unique,
  type text check (type in ('percent','amount')),
  value int,
  starts_at timestamptz,
  ends_at timestamptz,
  max_redemptions int,
  redemptions int default 0
);

create table if not exists review (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references product(id) on delete cascade,
  rating int check (rating between 1 and 5),
  title text,
  body text,
  author text,
  is_published boolean default false,
  created_at timestamptz default now()
);

create table if not exists rma (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references "order"(id) on delete cascade,
  reason text,
  status text default 'requested',
  label_url text,
  created_at timestamptz default now()
);
