import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowRight, Star, Leaf, Heart, Truck, BadgeIndianRupee, ShoppingBag, CakeSlice, Cookie, Croissant, Wheat, Square, Gift, PieChart, CircleOff, Triangle, CircleDot } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import ProductCard from '@/components/ProductCard'

interface Product {
  id: string
  name: string
  category: string
  price: number
  image: string
  description: string
  ingredients: string[]
  rating: number
  reviews: number
  isBestseller: boolean
  isNew: boolean
}

const products: Product[] = [
  { id: '1', name: 'Classic Chocolate Cake', category: 'Cakes', price: 650, image: 'https://placehold.co/400x300/8B4513/F5DEB3?text=Chocolate+Cake', description: 'Rich, moist chocolate cake with creamy chocolate frosting. A timeless favorite for any occasion.', ingredients: ['Flour', 'Sugar', 'Cocoa Powder', 'Eggs', 'Butter', 'Vanilla Extract'], rating: 4.8, reviews: 124, isBestseller: true, isNew: false },
  { id: '2', name: 'Red Velvet Cake', category: 'Cakes', price: 750, image: 'https://placehold.co/400x300/8B4513/F5DEB3?text=Red+Velvet', description: 'Velvety red layers with cream cheese frosting. The perfect balance of sweetness and tang.', ingredients: ['Flour', 'Sugar', 'Cocoa Powder', 'Buttermilk', 'Cream Cheese', 'Red Food Color'], rating: 4.7, reviews: 98, isBestseller: true, isNew: false },
  { id: '3', name: 'Chocolate Chip Cookies', category: 'Cookies', price: 250, image: 'https://placehold.co/400x300/D2691E/FFE4B5?text=Choc+Chip+Cookies', description: 'Soft, chewy cookies loaded with premium chocolate chips. Baked to golden perfection.', ingredients: ['Flour', 'Butter', 'Brown Sugar', 'Chocolate Chips', 'Eggs', 'Vanilla'], rating: 4.9, reviews: 156, isBestseller: true, isNew: false },
  { id: '4', name: 'French Croissant', category: 'Pastries', price: 180, image: 'https://placehold.co/400x300/DEB887/8B4513?text=French+Croissant', description: 'Buttery, flaky, golden-brown croissant made with traditional French techniques.', ingredients: ['Flour', 'Butter', 'Yeast', 'Sugar', 'Salt', 'Milk'], rating: 4.6, reviews: 89, isBestseller: true, isNew: false },
  { id: '5', name: 'Sourdough Bread', category: 'Breads', price: 350, image: 'https://placehold.co/400x300/F5DEB3/8B4513?text=Sourdough+Bread', description: 'Artisan sourdough with a crisp crust and soft, tangy interior. Naturally leavened.', ingredients: ['Flour', 'Water', 'Salt', 'Sourdough Starter'], rating: 4.5, reviews: 67, isBestseller: true, isNew: false },
  { id: '6', name: 'Blueberry Muffin', category: 'Muffins', price: 180, image: 'https://placehold.co/400x300/CD853F/FFF8DC?text=Blueberry+Muffin', description: 'Fluffy muffins bursting with fresh blueberries and a hint of lemon zest.', ingredients: ['Flour', 'Sugar', 'Blueberries', 'Butter', 'Eggs', 'Lemon Zest'], rating: 4.4, reviews: 73, isBestseller: true, isNew: false },
  { id: '7', name: 'New York Cheesecake', category: 'Cheesecakes', price: 650, image: 'https://placehold.co/400x300/FFFACD/8B4513?text=NY+Cheesecake', description: 'Creamy, dense New York-style cheesecake on a graham cracker crust. Pure indulgence.', ingredients: ['Cream Cheese', 'Sugar', 'Eggs', 'Vanilla', 'Graham Crackers', 'Butter'], rating: 4.9, reviews: 112, isBestseller: true, isNew: false },
  { id: '8', name: 'Apple Pie', category: 'Pies', price: 450, image: 'https://placehold.co/400x300/FF8C00/FFF8DC?text=Apple+Pie', description: 'Classic apple pie with cinnamon-spiced filling in a flaky, buttery crust.', ingredients: ['Apples', 'Flour', 'Butter', 'Cinnamon', 'Sugar', 'Nutmeg'], rating: 4.6, reviews: 85, isBestseller: true, isNew: false },
  { id: '9', name: 'Assorted Macarons', category: 'Macarons', price: 250, image: 'https://placehold.co/400x300/E6E6FA/4B0082?text=Macarons', description: 'Delicate French macarons in assorted flavors. A colorful treat for every palate.', ingredients: ['Almond Flour', 'Egg Whites', 'Sugar', 'Food Coloring', 'Buttercream'], rating: 4.7, reviews: 94, isBestseller: true, isNew: false },
  { id: '10', name: 'Walnut Brownie', category: 'Brownies', price: 280, image: 'https://placehold.co/400x300/3E2723/D7CCC8?text=Walnut+Brownie', description: 'Fudgy chocolate brownies loaded with crunchy walnuts. A chocolate lovers dream.', ingredients: ['Chocolate', 'Butter', 'Sugar', 'Eggs', 'Flour', 'Walnuts'], rating: 4.8, reviews: 103, isBestseller: true, isNew: false },
  { id: '11', name: 'Glazed Donut', category: 'Donuts', price: 150, image: 'https://placehold.co/400x300/FF1493/FFF0F5?text=Glazed+Donut', description: 'Light, fluffy donuts with a sweet, glossy glaze. Melt-in-your-mouth delicious.', ingredients: ['Flour', 'Sugar', 'Yeast', 'Eggs', 'Butter', 'Vanilla'], rating: 4.5, reviews: 78, isBestseller: true, isNew: false },
  { id: '12', name: 'Fruit Tart', category: 'Tarts', price: 380, image: 'https://placehold.co/400x300/FFD700/8B4513?text=Fruit+Tart', description: 'Crisp pastry shell filled with velvety custard and topped with fresh seasonal fruits.', ingredients: ['Flour', 'Butter', 'Custard', 'Mixed Fruits', 'Sugar', 'Gelatin'], rating: 4.6, reviews: 91, isBestseller: true, isNew: false },
]

const categories = [
  { name: 'Cakes', icon: CakeSlice, color: 'bg-amber-100 text-amber-700' },
  { name: 'Cookies', icon: Cookie, color: 'bg-orange-100 text-orange-700' },
  { name: 'Pastries', icon: Croissant, color: 'bg-yellow-100 text-yellow-700' },
  { name: 'Breads', icon: Wheat, color: 'bg-stone-100 text-stone-700' },
  { name: 'Muffins', icon: Square, color: 'bg-rose-100 text-rose-700' },
  { name: 'Cupcakes', icon: Gift, color: 'bg-pink-100 text-pink-700' },
  { name: 'Brownies', icon: Square, color: 'bg-amber-200 text-amber-800' },
  { name: 'Donuts', icon: CircleDot, color: 'bg-red-100 text-red-700' },
  { name: 'Pies', icon: PieChart, color: 'bg-orange-100 text-orange-700' },
  { name: 'Tarts', icon: CircleOff, color: 'bg-yellow-100 text-yellow-700' },
  { name: 'Cheesecakes', icon: Triangle, color: 'bg-green-100 text-green-700' },
  { name: 'Macarons', icon: CircleDot, color: 'bg-purple-100 text-purple-700' },
]

const testimonials = [
  { name: 'Priya Sharma', text: 'The Red Velvet Cake was absolutely divine! It made my daughters birthday truly special. Will definitely order again.', rating: 5 },
  { name: 'Rahul Verma', text: 'Best bakery in town! Their sourdough bread is incredible and the delivery is always on time. Highly recommended!', rating: 5 },
  { name: 'Ananya Patel', text: 'I ordered assorted macarons for a party and everyone loved them. The presentation was beautiful and the taste was perfect.', rating: 5 },
]

const features = [
  { icon: Leaf, title: 'Fresh Ingredients', desc: 'We use only the finest, locally-sourced ingredients in all our baked goods.' },
  { icon: Heart, title: 'Homemade Recipes', desc: 'Every recipe is crafted with love in our home kitchen, just like grandma used to make.' },
  { icon: Truck, title: 'Timely Delivery', desc: 'We deliver fresh daily within 45 minutes of your order being placed.' },
  { icon: BadgeIndianRupee, title: 'Affordable Prices', desc: 'Premium quality baked goods at prices that wont break the bank.' },
]

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <section className="relative min-h-screen flex items-center gradient-hero overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
          <div className="absolute top-20 left-[10%] text-7xl float-animation opacity-30">🎂</div>
          <div className="absolute top-40 right-[15%] text-6xl float-animation-delayed opacity-25">🍪</div>
          <div className="absolute bottom-32 left-[20%] text-5xl opacity-20" style={{ animation: 'float 3s ease-in-out infinite', animationDelay: '2s' }}>🥐</div>
        </div>
        <div className="max-w-6xl mx-auto px-4 py-24 md:py-36 relative z-10">
          <div className="max-w-2xl">
            <p className="font-script text-caramel text-xl md:text-2xl mb-4">Homemade Happiness</p>
            <h1 className="font-serif text-4xl md:text-6xl leading-tight text-chocolate mb-6">
              Fresh from our home to your heart
            </h1>
            <p className="font-sans text-lg md:text-xl text-[#8D6E63] mb-8">
              Handcrafted with love, baked to perfection
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="gradient" size="lg" asChild>
                <Link to="/menu">
                  <ShoppingBag className="mr-2 w-5 h-5" />
                  Order Now
                </Link>
              </Button>
              <Button variant="outline-chocolate" size="lg" asChild>
                <a href="#featured">View Our Menu</a>
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#FFF8F0] to-transparent" />
      </section>

      <section id="featured" className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="font-serif text-3xl md:text-4xl text-chocolate mb-2">Our Bestsellers</h2>
          <p className="text-muted-foreground">Most loved treats by our customers</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="text-center mt-8">
          <Button variant="outline-chocolate" size="lg" asChild className="rounded-full">
            <Link to="/menu">
              View All Products
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </section>

      <section className="bg-vanilla py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="font-serif text-3xl md:text-4xl text-chocolate mb-2">Browse by Category</h2>
            <p className="text-muted-foreground">Find exactly what you are craving</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {categories.map((cat) => {
              const Icon = cat.icon
              return (
                <Link
                  key={cat.name}
                  to="/menu"
                  search={{ category: cat.name }}
                  className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-white border border-caramel hover:border-[#E8927C] hover:shadow-lg transition-all group"
                >
                  <div className="w-14 h-14 rounded-full bg-warm-cream flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-caramel" />
                  </div>
                  <span className="font-medium text-sm text-chocolate">{cat.name}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="font-serif text-3xl md:text-4xl text-chocolate mb-2">What Our Customers Say</h2>
            <p className="text-muted-foreground">Hear from the Homemade Happiness community</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <Card key={t.name} className="border-0 shadow-soft">
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#F4D03F] text-[#F4D03F]" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">"{t.text}"</p>
                  <p className="font-semibold text-chocolate">- {t.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-warm-cream bg-gradient-to-b from-white to-vanilla/50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="font-serif text-3xl md:text-4xl text-chocolate mb-2">Why Choose Us</h2>
            <p className="text-muted-foreground">What makes Homemade Happiness special</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => {
              const Icon = f.icon
              return (
                <div key={f.title} className="text-center p-6">
                  <div className="w-16 h-16 rounded-full bg-strawberry/10 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7 text-[#E8927C]" />
                  </div>
                  <h3 className="font-serif text-lg text-chocolate mb-2">{f.title}</h3>
                  <p className="text-sm text-muted-foreground">{f.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
