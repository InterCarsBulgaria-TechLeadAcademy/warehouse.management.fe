import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import React from 'react'
import { useTranslation } from 'react-i18next'
import WarningActionDialog from '@/components/shared/WarningActionDialog'

interface VendorTableActionsMenuProps {
  specificOptionHandler: Function
  options: { title: string; value: string }[]
}

export default function VendorTableActionsMenu({
  specificOptionHandler,
  options
}: TableActionsMenuProps) {
  const { t: translate } = useTranslation()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const actionHandler = (option: string) => {
    specificOptionHandler(option)
    handleClose()
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
          <MenuItem key={option.value} onClick={() => actionHandler(option.value)}>
            {translate(option.title)}
          </MenuItem>
        ))}
      </Menu>

      {selectedOption === 'Изтрий' && (
        <WarningActionDialog
          open={open}
          title={translate('deleteAction.vendors.title')}
          content={translate('deleteAction.vendors.message')}
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
