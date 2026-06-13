import type { ComponentProps, ReactNode } from "react"

import { formatNumber } from "@/utils"

type NumberProps = ComponentProps<"span"> & {
  value: string | number
  prefix?: string | ReactNode
  suffix?: string | ReactNode
  hidden?: string | ReactNode
}

const Number = ({ hidden, value, prefix, suffix, ...props }: NumberProps) => (
  <span {...props}>
    {prefix} {formatNumber(value)} {suffix}
  </span>
)

export default Number
