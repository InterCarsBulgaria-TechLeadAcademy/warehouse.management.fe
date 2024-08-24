import { getWarehouseManagementApi } from '@/services/generated-api'
import { useSuspenseQuery } from '@tanstack/react-query'

export default function useGetVendor(id: number) {
  const { data } = useSuspenseQuery({
    queryKey: ['vendors', id], //add dependencies on deliveries
    queryFn: () => {
      return getWarehouseManagementApi().getApiZoneId(id)
    }
  })

  return data
}
