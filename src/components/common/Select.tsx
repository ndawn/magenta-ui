import { useState, type ComponentProps, type ReactNode } from "react"

import { CheckIcon, ChevronsUpDownIcon } from "lucide-react"

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

export type LabeledSelectData = {
  label: string
  value: string
}

export type GroupSelectData = {
  label: string
  items: string[] | LabeledSelectData[]
}

export type SelectData = string[] | LabeledSelectData[] | GroupSelectData[]

export type TriggerData<TValue = string | undefined> = Omit<
  ComponentProps<any>,
  "value" | "placeholder" | "open"
> & {
  placeholder?: string
  open?: boolean
  setOpen?: (value: boolean) => void
  value: TValue
}

export type SelectProps<TValue = string | undefined> = Omit<
  ComponentProps<any>,
  "value" | "placeholder" | "onSelect" | "children"
> & {
  data: SelectData
  plain?: boolean
  searchable?: boolean
  placeholder?: string
  value: TValue
  onSelect?: (val: (val: TValue) => TValue) => void
  renderItem?: (props: RenderItemProps<TValue>) => ReactNode
  children?: (data: TriggerData<TValue>) => ReactNode
}

export type RenderItemProps<TValue = string | undefined> = {
  item: LabeledSelectData
  value: TValue
  onSelect?: (value: string) => void
}

export type SelectGroupProps<TValue = string | undefined> = {
  label?: string
  items: string[] | LabeledSelectData[]
  renderItem?: (props: RenderItemProps<TValue>) => ReactNode
  value: TValue
  onSelect?: (value: string) => void
}

export const SelectGroup = <TValue = string | undefined,>({
  label,
  items,
  renderItem,
  value,
  onSelect,
}: SelectGroupProps<TValue>) => (
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
              value === itemValue ? "opacity-100" : "opacity-0",
            )}
          />
          {itemLabel}
        </CommandItem>
      )
    })}
  </CommandGroup>
)

export const defaultTrigger = <TValue = string | undefined,>({
  value,
  placeholder,
  open,
  ...props
}: TriggerData<TValue>) => (
  <Button
    variant="outline"
    role="combobox"
    aria-expanded={open}
    className="justify-between"
    {...props}
  >
    {value?.toString() ?? placeholder}
    <ChevronsUpDownIcon />
  </Button>
)

const Select = ({
  data,
  value,
  onSelect,
  plain = false,
  searchable = false,
  placeholder,
  renderItem,
  children = defaultTrigger,
  ...props
}: SelectProps<string | undefined>) => {
  const [open, setOpen] = useState(false)

  const onChange = (val: string | undefined) => {
    //@ts-ignore
    onSelect?.((prev) => (val === prev ? undefined : val))

    if (!Array.isArray(value)) {
      setOpen(false)
    }
  }

  const commandComponent = (
    <Command className="p-0">
      {searchable && <CommandInput placeholder={placeholder} />}
      <CommandList>
        <CommandEmpty>No items found</CommandEmpty>

        {!!data?.length &&
          (typeof data[0] === "object" && Object.hasOwn(data[0], "items") ? (
            (data as GroupSelectData[]).map((item) => (
              <SelectGroup
                label={item.label}
                items={item.items}
                value={value}
                onSelect={onChange}
                renderItem={renderItem}
              />
            ))
          ) : (
            <SelectGroup
              items={data as string[] | LabeledSelectData[]}
              value={value}
              onSelect={onChange}
              renderItem={renderItem}
            />
          ))}
      </CommandList>
    </Command>
  )

  if (plain) {
    return commandComponent
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {children({ value, placeholder, open, setOpen, ...props })}
      </PopoverTrigger>
      <PopoverContent asChild>{commandComponent}</PopoverContent>
    </Popover>
  )
}

export default Select
