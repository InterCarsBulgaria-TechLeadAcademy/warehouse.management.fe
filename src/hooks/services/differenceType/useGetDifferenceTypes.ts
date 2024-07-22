import { getWarehouseManagementApi } from '@/services/generated-api'
import { useSuspenseQuery } from '@tanstack/react-query'

export default function useGetDifferenceTypes() {
  const { data } = useSuspenseQuery({
    queryKey: ['differenceType'],
    queryFn: () => {
      return getWarehouseManagementApi().getApiDifferenceTypeAll()
    }
  })

  return data
}
