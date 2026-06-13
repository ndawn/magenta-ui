import { useState, type ComponentProps } from "react"

import { CheckIcon, ChevronsUpDownIcon } from "lucide-react"

import Flag from "@/components/common/Flag"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { currenciesSelect, currencyCountry } from "@/utils"

type CurrencySelectProps = Omit<
  ComponentProps<typeof Button>,
  "value" | "onChange"
> & {
  required?: boolean
  id?: string
  placeholder?: string
  value: string | null
  onChange: (value: string | null) => any
}

const CurrencySelect = ({
  placeholder,
  value,
  onChange,
  className,
  ...props
}: CurrencySelectProps) => {
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("justify-between", className)}
          {...props}
        >
          {!!value && <Flag code={currencyCountry[value]} size="sm" />}
          {value || placeholder}
          <ChevronsUpDownIcon className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput placeholder="Search currency..." />
          <CommandList>
            <CommandEmpty>No currency found</CommandEmpty>
            <CommandGroup>
              {currenciesSelect.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    onChange(
                      currentValue === option.value ? null : option.value,
                    )
                    setOpen(false)
                  }}
                >
                  <Flag code={currencyCountry[option.value]} size="sm" />
                  {option.label}
                  <CheckIcon
                    className={cn(
                      "ml-auto",
                      value === option.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default CurrencySelect
