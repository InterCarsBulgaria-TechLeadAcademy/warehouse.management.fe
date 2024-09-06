import { useSnackbar } from '@/hooks/useSnackbar'
import { getWarehouseManagementApi } from '@/services/generated-api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

export default function useDeleteUser(username: string) {
  const { t: translate } = useTranslation()
  const { showSnackbar } = useSnackbar()
  const queryClient = useQueryClient()

  const mutationDelete = useMutation({
    mutationFn: (id: string) => getWarehouseManagementApi().deleteApiUserDeleteId(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      showSnackbar({
        message: translate(`Успешно изтрихте ${username}`, { name: username }),
        type: 'success'
      })
    },
    onError: () => {
      showSnackbar({
        message: translate('Грешка в сървъра'),
        type: 'error'
      })
    }
  })

  return mutationDelete
}
