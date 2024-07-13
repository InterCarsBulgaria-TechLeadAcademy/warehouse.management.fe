import { useSnackbar } from '@/hooks/useSnackbar'
import { getWarehouseManagementApi } from '@/services/generated-api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

export default function usePostZone(zoneName: string) {
  const { t: translate } = useTranslation()
  const { showSnackbar } = useSnackbar()
  const queryClient = useQueryClient()

  const mutationPost = useMutation({
    mutationFn: getWarehouseManagementApi().postApiZoneAdd,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['zones'] })
      showSnackbar({
        message: translate('snackBar.messages.zones.createZone.success', { name: zoneName }),
        type: 'success'
      })
    },
    onError: () => {
      showSnackbar({
        message: translate('snackBar.messages.zones.createZone.error'),
        type: 'error'
      })
    }
  })

  return mutationPost
}