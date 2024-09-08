import useAuth from '@/hooks/services/auth/useAuth.ts'
import { createCheckPermissionsHook } from '@/hooks/createCheckPermissionsHook.ts'
import TableActionsMenu from '@/components/features/actionsMenu/TableActionsMenu.tsx'

type Props<T> = {
  options: { title: string; value: T }[]
  onSelectOption: (option: T) => void
}

export function TableActionsMenuWithPermissions<T>({ options, onSelectOption }: Props<T>) {
  const { user } = useAuth()
  const { checkPermissions } = createCheckPermissionsHook(() => user?.routePermissionNames || [])()

  const optionsWithPermissions = options.filter((option) => {
    return checkPermissions(option.value as string)
  })

  const finalOptions =
    optionsWithPermissions.length > 0
      ? optionsWithPermissions
      : [{ title: 'zonesContent.table.actionsMenu.NoActions', value: '' }]

  return <TableActionsMenu specificOptionHandler={onSelectOption} options={finalOptions} />
}
