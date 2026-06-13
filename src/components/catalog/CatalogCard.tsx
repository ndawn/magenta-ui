import type { ComponentProps } from "react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { Property } from "@/types"

export type CatalogCardProps = ComponentProps<typeof Card> & {
  item: Property
}

export const CatalogCard = ({
  item,
  className,
  ...props
}: CatalogCardProps) => {
  return (
    <Card className={cn("", className)} {...props}>
      <CardHeader>
        <CardTitle>{item.title}</CardTitle>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  )
}

export default CatalogCard
