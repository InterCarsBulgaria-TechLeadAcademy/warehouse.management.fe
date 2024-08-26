import React from 'react'
import { useTranslation } from 'react-i18next'
import { VendorDto } from '@/services/model'
import FormDialog from '../../shared/FormDialog'
import { NewVendorFormData, newVendorSchema } from '@/schemas/newVendorSchema'
import NewVendorForm from '../forms/NewVendorForm'
import { SubmitHandler } from 'react-hook-form'
import TableActionsMenu from './TableActionsMenu'
import useUpdateVendor from '@/hooks/services/vendors/useUpdateVendor'
import useDeleteVendor from '@/hooks/services/vendors/useDeleteVendor'
import ConfirmDialog from '../../shared/ConfirmDialog.tsx'

interface VendorsTableActionsMenuProps {
  vendor: VendorDto
}

export default function VendorTableActionsMenu({ vendor }: VendorsTableActionsMenuProps) {
  const { t: translate } = useTranslation()
  const [selectedOption, setSelectedOption] = React.useState<string | null>(null)
  const [vendorNumber, setVendorNumber] = React.useState('')
  const mutationUpdate = useUpdateVendor(vendor.name!, vendorNumber)
  const mutationDelete = useDeleteVendor(vendor.name!)

  const handleClose = () => {
    setSelectedOption(null)
  }

  const onDiscardClick = () => {
    handleClose()
  }

  const handleSubmit: SubmitHandler<NewVendorFormData> = (data) => {
    setVendorNumber(data.vendorNumber)
    const markerIds = data.markers!.map((marker) => Number(marker))
    mutationUpdate.mutate({
      id: vendor.id!,
      data: { name: data.vendorName, systemNumber: data.vendorNumber, markerIds: markerIds }
    })
  }

  const onConfirmDelete = () => {
    mutationDelete.mutate(vendor.id!)
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
        <FormDialog<NewVendorFormData>
          open={true}
          title={translate('vendors.table.actions.edit.title')}
          discardText={translate('vendors.table.actions.edit.labels.exit')}
          confirmText={translate('vendors.table.actions.edit.labels.edit')}
          onCloseDialog={handleClose}
          schema={newVendorSchema}
          onSubmit={handleSubmit}
          renderForm={(methods) => <NewVendorForm {...methods} vendorId={vendor.id!} />}
        />
      )}

      {selectedOption === 'delete' && (
        <ConfirmDialog
          open={true}
          title={translate('vendors.table.actions.delete.title')}
          content={translate('vendors.table.actions.delete.message', { name: vendor.name })}
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
