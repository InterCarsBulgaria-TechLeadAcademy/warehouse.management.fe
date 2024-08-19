import { getWarehouseManagementApi } from '@/services/generated-api'
import { useSuspenseQuery } from '@tanstack/react-query'

export default function useGetRoles() {
  const { data } = useSuspenseQuery({
    queryKey: ['roles'],
    queryFn: () => {
      return getWarehouseManagementApi().getApiRoleAll()
    }
  })

  return data
}
