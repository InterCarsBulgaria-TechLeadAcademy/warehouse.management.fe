import { createCheckPermissionsHook } from '@/hooks/createCheckPermissionsHook.ts'

type Props = {
  permissions: string[];
  required: string[];
  children: React.ReactNode;
}

export function WithPermissions(checkPermissions: typeof createCheckPermissionsHook) {
  return function WithPermissionsComponent({ permissions, required, children }: Props) {
    const { checkPermissions } = checkPermissions(() => permissions)
    const hasPermission = checkPermissions(required)

    return hasPermission ? <>{children}</> : null
  }
}
