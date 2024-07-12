import { useSnackbar } from '@/hooks/useSnackbar'
import { BodyType } from '@/services/api'
import { getWarehouseManagementApi } from '@/services/generated-api'
import { MarkerFormDto } from '@/services/model'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

export default function useUpdateMarker(markerName: string) {
  const { t: translate } = useTranslation()
  const { showSnackbar } = useSnackbar()
  const queryClient = useQueryClient()

  const mutationUpdate = useMutation({
    mutationFn: ({ id, data }: { id: number; data: BodyType<MarkerFormDto> }) =>
      getWarehouseManagementApi().putApiMarkerEditId(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['markers'] })
      showSnackbar({
        message: translate('snackBar.messages.markers.updateMarker.success', {
          name: markerName
        }),
        type: 'success'
      })
    },
    onError: () => {
      showSnackbar({
        message: translate('snackBar.messages.markers.updateMarker.error'),
        type: 'error'
      })
    }
  })

  return mutationUpdate
}
