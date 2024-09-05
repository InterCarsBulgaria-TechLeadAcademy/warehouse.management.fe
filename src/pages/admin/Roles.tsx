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
  const mutationPost = usePostRole()

  const handleClickOpen = () => {
    setOpenDialog(true)
  }

  const onCloseDialog = () => {
    setOpenDialog(false)
  }

  const handleSubmit: SubmitHandler<NewRoleFormData> = (data) => {
    mutationPost.mutate({ name: data.name, permissionIds: data.permissionIds })
    onCloseDialog()
  }

  return (
    <>
      <SkeletonPage
        header={translate('roles.title')}
        description={translate('roles.description')}
        buttonText={translate('roles.newRole.title')}
        buttonClickHandler={handleClickOpen}
        table={<RolesTable />}
      />

      <FormDialog<NewRoleFormData>
        open={openDialog}
        title={translate('roles.newRole.title')}
        discardText={translate('roles.newRole.labels.exit')}
        confirmText={translate('roles.newRole.labels.create')}
        onCloseDialog={onCloseDialog}
        schema={newRoleSchema}
        onSubmit={handleSubmit}
        maxWidth="xl"
        renderForm={(methods) => <NewRoleForm {...methods} />}
      />
    </>
  )
}
