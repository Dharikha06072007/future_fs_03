import { useState, useMemo } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { Minus, Plus, ShoppingCart, ArrowLeft, Scale, Package } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { useCartStore } from '@/lib/api/cart-store'
import { toast } from 'sonner'
import { dishes } from '@/data/dishes'

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
  const [quantity, setQuantity] = useState(1)
  const [removedIngredients, setRemovedIngredients] = useState<string[]>([])
  const { addItem } = useCartStore()

  const product = dishes.find((d) => d.id === Number(id))

  const relatedProducts = useMemo(() => {
    if (!product) return []
    const relatedCats = relatedCategories[product.category] || []
    return dishes.filter(
      (d) => relatedCats.includes(d.category) && d.id !== product.id
    ).slice(0, 4)
  }, [product])

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
      productId: String(product.id),
      name: product.name,
      price: product.price,
      image: product.imageUrl,
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
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover"
                loading="eager"
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; (e.currentTarget as HTMLImageElement).parentElement!.classList.add('bg-gradient-to-br', 'from-amber-100', 'to-orange-100'); }}
              />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary">{product.category}</Badge>
                <Badge variant="bestseller">Bestseller</Badge>
              </div>
              <h1 className="font-serif text-3xl text-chocolate">{product.name}</h1>
              <div className="flex items-center gap-4 mt-4">
                <div className="bg-[#FFF8F0] rounded-xl px-4 py-2 flex items-center gap-2">
                  {product.servingType === 'weight' ? <Scale className="w-5 h-5 text-[#E8927C]" /> : <Package className="w-5 h-5 text-[#E8927C]" />}
                  <span className="font-semibold text-[#5D4037]">{product.servingSize}</span>
                </div>
                <span className="text-sm text-gray-500">
                  {product.servingType === 'weight' ? 'Net weight' : 'Quantity'}
                </span>
              </div>
              <p className="text-3xl font-bold text-strawberry mt-4">₹{product.price}</p>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              Freshly baked {product.name.toLowerCase()} — made with premium ingredients.
            </p>

            <div>
              <h3 className="font-semibold text-chocolate mb-2">Ingredients</h3>
              <p className="text-xs text-caramel mb-3">Click any ingredient you want to remove</p>
              <div className="flex flex-wrap gap-2">
                {['Flour', 'Butter', 'Sugar', 'Eggs', 'Vanilla', 'Milk'].map((ingredient) => {
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
                <Link key={rp.id} to="/product/$id" params={{ id: String(rp.id) }} className="group">
                  <Card className="overflow-hidden shadow-soft rounded-2xl">
                    <div className="aspect-[4/3] bg-white overflow-hidden rounded-t-2xl">
                      <img
                        src={rp.imageUrl}
                        alt={rp.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                        onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-serif text-chocolate truncate">{rp.name}</h3>
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
