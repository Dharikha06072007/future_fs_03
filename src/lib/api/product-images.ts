export interface ProductImageData {
  url: string
  source: 'placeholder' | 'unsplash' | 'ai'
  photographer?: string
  photographerUrl?: string
}

const unsplashAccessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY || ''

const categoryColors: Record<string, { gradient: string; icon: string }> = {
  Cakes: { gradient: 'from-amber-200 via-orange-100 to-rose-200', icon: '🎂' },
  Cookies: { gradient: 'from-amber-100 via-yellow-50 to-orange-100', icon: '🍪' },
  Pastries: { gradient: 'from-yellow-100 via-amber-50 to-orange-100', icon: '🥐' },
  Breads: { gradient: 'from-stone-200 via-amber-100 to-yellow-100', icon: '🍞' },
  Muffins: { gradient: 'from-rose-100 via-pink-50 to-amber-100', icon: '🧁' },
  Cupcakes: { gradient: 'from-pink-100 via-rose-50 to-purple-100', icon: '🧁' },
  Brownies: { gradient: 'from-amber-200 via-orange-100 to-stone-200', icon: '🍫' },
  Donuts: { gradient: 'from-pink-200 via-red-100 to-rose-200', icon: '🍩' },
  Pies: { gradient: 'from-orange-200 via-amber-100 to-yellow-100', icon: '🥧' },
  Tarts: { gradient: 'from-yellow-200 via-amber-100 to-orange-100', icon: '🍓' },
  Cheesecakes: { gradient: 'from-yellow-100 via-amber-50 to-cream-100', icon: '🍰' },
  Macarons: { gradient: 'from-purple-100 via-pink-100 to-rose-100', icon: '🍭' },
}

const unsplashQueries: Record<string, string> = {
  Cakes: 'chocolate-cake-slice',
  Cookies: 'chocolate-chip-cookies',
  Pastries: 'french-croissant-bakery',
  Breads: 'artisan-sourdough-bread',
  Muffins: 'blueberry-muffins',
  Cupcakes: 'vanilla-cupcake-frosting',
  Brownies: 'fudgy-brownies-chocolate',
  Donuts: 'glazed-donuts',
  Pies: 'apple-pie-slice',
  Tarts: 'fruit-tart-pastry',
  Cheesecakes: 'new-york-cheesecake',
  Macarons: 'french-macarons-assorted',
}

const unsplashCache = new Map<string, string>()

export async function fetchUnsplashImage(category: string): Promise<string | null> {
  if (!unsplashAccessKey) return null

  const query = unsplashQueries[category] || category
  if (unsplashCache.has(query)) return unsplashCache.get(query)!

  try {
    const res = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=3&orientation=landscape`,
      { headers: { Authorization: `Client-ID ${unsplashAccessKey}` } }
    )
    if (!res.ok) return null
    const data = await res.json()
    if (data.results?.length > 0) {
      const url = data.results[0].urls.regular + '&w=600&q=80'
      unsplashCache.set(query, url)
      return url
    }
    return null
  } catch {
    return null
  }
}

export async function fetchBulkUnsplashImages(): Promise<Record<string, string>> {
  const map: Record<string, string> = {}
  const categories = Object.keys(unsplashQueries)
  const batch = categories.map(async (cat) => {
    const url = await fetchUnsplashImage(cat)
    if (url) map[cat] = url
  })
  await Promise.allSettled(batch)
  return map
}

export function getProductImage(
  product: { name: string; category: string; id: string },
  unsplashOverrides?: Record<string, string>
): ProductImageData {
  if (unsplashOverrides?.[product.category]) {
    return {
      url: unsplashOverrides[product.category],
      source: 'unsplash',
      photographer: 'Unsplash',
      photographerUrl: 'https://unsplash.com',
    }
  }

  const colors = categoryColors[product.category] || categoryColors.Cakes
  const textColor = '#5D4037'
  const bgLight = '#FFF8F0'
  const slug = product.name.replace(/\s+/g, '+').replace(/&/g, 'and')

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:${bgLight}" />
        <stop offset="100%" style="stop-color:#F5E6D3" />
      </linearGradient>
      <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1" fill="#D4A574" opacity="0.15" />
      </pattern>
    </defs>
    <rect width="600" height="400" fill="url(#bg)" />
    <rect width="600" height="400" fill="url(#dots)" />
    <text x="300" y="180" text-anchor="middle" font-size="64">${colors.icon}</text>
    <text x="300" y="250" text-anchor="middle" font-family="'Playfair Display', Georgia, serif" font-size="22" fill="${textColor}" font-weight="600">
      ${product.name}
    </text>
    <text x="300" y="280" text-anchor="middle" font-family="'Nunito', sans-serif" font-size="14" fill="#D4A574" font-weight="500">
      ${product.category} · Homemade Happiness
    </text>
  </svg>`

  return {
    url: `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`,
    source: 'placeholder',
  }
}

export function getPlaceholderSvg(name: string, category: string): string {
  const colors = categoryColors[category] || categoryColors.Cakes
  const textColor = '#5D4037'
  const bgLight = '#FFF8F0'

  return `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:${bgLight}" />
        <stop offset="100%" style="stop-color:#F5E6D3" />
      </linearGradient>
      <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1" fill="#D4A574" opacity="0.15" />
      </pattern>
    </defs>
    <rect width="600" height="400" fill="url(#bg)" />
    <rect width="600" height="400" fill="url(#dots)" />
    <text x="300" y="180" text-anchor="middle" font-size="64">${colors.icon}</text>
    <text x="300" y="250" text-anchor="middle" font-family="'Playfair Display', Georgia, serif" font-size="22" fill="${textColor}" font-weight="600">
      ${name}
    </text>
    <text x="300" y="280" text-anchor="middle" font-family="'Nunito', sans-serif" font-size="14" fill="#D4A574" font-weight="500">
      ${category} · Homemade Happiness
    </text>
  </svg>`
}

export function generateProductImageUrl(name: string, category: string): string {
  return `data:image/svg+xml;utf8,${encodeURIComponent(getPlaceholderSvg(name, category))}`
}
