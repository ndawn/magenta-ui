import type { ComponentProps } from "react"

import { FilterIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

type ColumnFilterProps = Omit<ComponentProps<typeof Button>, "size">

const ColumnFilter = ({ children, ...props }: ColumnFilterProps) => (
  <Popover>
    <PopoverTrigger asChild>
      <Button size="icon" {...props}>
        <FilterIcon />
      </Button>
    </PopoverTrigger>

    <PopoverContent className="p-0">{children}</PopoverContent>
  </Popover>
)

export default ColumnFilter
