import { getWarehouseManagementApi } from '@/services/generated-api'
import { useSuspenseQuery } from '@tanstack/react-query'

export default function useGetSingleRole(roleId: number) {
  const { data } = useSuspenseQuery({
    queryKey: ['role', roleId],
    queryFn: () => {
      return getWarehouseManagementApi().getApiRoleRoleId(roleId)
    }
  })

  return data
}