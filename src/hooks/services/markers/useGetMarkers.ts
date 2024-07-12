import { getWarehouseManagementApi } from '@/services/generated-api'
import { useSuspenseQuery } from '@tanstack/react-query'

//TODO: Когато БЕ оправи pagination да го оправя.
//Според мен не ни е необходим, защото така си работи перфектно. Да обсъдя с Крис.
export default function useGetMarkers() {
  const { data } = useSuspenseQuery({
    queryKey: ['markers'],
    queryFn: () => {
      // return getWarehouseManagementApi().getApiMarkerAll({
      //   PageNumber: page + 1,
      //   PageSize: rowsPerPage,
      //   SearchQuery: searchTerm
      // })
      return getWarehouseManagementApi().getApiMarkerAll()
    }
  })

  return data
}
