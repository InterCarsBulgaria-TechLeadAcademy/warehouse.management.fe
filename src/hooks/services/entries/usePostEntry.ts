import { useSnackbar } from '@/hooks/useSnackbar'
import { getWarehouseManagementApi } from '@/services/generated-api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

// export default function usePostEntry(differenceTypeName: string) {
export default function usePostEntry() {
  const { t: translate } = useTranslation()
  const { showSnackbar } = useSnackbar()
  const queryClient = useQueryClient()

  const mutationCreate = useMutation({
    mutationFn: getWarehouseManagementApi().postApiEntryAdd,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['entries'] })
      //TODO: според мен не трябва да има snackBar
      // showSnackbar({
      //   message: translate('proba', {
      //     //   name: differenceTypeName
      //   }),
      //   type: 'success'
      // })
    },
    onError: () => {
      // showSnackbar({
      //   message: translate('proba'),
      //   type: 'error'
      // })
    }
  })

  return mutationCreate
}
