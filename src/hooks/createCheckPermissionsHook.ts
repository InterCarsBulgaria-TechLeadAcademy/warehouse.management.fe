import { checkPermissions } from '@/utils/checkPermissions.ts'

export function createCheckPermissionsHook(getCurrentPermissions: () => string[]) {
  return () => ({
    checkPermissions: (permissions: string[] | string | null) =>
      checkPermissions({
        requiredPermissions: permissions,
        currentPermissions: getCurrentPermissions()
      })
  })
}
