import { useSnackbar } from '@/hooks/useSnackbar'
import { getWarehouseManagementApi } from '@/services/generated-api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

export default function usePostRole(roleName: string) {
  const { t: translate } = useTranslation()
  const { showSnackbar } = useSnackbar()
  const queryClient = useQueryClient()

  const mutationCreate = useMutation({
    mutationFn: getWarehouseManagementApi().postApiRoleCreate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] })
      showSnackbar({
        // TODO: Add correct translate..
        message: translate(`Ролята ${roleName} е успешно добавена`, {
          name: roleName
        }),
        type: 'success'
      })
    },
    onError: () => {
      showSnackbar({
        message: translate('markers.newMarker.snackBar.error'),
        type: 'error'
      })
    }
  })

  return mutationCreate
}
