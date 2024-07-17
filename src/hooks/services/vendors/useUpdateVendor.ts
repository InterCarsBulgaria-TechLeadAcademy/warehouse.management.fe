import { useSnackbar } from '@/hooks/useSnackbar'
import { BodyType } from '@/services/api'
import { getWarehouseManagementApi } from '@/services/generated-api'
import { VendorFormDto } from '@/services/model'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

export default function useUpdateVendor(vendorName: string) {
  const { t: translate } = useTranslation()
  const { showSnackbar } = useSnackbar()
  const queryClient = useQueryClient()

  const mutationUpdate = useMutation({
    mutationFn: ({ id, data }: { id: number; data: BodyType<VendorFormDto> }) =>
      getWarehouseManagementApi().putApiVendorEditId(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vendors'] })
      showSnackbar({
        message: translate('newVendor.snackBar.messages.updateVendor.success', { name: vendorName }),
        type: 'success'
      })
    },
    onError: () => {
      showSnackbar({
        message: translate('newVendor.snackBar.messages.updateVendor.error'),
        type: 'error'
      })
    }
  })

  return mutationUpdate
}