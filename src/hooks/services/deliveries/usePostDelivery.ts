import { useSnackbar } from '@/hooks/useSnackbar'
import { getWarehouseManagementApi } from '@/services/generated-api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

export default function usePostDelivery() {
  const { t: translate } = useTranslation()
  const { showSnackbar } = useSnackbar()
  const queryClient = useQueryClient()

  const mutationPost = useMutation({
    mutationFn: getWarehouseManagementApi().postApiDeliveryAdd,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['deliveries'] })
      showSnackbar({
        message: translate('deliveries.newDelivery.snackBar.success'),
        type: 'success'
      })
    },
    onError: () => {
      showSnackbar({
        message: translate('deliveries.newDelivery.snackBar.error'),
        type: 'error'
      })
    }
  })

  return mutationPost
}
