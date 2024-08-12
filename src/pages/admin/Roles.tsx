import SkeletonPage from '@/components/features/SkeletonPage'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import FormDialog from '@/components/shared/FormDialog'
import { SubmitHandler } from 'react-hook-form'
import UsersTable from '@/components/features/admin/UsersTable'
import { NewUserFormData, newUserSchema } from '@/schemas/newUserSchema'
import NewUserForm from '@/components/features/forms/NewUserForm'

export default function Roles() {
  const { t: translate } = useTranslation()
  const [openDialog, setOpenDialog] = useState(false)

  const handleClickOpen = () => {
    setOpenDialog(true)
  }

  const onCloseDialog = () => {
    setOpenDialog(false)
  }

  const handleSubmit: SubmitHandler<NewUserFormData> = (data) => {
    console.log(data)
    onCloseDialog()
  }

  return (
    <>
      <SkeletonPage
        // TODO: Add corect translation! Discuss it with Boyadzhiev.
        header={translate('Роли')}
        description={translate('Управление на роли')}
        buttonText={translate('нова роля')}
        buttonClickHandler={handleClickOpen}
        table={<UsersTable />}
      />

      {/* <FormDialog<NewUserFormData>
        open={openDialog}
        title={translate('Създаване на нов потребител')}
        discardText={translate('изход')}
        confirmText={translate('създай')}
        onCloseDialog={onCloseDialog}
        schema={newUserSchema}
        onSubmit={handleSubmit}
        renderForm={(methods) => <NewUserForm {...methods} />}
      /> */}
    </>
  )
}
