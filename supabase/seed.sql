-- seed brands
insert into brand (name) values ('Apple') on conflict do nothing;
insert into brand (name) values ('Samsung') on conflict do nothing;

-- seed grades
insert into condition_grade (id, code, label, description) values
  (1, 'fair', 'Fair', 'Visible signs of use') on conflict do nothing;
insert into condition_grade (id, code, label, description) values
  (2, 'vg', 'Very Good', 'Light signs of use') on conflict do nothing;
insert into condition_grade (id, code, label, description) values
  (3, 'ex', 'Excellent', 'Minimal signs of use') on conflict do nothing;
insert into condition_grade (id, code, label, description) values
  (4, 'ln', 'Like New', 'Almost new') on conflict do nothing;

-- sample product with images/specs
with b as (
  select id from brand where name='Apple' limit 1
), p as (
  insert into product (brand_id, name, slug, description, is_published)
  select b.id, 'Apple iPhone 13', 'iphone-13', 'Refurbished iPhone 13', true from b
  on conflict (slug) do update set name=excluded.name
  returning id
)
insert into image (product_id, url, alt, sort)
select p.id,
  'https://images.unsplash.com/photo-1631700611304-3bf264e80b6f?q=80&w=1200&auto=format&fit=crop',
  'iPhone 13',
  1
from p
on conflict do nothing;
