import SkeletonPage from '@/components/features/SkeletonPage'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import FormDialog from '@/components/shared/FormDialog'
import { SubmitHandler } from 'react-hook-form'
import RolesTable from '@/components/features/admin/RolesTable'
import { NewRoleFormData, newRoleSchema } from '@/schemas/newRoleSchema'
import NewRoleForm from '@/components/features/forms/NewRoleForm'
import usePostRole from '@/hooks/services/roles/usePostRole'

export default function Roles() {
  const { t: translate } = useTranslation()
  const [openDialog, setOpenDialog] = useState(false)
  const [roleName, setRoleName] = useState('')
  const mutationPost = usePostRole(roleName)

  const handleClickOpen = () => {
    setOpenDialog(true)
  }

  const onCloseDialog = () => {
    setOpenDialog(false)
  }

  const handleSubmit: SubmitHandler<NewRoleFormData> = (data) => {
    console.log(data)
    setRoleName(data.name)
    mutationPost.mutate({ name: data.name, permissionIds: data.permissionIds })
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
        table={<RolesTable />}
      />

      <FormDialog<NewRoleFormData>
        open={openDialog}
        title={translate('Създаване на новa роля')}
        discardText={translate('изход')}
        confirmText={translate('създай')}
        onCloseDialog={onCloseDialog}
        schema={newRoleSchema}
        onSubmit={handleSubmit}
        renderForm={(methods) => <NewRoleForm {...methods} />}
      />
    </>
  )
}
