import { useState, useMemo, useEffect } from 'react'
import { createFileRoute, useSearch } from '@tanstack/react-router'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
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

const allProducts: Product[] = [
  { id: '1', name: 'Classic Chocolate Cake', category: 'Cakes', price: 650, image: 'https://placehold.co/400x300/8B4513/F5DEB3?text=Chocolate+Cake', description: 'Rich moist chocolate cake with creamy frosting.', ingredients: ['Flour', 'Sugar', 'Cocoa', 'Eggs', 'Butter'], rating: 4.8, reviews: 124, isBestseller: true, isNew: false },
  { id: '2', name: 'Red Velvet Cake', category: 'Cakes', price: 750, image: 'https://placehold.co/400x300/8B4513/F5DEB3?text=Red+Velvet', description: 'Velvety red layers with cream cheese frosting.', ingredients: ['Flour', 'Cocoa', 'Buttermilk', 'Cream Cheese'], rating: 4.7, reviews: 98, isBestseller: true, isNew: true },
  { id: '3', name: 'Vanilla Bean Cake', category: 'Cakes', price: 600, image: 'https://placehold.co/400x300/8B4513/F5DEB3?text=Vanilla+Cake', description: 'Light vanilla sponge with real Madagascar vanilla.', ingredients: ['Flour', 'Sugar', 'Vanilla', 'Eggs', 'Butter'], rating: 4.5, reviews: 76, isBestseller: false, isNew: false },
  { id: '4', name: 'Black Forest Cake', category: 'Cakes', price: 700, image: 'https://placehold.co/400x300/8B4513/F5DEB3?text=Black+Forest', description: 'Chocolate sponge with cherries and whipped cream.', ingredients: ['Flour', 'Cocoa', 'Cherries', 'Cream', 'Chocolate'], rating: 4.6, reviews: 88, isBestseller: false, isNew: false },
  { id: '5', name: 'Chocolate Chip Cookies', category: 'Cookies', price: 250, image: 'https://placehold.co/400x300/D2691E/FFE4B5?text=Choc+Chip+Cookies', description: 'Soft chewy cookies loaded with chocolate chips.', ingredients: ['Flour', 'Butter', 'Brown Sugar', 'Chocolate Chips'], rating: 4.9, reviews: 156, isBestseller: true, isNew: false },
  { id: '6', name: 'Oatmeal Raisin Cookies', category: 'Cookies', price: 280, image: 'https://placehold.co/400x300/D2691E/FFE4B5?text=Oatmeal+Raisin', description: 'Hearty oatmeal cookies with plump raisins.', ingredients: ['Oats', 'Flour', 'Raisins', 'Butter', 'Cinnamon'], rating: 4.3, reviews: 54, isBestseller: false, isNew: false },
  { id: '7', name: 'Double Chocolate Cookies', category: 'Cookies', price: 300, image: 'https://placehold.co/400x300/D2691E/FFE4B5?text=Double+Choc', description: 'Intense chocolate cookies with cocoa and chunks.', ingredients: ['Flour', 'Cocoa', 'Chocolate', 'Butter', 'Sugar'], rating: 4.7, reviews: 92, isBestseller: false, isNew: true },
  { id: '8', name: 'French Croissant', category: 'Pastries', price: 180, image: 'https://placehold.co/400x300/DEB887/8B4513?text=French+Croissant', description: 'Buttery flaky golden croissant.', ingredients: ['Flour', 'Butter', 'Yeast', 'Sugar', 'Salt'], rating: 4.6, reviews: 89, isBestseller: true, isNew: false },
  { id: '9', name: 'Danish Pastry', category: 'Pastries', price: 200, image: 'https://placehold.co/400x300/DEB887/8B4513?text=Danish+Pastry', description: 'Laminated pastry with fruit filling.', ingredients: ['Flour', 'Butter', 'Fruit Jam', 'Cream Cheese'], rating: 4.4, reviews: 61, isBestseller: false, isNew: false },
  { id: '10', name: 'Cream Puff', category: 'Pastries', price: 220, image: 'https://placehold.co/400x300/DEB887/8B4513?text=Cream+Puff', description: 'Light choux pastry filled with vanilla cream.', ingredients: ['Flour', 'Butter', 'Eggs', 'Cream', 'Vanilla'], rating: 4.5, reviews: 73, isBestseller: false, isNew: true },
  { id: '11', name: 'Sourdough Bread', category: 'Breads', price: 350, image: 'https://placehold.co/400x300/F5DEB3/8B4513?text=Sourdough', description: 'Crusty artisan sourdough with tangy flavor.', ingredients: ['Flour', 'Water', 'Salt', 'Starter'], rating: 4.5, reviews: 67, isBestseller: true, isNew: false },
  { id: '12', name: 'Whole Wheat Bread', category: 'Breads', price: 280, image: 'https://placehold.co/400x300/F5DEB3/8B4513?text=Wheat+Bread', description: 'Nutritious whole wheat bread for daily use.', ingredients: ['Whole Wheat Flour', 'Yeast', 'Honey', 'Salt'], rating: 4.3, reviews: 45, isBestseller: false, isNew: false },
  { id: '13', name: 'Garlic Bread', category: 'Breads', price: 320, image: 'https://placehold.co/400x300/F5DEB3/8B4513?text=Garlic+Bread', description: 'Toasted bread with herb garlic butter.', ingredients: ['Flour', 'Garlic', 'Butter', 'Herbs', 'Cheese'], rating: 4.6, reviews: 83, isBestseller: false, isNew: false },
  { id: '14', name: 'Blueberry Muffin', category: 'Muffins', price: 180, image: 'https://placehold.co/400x300/CD853F/FFF8DC?text=Blueberry+Muffin', description: 'Fluffy muffins with blueberries and lemon.', ingredients: ['Flour', 'Blueberries', 'Butter', 'Lemon'], rating: 4.4, reviews: 73, isBestseller: true, isNew: false },
  { id: '15', name: 'Chocolate Chip Muffin', category: 'Muffins', price: 200, image: 'https://placehold.co/400x300/CD853F/FFF8DC?text=Choc+Chip+Muffin', description: 'Moist muffin packed with chocolate chips.', ingredients: ['Flour', 'Chocolate Chips', 'Butter', 'Sugar'], rating: 4.5, reviews: 68, isBestseller: false, isNew: false },
  { id: '16', name: 'Banana Nut Muffin', category: 'Muffins', price: 190, image: 'https://placehold.co/400x300/CD853F/FFF8DC?text=Banana+Muffin', description: 'Ripe banana muffins with crunchy walnuts.', ingredients: ['Flour', 'Bananas', 'Walnuts', 'Cinnamon'], rating: 4.3, reviews: 52, isBestseller: false, isNew: false },
  { id: '17', name: 'Vanilla Cupcake', category: 'Cupcakes', price: 120, image: 'https://placehold.co/400x300/FFC0CB/8B4513?text=Vanilla+Cupcake', description: 'Light vanilla cupcake with buttercream.', ingredients: ['Flour', 'Sugar', 'Vanilla', 'Buttercream'], rating: 4.4, reviews: 95, isBestseller: false, isNew: false },
  { id: '18', name: 'Chocolate Cupcake', category: 'Cupcakes', price: 130, image: 'https://placehold.co/400x300/FFC0CB/8B4513?text=Choc+Cupcake', description: 'Rich chocolate cupcake with ganache topping.', ingredients: ['Flour', 'Cocoa', 'Chocolate', 'Buttercream'], rating: 4.6, reviews: 87, isBestseller: false, isNew: false },
  { id: '19', name: 'Walnut Brownie', category: 'Brownies', price: 280, image: 'https://placehold.co/400x300/3E2723/D7CCC8?text=Walnut+Brownie', description: 'Fudgy brownie loaded with walnuts.', ingredients: ['Chocolate', 'Butter', 'Sugar', 'Walnuts'], rating: 4.8, reviews: 103, isBestseller: true, isNew: false },
  { id: '20', name: 'Classic Brownie', category: 'Brownies', price: 250, image: 'https://placehold.co/400x300/3E2723/D7CCC8?text=Classic+Brownie', description: 'Perfectly fudgy classic chocolate brownie.', ingredients: ['Chocolate', 'Butter', 'Sugar', 'Eggs', 'Flour'], rating: 4.7, reviews: 91, isBestseller: false, isNew: false },
  { id: '21', name: 'Glazed Donut', category: 'Donuts', price: 150, image: 'https://placehold.co/400x300/FF1493/FFF0F5?text=Glazed+Donut', description: 'Light fluffy donut with sweet glaze.', ingredients: ['Flour', 'Sugar', 'Yeast', 'Glaze'], rating: 4.5, reviews: 78, isBestseller: true, isNew: false },
  { id: '22', name: 'Chocolate Donut', category: 'Donuts', price: 170, image: 'https://placehold.co/400x300/FF1493/FFF0F5?text=Choc+Donut', description: 'Rich chocolate frosted donut.', ingredients: ['Flour', 'Cocoa', 'Chocolate Glaze', 'Sprinkles'], rating: 4.4, reviews: 65, isBestseller: false, isNew: false },
  { id: '23', name: 'Apple Pie', category: 'Pies', price: 450, image: 'https://placehold.co/400x300/FF8C00/FFF8DC?text=Apple+Pie', description: 'Cinnamon apple pie in flaky crust.', ingredients: ['Apples', 'Cinnamon', 'Flour', 'Butter'], rating: 4.6, reviews: 85, isBestseller: true, isNew: false },
  { id: '24', name: 'Pumpkin Pie', category: 'Pies', price: 480, image: 'https://placehold.co/400x300/FF8C00/FFF8DC?text=Pumpkin+Pie', description: 'Spiced pumpkin pie with whipped cream.', ingredients: ['Pumpkin', 'Cream', 'Spices', 'Flour'], rating: 4.4, reviews: 59, isBestseller: false, isNew: true },
  { id: '25', name: 'Fruit Tart', category: 'Tarts', price: 380, image: 'https://placehold.co/400x300/FFD700/8B4513?text=Fruit+Tart', description: 'Custard tart with fresh seasonal fruits.', ingredients: ['Flour', 'Custard', 'Mixed Fruits', 'Butter'], rating: 4.6, reviews: 91, isBestseller: true, isNew: false },
  { id: '26', name: 'Chocolate Tart', category: 'Tarts', price: 400, image: 'https://placehold.co/400x300/FFD700/8B4513?text=Choc+Tart', description: 'Silky chocolate ganache in crisp tart shell.', ingredients: ['Flour', 'Chocolate', 'Cream', 'Butter'], rating: 4.7, reviews: 78, isBestseller: false, isNew: false },
  { id: '27', name: 'New York Cheesecake', category: 'Cheesecakes', price: 650, image: 'https://placehold.co/400x300/FFFACD/8B4513?text=NY+Cheesecake', description: 'Dense creamy cheesecake on graham crust.', ingredients: ['Cream Cheese', 'Sugar', 'Graham Crackers'], rating: 4.9, reviews: 112, isBestseller: true, isNew: false },
  { id: '28', name: 'Blueberry Cheesecake', category: 'Cheesecakes', price: 700, image: 'https://placehold.co/400x300/FFFACD/8B4513?text=Blueberry+Cheese', description: 'Creamy cheesecake with blueberry topping.', ingredients: ['Cream Cheese', 'Blueberries', 'Sugar'], rating: 4.7, reviews: 84, isBestseller: false, isNew: false },
  { id: '29', name: 'Strawberry Cheesecake', category: 'Cheesecakes', price: 680, image: 'https://placehold.co/400x300/FFFACD/8B4513?text=Strawberry+Cheese', description: 'Silky cheesecake with fresh strawberries.', ingredients: ['Cream Cheese', 'Strawberries', 'Vanilla'], rating: 4.6, reviews: 71, isBestseller: false, isNew: true },
  { id: '30', name: 'Assorted Macarons', category: 'Macarons', price: 250, image: 'https://placehold.co/400x300/E6E6FA/4B0082?text=Macarons', description: 'Delicate French macarons assorted flavors.', ingredients: ['Almond Flour', 'Egg Whites', 'Sugar'], rating: 4.7, reviews: 94, isBestseller: true, isNew: false },
  { id: '31', name: 'Chocolate Macaron', category: 'Macarons', price: 260, image: 'https://placehold.co/400x300/E6E6FA/4B0082?text=Choc+Macaron', description: 'Rich chocolate ganache macarons.', ingredients: ['Almond Flour', 'Cocoa', 'Chocolate Ganache'], rating: 4.5, reviews: 62, isBestseller: false, isNew: false },
  { id: '32', name: 'Pistachio Macaron', category: 'Macarons', price: 280, image: 'https://placehold.co/400x300/E6E6FA/4B0082?text=Pistachio+Macaron', description: 'Elegant pistachio flavored macarons.', ingredients: ['Almond Flour', 'Pistachio', 'Buttercream'], rating: 4.6, reviews: 57, isBestseller: false, isNew: true },
]

const categories = ['All', 'Cakes', 'Cookies', 'Pastries', 'Breads', 'Muffins', 'Cupcakes', 'Brownies', 'Donuts', 'Pies', 'Tarts', 'Cheesecakes', 'Macarons']

interface MenuSearch {
  category?: string
  q?: string
}

export const Route = createFileRoute('/menu')({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>): MenuSearch => ({
    category: typeof search.category === 'string' ? search.category : undefined,
    q: typeof search.q === 'string' ? search.q : undefined,
  }),
})

function RouteComponent() {
  const { category: urlCategory, q: urlQuery } = useSearch({ from: '/menu' })
  const [searchQuery, setSearchQuery] = useState(urlQuery || '')
  const [activeCategory, setActiveCategory] = useState(urlCategory || 'All')
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  const filtered = useMemo(() => {
    return allProducts.filter((p) => {
      const matchCategory = activeCategory === 'All' || p.category === activeCategory
      const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase())
      return matchCategory && matchSearch
    })
  }, [activeCategory, searchQuery])

  const SkeletonCard = () => (
    <div className="rounded-2xl border border-caramel/20 bg-white animate-pulse">
      <div className="aspect-[4/3] bg-vanilla rounded-t-2xl" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-vanilla rounded-full w-3/4" />
        <div className="h-3 bg-vanilla rounded-full w-1/2" />
        <div className="flex justify-between items-center">
          <div className="h-5 bg-vanilla rounded-full w-16" />
          <div className="h-8 bg-vanilla rounded-full w-24" />
        </div>
      </div>
    </div>
  )

  const categoryChips = categories.map((cat) => (
    <button
      key={cat}
      onClick={() => setActiveCategory(cat)}
      className={`px-5 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
        activeCategory === cat
          ? 'bg-[#E8927C] text-white border-transparent'
          : 'bg-white text-chocolate border border-caramel hover:bg-warm-cream'
      }`}
    >
      {cat}
    </button>
  ))

  return (
    <div className="bg-warm-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="font-serif text-3xl md:text-4xl text-chocolate">Our Menu</h1>
            <p className="text-muted-foreground mt-1">
              {filtered.length} {filtered.length === 1 ? 'product' : 'products'} available
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative flex-1 md:w-72">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-caramel" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-8 py-2.5 rounded-full border border-caramel bg-white text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8927C]"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2">
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              )}
            </div>
            <Button variant="outline" size="icon" className="md:hidden border-caramel" onClick={() => setIsFilterOpen(!isFilterOpen)}>
              <SlidersHorizontal className="w-4 h-4 text-chocolate" />
            </Button>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
          {categoryChips}
        </div>

        <div className="flex gap-6">
          <aside className="hidden md:block w-48 shrink-0">
            <nav className="space-y-1 sticky top-24">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`w-full text-left px-3 py-2 rounded-full text-sm transition-all ${
                    activeCategory === cat
                      ? 'bg-[#E8927C]/10 text-[#E8927C] font-medium'
                      : 'text-muted-foreground hover:bg-warm-cream'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </nav>
          </aside>

          {isFilterOpen && (
            <div className="fixed inset-0 z-50 md:hidden">
              <div className="absolute inset-0 bg-espresso/50" onClick={() => setIsFilterOpen(false)} />
              <div className="absolute left-0 top-0 bottom-0 w-64 bg-white p-4 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-chocolate">Categories</h3>
                  <Button variant="ghost" size="icon" onClick={() => setIsFilterOpen(false)}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                <div className="space-y-1">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => { setActiveCategory(cat); setIsFilterOpen(false) }}
                      className={`w-full text-left px-3 py-2 rounded-full text-sm transition-all ${
                        activeCategory === cat ? 'bg-[#E8927C]/10 text-[#E8927C] font-medium' : 'text-muted-foreground hover:bg-warm-cream'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="flex-1">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-xl font-medium text-chocolate mb-2">No products found</p>
                <p className="text-muted-foreground mb-4">Try adjusting your search or filter</p>
                <Button variant="outline-chocolate" onClick={() => { setSearchQuery(''); setActiveCategory('All') }}>
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
