import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import React from 'react'
import WarningActionDialog from '../shared/WarningActionDialog'
import { useTranslation } from 'react-i18next'
import { VendorDto, VendorFormDto } from '@/services/model'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { getWarehouseManagementApi } from '@/services/generated-api'
import { useSnackbar } from '@/hooks/useSnackbar'
import FormDialog from '../shared/FormDialog'
import { NewVendorFormData, newVendorSchema } from '@/schemas/newVendorSchema'
import NewVendorForm from './forms/NewVendorForm'
import { BodyType } from '@/services/api'
import { SubmitHandler } from 'react-hook-form'

interface VendorsTableActionsMenuProps {
  vendor: VendorDto
}

export default function VendorTableActionsMenu({ vendor }: VendorsTableActionsMenuProps) {
  const { t: translate } = useTranslation()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const [selectedOption, setSelectedOption] = React.useState<string | null>(null)

  const { showSnackbar } = useSnackbar()

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setSelectedOption(null)
    setAnchorEl(null)
  }

  const onDiscardClick = () => {
    handleClose()
  }

  const queryClient = useQueryClient()

  const mutationDelete = useMutation({
    mutationFn: (id: number) => getWarehouseManagementApi().deleteApiVendorDeleteId(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vendors'] })
      showSnackbar({
        message: translate('newVendor.snackBar.messages.deleteVendor.success', {
          name: vendor.name
        }),
        type: 'success'
      })
    },
    onError: () => {
      showSnackbar({
        message: translate('newVendor.snackBar.messages.deleteVendor.error'),
        type: 'error'
      })
    }
  })

  const mutationUpdate = useMutation({
    mutationFn: ({ id, data }: { id: number; data: BodyType<VendorFormDto> }) =>
      getWarehouseManagementApi().putApiVendorEditId(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vendors'] })
      showSnackbar({
        message: translate('newVendor.snackBar.messages.updateVendor.success', {
          name: vendor.name
        }),
        type: 'success'
      })
    },
    onError: () => {
      showSnackbar({
        message: translate('newVendor.snackBar.messages.updateVendor.error'),
        type: 'error'
      })
    }
  })

  const handleSubmit: SubmitHandler<NewVendorFormData> = (data) => {
    console.log('SUBMITTT', data, 'Vendooor', vendor);
    
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

  const options = [translate('actionsMenu.options.edit'), translate('actionsMenu.options.delete')]

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}>
        <MoreHorizIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button'
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}>
        {options.map((option) => (
          <MenuItem key={option} onClick={() => actionHandler(option)}>
            {option}
          </MenuItem>
        ))}
      </Menu>

      {selectedOption === 'Редактирай' && (
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

      {selectedOption === 'Изтрий' && (
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
