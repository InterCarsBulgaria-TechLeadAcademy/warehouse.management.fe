import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import React from 'react'
import { useTranslation } from 'react-i18next'

interface TableActionsMenuProps {
  specificOptionHandler: Function;
  itemProps: string[];
}

export default function TableActionsMenu({ specificOptionHandler, itemProps }: TableActionsMenuProps) {
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
    </div>
  )
}