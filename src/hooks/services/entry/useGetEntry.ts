import { getWarehouseManagementApi } from '@/services/generated-api'
import { useSuspenseQuery } from '@tanstack/react-query'

export default function useGetEntry() {
  const { data } = useSuspenseQuery({
    queryKey: ['entries'],
    queryFn: () => {
      return getWarehouseManagementApi().getApiEntry()
    }
  })

  return data
}
