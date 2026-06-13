import { useQuery } from "@tanstack/react-query"

import { makeRequest } from "@/api"
import type { EntityList, Property } from "@/types"

export const useProperties = () => {
  const listPropertiesHook = useQuery({
    queryKey: ["properties"],
    queryFn: () => makeRequest<EntityList<Property>>({ url: "/properties" }),
    initialData: { total: 0, items: [] } as EntityList<Property>,
    refetchOnWindowFocus: false,
  })

  return listPropertiesHook
}
