import { useSnackbar } from '@/hooks/useSnackbar'
import { getWarehouseManagementApi } from '@/services/generated-api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

export default function useDeleteDifferenceType(differenceTypeName: string) {
  const { t: translate } = useTranslation()
  const { showSnackbar } = useSnackbar()
  const queryClient = useQueryClient()

  const mutationDelete = useMutation({
    mutationFn: (id: number) => getWarehouseManagementApi().deleteApiDifferenceTypeDeleteId(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['differenceTypes'] })
      showSnackbar({
        message: translate('differenceType.table.actions.delete.snackBar.success', {
          name: differenceTypeName
        }),
        type: 'success'
      })
    },
    onError: () => {
      showSnackbar({
        message: translate('differenceType.table.actions.delete.snackBar.error'),
        type: 'error'
      })
    }
  })

  return mutationDelete
}
