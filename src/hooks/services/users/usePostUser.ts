import { useSnackbar } from '@/hooks/useSnackbar'
import { getWarehouseManagementApi } from '@/services/generated-api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

export default function usePostUser() {
  const { t: translate } = useTranslation()
  const { showSnackbar } = useSnackbar()
  const queryClient = useQueryClient()

  const mutationPost = useMutation({
    mutationFn: getWarehouseManagementApi().postApiAuthRegister,
    onSuccess: (_, { username }) => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      showSnackbar({
        message: translate(`Успешно създадохте ${username} като нов потребител`, { name: username }),
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

  return mutationPost
}