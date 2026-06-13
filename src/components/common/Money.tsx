import type { ComponentProps } from "react"

import Number from "@/components/common/Number"
import { currenciesByCode } from "@/utils"

type MoneyProps = ComponentProps<typeof Number> & {
  code: string
}

const Money = ({ hidden, code, prefix, suffix, ...props }: MoneyProps) => {
  const currency = currenciesByCode[code.toLowerCase()]

  return (
    <Number
      prefix={currency.endGlyph ? prefix : currency.glyph}
      suffix={currency.endGlyph ? currency.glyph : suffix}
      {...props}
    />
  )
}

export default Money
