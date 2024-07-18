import { useSnackbar } from '@/hooks/useSnackbar'
import { getWarehouseManagementApi } from '@/services/generated-api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

export default function useDeleteVendor(vendorName: string) {
  const { t: translate } = useTranslation()
  const { showSnackbar } = useSnackbar()
  const queryClient = useQueryClient()

  const mutationDelete = useMutation({
    mutationFn: (id: number) => getWarehouseManagementApi().deleteApiVendorDeleteId(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vendors'] })
      showSnackbar({
        message: translate('snackBar.messages.vendors.deleteVendor.success', {
          name: vendorName
        }),
        type: 'success'
      })
    },
    onError: () => {
      showSnackbar({
        message: translate('snackBar.messages.vendors.deleteVendor.error'),
        type: 'error'
      })
    }
  })

  return mutationDelete
}
