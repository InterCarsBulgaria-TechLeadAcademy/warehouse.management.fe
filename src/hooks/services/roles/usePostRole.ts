import { useSnackbar } from '@/hooks/useSnackbar'
import { getWarehouseManagementApi } from '@/services/generated-api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

export default function usePostRole() {
  const { t: translate } = useTranslation()
  const { showSnackbar } = useSnackbar()
  const queryClient = useQueryClient()

  const mutationCreate = useMutation({
    mutationFn: getWarehouseManagementApi().postApiRoleCreate,
    onSuccess: (_, { name }) => {
      queryClient.invalidateQueries({ queryKey: ['roles'] })
      showSnackbar({
        // TODO: Add correct translate..
        message: translate(`Ролята ${name} е успешно добавена`, {
          name: name
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
