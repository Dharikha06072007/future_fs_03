import { supabase } from '@/integrations/supabase/client'
import { supabaseUrl } from './config.server'

export interface OrderItem {
  name: string
  quantity: number
  price: number
  removedIngredients?: string[]
}

export interface Order {
  id: string
  date: string
  items: OrderItem[]
  total: number
  status: 'Pending' | 'Confirmed' | 'Preparing' | 'Out for Delivery' | 'Delivered'
  deliveryAddress: string
  paymentMethod?: string
}

const ORDERS_PREFIX = 'bakery-orders-'

function isSupabaseConfigured(): boolean {
  return !!(supabaseUrl && supabaseUrl !== 'https://placeholder.supabase.co')
}

function getLocalOrders(userEmail: string): Order[] {
  try {
    const raw = localStorage.getItem(`${ORDERS_PREFIX}${userEmail}`)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveLocalOrders(userEmail: string, orders: Order[]) {
  localStorage.setItem(`${ORDERS_PREFIX}${userEmail}`, JSON.stringify(orders))
}

export async function fetchUserOrders(
  userId: string | null,
  userEmail: string | null,
): Promise<Order[]> {
  if (isSupabaseConfigured() && userId) {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (!error && data) {
      return data.map(
        (o: any): Order => ({
          id: o.id || '',
          date: o.created_at || new Date().toISOString(),
          items: Array.isArray(o.items) ? o.items : [],
          total: o.total_amount || 0,
          status: o.status || 'Pending',
          deliveryAddress: o.address?.full || '',
          paymentMethod: o.payment_method,
        }),
      )
    }
  }

  if (userEmail) return getLocalOrders(userEmail)

  return []
}

export async function fetchOrderById(
  orderId: string,
  userId: string | null,
  userEmail: string | null,
): Promise<Order | null> {
  const orders = await fetchUserOrders(userId, userEmail)
  return orders.find((o) => o.id === orderId) || null
}

export function savePlacedOrder(order: Order, userEmail: string) {
  if (!userEmail) return
  const orders = getLocalOrders(userEmail)
  orders.unshift(order)
  saveLocalOrders(userEmail, orders)
}
