const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY

export async function fetchBakeryImage(query: string): Promise<{ url: string; photographer: string } | null> {
  if (!ACCESS_KEY) return null
  try {
    const res = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query + ' food photography')}&per_page=1&orientation=squarish`,
      { headers: { Authorization: `Client-ID ${ACCESS_KEY}` } }
    )
    const data = await res.json()
    if (!data.results?.length) return null
    return {
      url: data.results[0].urls.regular,
      photographer: data.results[0].user.name,
    }
  } catch {
    return null
  }
}
