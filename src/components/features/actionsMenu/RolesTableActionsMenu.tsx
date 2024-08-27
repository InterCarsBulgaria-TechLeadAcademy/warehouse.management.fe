import React from 'react'
import ConfirmDialog from '../../shared/ConfirmDialog'
import { useTranslation } from 'react-i18next'
import FormDialog from '../../shared/FormDialog'
import { SubmitHandler } from 'react-hook-form'
import TableActionsMenu from './TableActionsMenu'
import { NewRoleFormData, newRoleSchema } from '@/schemas/newRoleSchema'
import NewRoleForm from '../forms/NewRoleForm'
import { RoleDto } from '@/services/model'
import useUpdateRole from '@/hooks/services/roles/useUpdateRole'
import useDeleteRole from '@/hooks/services/roles/useDeleteRole'

interface RolesTableActionsMenuProps {
  role: RoleDto
}

export default function RolesTableActionsMenu({ role }: RolesTableActionsMenuProps) {
  const { t: translate } = useTranslation()
  const [selectedOption, setSelectedOption] = React.useState<string | null>(null)
  const mutationUpdate = useUpdateRole()
  const mutationDelete = useDeleteRole(role.name!)

  const handleClose = () => {
    setSelectedOption(null)
  }

  const onDiscardClick = () => {
    handleClose()
  }

  const handleSubmit: SubmitHandler<NewRoleFormData> = (data) => {
    mutationUpdate.mutate({
      id: role.id!,
      data: { name: data.name, permissionIds: data.permissionIds }
    })
  }

  const onConfirmClick = () => {
    mutationDelete.mutate(role.id!)
    handleClose()
  }

  const actionHandler = (option: string) => {
    setSelectedOption(option)
  }

  const options = [
    { title: 'roles.table.actionsMenu.edit', value: 'edit' },
    { title: 'roles.table.actionsMenu.delete', value: 'delete' }
  ]

  return (
    <div>
      <TableActionsMenu specificOptionHandler={actionHandler} options={options} />

      {selectedOption === 'edit' && (
        <FormDialog<NewRoleFormData>
          open={true}
          title={translate('roles.table.actions.edit.title')}
          discardText={translate('roles.table.actions.edit.labels.exit')}
          confirmText={translate('roles.table.actions.edit.labels.edit')}
          onCloseDialog={handleClose}
          schema={newRoleSchema}
          onSubmit={handleSubmit}
          maxWidth="xl"
          renderForm={(methods) => <NewRoleForm {...methods} roleId={role.id} />}
        />
      )}

      {selectedOption === 'delete' && (
        <ConfirmDialog
          open={true}
          title={translate('roles.table.actions.delete.title')}
          content={translate('roles.table.actions.delete.message', { role: role.name })}
          discardText={translate('roles.table.actions.delete.labels.discard')}
          confirmText={translate('roles.table.actions.delete.labels.confirm')}
          onCloseDialog={handleClose}
          onDiscardClick={onDiscardClick}
          onConfirmClick={onConfirmClick}
        />
      )}
    </div>
  )
}
