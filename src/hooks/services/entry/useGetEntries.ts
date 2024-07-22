import { getWarehouseManagementApi } from '@/services/generated-api'
import { useSuspenseQuery } from '@tanstack/react-query'

export default function useGetEntries() {
  const { data } = useSuspenseQuery({
    queryKey: ['entries'],
    queryFn: () => {
      return getWarehouseManagementApi().getApiEntryAll()
    }
  })

  return data
}
