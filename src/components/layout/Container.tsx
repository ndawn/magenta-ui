import type { ComponentProps } from "react"

import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const containerVariants = cva("w-full mx-auto", {
  variants: {
    size: {
      xs: "px-4",
      sm: "px-8",
      md: "px-16",
      lg: "px-48",
      xl: "px-128",
    },
  },
  defaultVariants: {
    size: "md",
  },
})

const Container = ({
  size,
  className,
  ...props
}: ComponentProps<"div"> & VariantProps<typeof containerVariants>) => (
  <div className={cn(containerVariants({ size }), className)} {...props} />
)

export default Container
