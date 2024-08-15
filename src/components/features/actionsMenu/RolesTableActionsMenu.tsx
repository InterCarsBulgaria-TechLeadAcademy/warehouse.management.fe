import React from 'react'
import ConfirmDialog from '../../shared/ConfirmDialog'
import { useTranslation } from 'react-i18next'
import FormDialog from '../../shared/FormDialog'
import { SubmitHandler } from 'react-hook-form'
import TableActionsMenu from './TableActionsMenu'
import useUpdateVendor from '@/hooks/services/vendors/useUpdateVendor'
import useDeleteVendor from '@/hooks/services/vendors/useDeleteVendor'
import NewUserForm from '../forms/NewUserForm'
import { NewRoleFormData, newRoleSchema } from '@/schemas/newRoleSchema'

// -------------------------------------------- ↓
// TODO: Watch out for the code later..
interface RoleRightDto {
    rightId?: number
    /** @nullable */
    rightName?: string | null
}
  
interface RoleDto {
    id?: number
    /** @nullable */
    name?: string | null
    rights?: RoleRightDto[] | null
}
// ---------------------------------------------- ↑

interface RolesTableActionsMenuProps {
  role: RoleDto
}

export default function RolesTableActionsMenu({ role }: RolesTableActionsMenuProps) {
  const { t: translate } = useTranslation()
  const [selectedOption, setSelectedOption] = React.useState<string | null>(null)
  const [vendorNumber, setVendorNumber] = React.useState('')
  const mutationUpdate = useUpdateVendor(role.name!, vendorNumber)
  const mutationDelete = useDeleteVendor(role.name!)

  const handleClose = () => {
    setSelectedOption(null)
  }

  const onDiscardClick = () => {
    handleClose()
  }

  const handleSubmit: SubmitHandler<NewRoleFormData> = (data) => {
    // setVendorNumber(data.vendorNumber)
    // const markerIds = data.markers!.map((marker) => Number(marker))
    // mutationUpdate.mutate({
    //   id: user.id!,
    //   data: { name: data.vendorName, systemNumber: data.vendorNumber, markerIds: markerIds }
    // })
  }

  const onConfirmClick = () => {
    mutationDelete.mutate(role.id!)
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
        <FormDialog<NewRoleFormData>
          open={true}
          title={translate('Редактиране на роля')}
          discardText={translate('изход')}
          confirmText={translate('промени')}
          onCloseDialog={handleClose}
          schema={newRoleSchema}
          onSubmit={handleSubmit}
          renderForm={(methods) => (
            <NewUserForm
              {...methods}
              defaultValues={{
                name: role.name!,
                rights: role.rights?.map((right) => right.rightId!) || ([] as number[])
              }}
            />
          )}
        />
      )}

      {selectedOption === 'delete' && (
        <ConfirmDialog
          open={true}
          title={translate('vendors.table.actions.delete.title')}
          content={translate('vendors.table.actions.delete.message', { name: role.name })}
          discardText={translate('vendors.table.actions.delete.labels.discard')}
          confirmText={translate('vendors.table.actions.delete.labels.confirm')}
          onCloseDialog={handleClose}
          onDiscardClick={onDiscardClick}
          onConfirmClick={onConfirmClick}
        />
      )}
    </div>
  )
}
