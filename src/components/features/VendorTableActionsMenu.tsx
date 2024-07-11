// import IconButton from '@mui/material/IconButton'
// import Menu from '@mui/material/Menu'
// import MenuItem from '@mui/material/MenuItem'
// import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import React from 'react'
import WarningActionDialog from '../shared/WarningActionDialog'
import { useTranslation } from 'react-i18next'
import { VendorDto, VendorFormDto } from '@/services/model'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { getWarehouseManagementApi } from '@/services/generated-api'
import { useSnackbar } from '@/hooks/useSnackbar'
// import { number } from 'yup'
import { BodyType } from '@/services/api'
import { SubmitHandler } from 'react-hook-form'
import { NewVendorFormData, newVendorSchema } from '@/schemas/newVendorSchema'
import TableActionsMenu from '../shared/TableActionsMenu'
import FormDialog from '../shared/FormDialog'
import NewVendorForm from './forms/NewVendorForm'

// interface MarkersTableActionsMenuProps {
//   vendor: VendorDto
// }

interface MarkersTableActionsMenuProps {
  id: number
  name: string
  vendorNumber: string
  markersIds: number[] | string[]
}

// export default function VendorTableActionsMenu({ vendor }: MarkersTableActionsMenuProps) {
export default function VendorTableActionsMenu({
  id,
  name,
  vendorNumber,
  markersIds
}: MarkersTableActionsMenuProps) {
  const { t: translate } = useTranslation()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  // const open = Boolean(anchorEl) //не служи за нищо
  const [selectedOption, setSelectedOption] = React.useState<string | null>(null)
  const { showSnackbar } = useSnackbar()

  // const handleClick = (event: React.MouseEvent<HTMLElement>) => {
  //   setAnchorEl(event.currentTarget)
  // } //не служи за нищо

  const handleClose = () => {
    setSelectedOption(null)
    setAnchorEl(null)
  }

  const onDiscardClick = () => {
    handleClose()
  }

  const actionHandler = (option: string) => {
    setSelectedOption(option)
  }

  const queryClient = useQueryClient()

  const mutationDelete = useMutation({
    mutationFn: (id: number) => getWarehouseManagementApi().deleteApiVendorDeleteId(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vendors'] })
      showSnackbar({
        message: translate('newVendor.snackBar.messages.deleteVendor.success'),
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

  const onConfirmClick = () => {
    // mutationDelete.mutate(vendor.id!)
    mutationDelete.mutate(id)
    handleClose()
  }

  //логиката за edit
  const mutationUpdate = useMutation({
    mutationFn: ({ id, data }: { id: number; data: BodyType<VendorFormDto> }) =>
      getWarehouseManagementApi().putApiVendorEditId(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vendors'] })
      //създай и оправи translate
      showSnackbar({
        message: translate('newZone.snackBar.messages.updateZone.success', { name: name }),
        type: 'success'
      })
    },
    onError: () => {
      //създай и оправи translate
      showSnackbar({
        message: translate('newZone.snackBar.messages.updateZone.error'),
        type: 'error'
      })
    }
  })

  //TODO: да тествам когато БЕ оправят дали се променят всички полета, не само name
  const handleSubmit: SubmitHandler<NewVendorFormData> = (data) => {
    // const markerIds = data.markers!.map((marker) => Number(marker))
    mutationUpdate.mutate({
      id,
      data: { name: data.vendorName, systemNumber: data.vendorNumber, markers: data.markers }
    })

    // mutation.mutate({ name: data.vendorName, systemNumber: data.vendorNumber, markers: data.markers })
  }

  // const options = [translate('actionsMenu.options.edit'), translate('actionsMenu.options.delete')]

  const options = [
    { title: 'actionsMenu.options.edit', value: 'edit' },
    { title: 'actionsMenu.options.delete', value: 'delete' }
  ]

  return (
    <div>
      {/* <IconButton
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
      </Menu> */}
      <TableActionsMenu specificOptionHandler={actionHandler} options={options} />

      {selectedOption === 'edit' && (
        <FormDialog<NewVendorFormData>
          open={true}
          title={translate('newZone.editZone.title')} //translate трябва да се оправи
          discardText={translate('newZone.editZone.labels.exit')} //translate трябва да се оправи
          confirmText={translate('newZone.editZone.labels.edit')} //translate трябва да се оправи
          onCloseDialog={handleClose}
          schema={newVendorSchema}
          onSubmit={handleSubmit}
          renderForm={(methods) => (
            <NewVendorForm {...methods} defaultValues={{ name, vendorNumber, markersIds }} />
          )}
        />
      )}

      {selectedOption === 'delete' && (
        <WarningActionDialog
          // open={open} //променяме на true
          open={true}
          title={translate('deleteAction.vendors.title')}
          content={translate('deleteAction.vendors.message', {
            // vendor: vendor.name
            vendor: name
          })}
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
