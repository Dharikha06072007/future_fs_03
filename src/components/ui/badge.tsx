"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[#E8927C] text-white shadow hover:bg-[#E8927C]/80",
        secondary:
          "border-transparent bg-[#F5E6D3] text-[#5D4037] hover:bg-[#F5E6D3]/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "border-[#D4A574] bg-white text-[#5D4037]",
        bestseller:
          "border-transparent bg-[#F4D03F] text-[#5D4037] shadow hover:bg-[#F4D03F]/80",
        new: "border-transparent bg-[#A8D5BA] text-white shadow hover:bg-[#A8D5BA]/80",
        sale: "border-transparent bg-[#C62828] text-white shadow hover:bg-[#C62828]/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
