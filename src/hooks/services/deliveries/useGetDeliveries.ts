import { getWarehouseManagementApi } from '@/services/generated-api'
import { useSuspenseQuery } from '@tanstack/react-query'

export default function useGetDeliveries() {
  const { data } = useSuspenseQuery({
    queryKey: ['deliveries'],
    queryFn: () => {
      return getWarehouseManagementApi().getApiDeliveryAll()
    }
  })

  return data
}
