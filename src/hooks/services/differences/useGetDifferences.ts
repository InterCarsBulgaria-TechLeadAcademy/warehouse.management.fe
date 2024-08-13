import { getWarehouseManagementApi } from '@/services/generated-api'
import { useSuspenseQuery } from '@tanstack/react-query'

export default function useGetDifferences() {
  const { data } = useSuspenseQuery({
    queryKey: ['differences'],
    queryFn: () => {
      return getWarehouseManagementApi().getApiDifferenceAll()
    }
  })

  return data
}
