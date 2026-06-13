import type { ComponentProps } from "react"

import { cva, type VariantProps } from "class-variance-authority"
import "flag-icons/css/flag-icons.min.css"

import { cn } from "@/lib/utils"

const flagVariants = cva("rounded-full fi fis fib", {
  variants: {
    inline: {
      true: "inline-block",
      false: "!block",
    },
    size: {
      null: undefined,
      sm: "!size-4",
      md: "!size-8",
      lg: "!size-14",
    },
  },
  defaultVariants: {
    inline: false,
    size: "md",
  },
})

type FlagProps = ComponentProps<"span"> &
  VariantProps<typeof flagVariants> & {
    code: string
  }

const Flag = ({
  code = "xx",
  size,
  inline,
  className,
  ...props
}: FlagProps) => (
  <span
    className={cn(flagVariants({ size, inline }), `fi-${code}`, className)}
    {...props}
  />
)

export default Flag
