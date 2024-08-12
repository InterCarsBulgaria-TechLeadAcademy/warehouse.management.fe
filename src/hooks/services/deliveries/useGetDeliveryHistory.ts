import { getWarehouseManagementApi } from '@/services/generated-api'
import { useSuspenseQuery } from '@tanstack/react-query'

export default function useGetDeliveryHistory(id: number) {
  const { data } = useSuspenseQuery({
    queryKey: ['deliveries', id], //add dependencies on deliveries
    queryFn: () => {
      return getWarehouseManagementApi().getApiDeliveryHistoryId(id)
    }
  })

  return data
}
