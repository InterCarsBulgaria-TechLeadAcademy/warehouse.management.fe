import { getWarehouseManagementApi } from '@/services/generated-api'
import { useSuspenseQuery } from '@tanstack/react-query'

export default function useGetVendor(id?: number) {
  const { data } = useSuspenseQuery({
    queryKey: ['vendor', id],
    queryFn: () => {
      if (id == null) return null

      return getWarehouseManagementApi().getApiVendorId(id)
    }
  })

  return data
}
