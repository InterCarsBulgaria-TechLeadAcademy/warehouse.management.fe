import { getWarehouseManagementApi } from '@/services/generated-api'
import { useSuspenseQuery } from '@tanstack/react-query'

export default function useGetZone(id: number) {
  const { data } = useSuspenseQuery({
    queryKey: ['zones', id], //add dependencies on deliveries
    queryFn: () => {
      return getWarehouseManagementApi().getApiZoneId(id)
    }
  })

  return data
}
