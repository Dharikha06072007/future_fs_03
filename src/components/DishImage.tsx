import { useState } from 'react'

const categoryEmoji: Record<string, string> = {
  Cakes: '🎂', Cookies: '🍪', Pastries: '🥐', Breads: '🍞',
  Muffins: '🧁', Cupcakes: '🧁', Brownies: '🍫', Donuts: '🍩',
  Pies: '🥧', Tarts: '🍮', Cheesecakes: '🍰', Macarons: '🍡',
}

export function DishImage({ src, category, className = '' }: { src?: string; category: string; className?: string }) {
  const [error, setError] = useState(false)

  if (error || !src) {
    return (
      <div className={`bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center ${className}`}>
        <span className="text-5xl drop-shadow-sm">{categoryEmoji[category] || '🧁'}</span>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={category}
      onError={() => setError(true)}
      loading="lazy"
      className={`object-cover ${className}`}
    />
  )
}
