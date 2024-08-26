import { getWarehouseManagementApi } from '@/services/generated-api'
import { useSuspenseQuery } from '@tanstack/react-query'

export default function useGetDelivery(id: number) {
  const { data } = useSuspenseQuery({
    queryKey: ['delivery', id],
    queryFn: () => {
      return getWarehouseManagementApi().getApiDeliveryId(id)
    }
  })

  return data
}
