import { useTranslation } from 'react-i18next'
import { useSnackbar } from '@/hooks/useSnackbar.ts'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { getWarehouseManagementApi } from '@/services/generated-api.ts'

export function useMoveEntry() {
  const { t: translate } = useTranslation()
  const { showSnackbar } = useSnackbar()
  const queryClient = useQueryClient()

  const mutationUpdate = useMutation({
    mutationFn: ({ id, newZoneId }: { id: number; newZoneId: number }) =>
      getWarehouseManagementApi().postApiEntryMoveId(id, newZoneId),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['entries'] })
      showSnackbar({
        message: translate('zonesContent.table.actions.moveEntryForm.snackBar.success', {
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
        message: translate('zonesContent.table.actions.moveEntryForm.snackBar.error'),
        type: 'error'
      })
      // }
    }
  })
  return mutationUpdate
}
