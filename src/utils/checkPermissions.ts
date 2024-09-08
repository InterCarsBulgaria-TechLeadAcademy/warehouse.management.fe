export function checkPermissions({
  requiredPermissions,
  currentPermissions
}: {
  requiredPermissions?: string[] | string | null
  currentPermissions: string[]
}) {
  if (!requiredPermissions) return true

  if (typeof requiredPermissions === 'string') {
    return currentPermissions.includes(requiredPermissions)
  }

  return requiredPermissions.every((permission) => currentPermissions.includes(permission))
}
