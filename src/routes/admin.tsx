import { useState } from 'react'
import { createFileRoute, useNavigate, Link } from '@tanstack/react-router'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { ShoppingBag, IndianRupee, Package, Users, Sun, Moon, TrendingUp, Plus, Pencil, Trash2, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/lib/api/use-auth'
import { toast } from 'sonner'

const chartData = [
  { day: 'Mon', orders: 12 }, { day: 'Tue', orders: 8 }, { day: 'Wed', orders: 15 },
  { day: 'Thu', orders: 10 }, { day: 'Fri', orders: 20 }, { day: 'Sat', orders: 25 },
  { day: 'Sun', orders: 18 },
]

const recentOrders = [
  { id: 'ORD-2024-001', customer: 'Priya Sharma', items: 2, total: 1150, status: 'Delivered', date: '2024-12-15' },
  { id: 'ORD-2024-002', customer: 'Rahul Verma', items: 3, total: 1470, status: 'Out for Delivery', date: '2024-12-18' },
  { id: 'ORD-2024-003', customer: 'Ananya Patel', items: 1, total: 650, status: 'Preparing', date: '2024-12-20' },
  { id: 'ORD-2024-004', customer: 'Vikram Singh', items: 5, total: 2100, status: 'Confirmed', date: '2024-12-22' },
  { id: 'ORD-2024-005', customer: 'Neha Gupta', items: 2, total: 880, status: 'Pending', date: '2024-12-23' },
]

const allProducts = [
  { id: '1', name: 'Classic Chocolate Cake', category: 'Cakes', price: 650, stock: 15 },
  { id: '2', name: 'Red Velvet Cake', category: 'Cakes', price: 750, stock: 10 },
  { id: '5', name: 'Chocolate Chip Cookies', category: 'Cookies', price: 250, stock: 30 },
  { id: '7', name: 'Double Chocolate Cookies', category: 'Cookies', price: 300, stock: 25 },
  { id: '8', name: 'French Croissant', category: 'Pastries', price: 180, stock: 20 },
  { id: '21', name: 'Glazed Donut', category: 'Donuts', price: 150, stock: 40 },
]

const statusColors: Record<string, string> = {
  'Pending': 'bg-caramel text-white border-transparent',
  'Confirmed': 'bg-mint text-white border-transparent',
  'Preparing': 'bg-butter text-chocolate border-transparent',
  'Out for Delivery': 'bg-strawberry text-white border-transparent',
  'Delivered': 'bg-mint text-white border-transparent',
}

export const Route = createFileRoute('/admin')({
  component: RouteComponent,
})

function RouteComponent() {
  const { user, isAdmin, loading } = useAuth()
  const navigate = useNavigate()
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [activeSection, setActiveSection] = useState<'overview' | 'orders' | 'products'>('overview')

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-warm-cream">
        <div className="animate-pulse text-lg text-muted-foreground">Loading...</div>
      </div>
    )
  }

  if (!user || !isAdmin) {
    navigate({ to: '/auth' })
    return null
  }

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light'
    setTheme(next)
    document.documentElement.classList.toggle('dark', next === 'dark')
    toast.success(`${next === 'dark' ? 'Dark' : 'Light'} mode activated`)
  }

  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
    { id: 'products', label: 'Products', icon: Package },
  ] as const

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-warm-cream">
      <aside className="w-64 bg-white border-r border-caramel p-4 hidden md:block">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-serif text-lg text-chocolate">Admin Panel</h2>
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="text-caramel hover:bg-vanilla">
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </Button>
        </div>
        <nav className="space-y-1">
          {sidebarItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-full text-sm font-medium transition-all ${
                  activeSection === item.id
                    ? 'bg-strawberry text-white'
                    : 'text-muted-foreground hover:bg-vanilla'
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </button>
            )
          })}
        </nav>
        <div className="mt-6 pt-6 border-t border-dusty-rose">
          <Button variant="outline" size="sm" className="w-full rounded-full border-caramel" asChild>
            <Link to="/">
              <ExternalLink className="w-4 h-4 mr-2" />
              View Site
            </Link>
          </Button>
        </div>
      </aside>

      <div className="flex-1 p-4 md:p-8 overflow-auto">
        <div className="flex items-center justify-between mb-8 md:hidden">
          <h2 className="font-serif text-lg text-chocolate">Admin Panel</h2>
          <div className="flex gap-2">
            <div className="flex gap-1 bg-vanilla rounded-full p-1">
              {sidebarItems.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`p-2 rounded-full transition-all ${
                      activeSection === item.id ? 'bg-white shadow-sm text-strawberry' : 'text-muted-foreground'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </button>
                )
              })}
            </div>
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="text-caramel hover:bg-vanilla">
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {activeSection === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="shadow-soft rounded-2xl">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Orders</CardTitle>
                  <ShoppingBag className="w-4 h-4 text-strawberry" />
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-chocolate">156</p>
                  <p className="text-xs text-mint font-medium flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3" /> +12% from last month
                  </p>
                </CardContent>
              </Card>
              <Card className="shadow-soft rounded-2xl">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Revenue</CardTitle>
                  <IndianRupee className="w-4 h-4 text-strawberry" />
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-chocolate">₹84,250</p>
                  <p className="text-xs text-mint font-medium flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3" /> +8% from last month
                  </p>
                </CardContent>
              </Card>
              <Card className="shadow-soft rounded-2xl">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Products</CardTitle>
                  <Package className="w-4 h-4 text-strawberry" />
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-chocolate">32</p>
                  <p className="text-xs text-muted-foreground mt-1">Across 12 categories</p>
                </CardContent>
              </Card>
              <Card className="shadow-soft rounded-2xl">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Active Users</CardTitle>
                  <Users className="w-4 h-4 text-strawberry" />
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-chocolate">48</p>
                  <p className="text-xs text-mint font-medium flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3" /> +5 new this week
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card className="shadow-soft rounded-2xl">
              <CardHeader>
                <CardTitle className="font-serif text-chocolate">Orders This Week</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="day" className="text-xs" />
                      <YAxis className="text-xs" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'var(--background)',
                          border: '1px solid var(--border)',
                          borderRadius: '8px',
                        }}
                      />
                      <Bar dataKey="orders" fill="#E8927C" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeSection === 'orders' && (
          <Card className="shadow-soft rounded-2xl">
            <CardHeader>
              <CardTitle className="font-serif text-chocolate">Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-dusty-rose text-muted-foreground">
                      <th className="text-left py-3 px-2 font-medium">Order ID</th>
                      <th className="text-left py-3 px-2 font-medium">Customer</th>
                      <th className="text-center py-3 px-2 font-medium">Items</th>
                      <th className="text-right py-3 px-2 font-medium">Total</th>
                      <th className="text-center py-3 px-2 font-medium">Status</th>
                      <th className="text-center py-3 px-2 font-medium">Date</th>
                      <th className="text-center py-3 px-2 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="border-b border-dusty-rose/50 hover:bg-vanilla/50 transition-colors">
                        <td className="py-3 px-2 font-mono text-xs text-chocolate">{order.id}</td>
                        <td className="py-3 px-2 text-chocolate">{order.customer}</td>
                        <td className="py-3 px-2 text-center text-chocolate">{order.items}</td>
                        <td className="py-3 px-2 text-right font-medium text-chocolate">₹{order.total}</td>
                        <td className="py-3 px-2 text-center">
                          <Badge className={`${statusColors[order.status]} text-xs`}>
                            {order.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-2 text-center text-muted-foreground">{order.date}</td>
                        <td className="py-3 px-2 text-center">
                          <Button variant="ghost" size="sm" className="text-strawberry hover:bg-strawberry/10">View</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {activeSection === 'products' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-xl text-chocolate">Product Management</h2>
              <Button variant="gradient" className="rounded-full">
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </Button>
            </div>
            <Card className="shadow-soft rounded-2xl">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-dusty-rose text-muted-foreground">
                        <th className="text-left py-3 px-4 font-medium">Product</th>
                        <th className="text-left py-3 px-4 font-medium">Category</th>
                        <th className="text-right py-3 px-4 font-medium">Price</th>
                        <th className="text-center py-3 px-4 font-medium">Stock</th>
                        <th className="text-center py-3 px-4 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allProducts.map((product) => (
                        <tr key={product.id} className="border-b border-dusty-rose/50 hover:bg-vanilla/50 transition-colors">
                          <td className="py-3 px-4 font-medium text-chocolate">{product.name}</td>
                          <td className="py-3 px-4 text-muted-foreground">{product.category}</td>
                          <td className="py-3 px-4 text-right text-chocolate">₹{product.price}</td>
                          <td className="py-3 px-4 text-center">
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                              product.stock > 20
                                ? 'bg-mint/20 text-mint'
                                : product.stock > 10
                                ? 'bg-butter/20 text-chocolate'
                                : 'bg-[#C62828]/10 text-[#C62828]'
                            }`}>
                              {product.stock}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center justify-center gap-1">
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-caramel hover:bg-vanilla">
                                <Pencil className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:bg-destructive/10">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
