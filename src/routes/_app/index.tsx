import { createFileRoute } from "@tanstack/react-router"

import CatalogFilters from "@/components/catalog/CatalogFilters"
import CatalogList from "@/components/catalog/CatalogList"
import { useProperties } from "@/hooks"
import { useEffect } from "react"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "#/components/ui/empty"
import { FunnelXIcon } from "lucide-react"
import { Skeleton } from "#/components/ui/skeleton"

export const Route = createFileRoute("/_app/")({
  component: CatalogComponent,
})

function CatalogComponent() {
  const { data: properties, isFetching } = useProperties()

  return (
    <div className="flex gap-8">
      {isFetching ? (
        <Skeleton></Skeleton>
      ) : (
        <>
          {properties.total ? (
            <>
              <h2>Showing {properties.total} properties</h2>
              <CatalogList items={properties.items} className="flex-1" />
            </>
          ) : (
            <Empty>
              <EmptyMedia>
                <FunnelXIcon />
              </EmptyMedia>
              <EmptyHeader>
                <EmptyTitle>No properties</EmptyTitle>
                <EmptyDescription>
                  No properties found by provided search filters
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          )}
          <CatalogFilters className="flex-0" />
        </>
      )}
    </div>
  )
}
