export interface Dish {
  id: number
  name: string
  price: number
  category: string
  imageUrl: string
  servingSize: string
  servingType: 'weight' | 'pieces'
}

export const dishes: Dish[] = [
  { id: 1, name: 'Classic Chocolate Cake', price: 550, category: 'Cakes', imageUrl: '/images/cc.webp', servingSize: '500g', servingType: 'weight' },
  { id: 2, name: 'Red Velvet Cake', price: 600, category: 'Cakes', imageUrl: '/images/Rv.jpg', servingSize: '500g', servingType: 'weight' },
  { id: 3, name: 'Vanilla Bean Cake', price: 480, category: 'Cakes', imageUrl: '/images/vc.png', servingSize: '500g', servingType: 'weight' },
  { id: 4, name: 'Black Forest Cake', price: 650, category: 'Cakes', imageUrl: '/images/bfc.webp', servingSize: '500g', servingType: 'weight' },
  { id: 5, name: 'Chocolate Chip Cookies', price: 120, category: 'Cookies', imageUrl: '/images/3c.jpg', servingSize: '6 pcs', servingType: 'pieces' },
  { id: 6, name: 'Oatmeal Raisin Cookies', price: 110, category: 'Cookies', imageUrl: '/images/orc.webp', servingSize: '6 pcs', servingType: 'pieces' },
  { id: 7, name: 'Double Chocolate Cookies', price: 140, category: 'Cookies', imageUrl: '/images/dcc.jpg', servingSize: '6 pcs', servingType: 'pieces' },
  { id: 8, name: 'French Croissant', price: 90, category: 'Pastries', imageUrl: '/images/fc.jpg', servingSize: '80g', servingType: 'weight' },
  { id: 9, name: 'Danish Pastry', price: 100, category: 'Pastries', imageUrl: '/images/dp.jpg', servingSize: '90g', servingType: 'weight' },
  { id: 10, name: 'Cream Puff', price: 85, category: 'Pastries', imageUrl: '/images/cp.jpg', servingSize: '3 pcs', servingType: 'pieces' },
  { id: 11, name: 'Sourdough Bread', price: 180, category: 'Breads', imageUrl: '/images/sb.jpg', servingSize: '400g', servingType: 'weight' },
  { id: 12, name: 'Whole Wheat Bread', price: 150, category: 'Breads', imageUrl: '/images/wwb.jpg', servingSize: '400g', servingType: 'weight' },
  { id: 13, name: 'Garlic Bread', price: 120, category: 'Breads', imageUrl: '/images/gb.webp', servingSize: '250g', servingType: 'weight' },
  { id: 14, name: 'Blueberry Muffin', price: 80, category: 'Muffins', imageUrl: '/images/bm.jpg', servingSize: '80g', servingType: 'weight' },
  { id: 15, name: 'Chocolate Chip Muffin', price: 85, category: 'Muffins', imageUrl: '/images/ccm.webp', servingSize: '80g', servingType: 'weight' },
  { id: 16, name: 'Banana Nut Muffin', price: 90, category: 'Muffins', imageUrl: '/images/bnm.jpg', servingSize: '80g', servingType: 'weight' },
  { id: 17, name: 'Vanilla Cupcake', price: 70, category: 'Cupcakes', imageUrl: '/images/cvc.webp', servingSize: '60g', servingType: 'weight' },
  { id: 18, name: 'Chocolate Cupcake', price: 75, category: 'Cupcakes', imageUrl: '/images/ccup.jpg', servingSize: '60g', servingType: 'weight' },
  { id: 19, name: 'Walnut Brownie', price: 130, category: 'Brownies', imageUrl: '/images/wnb.webp', servingSize: '2 pcs', servingType: 'pieces' },
  { id: 20, name: 'Classic Brownie', price: 110, category: 'Brownies', imageUrl: '/images/Classic-Brownies.jpg', servingSize: '2 pcs', servingType: 'pieces' },
  { id: 21, name: 'Glazed Donut', price: 65, category: 'Donuts', imageUrl: '/images/gd.jpg', servingSize: '70g', servingType: 'weight' },
  { id: 22, name: 'Chocolate Donut', price: 75, category: 'Donuts', imageUrl: '/images/chocod.png', servingSize: '70g', servingType: 'weight' },
  { id: 23, name: 'Apple Pie', price: 200, category: 'Pies', imageUrl: '/images/apie.webp', servingSize: '400g', servingType: 'weight' },
  { id: 24, name: 'Pumpkin Pie', price: 190, category: 'Pies', imageUrl: '/images/pumpie.jpg', servingSize: '400g', servingType: 'weight' },
  { id: 25, name: 'Fruit Tart', price: 220, category: 'Tarts', imageUrl: '/images/ft.webp', servingSize: '120g', servingType: 'weight' },
  { id: 26, name: 'Chocolate Tart', price: 240, category: 'Tarts', imageUrl: '/images/chocot.jpeg', servingSize: '120g', servingType: 'weight' },
  { id: 27, name: 'New York Cheesecake', price: 280, category: 'Cheesecakes', imageUrl: '/images/nycc.png', servingSize: '150g', servingType: 'weight' },
  { id: 28, name: 'Blueberry Cheesecake', price: 300, category: 'Cheesecakes', imageUrl: '/images/bbcc.jpg', servingSize: '150g', servingType: 'weight' },
  { id: 29, name: 'Strawberry Cheesecake', price: 290, category: 'Cheesecakes', imageUrl: '/images/scc.jpg', servingSize: '150g', servingType: 'weight' },
  { id: 30, name: 'Assorted Macarons', price: 350, category: 'Macarons', imageUrl: '/images/mac.jpg', servingSize: '6 pcs', servingType: 'pieces' },
  { id: 31, name: 'Chocolate Macaron', price: 120, category: 'Macarons', imageUrl: '/images/cmac.webp', servingSize: '3 pcs', servingType: 'pieces' },
  { id: 32, name: 'Pistachio Macaron', price: 130, category: 'Macarons', imageUrl: '/images/pmac.webp', servingSize: '3 pcs', servingType: 'pieces' },
]
