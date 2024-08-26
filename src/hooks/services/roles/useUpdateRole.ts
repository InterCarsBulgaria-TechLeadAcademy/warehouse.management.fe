import { useSnackbar } from '@/hooks/useSnackbar'
import { BodyType } from '@/services/api'
import { getWarehouseManagementApi } from '@/services/generated-api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { RoleFormDto } from '@/services/model'
import { useTranslation } from 'react-i18next'
import axios from 'axios'

export default function useUpdateRole() {
  const { t: translate } = useTranslation()
  const { showSnackbar } = useSnackbar()
  const queryClient = useQueryClient()

  const mutationUpdate = useMutation({
    mutationFn: ({ id, data }: { id: string; data: BodyType<RoleFormDto> }) =>
      getWarehouseManagementApi().putApiRoleEditId(id, data),
    onSuccess: (_, {data}) => {
      queryClient.invalidateQueries({ queryKey: ['roles'] })
      showSnackbar({
        message: translate(`Ролята ${data.name} беше успешно променена`, {
          name: data.name
        }),
        type: 'success'
      })
    },

    onError: (error: unknown, {data}) => {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 400) {
          showSnackbar({
            message: translate('vendors.table.actions.edit.errors.existVendor', {
              roleName: data.name
            }),
            type: 'error'
          })
        } else {
          showSnackbar({
            message: translate('vendors.table.actions.edit.snackBar.error'),
            type: 'error'
          })
        }
      } else {
        showSnackbar({
          message: translate('vendors.table.actions.edit.snackBar.error'),
          type: 'error'
        })
      }
    }
  })
  return mutationUpdate
}
