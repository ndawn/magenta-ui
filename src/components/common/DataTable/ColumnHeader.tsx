import type { ComponentProps, ReactNode } from "react"

import { ArrowDownIcon, ArrowUpDownIcon, ArrowUpIcon } from "lucide-react"

import type { Column } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"

import ColumnFilter from "./ColumnFilter"

type ColumnHeaderProps = ComponentProps<typeof ButtonGroup> & {
  column: Column<any>
  heading: string
  filters?: ReactNode
  active?: boolean
}

const ColumnHeader = ({
  column,
  heading,
  filters,
  active = false,
  ...props
}: ColumnHeaderProps) => (
  <ButtonGroup {...props}>
    <Button
      variant="ghost"
      title="Sort"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {heading}
      {column.getIsSorted() === "asc" ? (
        <ArrowUpIcon />
      ) : column.getIsSorted() === "desc" ? (
        <ArrowDownIcon />
      ) : (
        <ArrowUpDownIcon />
      )}
    </Button>

    {filters && (
      <ColumnFilter variant={active ? "default" : "ghost"} title="Filter">
        {filters}
      </ColumnFilter>
    )}
  </ButtonGroup>
)

export default ColumnHeader
