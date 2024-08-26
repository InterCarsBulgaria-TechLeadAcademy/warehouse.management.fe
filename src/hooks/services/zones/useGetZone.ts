import { getWarehouseManagementApi } from '@/services/generated-api'
import { useSuspenseQuery } from '@tanstack/react-query'

export default function useGetZone(id?: number) {
  const { data } = useSuspenseQuery({
    queryKey: ['zone', id],
    queryFn: () => {
      if (id == null) return null

      return getWarehouseManagementApi().getApiZoneId(id)
    }
  })

  return data
}
