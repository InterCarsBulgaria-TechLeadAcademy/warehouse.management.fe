import { getWarehouseManagementApi } from '@/services/generated-api'
import { useSuspenseQuery } from '@tanstack/react-query'

export default function useGetZones() {
  const { data } = useSuspenseQuery({
    queryKey: ['zones'],
    queryFn: () => {
      return getWarehouseManagementApi().getApiZoneAll()
    }
  })

  return data
}
