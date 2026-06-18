import { Link } from "@tanstack/react-router"
import { Star, Plus } from "lucide-react"
import { useCartStore } from "@/lib/api/cart-store"
import ProductImage from "@/components/ProductImage"

export interface Product {
  id: string
  name: string
  category: string
  price: number
  image: string
  description?: string
  ingredients?: string[]
  is_bestseller?: boolean
  is_new?: boolean
  rating?: number
  reviews?: number
}

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      removedIngredients: [],
    })
  }

  return (
    <Link to="/product/$id" params={{ id: product.id }} className="block group">
      <div
        className="overflow-hidden transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-[0_16px_48px_rgba(93,64,55,0.16)]"
        style={{ backgroundColor: "#FFFFFF", borderRadius: "24px", boxShadow: "0 8px 32px rgba(93,64,55,0.08)" }}
      >
        <div className="relative overflow-hidden" style={{ aspectRatio: "4/3", borderRadius: "24px 24px 0 0" }}>
          <ProductImage
            src={product.image}
            alt={product.name}
            className="h-full w-full transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.is_bestseller && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold" style={{ backgroundColor: "#F4D03F", color: "#5D4037" }}>
                Bestseller
              </span>
            )}
            {product.is_new && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold text-white" style={{ backgroundColor: "#E8927C" }}>
                New
              </span>
            )}
          </div>
          <span className="absolute top-3 right-3 text-xs font-medium" style={{ color: "#D4A574", backgroundColor: "#FFFFFF", padding: "2px 10px", borderRadius: "9999px" }}>
            {product.category}
          </span>
        </div>
        <div className="p-4">
          <h3 className="font-semibold leading-tight mb-1 text-[18px]" style={{ color: "#5D4037", fontFamily: "'Playfair Display', serif" }}>
            {product.name}
          </h3>
          <div className="flex items-center gap-1.5 mb-2">
            {product.rating ? (
              <>
                <Star className="h-3.5 w-3.5 fill-[#F4D03F]" style={{ color: "#F4D03F" }} />
                <span className="text-sm font-medium" style={{ color: "#5D4037" }}>{product.rating.toFixed(1)}</span>
                {product.reviews !== undefined && (
                  <span className="text-xs" style={{ color: "#C9A9A6" }}>
                    ({product.reviews})
                  </span>
                )}
              </>
            ) : (
              <span className="text-xs" style={{ color: "#C9A9A6" }}>No ratings</span>
            )}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[20px] font-bold" style={{ color: "#E8927C" }}>
              ₹{product.price.toLocaleString("en-IN")}
            </span>
            <button
              onClick={handleAddToCart}
              className="flex items-center justify-center rounded-full text-white transition-all duration-200 hover:scale-110"
              style={{ width: "40px", height: "40px", backgroundColor: "#E8927C", boxShadow: "0 4px 12px rgba(232, 146, 124, 0.4)" }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#D4816E" }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#E8927C" }}
              aria-label="Add to cart"
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}
