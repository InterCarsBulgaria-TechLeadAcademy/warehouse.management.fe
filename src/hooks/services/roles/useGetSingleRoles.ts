import { getWarehouseManagementApi } from '@/services/generated-api'
import { useSuspenseQuery } from '@tanstack/react-query'

export default function useGetSingleRole(roleId: string) {
  const { data } = useSuspenseQuery({
    queryKey: ['roles'],
    queryFn: () => {
      return getWarehouseManagementApi().getApiRoleRoleId(roleId)
    }
  })

  return data
}