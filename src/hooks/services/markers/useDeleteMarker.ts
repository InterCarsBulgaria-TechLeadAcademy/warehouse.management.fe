import { useSnackbar } from '@/hooks/useSnackbar'
import { getWarehouseManagementApi } from '@/services/generated-api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import axios from 'axios'

export default function useDeleteMarker(markerName: string) {
  const { t: translate } = useTranslation()
  const { showSnackbar } = useSnackbar()
  const queryClient = useQueryClient()

  const mutationDelete = useMutation({
    mutationFn: (id: number) => getWarehouseManagementApi().deleteApiMarkerDeleteId(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['markers'] })
      showSnackbar({
        message: translate('markers.table.actions.delete.snackBar.success', {
          name: markerName
        }),
        type: 'success'
      })
    },
    onError: (error: unknown) => {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 400) {
          let location = error.response.data.Message.split(':').shift().split(' ').pop() //example: zones
          let specificLocation = error.response.data.Message.split(':').pop() // example: zone 1
          switch (location) {
            case 'Zones':
              location = translate('markers.table.actions.delete.errors.zones')
              break
            case 'Vendors':
            // location = translate('markers.table.actions.delete.errors.zones')
            //TODO: ако има други места, където се използва Markers
          }
          showSnackbar({
            message: `${translate('markers.table.actions.delete.errors.errorMessage', { location: location })}: ${specificLocation}`,
            type: 'error'
          })
        } else {
          showSnackbar({
            message: translate('markers.table.actions.delete.snackBar.error'),
            type: 'error'
          })
        }
      } else {
        showSnackbar({
          message: translate('markers.table.actions.delete.snackBar.error'),
          type: 'error'
        })
      }
    }
  })

  return mutationDelete
}
