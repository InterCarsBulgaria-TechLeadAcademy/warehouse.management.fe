import * as React from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import WarningActionDialog from '../shared/WarningActionDialog'
import { useAuth } from '@/hooks/services/auth/useAuth'

export default function ProfileMenu() {
  const { t: translate } = useTranslation()
  const [dialogOpen, setDialogOpen] = React.useState(false)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const menuOpen = Boolean(anchorEl)
  const { user, setUser, logoutUser } = useAuth()

  const onMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const onCloseMenu = () => {
    setAnchorEl(null)
    setDialogOpen(false)
  }

  const onOpenDialog = () => {
    setDialogOpen(true)
  }

  const onCloseDialog = () => {
    onCloseMenu()
  }

  const onDiscardClick = () => {
    onCloseMenu()
  }

  const onConfirmClick = () => {
    // Log out from the context only!
    setUser(null)
    logoutUser()
    onCloseMenu()
  }

  return (
    <>
      {user?.username && (
        <>
          <Typography component="p" variant="body1">
            {user?.username}
          </Typography>

          <Button
            id="basic-button"
            aria-controls={menuOpen ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={menuOpen ? 'true' : undefined}
            onClick={onMenuClick}>
            <KeyboardArrowDownIcon />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={menuOpen}
            onClose={onCloseMenu}
            MenuListProps={{
              'aria-labelledby': 'basic-button'
            }}>
            <MenuItem onClick={onOpenDialog}>
              <Typography component="p">{translate('profileMenu.labels.exit')}</Typography>
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
      )}
    </>
  )
}
