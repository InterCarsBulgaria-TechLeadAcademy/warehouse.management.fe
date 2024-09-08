import useAuth from '@/hooks/services/auth/useAuth.ts'
import { createCheckPermissionsHook } from '@/hooks/createCheckPermissionsHook.ts'
import { WithPermissions } from '@/wrappers/WithPermissions.tsx'
import React from 'react'

type Props = {
  permissions: string[] | string | null
  children: React.ReactNode
}

export function UserPermissionsWrapper({ permissions, children }: Props) {
  const { user } = useAuth()
  const useCheckUserPermissions = createCheckPermissionsHook(() => user?.routePermissionNames || [])
  const WithUserPermissions = WithPermissions({ useCheckPermissions: useCheckUserPermissions })

  return WithUserPermissions({ permissions, children })
}
