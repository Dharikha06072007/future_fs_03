import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowRight, Star, Leaf, Heart, Truck, BadgeIndianRupee, ShoppingBag, CakeSlice, Cookie, Croissant, Wheat, Square, Gift, PieChart, CircleOff, Triangle, CircleDot } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { DishCard } from '@/components/DishCard'
import { dishes } from '@/data/dishes'

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
          {dishes.slice(0, 12).map((dish) => (
            <Link key={dish.id} to="/product/$id" params={{ id: String(dish.id) }}>
              <DishCard dish={dish} />
            </Link>
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
