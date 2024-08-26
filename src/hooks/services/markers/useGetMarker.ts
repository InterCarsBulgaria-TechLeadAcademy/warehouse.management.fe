import { getWarehouseManagementApi } from '@/services/generated-api'
import { useSuspenseQuery } from '@tanstack/react-query'

export default function useGetMarker(id?: number) {
  const { data } = useSuspenseQuery({
    queryKey: ['marker', id],
    queryFn: () => {
      if (id == null) return null

      return getWarehouseManagementApi().getApiMarkerId(id)
    }
  })

  return data
}
