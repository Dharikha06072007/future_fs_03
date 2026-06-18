import { useState } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { Trash2, Minus, Plus, ShoppingBag, ArrowLeft, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useCartStore } from '@/lib/api/cart-store'

const categoryEmoji: Record<string, string> = {
  Cakes: '🎂', Cookies: '🍪', Pastries: '🥐', Breads: '🍞',
  Muffins: '🧁', Cupcakes: '🧁', Brownies: '🍫', Donuts: '🍩',
  Pies: '🥧', Tarts: '🍮', Cheesecakes: '🍰', Macarons: '🍡',
}

export const Route = createFileRoute('/cart')({
  component: RouteComponent,
})

function RouteComponent() {
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set())
  const { items, removeItem, updateQuantity, total, itemCount } = useCartStore()

  const getFallback = (name: string) => {
    const cat = Object.entries(categoryEmoji).find(([_, emoji]) => name.includes(emoji))?.[0]
    return categoryEmoji[cat || ''] || '🧁'
  }

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-4 bg-warm-cream">
        <div className="text-8xl mb-6">🧁</div>
        <h2 className="font-serif text-3xl text-chocolate mb-2">Your Cart is Empty</h2>
        <p className="text-muted-foreground mb-6">Looks like you have not added any treats yet!</p>
        <Button variant="gradient" size="lg" asChild>
          <Link to="/menu">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Start Shopping
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-warm-cream">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="font-serif text-3xl text-chocolate mb-2">Shopping Cart</h1>
        <p className="text-muted-foreground mb-8">{itemCount()} items in your cart</p>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.productId} className="shadow-soft rounded-2xl">
                <CardContent className="p-4 flex gap-4">
                  <div className="w-24 h-24 rounded-xl shrink-0 overflow-hidden shadow-sm">
                    {failedImages.has(item.productId) || !item.image ? (
                      <div className="w-full h-full bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center text-3xl">
                        {getFallback(item.name)}
                      </div>
                    ) : (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        onError={() => setFailedImages((prev) => new Set(prev).add(item.productId))}
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif text-chocolate truncate">{item.name}</h3>
                    <p className="text-lg font-bold text-strawberry mt-1">₹{item.price}</p>
                    {item.removedIngredients && item.removedIngredients.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {item.removedIngredients.map((ing) => (
                          <span key={ing} className="text-xs bg-[#C62828]/10 text-[#C62828] px-1.5 py-0.5 rounded-full">
                            -{ing}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center border border-caramel rounded-full">
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          className="p-1.5 hover:bg-vanilla transition-colors rounded-l-full"
                        >
                          <Minus className="w-4 h-4 text-chocolate" />
                        </button>
                        <span className="px-3 text-sm font-medium min-w-[2rem] text-center text-chocolate">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className="p-1.5 hover:bg-vanilla transition-colors rounded-r-full"
                        >
                          <Plus className="w-4 h-4 text-chocolate" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.productId)}
                        className="p-1.5 text-[#C62828] hover:bg-[#C62828]/10 rounded-full transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-semibold text-chocolate">₹{item.price * item.quantity}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="space-y-4">
            <Card className="shadow-soft rounded-2xl sticky top-24">
              <CardHeader>
                <CardTitle className="font-serif text-chocolate">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Items ({itemCount()})</span>
                  <span className="text-chocolate font-medium">₹{total()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Delivery</span>
                  <span className="text-mint font-medium">Free</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Estimated Delivery</span>
                  <span className="text-chocolate">30-45 mins</span>
                </div>
                <div className="border-t border-dusty-rose pt-3">
                  <div className="flex justify-between font-bold text-xl">
                    <span className="text-chocolate">Total</span>
                    <span className="text-strawberry">₹{total()}</span>
                  </div>
                </div>
                <Button variant="gradient" asChild className="w-full" size="lg">
                  <Link to="/checkout">Proceed to Checkout</Link>
                </Button>
              </CardContent>
            </Card>

            <div className="bg-[#F5E6D3] border-2 border-dashed border-caramel rounded-2xl p-4 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-caramel shrink-0 mt-0.5" />
              <p className="text-sm text-chocolate">
                Your cart is saved automatically. Prices and availability may change.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
