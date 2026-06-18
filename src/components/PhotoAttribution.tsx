export function PhotoAttribution({ name }: { name?: string }) {
  if (!name) return null
  return (
    <span className="text-[9px] text-gray-400 block mt-0.5">
      Photo by {name} via Unsplash
    </span>
  )
}
