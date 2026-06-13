import type { ComponentProps } from "react"

import { HouseHeartIcon } from "lucide-react"

import { cn } from "@/lib/utils"

const Logo = ({ className, ...props }: ComponentProps<"span">) => (
  <span className={cn("inline-block text-nowrap", className)} {...props}>
    <HouseHeartIcon className="inline text-primary align-[center]" />
    &nbsp;
    <span className="text-2xl">Magenta</span>
  </span>
)

export default Logo
