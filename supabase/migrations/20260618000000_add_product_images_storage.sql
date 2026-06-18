-- Create storage bucket for dish images
insert into storage.buckets (id, name, public)
values ('dish-images', 'dish-images', true)
on conflict (id) do nothing;

-- Public read access for dish images
create policy "Public Read Access"
on storage.objects for select
using (bucket_id = 'dish-images');

-- Add image_url column if not present (from previous migration)
alter table products add column if not exists image_url text;

-- Add serving info columns
alter table products add column if not exists serving_size text default '1 pc';
alter table products add column if not exists serving_type text default 'pieces'
  check (serving_type in ('weight', 'pieces'));

-- Update image_url for existing products by name
update products set image_url = '/images/cc.webp'   where name = 'Classic Chocolate Cake';
update products set image_url = '/images/Rv.jpg'    where name = 'Red Velvet Cake';
update products set image_url = '/images/vc.png'    where name = 'Vanilla Bean Cake';
update products set image_url = '/images/bfc.webp'  where name = 'Black Forest Cake';
update products set image_url = '/images/3c.jpg'    where name = 'Chocolate Chip Cookies';
update products set image_url = '/images/orc.webp'  where name = 'Oatmeal Raisin Cookies';
update products set image_url = '/images/dcc.jpg'   where name = 'Double Chocolate Cookies';
update products set image_url = '/images/fc.jpg'    where name = 'French Croissant';
update products set image_url = '/images/dp.jpg'    where name = 'Danish Pastry';
update products set image_url = '/images/cp.jpg'    where name = 'Cream Puff';
update products set image_url = '/images/sb.jpg'    where name = 'Sourdough Bread';
update products set image_url = '/images/wwb.jpg'   where name = 'Whole Wheat Bread';
update products set image_url = '/images/gb.webp'   where name = 'Garlic Bread';
update products set image_url = '/images/bm.jpg'    where name = 'Blueberry Muffin';
update products set image_url = '/images/ccm.webp'  where name = 'Chocolate Chip Muffin';
update products set image_url = '/images/bnm.jpg'   where name = 'Banana Nut Muffin';
update products set image_url = '/images/cvc.webp'  where name = 'Vanilla Cupcake';
update products set image_url = '/images/ccup.jpg'  where name = 'Chocolate Cupcake';
update products set image_url = '/images/wnb.webp'  where name = 'Walnut Brownie';
update products set image_url = '/images/Classic-Brownies.jpg' where name = 'Classic Brownie';
update products set image_url = '/images/gd.jpg'    where name = 'Glazed Donut';
update products set image_url = '/images/chocod.png' where name = 'Chocolate Donut';
update products set image_url = '/images/apie.webp' where name = 'Apple Pie';
update products set image_url = '/images/pumpie.jpg' where name = 'Pumpkin Pie';
update products set image_url = '/images/ft.webp'   where name = 'Fruit Tart';
update products set image_url = '/images/chocot.jpeg' where name = 'Chocolate Tart';
update products set image_url = '/images/nycc.png'  where name = 'New York Cheesecake';
update products set image_url = '/images/bbcc.jpg'  where name = 'Blueberry Cheesecake';
update products set image_url = '/images/scc.jpg'   where name = 'Strawberry Cheesecake';
update products set image_url = '/images/mac.jpg'   where name = 'Assorted Macarons';
update products set image_url = '/images/cmac.webp' where name = 'Chocolate Macaron';
update products set image_url = '/images/pmac.webp' where name = 'Pistachio Macaron';

-- Update serving sizes
update products set serving_size = '500g',  serving_type = 'weight' where category = 'Cakes';
update products set serving_size = '6 pcs', serving_type = 'pieces' where category = 'Cookies';
update products set serving_size = '80g',   serving_type = 'weight' where name = 'French Croissant';
update products set serving_size = '90g',   serving_type = 'weight' where name = 'Danish Pastry';
update products set serving_size = '3 pcs', serving_type = 'pieces' where name = 'Cream Puff';
update products set serving_size = '400g',  serving_type = 'weight' where name in ('Sourdough Bread', 'Whole Wheat Bread', 'Apple Pie', 'Pumpkin Pie');
update products set serving_size = '250g',  serving_type = 'weight' where name = 'Garlic Bread';
update products set serving_size = '80g',   serving_type = 'weight' where category = 'Muffins';
update products set serving_size = '60g',   serving_type = 'weight' where category = 'Cupcakes';
update products set serving_size = '2 pcs', serving_type = 'pieces' where category = 'Brownies';
update products set serving_size = '70g',   serving_type = 'weight' where category = 'Donuts';
update products set serving_size = '120g',  serving_type = 'weight' where category = 'Tarts';
update products set serving_size = '150g',  serving_type = 'weight' where category = 'Cheesecakes';
update products set serving_size = '6 pcs', serving_type = 'pieces' where name = 'Assorted Macarons';
update products set serving_size = '3 pcs', serving_type = 'pieces' where category = 'Macarons' and name != 'Assorted Macarons';
