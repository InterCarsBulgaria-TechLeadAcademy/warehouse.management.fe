import { useSnackbar } from '@/hooks/useSnackbar'
import { BodyType } from '@/services/api'
import { getWarehouseManagementApi } from '@/services/generated-api'
import { DifferenceTypeFormDto } from '@/services/model'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

export default function useUpdateDifferenceType(differenceTypeName: string) {
  const { t: translate } = useTranslation()
  const { showSnackbar } = useSnackbar()
  const queryClient = useQueryClient()

  const mutationUpdate = useMutation({
    mutationFn: ({ id, data }: { id: number; data: BodyType<DifferenceTypeFormDto> }) =>
      getWarehouseManagementApi().putApiDifferenceTypeEditId(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['differenceType'] })
      showSnackbar({
        message: translate('differenceType.table.actions.edit.snackBar.success', {
          name: differenceTypeName
        }),
        type: 'success'
      })
    },
    onError: () => {
      showSnackbar({
        message: translate('differenceType.table.actions.edit.snackBar.error'),
        type: 'error'
      })
    }
  })

  return mutationUpdate
}
