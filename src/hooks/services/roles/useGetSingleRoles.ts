import { getWarehouseManagementApi } from '@/services/generated-api'
import { useSuspenseQuery } from '@tanstack/react-query'

export default function useGetSingleRole(roleId?: string | null) {
  const { data } = useSuspenseQuery({
    queryKey: ['role', roleId],
    queryFn: () => {
      if (roleId == null) return null

      return getWarehouseManagementApi().getApiRoleId(roleId)
    }
  })

  return data
}
