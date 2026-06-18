import { useEffect, useState } from 'react'
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { Package, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/lib/api/use-auth'
import { dishes } from '@/data/dishes'

const categoryEmoji: Record<string, string> = {
  Cakes: '🎂', Cookies: '🍪', Pastries: '🥐', Breads: '🍞',
  Muffins: '🧁', Cupcakes: '🧁', Brownies: '🍫', Donuts: '🍩',
  Pies: '🥧', Tarts: '🍮', Cheesecakes: '🍰', Macarons: '🍡',
}

function getItemImage(name: string): string {
  const dish = dishes.find((d) => d.name === name)
  if (dish?.imageUrl) return dish.imageUrl
  const category = Object.keys(categoryEmoji).find((cat) => name.toLowerCase().includes(cat.toLowerCase().replace(/s$/, '')))
  return category || '🧁'
}

interface OrderItem {
  name: string
  quantity: number
  price: number
}

interface Order {
  id: string
  date: string
  items: OrderItem[]
  total: number
  status: 'Pending' | 'Confirmed' | 'Preparing' | 'Out for Delivery' | 'Delivered'
  deliveryAddress: string
}

const mockOrders: Order[] = [
  {
    id: 'ORD-2024-001',
    date: '2024-12-15',
    items: [
      { name: 'Classic Chocolate Cake', quantity: 1, price: 650 },
      { name: 'Chocolate Chip Cookies', quantity: 2, price: 250 },
    ],
    total: 1150,
    status: 'Delivered',
    deliveryAddress: '123 Baker Street, New Delhi',
  },
  {
    id: 'ORD-2024-002',
    date: '2024-12-18',
    items: [
      { name: 'Red Velvet Cake', quantity: 1, price: 750 },
      { name: 'French Croissant', quantity: 3, price: 180 },
      { name: 'Blueberry Muffin', quantity: 2, price: 180 },
    ],
    total: 1470,
    status: 'Out for Delivery',
    deliveryAddress: '123 Baker Street, New Delhi',
  },
  {
    id: 'ORD-2024-003',
    date: '2024-12-20',
    items: [
      { name: 'New York Cheesecake', quantity: 1, price: 650 },
    ],
    total: 650,
    status: 'Preparing',
    deliveryAddress: '123 Baker Street, New Delhi',
  },
  {
    id: 'ORD-2024-004',
    date: '2024-12-22',
    items: [
      { name: 'Assorted Macarons', quantity: 2, price: 250 },
      { name: 'Glazed Donuts', quantity: 6, price: 150 },
      { name: 'Sourdough Bread', quantity: 1, price: 350 },
    ],
    total: 1300,
    status: 'Confirmed',
    deliveryAddress: '123 Baker Street, New Delhi',
  },
]

const statusColors: Record<string, string> = {
  'Pending': 'bg-caramel text-white border-transparent',
  'Confirmed': 'bg-mint text-white border-transparent',
  'Preparing': 'bg-butter text-chocolate border-transparent',
  'Out for Delivery': 'bg-strawberry text-white border-transparent',
  'Delivered': 'bg-mint text-white border-transparent',
}

const activeStatuses = ['Confirmed', 'Preparing', 'Out for Delivery']

export const Route = createFileRoute('/orders')({
  component: RouteComponent,
})

function RouteComponent() {
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set())
  const { user, loading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && !user) {
      navigate({ to: '/auth' })
    }
  }, [user, loading, navigate])

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-warm-cream">
        <div className="animate-pulse text-lg text-muted-foreground">Loading...</div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  if (mockOrders.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4 bg-warm-cream">
        <div className="text-8xl mb-6">🧁</div>
        <h2 className="font-serif text-2xl text-chocolate mb-2">No Orders Yet</h2>
        <p className="text-muted-foreground mb-6">Looks like you have not placed any orders yet.</p>
        <Button variant="gradient" size="lg" asChild>
          <Link to="/menu">Browse Menu</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-warm-cream">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="font-serif text-3xl text-chocolate mb-8">My Orders</h1>

        <div className="space-y-4">
          {mockOrders.map((order) => (
            <Card key={order.id} className="shadow-soft rounded-2xl">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Order ID</p>
                    <p className="font-semibold font-mono text-chocolate">{order.id}</p>
                  </div>
                  <div className="text-right sm:text-left">
                    <p className="text-sm text-muted-foreground">Placed on</p>
                    <p className="font-medium text-chocolate">{new Date(order.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                  </div>
                  <Badge className={`${statusColors[order.status]} px-4 py-1.5 text-sm`}>
                    {order.status}
                  </Badge>
                </div>

                <div className="border-t border-dusty-rose pt-4 space-y-2">
                  {order.items.map((item, idx) => {
                    const imgUrl = getItemImage(item.name)
                    const hasFailed = failedImages.has(item.name + idx)
                    return (
                      <div key={idx} className="flex items-center gap-3 text-sm">
                        <div className="w-10 h-10 rounded-lg shrink-0 overflow-hidden bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center text-base">
                          {hasFailed || !imgUrl.startsWith('/') ? (
                            <span>{categoryEmoji[Object.keys(categoryEmoji).find((c) => item.name.includes(c)) || ''] || '🧁'}</span>
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
                    )
                  })}
                </div>

                <div className="border-t border-dusty-rose pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Delivering to</p>
                    <p className="text-sm text-chocolate">{order.deliveryAddress}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="text-lg font-bold text-strawberry">₹{order.total}</p>
                    {activeStatuses.includes(order.status) && (
                      <Button variant="gradient" size="sm" asChild>
                        <Link to="/track/$id" params={{ id: order.id }}>
                          <ExternalLink className="w-4 h-4 mr-1" />
                          Track Order
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
