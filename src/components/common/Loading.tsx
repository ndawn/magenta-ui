import type { PropsWithChildren } from "react"

import { Spinner } from "@/components/ui/spinner"

type LoadingProps = PropsWithChildren<{ shown?: boolean }>

const Loading = ({ shown = true, children }: LoadingProps) =>
  shown ? (
    <div className="flex items-center justify-center w-full h-full">
      <Spinner className="size-72" />
    </div>
  ) : (
    children
  )

export default Loading
