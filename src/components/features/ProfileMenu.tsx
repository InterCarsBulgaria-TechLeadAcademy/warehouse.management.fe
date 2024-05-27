import * as React from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import WarningActionDialog from '../shared/WarningActionDialog'

export default function ProfileMenu() {
  const { t: translate } = useTranslation()
  const [dialogOpen, setDialogOpen] = React.useState(false)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const menuOpen = Boolean(anchorEl)

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
    setDialogOpen(true)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setDialogOpen(false)
  }

  const handleDialogOpen = () => {
    setDialogOpen(true)
  }

  const onCloseDialog = () => {
    setDialogOpen(false)
    handleMenuClose()
  }

  const onDiscardClick = () => {
    setDialogOpen(false)
  }

  const onConfirmClick = () => {
    setDialogOpen(false)
  }

  return (
    <>
      <Typography
        component="div"
        sx={{
          fontSize: '1.2em'
        }}>
        {translate('profileMenu.name')}
      </Typography>

      <Button
        id="basic-button"
        aria-controls={menuOpen ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={menuOpen ? 'true' : undefined}
        onClick={handleMenuClick}>
        <KeyboardArrowDownIcon sx={{ color: 'black' }} />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleMenuClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}>
        <MenuItem onClick={handleDialogOpen}>
          <Typography component="div">{translate('profileMenu.labels.exit')}</Typography>
        </MenuItem>
      </Menu>

      <WarningActionDialog
        open={dialogOpen}
        title={translate('profileMenu.title')}
        content={translate('profileMenu.message')}
        discardText={translate('profileMenu.labels.discard')}
        confirmText={translate('profileMenu.labels.confirm')}
        onCloseDialog={onCloseDialog}
        onDiscardClick={onDiscardClick}
        onConfirmClick={onConfirmClick}
      />
    </>
  )
}
