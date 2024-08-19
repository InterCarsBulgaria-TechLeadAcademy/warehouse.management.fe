import { getWarehouseManagementApi } from '@/services/generated-api'
import { EntryStatuses } from '@/services/model'
import { useSuspenseQuery } from '@tanstack/react-query'

export default function useGetEntries(
  pageNumber: number,
  pageSize: number,
  searchQuery: string,
  selectedZoneId?: number,
  selectedStatuses?: EntryStatuses[]
) {
  const { data } = useSuspenseQuery({
    queryKey: ['entries', pageNumber, pageSize, searchQuery, selectedZoneId, selectedStatuses], //add dependencies on deliveries
    queryFn: () => {
      return getWarehouseManagementApi().getApiEntryAll({
        PageNumber: pageNumber + 1,
        PageSize: pageSize,
        SearchQuery: searchQuery,
        ZoneId: selectedZoneId,
        Statuses: selectedStatuses
      })
    }
  })

  return data
}
