import { useState } from 'react'

interface Props {
  src: string
  alt: string
  className?: string
}

const categoryEmoji: Record<string, string> = {
  Cakes: '\uD83C\uDF82', Cupcakes: '\uD83E\uDDC1', Brownies: '\uD83C\uDF6B', Cookies: '\uD83C\uDF6A',
  Donuts: '\uD83C\uDF69', Muffins: '\uD83E\uDDC1', 'Traditional Indian Desserts': '\uD83C\uDF6E',
  Puddings: '\uD83C\uDF6E', 'Ice Cream Desserts': '\uD83C\uDF68', Pastries: '\uD83E\uDD50',
  Mousses: '\uD83C\uDF68', 'Homemade Specials': '\uD83C\uDFE0', 'Sweet Snacks': '\uD83C\uDF6C',
  'Premium Desserts': '\u2728', 'Mini Desserts': '\uD83C\uDF61', 'Festival Specials': '\uD83C\uDF89',
  'Trending Desserts': '\uD83D\uDD25',
}

export default function ProductImage({ src, alt, className = '' }: Props) {
  const [failed, setFailed] = useState(false)

  if (failed || !src || src.startsWith('https://placehold.co')) {
    const emoji = categoryEmoji[alt.split(' ')[0]] || '\uD83E\uDDC1'
    return (
      <div className={`bg-gradient-to-br from-[#FFF8F0] to-[#F5E6D3] flex items-center justify-center ${className}`}>
        <span className="text-5xl">{emoji}</span>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      loading="lazy"
      className={`object-cover ${className}`}
    />
  )
}
