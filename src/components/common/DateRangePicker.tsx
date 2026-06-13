import type { ComponentProps } from "react"

import { CalendarIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

type DateRangePickerProps = ComponentProps<typeof Button> & {
  value?: Date
  onChange?: (val: Date | undefined) => void
}

const DateRangePicker = ({
  value,
  onChange,
  className,
  ...props
}: DateRangePickerProps) => (
  <Popover>
    <PopoverTrigger asChild>
      <Button
        variant="outline"
        data-empty={!value}
        className={cn(
          "data-[empty=true]:text-muted-foreground w-[280px] justify-start text-left font-normal",
          className,
        )}
        {...props}
      >
        <CalendarIcon />
        {value || <span>Pick a date</span>}
      </Button>
    </PopoverTrigger>
    <PopoverContent className="w-auto p-0">
      <Calendar mode="single" selected={value} onSelect={onChange} />
    </PopoverContent>
  </Popover>
)

export default DateRangePicker
