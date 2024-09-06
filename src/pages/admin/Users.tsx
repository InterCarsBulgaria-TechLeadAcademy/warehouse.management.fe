import SkeletonPage from '@/components/features/SkeletonPage'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import FormDialog from '@/components/shared/FormDialog'
import { SubmitHandler } from 'react-hook-form'
import UsersTable from '@/components/features/admin/UsersTable'
import { NewUserFormData, newUserSchema } from '@/schemas/newUserSchema'
import NewUserForm from '@/components/features/forms/NewUserForm'
import usePostUser from '@/hooks/services/users/usePostUser'

export default function Users() {
  const { t: translate } = useTranslation()
  const [openDialog, setOpenDialog] = useState(false)
  const mutationPost = usePostUser()
  const handleClickOpen = () => {
    setOpenDialog(true)
  }

  const onCloseDialog = () => {
    setOpenDialog(false)
  }

  const handleSubmit: SubmitHandler<NewUserFormData> = (data) => {
    mutationPost.mutate({username: data.name, email: data.email, password: data.password, roleId: data.role})
    onCloseDialog()
  }

  return (
    <>
      <SkeletonPage
        // TODO: Add corect translation! Discuss it with Boyadzhiev.
        header={translate('Потребители')}
        description={translate('Управление на потребители')}
        buttonText={translate('нов потребител')}
        buttonClickHandler={handleClickOpen}
        table={<UsersTable />}
      />

      <FormDialog<NewUserFormData>
        open={openDialog}
        title={translate('Създаване на нов потребител')}
        discardText={translate('изход')}
        confirmText={translate('създай')}
        onCloseDialog={onCloseDialog}
        schema={newUserSchema}
        onSubmit={handleSubmit}
        renderForm={(methods) => <NewUserForm {...methods} />}
      />
    </>
  )
}
