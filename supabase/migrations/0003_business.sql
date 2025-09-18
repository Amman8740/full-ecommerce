-- 0003_business.sql
create or replace function public.decrement_inventory_on_paid()
returns trigger as $$
begin
  if new.status = 'paid' and old.status is distinct from 'paid' then
    update inventory i
      set qty = greatest(0, i.qty - oi.qty)
      from order_item oi
      where oi.order_id = new.id and i.variant_id = oi.variant_id and i.grade_id = oi.grade_id;
  end if;
  return new;
end;
$$ language plpgsql;

create trigger trg_decrement_inventory_on_paid
after update of status on "order"
for each row execute function public.decrement_inventory_on_paid();
