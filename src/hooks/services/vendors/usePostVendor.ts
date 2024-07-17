import { useSnackbar } from "@/hooks/useSnackbar"
import { getWarehouseManagementApi } from "@/services/generated-api"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useTranslation } from "react-i18next"


export default function usePostVendor(vendorName: string) {
  const { t: translate } = useTranslation()
  const { showSnackbar } = useSnackbar()
  const queryClient = useQueryClient()

  const mutationPost = useMutation({
    mutationFn: getWarehouseManagementApi().postApiVendorAdd,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vendors'] })
      showSnackbar({
        message: translate('newVendor.snackBar.messages.createVendor.success', { name: vendorName }),
        type: 'success'
      })
    },
    onError: () => {
      showSnackbar({
        message: translate('newVendor.snackBar.messages.createVendor.error'),
        type: 'error'
      })
    }
  })

  return mutationPost
}