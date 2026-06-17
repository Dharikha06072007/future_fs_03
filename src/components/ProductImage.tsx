import { useState } from 'react'
import { getProductImage, type ProductImageData } from '@/lib/api/product-images'

interface ProductImageProps {
  product: { name: string; category: string; id: string }
  className?: string
  unsplashOverrides?: Record<string, string>
}

export default function ProductImage({ product, className = '', unsplashOverrides }: ProductImageProps) {
  const [imgData, setImgData] = useState<ProductImageData>(() => getProductImage(product, unsplashOverrides))
  const [showAttribution, setShowAttribution] = useState(false)
  const [failed, setFailed] = useState(false)

  const handleError = () => {
    if (!failed) {
      setFailed(true)
      setImgData(getProductImage(product))
    }
  }

  return (
    <div className="relative w-full h-full overflow-hidden">
      {imgData.source === 'placeholder' ? (
        <img
          src={imgData.url}
          alt={product.name}
          className={`w-full h-full object-cover ${className}`}
          loading="lazy"
        />
      ) : (
        <img
          src={imgData.url}
          alt={product.name}
          className={`w-full h-full object-cover ${className}`}
          loading="lazy"
          onError={handleError}
          onMouseEnter={() => setShowAttribution(true)}
          onMouseLeave={() => setShowAttribution(false)}
        />
      )}

      {imgData.photographer && showAttribution && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
          <a
            href={imgData.photographerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-[10px] hover:underline"
          >
            Photo by {imgData.photographer}
          </a>
        </div>
      )}
    </div>
  )
}
