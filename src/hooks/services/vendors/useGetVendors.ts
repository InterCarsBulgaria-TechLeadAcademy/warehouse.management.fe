import { getWarehouseManagementApi } from '@/services/generated-api'
import { useSuspenseQuery } from '@tanstack/react-query'

export default function useGetVendors() {
  const { data } = useSuspenseQuery({
    queryKey: ['vendors'],
    queryFn: () => {
      return getWarehouseManagementApi().getApiVendorAll()
    }
  })

  return data
}
