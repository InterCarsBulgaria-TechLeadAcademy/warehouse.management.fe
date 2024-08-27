import { useSnackbar } from '@/hooks/useSnackbar'
import { getWarehouseManagementApi } from '@/services/generated-api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

export default function useDeleteRole(roleName: string) {
  const { t: translate } = useTranslation()
  const { showSnackbar } = useSnackbar()
  const queryClient = useQueryClient()

  const mutationDelete = useMutation({
    mutationFn: (id: string) => getWarehouseManagementApi().deleteApiRoleDeleteId(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] })
      showSnackbar({
        message: translate('roles.table.actions.delete.snackBar.success', { name: roleName }),
        type: 'success'
      })
    },
    onError: () => {
      showSnackbar({
        message: translate('roles.table.actions.delete.snackBar.error'),
        type: 'error'
      })
    }
  })

  return mutationDelete
}
