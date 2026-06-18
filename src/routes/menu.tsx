import { useState, useMemo } from 'react'
import { createFileRoute, useSearch, Link } from '@tanstack/react-router'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DishCard } from '@/components/DishCard'
import { dishes } from '@/data/dishes'
import { useCartStore } from '@/lib/api/cart-store'
import { toast } from 'sonner'

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
  const { addItem } = useCartStore()

  const filtered = useMemo(() => {
    return dishes.filter((d) => {
      const matchCategory = activeCategory === 'All' || d.category === activeCategory
      const matchSearch = d.name.toLowerCase().includes(searchQuery.toLowerCase())
      return matchCategory && matchSearch
    })
  }, [activeCategory, searchQuery, dishes])

  const handleAddToCart = (dish: typeof dishes[0]) => {
    addItem({
      productId: String(dish.id),
      name: dish.name,
      price: dish.price,
      image: dish.imageUrl,
    })
    toast.success(`${dish.name} added to cart!`)
  }

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
            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-xl font-medium text-chocolate mb-2">No products found</p>
                <p className="text-muted-foreground mb-4">Try adjusting your search or filter</p>
                <Button variant="outline-chocolate" onClick={() => { setSearchQuery(''); setActiveCategory('All') }}>
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filtered.map((dish) => (
                  <Link key={dish.id} to="/product/$id" params={{ id: String(dish.id) }} className="block">
                    <DishCard dish={dish} onAddToCart={handleAddToCart} />
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
