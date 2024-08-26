import { getWarehouseManagementApi } from '@/services/generated-api'
import { useSuspenseQuery } from '@tanstack/react-query'

export default function useGetDeliveries(
  pageNumber: number,
  pageSize: number,
  searchQuery: string
) {
  const { data } = useSuspenseQuery({
    queryKey: ['deliveries', pageNumber, pageSize, searchQuery],
    queryFn: () => {
      return getWarehouseManagementApi().getApiDeliveryAll({
        PageNumber: pageNumber + 1,
        PageSize: pageSize,
        SearchQuery: searchQuery
      })
    }
  })

  return data
}
