import { useState, type ComponentProps } from "react"

import { MenuIcon, XIcon } from "lucide-react"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import type { MenuItem } from "@/menu"

import Link from "./Link"

type BottomNavExtraProps = ComponentProps<typeof Popover> & {
  items: MenuItem[]
}

const BottomNavExtra = ({ items, ...props }: BottomNavExtraProps) => {
  const [open, setOpen] = useState(false)

  return (
    <Popover modal open={open} onOpenChange={setOpen} {...props}>
      <PopoverTrigger asChild>
        <a className="p-2 flex flex-col items-center justify-center gap-1 text-primary/120 rounded-md select-none hover:bg-primary/10">
          {open ? <XIcon size={24} /> : <MenuIcon size={24} />}
          {/* <span className="text-xs font-medium">{title}</span> */}
        </a>
      </PopoverTrigger>

      <PopoverContent
        side="top"
        sideOffset={16}
        className="p-1 w-auto bg-sidebar"
      >
        <div className="flex flex-col gap-3">
          {items.map((item) => (
            <Link key={item.to} onClick={() => setOpen(false)} {...item} />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default BottomNavExtra
