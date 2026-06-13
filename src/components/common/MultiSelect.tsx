import { useState } from "react"

import { ArrowUpDownIcon, CheckIcon } from "lucide-react"

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

import {
  type GroupSelectData,
  type LabeledSelectData,
  type SelectGroupProps,
  type SelectProps,
  type TriggerData,
} from "./Select"

const MultiSelectGroup = ({
  label,
  items,
  renderItem,
  value,
  onSelect,
}: SelectGroupProps<string[]>) => (
  <CommandGroup heading={label}>
    {items.map((item) => {
      const itemLabel = typeof item === "string" ? item : item.label
      const itemValue = typeof item === "string" ? item : item.value

      return renderItem ? (
        renderItem({
          item: { label: itemLabel, value: itemValue },
          value,
          onSelect,
        })
      ) : (
        <CommandItem key={itemValue} value={itemValue} onSelect={onSelect}>
          <CheckIcon
            className={cn(
              "mr-2 size-4",
              value.includes(itemValue) ? "opacity-100" : "opacity-0",
            )}
          />
          {itemLabel}
        </CommandItem>
      )
    })}
  </CommandGroup>
)

const defaultTrigger = ({
  value,
  placeholder,
  open,
}: TriggerData<string[]>) => (
  <Button
    variant="outline"
    role="combobox"
    aria-expanded={open}
    className="justify-between"
  >
    {value.length ? `${value.length} selected` : placeholder}
    <ArrowUpDownIcon />
  </Button>
)

const MultiSelect = ({
  data,
  value,
  onSelect,
  searchable = false,
  placeholder,
  children = defaultTrigger,
}: SelectProps<string[]>) => {
  const [open, setOpen] = useState(false)

  const onChange = (val: string) => {
    //@ts-ignore
    onSelect?.((prev) => {
      prev = [...prev]
      const valIndex = prev?.indexOf(val)

      if (valIndex === -1) {
        prev.splice(valIndex)
        return prev
      }

      return [...prev, val]
    })
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {children({ value, placeholder, open, setOpen })}
      </PopoverTrigger>
      <PopoverContent>
        <Command>
          {searchable && <CommandInput placeholder={placeholder} />}
          <CommandList>
            <CommandEmpty>No items found</CommandEmpty>

            {typeof data[0] === "object" && Object.hasOwn(data[0], "items") ? (
              (data as GroupSelectData[]).map((item) => (
                <MultiSelectGroup
                  label={item.label}
                  items={item.items}
                  value={value}
                  onSelect={onChange}
                />
              ))
            ) : (
              <MultiSelectGroup
                items={data as string[] | LabeledSelectData[]}
                value={value}
                onSelect={onChange}
              />
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default MultiSelect
