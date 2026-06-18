import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  productId: string
  name: string
  price: number
  image: string
  quantity: number
  removedIngredients: string[]
}

export interface CartStore {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'quantity' | 'removedIngredients'> & { removedIngredients?: string[] }, quantity?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  total: () => number
  itemCount: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item, quantity = 1) => {
        const items = get().items
        const fullItem = { ...item, removedIngredients: item.removedIngredients ?? [] }
        const existingIndex = items.findIndex((i) => i.productId === fullItem.productId)
        if (existingIndex > -1) {
          const updated = [...items]
          updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: updated[existingIndex].quantity + quantity,
          }
          set({ items: updated })
        } else {
          set({ items: [...items, { ...fullItem, quantity }] })
        }
      },
      removeItem: (productId) => {
        set({ items: get().items.filter((i) => i.productId !== productId) })
      },
      updateQuantity: (productId, quantity) => {
        const items = get().items.map((i) =>
          i.productId === productId ? { ...i, quantity: Math.max(0, quantity) } : i
        )
        set({ items: items.filter((i) => i.quantity > 0) })
      },
      clearCart: () => set({ items: [] }),
      total: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
      itemCount: () => get().items.reduce((count, i) => count + i.quantity, 0),
    }),
    { name: 'bakery-cart-storage' }
  )
)
