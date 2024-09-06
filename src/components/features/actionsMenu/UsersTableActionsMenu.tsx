import React from 'react'
import ConfirmDialog from '../../shared/ConfirmDialog'
import { useTranslation } from 'react-i18next'
import FormDialog from '../../shared/FormDialog'
import { SubmitHandler } from 'react-hook-form'
import TableActionsMenu from './TableActionsMenu'
import NewUserForm from '../forms/NewUserForm'
import { NewUserFormData, newUserSchema } from '@/schemas/newUserSchema'
import { UserAllDto } from '@/services/model'
import useDeleteUser from '@/hooks/services/users/useDeleteUser'


interface UsersTableActionsMenuProps {
  user: UserAllDto
}

export default function UsersTableActionsMenu({ user }: UsersTableActionsMenuProps) {
  const { t: translate } = useTranslation()
  const [selectedOption, setSelectedOption] = React.useState<string | null>(null)
  const mutationDelete = useDeleteUser(user.userName!)
  // TODO: Create update user functionality

  const handleClose = () => {
    setSelectedOption(null)
  }

  const onDiscardClick = () => {
    handleClose()
  }

  const handleSubmit: SubmitHandler<NewUserFormData> = (data) => {
    // TODO: Create update user functionality
  }

  const onConfirmDelete = () => {
    mutationDelete.mutate(user.id!)
    handleClose()
  }

  const actionHandler = (option: string) => {
    setSelectedOption(option)
  }

  const options = [
    { title: 'vendors.table.actionsMenu.edit', value: 'edit' },
    { title: 'vendors.table.actionsMenu.delete', value: 'delete' }
  ]

  return (
    <div>
      <TableActionsMenu specificOptionHandler={actionHandler} options={options} />

      {selectedOption === 'edit' && (
        <FormDialog<NewUserFormData>
          open={true}
          title={translate('Редактиране на потребител')}
          discardText={translate('изход')}
          confirmText={translate('промени')}
          onCloseDialog={handleClose}
          schema={newUserSchema}
          onSubmit={handleSubmit}
          renderForm={(methods) => (
            <NewUserForm
              {...methods}
              defaultValues={{
                name: user.userName!,
                email: user.email!,
                role: user.role!
              }}
            />
          )}
        />
      )}

      {selectedOption === 'delete' && (
        <ConfirmDialog
          open={true}
          title={translate('vendors.table.actions.delete.title')}
          content={translate('vendors.table.actions.delete.message', { name: user.userName })}
          discardText={translate('vendors.table.actions.delete.labels.discard')}
          confirmText={translate('vendors.table.actions.delete.labels.confirm')}
          onCloseDialog={handleClose}
          onDiscardClick={onDiscardClick}
          onConfirmClick={onConfirmDelete}
        />
      )}
    </div>
  )
}
