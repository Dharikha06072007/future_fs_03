import { useState, useEffect, useCallback } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { Check, Package, ChefHat, Truck, Home, ArrowLeft, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/lib/api/use-auth'
import { fetchOrderById } from '@/lib/api/order-store'
import type { Order } from '@/lib/api/order-store'
import { dishes } from '@/data/dishes'

const categoryEmoji: Record<string, string> = {
  Cakes: '🎂', Cookies: '🍪', Pastries: '🥐', Breads: '🍞',
  Muffins: '🧁', Cupcakes: '🧁', Brownies: '🍫', Donuts: '🍩',
  Pies: '🥧', Tarts: '🍮', Cheesecakes: '🍰', Macarons: '🍡',
}

function getItemImage(name: string): string {
  const dish = dishes.find((d) => d.name === name)
  return dish?.imageUrl || ''
}

const steps = [
  { label: 'Order Placed', icon: Package },
  { label: 'Confirmed', icon: Check },
  { label: 'Preparing', icon: ChefHat },
  { label: 'Out for Delivery', icon: Truck },
  { label: 'Delivered', icon: Home },
]

const statusMap: Record<string, number> = {
  'Pending': 1,
  'Confirmed': 2,
  'Preparing': 3,
  'Out for Delivery': 4,
  'Delivered': 5,
}

export const Route = createFileRoute('/track/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams()
  const { user, loading: authLoading } = useAuth()
  const [order, setOrder] = useState<Order | null>(null)
  const [orderLoading, setOrderLoading] = useState(true)
  const [currentStep, setCurrentStep] = useState(1)
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set())

  useEffect(() => {
    if (authLoading || !user) return
    setOrderLoading(true)
    fetchOrderById(id, user.id, user.email)
      .then((o) => {
        setOrder(o)
        if (o) setCurrentStep(statusMap[o.status] || 1)
      })
      .finally(() => setOrderLoading(false))
  }, [id, user, authLoading])

  const advanceStep = useCallback(() => {
    setCurrentStep((prev) => {
      if (prev < 5) return prev + 1
      return prev
    })
  }, [])

  useEffect(() => {
    if (currentStep >= 5 || !order) return
    const interval = setInterval(advanceStep, 5000)
    return () => clearInterval(interval)
  }, [currentStep, advanceStep, order])

  if (authLoading || orderLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-warm-cream">
        <div className="animate-pulse text-lg text-muted-foreground">Loading...</div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4 bg-warm-cream">
        <h2 className="font-serif text-2xl text-chocolate mb-2">Order Not Found</h2>
        <p className="text-muted-foreground mb-6">We could not find order with ID {id}</p>
        <Button variant="gradient" asChild>
          <Link to="/orders">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Orders
          </Link>
        </Button>
      </div>
    )
  }

  const statusLabel = Object.keys(statusMap).find((k) => statusMap[k] === currentStep) || order.status

  return (
    <div className="min-h-screen bg-warm-cream">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/orders" className="text-chocolate">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Orders
          </Link>
        </Button>

        <div className="mb-8">
          <h1 className="font-serif text-3xl text-chocolate">Order Tracking</h1>
          <p className="font-mono text-sm text-caramel mt-1">Order #{id}</p>
        </div>

        <Card className="shadow-soft rounded-2xl mb-8">
          <CardContent className="p-6 md:p-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-mint opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-mint"></span>
                </span>
                <span className="text-sm font-medium text-mint">Live</span>
              </div>
              <Badge variant="default" className="text-sm px-4 py-1">
                {statusLabel}
              </Badge>
            </div>

            <div className="relative">
              <div className="hidden md:block absolute left-0 right-0 top-6 h-1 bg-dusty-rose/30" />
              <div className="grid grid-cols-5 gap-2">
                {steps.map((step, index) => {
                  const isCompleted = index < currentStep - 1
                  const isCurrent = index === currentStep - 1
                  const StepIcon = step.icon

                  return (
                    <div key={step.label} className="flex flex-col items-center gap-3 relative">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 z-10 transition-all duration-500 ${
                          isCompleted
                            ? 'bg-mint text-white'
                            : isCurrent
                            ? 'bg-[#E8927C] text-white scale-110 shadow-lg'
                            : 'bg-caramel text-white'
                        }`}
                      >
                        {isCompleted ? <Check className="w-5 h-5" /> : <StepIcon className="w-5 h-5" />}
                      </div>
                      <div className="text-center">
                        <p
                          className={`text-xs md:text-sm font-medium ${
                            isCompleted
                              ? 'text-mint'
                              : isCurrent
                              ? 'text-chocolate'
                              : 'text-muted-foreground'
                          }`}
                        >
                          {step.label}
                        </p>
                        {isCurrent && (
                          <p className="text-xs text-muted-foreground mt-1 hidden md:block">
                            {currentStep === 1 && 'Your order has been placed successfully'}
                            {currentStep === 2 && 'Order has been confirmed by the bakery'}
                            {currentStep === 3 && 'Your treats are being prepared fresh'}
                            {currentStep === 4 && 'Your order is on its way!'}
                            {currentStep === 5 && 'Enjoy your treats!'}
                          </p>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="shadow-soft rounded-2xl">
            <CardHeader>
              <CardTitle className="font-serif text-lg text-chocolate">Order Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Placed on {new Date(order.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
              <div className="space-y-2">
                {order.items.map((item, idx) => {
                  const imgUrl = getItemImage(item.name)
                  const hasFailed = failedImages.has(item.name + idx)
                  return (
                    <div key={idx} className="text-sm">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg shrink-0 overflow-hidden bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center text-base">
                          {hasFailed || !imgUrl ? (
                            <span>{Object.entries(categoryEmoji).find(([k]) => item.name.includes(k))?.[1] || '🧁'}</span>
                          ) : (
                            <img
                              src={imgUrl}
                              alt={item.name}
                              className="w-full h-full object-cover"
                              loading="lazy"
                              onError={() => setFailedImages((prev) => new Set(prev).add(item.name + idx))}
                            />
                          )}
                        </div>
                        <span className="flex-1 text-chocolate">{item.name} x{item.quantity}</span>
                        <span className="font-medium text-chocolate">₹{item.price * item.quantity}</span>
                      </div>
                      {item.removedIngredients && item.removedIngredients.length > 0 && (
                        <div className="flex flex-wrap gap-1 ml-[52px] mt-1">
                          {item.removedIngredients.map((ing) => (
                            <span key={ing} className="text-xs bg-[#C62828]/10 text-[#C62828] px-1.5 py-0.5 rounded-full">
                              -{ing}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
              <div className="border-t border-dusty-rose pt-3 flex justify-between font-semibold">
                <span className="text-chocolate">Total</span>
                <span className="text-strawberry">₹{order.total}</span>
              </div>
              {currentStep < 5 && (
                <div className="bg-strawberry/5 text-strawberry rounded-xl px-3 py-2 text-sm font-medium text-center border border-strawberry/20">
                  Estimated delivery: 30-45 minutes
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="shadow-soft rounded-2xl">
            <CardHeader>
              <CardTitle className="font-serif text-lg text-chocolate">Delivery Address</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-strawberry shrink-0 mt-0.5" />
                <p className="text-sm text-chocolate">{order.deliveryAddress}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
