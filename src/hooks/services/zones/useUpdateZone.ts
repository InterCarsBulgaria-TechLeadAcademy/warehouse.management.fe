import { useSnackbar } from '@/hooks/useSnackbar'
import { BodyType } from '@/services/api'
import { getWarehouseManagementApi } from '@/services/generated-api'
import { ZoneFormDto } from '@/services/model'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

export default function useUpdateZone(zoneName: string) {
  const { t: translate } = useTranslation()
  const { showSnackbar } = useSnackbar()
  const queryClient = useQueryClient()

  const mutationUpdate = useMutation({
    mutationFn: ({ id, data }: { id: number; data: BodyType<ZoneFormDto> }) =>
      getWarehouseManagementApi().putApiZoneEditId(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['zones'] })
      showSnackbar({
        message: translate('zones.table.actions.edit.snackBar.success', { name: zoneName }),
        type: 'success'
      })
    },
    onError: () => {
      showSnackbar({
        message: translate('zones.table.actions.edit.snackBar.error'),
        type: 'error'
      })
    }
  })

  return mutationUpdate
}
