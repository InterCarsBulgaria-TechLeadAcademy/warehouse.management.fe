import { getWarehouseManagementApi } from '@/services/generated-api'
import { useSuspenseQuery } from '@tanstack/react-query'

export default function useGetZones() {
  //TODO: use pagination, when back-end team done
  const { data } = useSuspenseQuery({
    queryKey: ['zones'],
    queryFn: () => {
      // return getWarehouseManagementApi().getApiZoneAll({
      //   PageNumber: page + 1,
      //   PageSize: rowsPerPage,
      //   SearchQuery: searchTerm
      // })
      return getWarehouseManagementApi().getApiZoneAll()
    }
  })

  return data
}
