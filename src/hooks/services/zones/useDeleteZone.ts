import { useSnackbar } from '@/hooks/useSnackbar'
import { getWarehouseManagementApi } from '@/services/generated-api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

export default function useDeleteZone(zoneName: string) {
  const { t: translate } = useTranslation()
  const { showSnackbar } = useSnackbar()
  const queryClient = useQueryClient()

  const mutationDelete = useMutation({
    mutationFn: (id: number) => getWarehouseManagementApi().deleteApiZoneDeleteId(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['zones'] })
      showSnackbar({
        message: translate('snackBar.messages.zones.deleteZone.success', { name: zoneName }),
        type: 'success'
      })
    },
    onError: () => {
      showSnackbar({
        message: translate('snackBar.messages.zones.deleteZone.error'),
        type: 'error'
      })
    }
  })

  return mutationDelete
}