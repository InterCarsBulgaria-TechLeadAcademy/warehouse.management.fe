import useAuth from '@/hooks/services/auth/useAuth.ts'
import { createCheckPermissionsHook } from '@/hooks/createCheckPermissionsHook.ts'
import TableActionsMenu from '@/components/features/actionsMenu/TableActionsMenu.tsx'

type Props<T> = {
  options: { title: string; value: T }[]
  onSelectOption: (option: T) => void
}

export function TableActionsMenuPermissionOptionsWrapper<T>({ options, onSelectOption }: Props<T>) {
  const { user } = useAuth()
  const { checkPermissions } = createCheckPermissionsHook(() => user?.routePermissionNames || [])()

  const optionsWithPermissions = options.filter((option) => {
    return checkPermissions(option.value as string)
  })

  return (
    <TableActionsMenu specificOptionHandler={onSelectOption} options={optionsWithPermissions} />
  )
}
