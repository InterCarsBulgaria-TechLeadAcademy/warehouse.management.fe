import React from 'react'
import ConfirmDialog from '../../shared/ConfirmDialog'
import { useTranslation } from 'react-i18next'
import FormDialog from '../../shared/FormDialog'
import { SubmitHandler } from 'react-hook-form'
import TableActionsMenu from './TableActionsMenu'
import useUpdateVendor from '@/hooks/services/vendors/useUpdateVendor'
import useDeleteVendor from '@/hooks/services/vendors/useDeleteVendor'
import NewUserForm from '../forms/NewUserForm'
import { NewUserFormData, newUserSchema } from '@/schemas/newUserSchema'
import { UserAllDto } from '@/services/model'


interface UsersTableActionsMenuProps {
  user: UserAllDto
}

export default function UsersTableActionsMenu({ user }: UsersTableActionsMenuProps) {
  const { t: translate } = useTranslation()
  const [selectedOption, setSelectedOption] = React.useState<string | null>(null)
  const [vendorNumber, setVendorNumber] = React.useState('')
  // const mutationUpdate = useUpdateVendor(user.userName!, vendorNumber)
  // const mutationDelete = useDeleteVendor(user.userName!)

  const handleClose = () => {
    setSelectedOption(null)
  }

  const onDiscardClick = () => {
    handleClose()
  }

  const handleSubmit: SubmitHandler<NewUserFormData> = (data) => {
    // setVendorNumber(data.vendorNumber)
    // const markerIds = data.markers!.map((marker) => Number(marker))
    // mutationUpdate.mutate({
    //   id: user.id!,
    //   data: { name: data.vendorName, systemNumber: data.vendorNumber, markerIds: markerIds }
    // })
  }

  const onConfirmDelete = () => {
    // mutationDelete.mutate(user.id!)
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
