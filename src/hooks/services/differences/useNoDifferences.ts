import { useTranslation } from 'react-i18next'
import { useSnackbar } from '@/hooks/useSnackbar.ts'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { getWarehouseManagementApi } from '@/services/generated-api.ts'

export function useNoDifferences() {
  const { t: translate } = useTranslation()
  const { showSnackbar } = useSnackbar()
  const queryClient = useQueryClient()

  const mutationPost = useMutation({
    mutationFn: ({ id, adminComment }: { id: number; adminComment: string | null }) =>
      getWarehouseManagementApi().postApiDifferenceNoDifferencesId(id, { adminComment }),
    onSuccess: (_, data) => {
      queryClient.invalidateQueries({ queryKey: ['differences'] })
      showSnackbar({
        message: translate('differences.table.actions.noDifferences.snackBar.success', {
          differenceNumber: data.id
        }),
        type: 'success'
      })
    },
    onError: (error: unknown) => {
      // TODO: Handle errors better
      // if (axios.isAxiosError(error)) {
      //   if (error.response && error.response.status === 400) {
      //     showSnackbar({
      //       message: translate('vendors.table.actions.edit.errors.existVendor', {
      //         vendorNumber: vendorNumber
      //       }),
      //       type: 'error'
      //     })
      //   } else {
      //     showSnackbar({
      //       message: translate('vendors.table.actions.edit.snackBar.error'),
      //       type: 'error'
      //     })
      //   }
      // } else {
      showSnackbar({
        message: translate('differences.table.actions.noDifferences.snackBar.error'),
        type: 'error'
      })
      // }
    }
  })
  return mutationPost
}
