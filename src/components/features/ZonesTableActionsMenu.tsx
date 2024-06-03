import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import React from 'react'
import WarningActionDialog from '../shared/WarningActionDialog'
import { useTranslation } from 'react-i18next'

export default function ZonesTableActionsMenu() {
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

  const onConfirmClick = () => {
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

      {selectedOption === 'Изтрий' && (
        <WarningActionDialog
          open={open}
          title={translate('deleteAction.title')}
          content={translate('deleteAction.message')}
          discardText={translate('deleteAction.labels.discard')}
          confirmText={translate('deleteAction.labels.confirm')}
          onCloseDialog={handleClose}
          onDiscardClick={onDiscardClick}
          onConfirmClick={onConfirmClick}
        />
      )}
    </div>
  )
}
