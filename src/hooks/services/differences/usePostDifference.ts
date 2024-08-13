import { useSnackbar } from '@/hooks/useSnackbar'
import { getWarehouseManagementApi } from '@/services/generated-api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

export default function usePostDifference() {
  const { t: translate } = useTranslation()
  const { showSnackbar } = useSnackbar()
  const queryClient = useQueryClient()

  const mutationPost = useMutation({
    mutationFn: getWarehouseManagementApi().postApiDifferenceAdd,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['differences'] })
      showSnackbar({
        message: translate('zonesContent.table.actions.createDifference.snackBar.success'),
        type: 'success'
      })
    },
    onError: () => {
      showSnackbar({
        message: translate('zonesContent.table.actions.createDifference.snackBar.error'),
        type: 'error'
      })
    }
  })

  return mutationPost
}
