import { getWarehouseManagementApi } from '@/services/generated-api'
import { useSuspenseQuery } from '@tanstack/react-query'

export default function useGetMarkers() {
  const { data } = useSuspenseQuery({
    queryKey: ['markers'],
    queryFn: () => {
      return getWarehouseManagementApi().getApiMarkerAll()
    }
  })

  return data
}
