import { createCheckPermissionsHook } from '@/hooks/createCheckPermissionsHook.ts'
import React from 'react'

type Props = {
  permissions: string[] | string | null
  children: React.ReactNode
}

export function WithPermissions({
  useCheckPermissions
}: {
  useCheckPermissions: ReturnType<typeof createCheckPermissionsHook>
}) {
  return function WithPermissionsComponent({ permissions, children }: Props) {
    const { checkPermissions } = useCheckPermissions()
    const hasPermission = checkPermissions(permissions)

    return hasPermission ? children : null
  }
}
