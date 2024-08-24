import { getWarehouseManagementApi } from '@/services/generated-api'
import { useSuspenseQuery } from '@tanstack/react-query'

export default function useGetMarker(id: number) {
  const { data } = useSuspenseQuery({
    queryKey: ['markers', id], //add dependencies on deliveries
    queryFn: () => {
      return getWarehouseManagementApi().getApiMarkerId(id)
    }
  })

  return data
}
