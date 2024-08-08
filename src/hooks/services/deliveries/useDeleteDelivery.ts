import { useSnackbar } from '@/hooks/useSnackbar'
import { getWarehouseManagementApi } from '@/services/generated-api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

export default function useDeleteDelivery() {
  const { t: translate } = useTranslation()
  const { showSnackbar } = useSnackbar()
  const queryClient = useQueryClient()

  const mutationDelete = useMutation({
    mutationFn: (id: number) => getWarehouseManagementApi().deleteApiDeliveryDeleteId(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['deliveries'] })
      showSnackbar({
        message: translate('deliveries.table.actions.delete.snackBar.success'),
        type: 'success'
      })
    },
    onError: () => {
      showSnackbar({
        message: translate('deliveries.table.actions.delete.snackBar.error'),
        type: 'error'
      })
    }
  })

  return mutationDelete
}
