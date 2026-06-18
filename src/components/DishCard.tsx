import { Scale, Package } from 'lucide-react'
import { DishImage } from './DishImage'
import type { Dish } from '../data/dishes'

interface Props {
  dish: Dish
  onAddToCart?: (dish: Dish) => void
}

export function DishCard({ dish, onAddToCart }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group">
      <div className="relative overflow-hidden">
        <DishImage
          src={dish.imageUrl}
          category={dish.category}
          className="w-full h-52 rounded-t-2xl group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-bold text-[#5D4037] shadow-sm">
          ₹{dish.price}
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-1">
          <p className="text-xs text-[#E8927C] font-semibold uppercase tracking-wider">{dish.category}</p>
          <span className="inline-flex items-center gap-1 text-[10px] bg-[#FFF8F0] text-[#5D4037] px-2 py-1 rounded-full font-medium">
            {dish.servingType === 'weight' ? (
              <Scale className="w-3 h-3" />
            ) : (
              <Package className="w-3 h-3" />
            )}
            {dish.servingSize}
          </span>
        </div>
        <h3 className="font-bold text-[#5D4037] text-lg mb-1">{dish.name}</h3>
        <div className="flex items-baseline gap-2 mb-3">
          <p className="text-[#E8927C] font-bold text-xl">₹{dish.price}</p>
          <span className="text-xs text-gray-400">per {dish.servingSize}</span>
        </div>
        {onAddToCart && (
          <button
            onClick={() => onAddToCart(dish)}
            className="w-full bg-gradient-to-r from-[#E8927C] to-[#D4A574] text-white font-bold py-3 rounded-xl hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  )
}
