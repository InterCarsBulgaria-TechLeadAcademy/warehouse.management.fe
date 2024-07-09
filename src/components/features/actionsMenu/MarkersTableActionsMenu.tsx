import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import React from 'react'
import { useTranslation } from 'react-i18next'
import WarningActionDialog from '@/components/shared/WarningActionDialog'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { getWarehouseManagementApi } from '@/services/generated-api'

import { SubmitHandler } from 'react-hook-form'
import { NewMarkerFormData, newMarkerSchema } from '@/schemas/newMarkerSchema'
import FormDialog from '@/components/shared/FormDialog'
import NewMarkerForm from '@/components/features/forms/NewMarkerForm'
import { BodyType } from '@/services/api'
import { MarkerFormDto } from '@/services/model'

interface MarkersTableActionsMenuProps {
  id: number
  name: string
}

export default function MarkersTableActionsMenu({ id, name }: MarkersTableActionsMenuProps) {
  const { t: translate } = useTranslation()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const [selectedOption, setSelectedOption] = React.useState<string | null>(null)

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

  const actionHandler = (option: string) => {
    setSelectedOption(option)
  }

  const queryClient = useQueryClient()

  const mutationDelete = useMutation({
    mutationFn: (id: number) => getWarehouseManagementApi().deleteApiMarkerDeleteId(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['markers'] })
    },
    onError: (error) => {
      console.error('Грешка при заявката', error)
    }
  })

  const onConfirmClick = () => {
    mutationDelete.mutate(id)
    handleClose()
  }

  const mutationUpdate = useMutation({
    mutationFn: ({ id, data }: { id: number; data: BodyType<MarkerFormDto> }) =>
      getWarehouseManagementApi().putApiMarkerEditId(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['markers'] })
    },
    onError: (error) => {
      console.error('Грешка при заявката', error)
    }
  })

  const handleSubmit: SubmitHandler<NewMarkerFormData> = (data) => {
    console.log()
    mutationUpdate.mutate({ id, data: { name: data.markerName } })
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

      {selectedOption === translate('actionsMenu.options.delete') && (
        <WarningActionDialog
          open={open}
          title={translate('newMarker.deleteAction.title')}
          content={translate('newMarker.deleteAction.message', {
            marker: name
          })}
          discardText={translate('newMarker.deleteAction.labels.discard')}
          confirmText={translate('newMarker.deleteAction.labels.confirm')}
          onCloseDialog={handleClose}
          onDiscardClick={onDiscardClick}
          onConfirmClick={onConfirmClick}
        />
      )}

      {selectedOption === translate('actionsMenu.options.edit') && (
        <FormDialog<NewMarkerFormData>
          open={open}
          title={translate('editMarker.title')}
          discardText={translate('editMarker.labels.exit')}
          confirmText={translate('editMarker.labels.create')}
          onCloseDialog={handleClose}
          schema={newMarkerSchema}
          onSubmit={handleSubmit}
          renderForm={(methods) => <NewMarkerForm {...methods} defaultValue={name} />}
        />
      )}
    </div>
  )
}
