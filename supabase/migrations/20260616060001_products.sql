-- Homemade Happiness - Products and Orders Schema

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  price INTEGER NOT NULL,
  image TEXT,
  description TEXT,
  ingredients TEXT[],
  is_bestseller BOOLEAN DEFAULT false,
  is_new BOOLEAN DEFAULT false,
  rating DECIMAL DEFAULT 4.5,
  reviews INTEGER DEFAULT 0,
  stock INTEGER DEFAULT 100,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view products"
  ON products FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert products"
  ON products FOR INSERT
  WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admins can update products"
  ON products FOR UPDATE
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admins can delete products"
  ON products FOR DELETE
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  items JSONB NOT NULL,
  total_amount INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'Pending' CHECK (status IN ('Pending', 'Confirmed', 'Preparing', 'Out for Delivery', 'Delivered')),
  address JSONB,
  delivery_time TEXT,
  payment_method TEXT,
  payment_status TEXT DEFAULT 'Pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own orders"
  ON orders FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own orders"
  ON orders FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all orders"
  ON orders FOR SELECT
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admins can update orders"
  ON orders FOR UPDATE
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Cart items table (optional syncing for logged-in users)
CREATE TABLE IF NOT EXISTS cart_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  product_id UUID REFERENCES products(id) NOT NULL,
  quantity INTEGER DEFAULT 1,
  removed_ingredients TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own cart"
  ON cart_items FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own cart"
  ON cart_items FOR ALL
  USING (auth.uid() = user_id);

-- Seed products (bestsellers first)
INSERT INTO products (name, category, price, image, description, ingredients, is_bestseller, is_new, rating, reviews) VALUES
('Classic Chocolate Cake', 'Cakes', 650, 'https://placehold.co/400x300/8B4513/F5DEB3?text=Chocolate+Cake', 'Rich, moist chocolate cake with creamy chocolate frosting. A timeless favorite for any occasion.', ARRAY['Flour', 'Sugar', 'Cocoa Powder', 'Eggs', 'Butter', 'Vanilla Extract'], true, false, 4.8, 124),
('Red Velvet Cake', 'Cakes', 750, 'https://placehold.co/400x300/8B4513/F5DEB3?text=Red+Velvet', 'Velvety red layers with cream cheese frosting. The perfect balance of sweetness and tang.', ARRAY['Flour', 'Sugar', 'Cocoa Powder', 'Buttermilk', 'Cream Cheese', 'Red Food Color'], true, false, 4.7, 98),
('Chocolate Chip Cookies', 'Cookies', 250, 'https://placehold.co/400x300/D2691E/FFE4B5?text=Choc+Chip+Cookies', 'Soft, chewy cookies loaded with premium chocolate chips. Baked to golden perfection.', ARRAY['Flour', 'Butter', 'Brown Sugar', 'Chocolate Chips', 'Eggs', 'Vanilla'], true, false, 4.9, 156),
('French Croissant', 'Pastries', 180, 'https://placehold.co/400x300/DEB887/8B4513?text=French+Croissant', 'Buttery, flaky, golden-brown croissant made with traditional French techniques.', ARRAY['Flour', 'Butter', 'Yeast', 'Sugar', 'Salt', 'Milk'], true, false, 4.6, 89),
('Sourdough Bread', 'Breads', 350, 'https://placehold.co/400x300/F5DEB3/8B4513?text=Sourdough+Bread', 'Artisan sourdough with a crisp crust and soft, tangy interior. Naturally leavened.', ARRAY['Flour', 'Water', 'Salt', 'Sourdough Starter'], true, false, 4.5, 67),
('Blueberry Muffin', 'Muffins', 180, 'https://placehold.co/400x300/CD853F/FFF8DC?text=Blueberry+Muffin', 'Fluffy muffins bursting with fresh blueberries and a hint of lemon zest.', ARRAY['Flour', 'Sugar', 'Blueberries', 'Butter', 'Eggs', 'Lemon Zest'], true, false, 4.4, 73),
('New York Cheesecake', 'Cheesecakes', 650, 'https://placehold.co/400x300/FFFACD/8B4513?text=NY+Cheesecake', 'Creamy, dense New York-style cheesecake on a graham cracker crust. Pure indulgence.', ARRAY['Cream Cheese', 'Sugar', 'Eggs', 'Vanilla', 'Graham Crackers', 'Butter'], true, false, 4.9, 112),
('Apple Pie', 'Pies', 450, 'https://placehold.co/400x300/FF8C00/FFF8DC?text=Apple+Pie', 'Classic apple pie with cinnamon-spiced filling in a flaky, buttery crust.', ARRAY['Apples', 'Flour', 'Butter', 'Cinnamon', 'Sugar', 'Nutmeg'], true, false, 4.6, 85),
('Assorted Macarons', 'Macarons', 250, 'https://placehold.co/400x300/E6E6FA/4B0082?text=Macarons', 'Delicate French macarons in assorted flavors. A colorful treat for every palate.', ARRAY['Almond Flour', 'Egg Whites', 'Sugar', 'Food Coloring', 'Buttercream'], true, false, 4.7, 94),
('Walnut Brownie', 'Brownies', 280, 'https://placehold.co/400x300/3E2723/D7CCC8?text=Walnut+Brownie', 'Fudgy chocolate brownies loaded with crunchy walnuts. A chocolate lovers dream.', ARRAY['Chocolate', 'Butter', 'Sugar', 'Eggs', 'Flour', 'Walnuts'], true, false, 4.8, 103),
('Glazed Donut', 'Donuts', 150, 'https://placehold.co/400x300/FF1493/FFF0F5?text=Glazed+Donut', 'Light, fluffy donuts with a sweet, glossy glaze. Melt-in-your-mouth delicious.', ARRAY['Flour', 'Sugar', 'Yeast', 'Eggs', 'Butter', 'Vanilla'], true, false, 4.5, 78),
('Fruit Tart', 'Tarts', 380, 'https://placehold.co/400x300/FFD700/8B4513?text=Fruit+Tart', 'Crisp pastry shell filled with velvety custard and topped with fresh seasonal fruits.', ARRAY['Flour', 'Butter', 'Custard', 'Mixed Fruits', 'Sugar', 'Gelatin'], true, false, 4.6, 91);
