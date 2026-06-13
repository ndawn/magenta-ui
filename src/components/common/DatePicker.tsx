import type { ComponentProps } from "react"

import dayjs from "dayjs"
import { CalendarIcon, XIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

type DatePickerProps = Omit<ComponentProps<typeof ButtonGroup>, "value"> & {
  value: Date | undefined
  onChange?: (val: Date | undefined) => void
}

const DatePicker = ({ value, onChange, ...props }: DatePickerProps) => (
  <Popover>
    <PopoverTrigger asChild>
      <ButtonGroup {...props}>
        <Button
          variant="outline"
          data-empty={!value}
          className="data-[empty=true]:text-muted-foreground justify-start text-start font-normal grow"
        >
          <CalendarIcon />
          {value ? dayjs(value).format("DD.MM.YYYY") : "Pick a date"}
        </Button>
        {!!value && (
          <Button
            variant="outline"
            size="icon"
            onClick={() => onChange?.(undefined)}
          >
            <XIcon />
          </Button>
        )}
      </ButtonGroup>
    </PopoverTrigger>
    <PopoverContent className="w-auto p-0">
      <Calendar mode="single" selected={value} onSelect={onChange} />
    </PopoverContent>
  </Popover>
)

export default DatePicker
