import { createCheckPermissionsHook } from '@/hooks/createCheckPermissionsHook.ts'
import useAuth from '@/hooks/services/auth/useAuth.ts'
import { WithPermissions } from '@/wrappers/WithPermissions.tsx'
import { Navigate } from 'react-router-dom'
import React from 'react'

type Props = {
  permissions: string[] | string | null
  children: React.ReactNode
  navigateTo: string
}

export function RouterPagePermissionsWrapper({ permissions, children, navigateTo }: Props) {
  const { user } = useAuth()
  const useCheckRouterPagePermissions = createCheckPermissionsHook(
    () => user?.routePermissionNames || []
  )
  const WithRouterPagePermissions = WithPermissions({
    useCheckPermissions: useCheckRouterPagePermissions
  })

  return WithRouterPagePermissions({ permissions, children }) || <Navigate to={navigateTo} />
}
