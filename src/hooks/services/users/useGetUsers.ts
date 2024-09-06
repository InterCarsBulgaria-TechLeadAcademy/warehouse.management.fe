import { getWarehouseManagementApi } from '@/services/generated-api'
import { useSuspenseQuery } from '@tanstack/react-query'

export default function useGetUsers() {
  const { data } = useSuspenseQuery({
    queryKey: ['users'],
    queryFn: () => {
      return getWarehouseManagementApi().getApiUserAll()
    }
  })

  return data
}
