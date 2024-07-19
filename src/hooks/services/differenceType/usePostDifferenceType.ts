import { useSnackbar } from '@/hooks/useSnackbar'
import { getWarehouseManagementApi } from '@/services/generated-api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

export default function usePostDifferenceType(differenceTypeName: string) {
  const { t: translate } = useTranslation()
  const { showSnackbar } = useSnackbar()
  const queryClient = useQueryClient()

  const mutationCreate = useMutation({
    mutationFn: getWarehouseManagementApi().postApiDifferenceTypeAdd,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['differenceType'] })
      showSnackbar({
        message: translate('differenceType.newDifferenceType.snackBar.success', {
          name: differenceTypeName
        }),
        type: 'success'
      })
    },
    onError: () => {
      showSnackbar({
        message: translate('differenceType.newDifferenceType.snackBar.error'),
        type: 'error'
      })
    }
  })

  return mutationCreate
}
