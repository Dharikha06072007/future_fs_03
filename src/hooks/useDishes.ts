import { useEffect, useState } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { dishes as localDishes } from '@/data/dishes'
import type { Dish } from '@/data/dishes'

interface DbProduct {
  id: string
  name: string
  category: string
  price: number
  image_url: string | null
  serving_size: string | null
  serving_type: string | null
}

function mapDbToDish(db: DbProduct, idx: number): Dish {
  const local = localDishes.find((d) => d.name === db.name)
  return {
    id: idx + 1,
    name: db.name,
    price: db.price,
    category: db.category,
    imageUrl: db.image_url || local?.imageUrl || '',
    servingSize: db.serving_size || local?.servingSize || '1 pc',
    servingType: (db.serving_type as 'weight' | 'pieces') || local?.servingType || 'pieces',
  }
}

export function useDishes() {
  const [dishes, setDishes] = useState<Dish[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function fetchDishes() {
      try {
        const { data, error: err } = await supabase
          .from('products')
          .select('id, name, category, price, image_url, serving_size, serving_type')
          .order('name')

        if (cancelled) return

        if (err) {
          throw err
        }

        if (data && data.length > 0) {
          setDishes((data as DbProduct[]).map(mapDbToDish))
        } else {
          setDishes(localDishes)
        }
      } catch (e) {
        if (!cancelled) {
          console.warn('Failed to fetch from Supabase, using local data:', e)
          setDishes(localDishes)
          setError(e instanceof Error ? e.message : 'Failed to fetch dishes')
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchDishes()
    return () => { cancelled = true }
  }, [])

  return { dishes, loading, error }
}
