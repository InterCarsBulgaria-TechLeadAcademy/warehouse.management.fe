import { useSnackbar } from '@/hooks/useSnackbar'
import { getWarehouseManagementApi } from '@/services/generated-api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

export default function useGetDelivery() {
  const { t: translate } = useTranslation()
  const { showSnackbar } = useSnackbar()
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: ({ id }: { id: number }) => getWarehouseManagementApi().getApiDeliveryId(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['deliveries'] })
    },
    onError: () => {
      showSnackbar({
        message: translate('snackBar.messages.markers.updateMarker.error'),
        type: 'error'
      })
    }
  })

  return mutation
}
