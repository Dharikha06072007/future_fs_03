import { useState, useMemo } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { Minus, Plus, ShoppingCart, Star, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { useCartStore } from '@/lib/api/cart-store'
import { generateProductImageUrl } from '@/lib/api/product-images'
import { toast } from 'sonner'

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

const sampleProducts: Product[] = [
  { id: '1', name: 'Classic Chocolate Cake', category: 'Cakes', price: 650, image: 'https://placehold.co/600x400/8B4513/F5DEB3?text=Chocolate+Cake', description: 'Rich, moist chocolate cake with creamy chocolate frosting. Made with premium Belgian cocoa and layered with silky ganache. A timeless favorite that never goes out of style.', ingredients: ['Flour', 'Sugar', 'Cocoa Powder', 'Eggs', 'Butter', 'Vanilla Extract', 'Baking Powder', 'Milk'], rating: 4.8, reviews: 124, isBestseller: true, isNew: false },
  { id: '2', name: 'Red Velvet Cake', category: 'Cakes', price: 750, image: 'https://placehold.co/600x400/8B4513/F5DEB3?text=Red+Velvet', description: 'Velvety red layers with cream cheese frosting. The perfect balance of sweetness and tang. Topped with red velvet crumbs.', ingredients: ['Flour', 'Sugar', 'Cocoa Powder', 'Buttermilk', 'Cream Cheese', 'Red Food Color', 'Eggs', 'Vanilla'], rating: 4.7, reviews: 98, isBestseller: true, isNew: true },
  { id: '3', name: 'Chocolate Chip Cookies', category: 'Cookies', price: 250, image: 'https://placehold.co/600x400/D2691E/FFE4B5?text=Choc+Chip+Cookies', description: 'Soft, chewy cookies loaded with premium chocolate chips. Baked to golden perfection with a crisp edge and gooey center.', ingredients: ['Flour', 'Butter', 'Brown Sugar', 'Chocolate Chips', 'Eggs', 'Vanilla Extract', 'Baking Soda', 'Salt'], rating: 4.9, reviews: 156, isBestseller: true, isNew: false },
  { id: '4', name: 'French Croissant', category: 'Pastries', price: 180, image: 'https://placehold.co/600x400/DEB887/8B4513?text=French+Croissant', description: 'Buttery, flaky, golden-brown croissant made with traditional French techniques. 24 layers of laminated dough.', ingredients: ['Flour', 'Butter', 'Yeast', 'Sugar', 'Salt', 'Milk', 'Egg Wash'], rating: 4.6, reviews: 89, isBestseller: true, isNew: false },
  { id: '5', name: 'Sourdough Bread', category: 'Breads', price: 350, image: 'https://placehold.co/600x400/F5DEB3/8B4513?text=Sourdough+Bread', description: 'Artisan sourdough with a crisp crust and soft, tangy interior. Naturally leavened over 48 hours.', ingredients: ['Flour', 'Water', 'Salt', 'Sourdough Starter'], rating: 4.5, reviews: 67, isBestseller: true, isNew: false },
  { id: '6', name: 'Blueberry Muffin', category: 'Muffins', price: 180, image: 'https://placehold.co/600x400/CD853F/FFF8DC?text=Blueberry+Muffin', description: 'Fluffy muffins bursting with fresh blueberries and a hint of lemon zest. Perfect with morning coffee.', ingredients: ['Flour', 'Sugar', 'Blueberries', 'Butter', 'Eggs', 'Lemon Zest', 'Milk', 'Vanilla'], rating: 4.4, reviews: 73, isBestseller: true, isNew: false },
  { id: '7', name: 'New York Cheesecake', category: 'Cheesecakes', price: 650, image: 'https://placehold.co/600x400/FFFACD/8B4513?text=NY+Cheesecake', description: 'Creamy, dense New York-style cheesecake on a graham cracker crust. Baked low and slow for ultimate creaminess.', ingredients: ['Cream Cheese', 'Sugar', 'Eggs', 'Vanilla', 'Graham Crackers', 'Butter', 'Sour Cream', 'Lemon Juice'], rating: 4.9, reviews: 112, isBestseller: true, isNew: false },
  { id: '8', name: 'Apple Pie', category: 'Pies', price: 450, image: 'https://placehold.co/600x400/FF8C00/FFF8DC?text=Apple+Pie', description: 'Classic apple pie with cinnamon-spiced filling in a flaky, buttery crust. Served with caramel drizzle.', ingredients: ['Apples', 'Flour', 'Butter', 'Cinnamon', 'Sugar', 'Nutmeg', 'Lemon Juice', 'Egg Wash'], rating: 4.6, reviews: 85, isBestseller: true, isNew: false },
]

const relatedCategories: Record<string, string[]> = {
  'Cakes': ['Cupcakes', 'Cheesecakes'],
  'Cookies': ['Brownies', 'Donuts'],
  'Pastries': ['Croissant', 'Tarts'],
  'Breads': ['Muffins'],
  'Muffins': ['Breads', 'Cupcakes'],
  'Cupcakes': ['Cakes', 'Muffins'],
  'Brownies': ['Cookies', 'Donuts'],
  'Donuts': ['Cookies', 'Pastries'],
  'Pies': ['Tarts', 'Cheesecakes'],
  'Tarts': ['Pies', 'Pastries'],
  'Cheesecakes': ['Cakes', 'Pies'],
  'Macarons': ['Cookies', 'Cupcakes'],
}

export const Route = createFileRoute('/product/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams()
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [removedIngredients, setRemovedIngredients] = useState<string[]>([])
  const { addItem } = useCartStore()

  const externalPlaceholderPattern = /^https?:\/\/(placehold\.co|via\.placeholder\.com|dummyimage\.com)/
  const resolveImage = (p: typeof sampleProducts[0]) =>
    !p.image || externalPlaceholderPattern.test(p.image) ? generateProductImageUrl(p.name, p.category) : p.image

  const product = sampleProducts.find((p) => p.id === id)

  const relatedProducts = useMemo(() => {
    if (!product) return []
    const relatedCats = relatedCategories[product.category] || []
    return sampleProducts.filter(
      (p) => relatedCats.includes(p.category) && p.id !== product.id
    ).slice(0, 4)
  }, [product])

  const thumbnails = product
    ? [resolveImage(product), generateProductImageUrl(product.name + ' Slice', product.category)]
    : []

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4 bg-warm-cream">
        <h2 className="font-serif text-2xl text-chocolate mb-2">Product not found</h2>
        <p className="text-muted-foreground mb-6">The product you are looking for does not exist.</p>
        <Button variant="gradient" asChild>
          <Link to="/menu">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Menu
          </Link>
        </Button>
      </div>
    )
  }

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: resolveImage(product),
      removedIngredients,
    }, quantity)
    toast.success(`${product.name} added to cart!`)
  }

  const handleToggleIngredient = (ingredient: string) => {
    setRemovedIngredients((prev) =>
      prev.includes(ingredient)
        ? prev.filter((i) => i !== ingredient)
        : [...prev, ingredient]
    )
  }

  return (
    <div className="min-h-screen bg-warm-cream">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/menu">Menu</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{product.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <div className="space-y-4">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-soft bg-white">
              <img
                src={thumbnails[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex gap-3">
              {thumbnails.map((thumb, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-20 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === idx ? 'border-[#E8927C] shadow-soft' : 'border-transparent'
                  }`}
                >
                  <img src={thumb} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary">{product.category}</Badge>
                {product.isNew && <Badge variant="new">New</Badge>}
                {product.isBestseller && <Badge variant="bestseller">Bestseller</Badge>}
              </div>
              <h1 className="font-serif text-3xl text-chocolate">{product.name}</h1>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-[#F4D03F] text-[#F4D03F]" />
                  <span className="font-semibold text-chocolate">{product.rating}</span>
                </div>
                <span className="text-muted-foreground text-sm">({product.reviews} reviews)</span>
              </div>
              <p className="text-3xl font-bold text-strawberry mt-4">₹{product.price}</p>
            </div>

            <p className="text-muted-foreground leading-relaxed">{product.description}</p>

            <div>
              <h3 className="font-semibold text-chocolate mb-2">Ingredients</h3>
              <p className="text-xs text-caramel mb-3">Click any ingredient you want to remove</p>
              <div className="flex flex-wrap gap-2">
                {product.ingredients.map((ingredient) => {
                  const isRemoved = removedIngredients.includes(ingredient)
                  return (
                    <button
                      key={ingredient}
                      onClick={() => handleToggleIngredient(ingredient)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all ${
                        isRemoved
                          ? 'bg-[#E8927C]/10 text-strawberry line-through border-[#E8927C]/30'
                          : 'bg-vanilla text-chocolate border-transparent hover:bg-vanilla/80'
                      }`}
                    >
                      {ingredient}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center border border-caramel rounded-full">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-vanilla transition-colors rounded-l-full"
                >
                  <Minus className="w-5 h-5 text-chocolate" />
                </button>
                <span className="px-4 font-medium text-lg min-w-[3rem] text-center text-chocolate">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 hover:bg-vanilla transition-colors rounded-r-full"
                >
                  <Plus className="w-5 h-5 text-chocolate" />
                </button>
              </div>
              <Button variant="gradient" size="lg" className="flex-1 md:flex-none shadow-pink" onClick={handleAddToCart}>
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart - ₹{product.price * quantity}
              </Button>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <section>
            <h2 className="font-serif text-2xl text-chocolate mb-6">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((rp) => (
                <Link key={rp.id} to="/product/$id" params={{ id: rp.id }} className="group">
                  <Card className="overflow-hidden shadow-soft rounded-2xl">
                    <div className="aspect-[4/3] bg-white overflow-hidden rounded-t-2xl">
                      <img
                        src={resolveImage(rp)}
                        alt={rp.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-serif text-chocolate truncate">{rp.name}</h3>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="w-3.5 h-3.5 fill-[#F4D03F] text-[#F4D03F]" />
                        <span className="text-sm font-medium text-chocolate">{rp.rating}</span>
                      </div>
                      <p className="font-bold text-strawberry mt-2">₹{rp.price}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
