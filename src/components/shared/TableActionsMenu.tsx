import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import React from 'react'
import WarningActionDialog from '../shared/WarningActionDialog'
import { useTranslation } from 'react-i18next'

interface TableActionsMenuProps {
  specificOptionHandler: Function;
  itemProps: string[];
  page: string;
}

export default function TableActionsMenu({ specificOptionHandler, itemProps, page }: TableActionsMenuProps) {
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
    specificOptionHandler(option)
    setSelectedOption(option)
    handleClose()
  }

  const options = itemProps.map((str) => str)


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
            {translate(`${page}.actionsMenu.${option}`)}
          </MenuItem>
        ))}
      </Menu>

      {selectedOption === 'Изтрий' && (
        <WarningActionDialog
          open={open}
          title={translate(`${page}.deleteAction.title`)}
          content={translate(`${page}.deleteAction.message`)}
          discardText={translate(`${page}.deleteAction.labels.discard`)}
          confirmText={translate(`${page}.deleteAction.labels.confirm`)}
          onCloseDialog={handleClose}
          onDiscardClick={onDiscardClick}
          onConfirmClick={onConfirmClick}
        />
      )}
    </div>
  )
}