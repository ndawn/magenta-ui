import type { ComponentProps } from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export type CatalogFiltersProps = ComponentProps<typeof Card> & {}

export const CatalogFilters = ({
  className,
  ...props
}: CatalogFiltersProps) => {
  return (
    <Card className={cn("", className)} {...props}>
      <CardHeader>
        <CardTitle>{"filters"}</CardTitle>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  )
}

export default CatalogFilters
