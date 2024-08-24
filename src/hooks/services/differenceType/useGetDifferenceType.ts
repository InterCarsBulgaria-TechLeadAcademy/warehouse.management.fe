import { getWarehouseManagementApi } from '@/services/generated-api'
import { useSuspenseQuery } from '@tanstack/react-query'

export default function useGetDifferenceType(id: number) {
  const { data } = useSuspenseQuery({
    queryKey: ['differenceType', id], //add dependencies on deliveries
    queryFn: () => {
      return getWarehouseManagementApi().getApiDifferenceTypeId(id)
    }
  })

  return data
}
