import type { ComponentProps, ReactNode } from "react"

import { cn } from "@/lib/utils"

type PageProps = ComponentProps<"div"> & {
  title: string | ReactNode
  actions?: ReactNode
}

const Page = ({ title, actions, className, children, ...props }: PageProps) => (
  <div
    className={cn("flex flex-col gap-8 items-stretch", className)}
    {...props}
  >
    <div className="flex items-center justify-between">
      {typeof title === "string" ? (
        <div className="text-3xl font-medium">{title}</div>
      ) : (
        title
      )}
      <div className="grow-0">{actions}</div>
    </div>
    {children}
  </div>
)

export default Page
