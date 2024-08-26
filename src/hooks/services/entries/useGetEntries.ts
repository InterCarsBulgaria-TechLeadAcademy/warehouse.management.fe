import { getWarehouseManagementApi } from '@/services/generated-api'
import { useSuspenseQuery } from '@tanstack/react-query'

export default function useGetEntries(pageNumber: number, pageSize: number, searchQuery: string) {
  const { data } = useSuspenseQuery({
    queryKey: ['entries', pageNumber, pageSize, searchQuery],
    queryFn: () => {
      return getWarehouseManagementApi().getApiEntryAll({
        PageNumber: pageNumber + 1,
        PageSize: pageSize,
        SearchQuery: searchQuery
      })
    }
  })

  return data
}
