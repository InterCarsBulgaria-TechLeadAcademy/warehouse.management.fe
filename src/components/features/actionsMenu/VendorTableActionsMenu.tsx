
import React from 'react'
import WarningActionDialog from '../../shared/WarningActionDialog'
import { useTranslation } from 'react-i18next'
import { VendorDto } from '@/services/model'
import FormDialog from '../../shared/FormDialog'
import { NewVendorFormData, newVendorSchema } from '@/schemas/newVendorSchema'
import NewVendorForm from '../forms/NewVendorForm'
import { SubmitHandler } from 'react-hook-form'
import TableActionsMenu from './TableActionsMenu'
import useUpdateVendor from '@/hooks/services/vendors/useUpdateVendor'
import useDeleteVendor from '@/hooks/services/vendors/useDeleteVendor'

interface VendorsTableActionsMenuProps {
  vendor: VendorDto
}

export default function VendorTableActionsMenu({ vendor }: VendorsTableActionsMenuProps) {
  const { t: translate } = useTranslation()
  const [selectedOption, setSelectedOption] = React.useState<string | null>(null)
  const mutationUpdate = useUpdateVendor(vendor.name!)
  const mutationDelete = useDeleteVendor(vendor.name!)

  const handleClose = () => {
    setSelectedOption(null)
  }

  const onDiscardClick = () => {
    handleClose()
  }

  const handleSubmit: SubmitHandler<NewVendorFormData> = (data) => {
    const markerIds = data.markers!.map((marker) => Number(marker))
    mutationUpdate.mutate({
      id: vendor.id!,
      data: { name: data.vendorName, systemNumber: data.vendorNumber, markerIds: markerIds }
    })
  }

  const onConfirmClick = () => {
    mutationDelete.mutate(vendor.id!)
    handleClose()
  }

  const actionHandler = (option: string) => {
    setSelectedOption(option)
  }

  const options = [
    { title: 'actionsMenu.options.edit', value: 'edit' },
    { title: 'actionsMenu.options.delete', value: 'delete' }
  ]

  return (
    <div>
      <TableActionsMenu specificOptionHandler={actionHandler} options={options} />

      {selectedOption === 'edit' && (
        <FormDialog<NewVendorFormData>
          open={true}
          title={translate('editVendor.title')}
          discardText={translate('editVendor.labels.exit')}
          confirmText={translate('editVendor.labels.edit')}
          onCloseDialog={handleClose}
          schema={newVendorSchema}
          onSubmit={handleSubmit}
          renderForm={(methods) => (
            <NewVendorForm
              {...methods}
              defaultValues={{
                name: vendor.name!,
                systemNumber: vendor.systemNumber!,
                markerIds: vendor.markers?.map((marker) => marker.markerId!) || ([] as number[])
              }}
            />
          )}
        />
      )}

      {selectedOption === 'delete' && (
        <WarningActionDialog
          open={true}
          title={translate('deleteAction.vendors.title')}
          content={translate('deleteAction.vendors.message', { name: vendor.name })}
          discardText={translate('deleteAction.vendors.labels.discard')}
          confirmText={translate('deleteAction.vendors.labels.confirm')}
          onCloseDialog={handleClose}
          onDiscardClick={onDiscardClick}
          onConfirmClick={onConfirmClick}
        />
      )}
    </div>
  )
}
