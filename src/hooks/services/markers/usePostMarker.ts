import { useSnackbar } from '@/hooks/useSnackbar'
import { getWarehouseManagementApi } from '@/services/generated-api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

export default function usePostMarker(markerName: string) {
  const { t: translate } = useTranslation()
  const { showSnackbar } = useSnackbar()
  const queryClient = useQueryClient()

  const mutationCreate = useMutation({
    mutationFn: getWarehouseManagementApi().postApiMarkerAdd,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['markers'] })
      showSnackbar({
        message: translate('newMarker.snackBar.messages.createMarker.success', {
          name: markerName
        }),
        type: 'success'
      })
    },
    onError: () => {
      showSnackbar({
        message: translate('newMarker.snackBar.messages.createMarker.error'),
        type: 'error'
      })
    }
  })

  return mutationCreate
}
