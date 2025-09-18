-- 0002_auth_rls.sql
create extension if not exists pgcrypto;

-- create customer on auth.users insert (placeholder, actual trigger installed via Supabase SQL)
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into customer (user_id, email) values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

-- helper for admin
create or replace function public.is_admin() returns boolean as $$
  select coalesce((current_setting('request.jwt.claims', true)::jsonb ->> 'role') = 'admin', false);
$$ language sql stable;

-- enable RLS
alter table customer enable row level security;
alter table address enable row level security;
alter table "order" enable row level security;
alter table order_item enable row level security;
alter table rma enable row level security;

-- public catalog policies
alter table brand enable row level security;
alter table product enable row level security;
alter table variant enable row level security;
alter table condition_grade enable row level security;
alter table price enable row level security;
alter table inventory enable row level security;
alter table image enable row level security;
alter table spec enable row level security;
alter table review enable row level security;

create policy "read_brand" on brand for select using (true);
create policy "read_variant" on variant for select using (true);
create policy "read_condition_grade" on condition_grade for select using (true);
create policy "read_price" on price for select using (true);
create policy "read_inventory" on inventory for select using (true);
create policy "read_image" on image for select using (true);
create policy "read_spec" on spec for select using (true);
create policy "read_review_published" on review for select using (is_published = true);
create policy "read_product_published_or_admin" on product for select using (is_published = true or public.is_admin());

-- owner policies
create policy "own_customer" on customer for select using (auth.uid() = user_id);
create policy "own_address_select" on address for select using (exists (select 1 from customer c where c.id = customer_id and c.user_id = auth.uid()));
create policy "own_address_write" on address for insert with check (exists (select 1 from customer c where c.id = customer_id and c.user_id = auth.uid()));
create policy "own_address_update" on address for update using (exists (select 1 from customer c where c.id = customer_id and c.user_id = auth.uid()));

create policy "own_order_select" on "order" for select using (exists (select 1 from customer c where c.id = customer_id and c.user_id = auth.uid()));
create policy "own_order_insert" on "order" for insert with check (exists (select 1 from customer c where c.id = customer_id and c.user_id = auth.uid()));

create policy "own_order_item_select" on order_item for select using (exists (select 1 from "order" o where o.id = order_id and exists (select 1 from customer c where c.id = o.customer_id and c.user_id = auth.uid())));
create policy "own_order_item_insert" on order_item for insert with check (exists (select 1 from "order" o where o.id = order_id and exists (select 1 from customer c where c.id = o.customer_id and c.user_id = auth.uid())));

create policy "own_rma_select" on rma for select using (exists (select 1 from "order" o where o.id = order_id and exists (select 1 from customer c where c.id = o.customer_id and c.user_id = auth.uid())));
create policy "own_rma_insert" on rma for insert with check (exists (select 1 from "order" o where o.id = order_id and exists (select 1 from customer c where c.id = o.customer_id and c.user_id = auth.uid())));
