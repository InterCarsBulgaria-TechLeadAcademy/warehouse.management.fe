import { useTranslation } from 'react-i18next'
import { useSnackbar } from '@/hooks/useSnackbar.ts'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { getWarehouseManagementApi } from '@/services/generated-api.ts'

export function useSplitEntry() {
  const { t: translate } = useTranslation()
  const { showSnackbar } = useSnackbar()
  const queryClient = useQueryClient()

  const mutationUpdate = useMutation({
    mutationFn: ({
      count,
      newZoneId,
      entryId
    }: {
      count: number
      newZoneId: number
      entryId: number
    }) => getWarehouseManagementApi().postApiEntrySplitId(entryId, { count, newZoneId }),

    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['entries'] })
      showSnackbar({
        message: translate('zonesContent.table.actions.splitEntry.snackBar.success', {
          goodNumber: id
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
        message: translate('zonesContent.table.actions.splitEntry.snackBar.error'),
        type: 'error'
      })
      // }
    }
  })
  return mutationUpdate
}
