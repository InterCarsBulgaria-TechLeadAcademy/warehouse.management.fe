import { getWarehouseManagementApi } from '@/services/generated-api'
import { useSuspenseQuery } from '@tanstack/react-query'

export default function useGetPermissionsAll() {
  const { data } = useSuspenseQuery({
    queryKey: ['permissions'],
    queryFn: () => {
      return getWarehouseManagementApi().getApiRoutePermissionAll()
    }
  })

  return data
}
