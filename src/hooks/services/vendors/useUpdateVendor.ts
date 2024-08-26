import { useSnackbar } from '@/hooks/useSnackbar'
import { BodyType } from '@/services/api'
import { getWarehouseManagementApi } from '@/services/generated-api'
import { VendorFormDto } from '@/services/model'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import axios from 'axios'

export default function useUpdateVendor(vendorName: string, vendorNumber: string) {
  const { t: translate } = useTranslation()
  const { showSnackbar } = useSnackbar()
  const queryClient = useQueryClient()

  const mutationUpdate = useMutation({
    mutationFn: ({ id, data }: { id: number; data: BodyType<VendorFormDto> }) =>
      getWarehouseManagementApi().putApiVendorEditId(id, data),
    onSuccess: (_, { id }) => {
      queryClient.refetchQueries({ queryKey: ['vendor', id] })
      queryClient.invalidateQueries({ queryKey: ['vendors'] })
      showSnackbar({
        message: translate('vendors.table.actions.edit.snackBar.success', {
          name: vendorName
        }),
        type: 'success'
      })
    },

    onError: (error: unknown) => {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 400) {
          showSnackbar({
            message: translate('vendors.table.actions.edit.errors.existVendor', {
              vendorNumber: vendorNumber
            }),
            type: 'error'
          })
        } else {
          showSnackbar({
            message: translate('vendors.table.actions.edit.snackBar.error'),
            type: 'error'
          })
        }
      } else {
        showSnackbar({
          message: translate('vendors.table.actions.edit.snackBar.error'),
          type: 'error'
        })
      }
    }
  })
  return mutationUpdate
}
