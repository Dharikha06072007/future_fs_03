import { dishes } from '../src/data/dishes'

const UNSPLASH_ACCESS_KEY = process.env.VITE_UNSPLASH_ACCESS_KEY || ''

const categoryEmoji: Record<string, string> = {
  Cakes: '🎂',
  Cookies: '🍪',
  Pastries: '🥐',
  Breads: '🍞',
  Muffins: '🧁',
  Cupcakes: '🧁',
  Brownies: '🍫',
  Donuts: '🍩',
  Pies: '🥧',
  Tarts: '🥧',
  Cheesecakes: '🍰',
  Macarons: '🍪',
}

async function fetchUnsplashUrl(query: string): Promise<{ url: string; photographer: string } | null> {
  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`
  const res = await fetch(url, {
    headers: { Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}` },
  })
  if (!res.ok) return null
  const data = await res.json()
  if (!data.results?.length) return null
  const photo = data.results[0]
  return {
    url: `${photo.urls.raw}&w=800&q=75`,
    photographer: `${photo.user.name} (${photo.user.links.html})`,
  }
}

async function main() {
  if (!UNSPLASH_ACCESS_KEY) {
    console.log('No VITE_UNSPLASH_ACCESS_KEY set. Skipping fetch.')
    return
  }

  for (const dish of dishes) {
    const query = `bakery ${dish.name} food photography`
    const result = await fetchUnsplashUrl(query)
    if (result) {
      dish.imageUrl = result.url
      dish.photographer = result.photographer
      console.log(`✓ ${dish.name}`)
    } else {
      console.log(`✗ ${dish.name} — using ${categoryEmoji[dish.category] || '🍽️'} fallback`)
    }
    await new Promise((r) => setTimeout(r, 500))
  }

  const updated = `export interface Dish { id: number; name: string; price: number; category: string; imageUrl?: string; photographer?: string; }\n\nexport const dishes: Dish[] = ${JSON.stringify(dishes, null, 2)}\n`
  // Inline output for copying
  console.log('\n=== Updated dishes.ts content ===\n')
  console.log(updated)
}

main()
