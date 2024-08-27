import { useSnackbar } from '@/hooks/useSnackbar'
import { BodyType } from '@/services/api'
import { getWarehouseManagementApi } from '@/services/generated-api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { RoleFormDto } from '@/services/model'
import { useTranslation } from 'react-i18next'

export default function useUpdateRole() {
  const { t: translate } = useTranslation()
  const { showSnackbar } = useSnackbar()
  const queryClient = useQueryClient()

  const mutationUpdate = useMutation({
    mutationFn: ({ id, data }: { id: string; data: BodyType<RoleFormDto> }) =>
      getWarehouseManagementApi().putApiRoleEditId(id, data),
    onSuccess: (_, { id, data }) => {
      queryClient.invalidateQueries({ queryKey: ['roles'] })
      queryClient.refetchQueries({ queryKey: ['role', id] })
      showSnackbar({
        message: translate('roles.table.actions.edit.snackBar.success', {
          name: data.name
        }),
        type: 'success'
      })
    },

    onError: () => {
      showSnackbar({
        message: translate('roles.table.actions.edit.snackBar.error'),
        type: 'error'
      })
    }
  })
  return mutationUpdate
}
