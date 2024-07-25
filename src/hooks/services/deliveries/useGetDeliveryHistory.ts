import { useSnackbar } from '@/hooks/useSnackbar'
import { getWarehouseManagementApi } from '@/services/generated-api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

export default function useGetDeliveryHistory() {
  const { t: translate } = useTranslation()
  const { showSnackbar } = useSnackbar()
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: ({ id }: { id: number }) => getWarehouseManagementApi().getApiDeliveryHistoryId(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['deliveries'] })
    },
    onError: () => {
      // TODO: translate da opravq
      showSnackbar({
        message: translate('snackBar.messages.markers.updateMarker.error'),
        type: 'error'
      })
    }
  })

  return mutation
}
