import { getWarehouseManagementApi } from '@/services/generated-api'
import { useSuspenseQuery } from '@tanstack/react-query'

export default function useGetDifferences(
  pageNumber: number,
  pageSize: number,
  searchQuery: string
) {
  const { data } = useSuspenseQuery({
    queryKey: ['differences', pageNumber, pageSize, searchQuery],
    queryFn: () => {
      return getWarehouseManagementApi().getApiDifferenceAll({
        PageNumber: pageNumber + 1,
        PageSize: pageSize,
        SearchQuery: searchQuery
      })
    }
  })

  return data
}
