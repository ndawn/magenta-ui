import type { ComponentProps } from "react"

import { cn } from "@/lib/utils"
import { mobile as navItems } from "@/menu"

import Extra from "./Extra"
import Link from "./Link"

const MAX_ITEMS = 5

const BottomNav = ({ className, ...props }: ComponentProps<"nav">) => (
  <nav
    className={cn(
      "py-2 w-full flex flex-row items-center justify-around bg-sidebar shadow-md",
      className,
    )}
    {...props}
  >
    {navItems.slice(0, MAX_ITEMS - 1).map((item) => (
      <Link key={item.to} {...item} />
    ))}
    {navItems.length <= MAX_ITEMS ? (
      navItems
        .slice(MAX_ITEMS - 1)
        .map((item) => <Link key={item.to} {...item} />)
    ) : (
      <Extra items={navItems.slice(MAX_ITEMS - 1)} />
    )}
  </nav>
)

export default BottomNav
