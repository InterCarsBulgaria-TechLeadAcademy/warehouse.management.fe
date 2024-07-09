import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import React from 'react'
import { useTranslation } from 'react-i18next'
import WarningActionDialog from '@/components/shared/WarningActionDialog'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { getWarehouseManagementApi } from '@/services/generated-api'

interface MarkersTableActionsMenuProps {
  id: number
}

export default function MarkersTableActionsMenu({ id }: MarkersTableActionsMenuProps) {
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

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (id: number) => getWarehouseManagementApi().deleteApiMarkerDeleteId(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['markers'] })
    },
    onError: (error) => {
      console.error('Грешка при заявката', error)
    }
  })

  const onConfirmClick = () => {
    mutation.mutate(id)
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

      {selectedOption === translate('actionsMenu.options.delete') && (
        <WarningActionDialog
          open={open}
          title={translate('deliveries.deleteActions.title')}
          content={translate('deliveries.deleteActions.message')}
          discardText={translate('deliveries.deleteActions.labels.discard')}
          confirmText={translate('deliveries.deleteActions.labels.confirm')}
          onCloseDialog={handleClose}
          onDiscardClick={onDiscardClick}
          onConfirmClick={onConfirmClick}
        />
      )}
    </div>
  )
}
