import type { ComponentProps } from "react"

import CatalogCard from "@/components/catalog/CatalogCard"
import { cn } from "@/lib/utils"
import type { Property } from "@/types"

export type CatalogListProps = ComponentProps<"div"> & {
  items: Property[]
}

export const CatalogList = ({
  items,
  className,
  ...props
}: CatalogListProps) => {
  return (
    <div className={cn("flex gap-8", className)} {...props}>
      {items.map((item) => (
        <CatalogCard item={item} />
      ))}
    </div>
  )
}

export default CatalogList
