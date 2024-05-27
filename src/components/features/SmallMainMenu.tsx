import * as React from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import DehazeIcon from '@mui/icons-material/Dehaze'
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined'
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined'
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined'
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined'
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined'
import DifferenceOutlinedIcon from '@mui/icons-material/DifferenceOutlined'
import { useTranslation } from 'react-i18next'
import {
  TYPESDIFFERENCE_PATH,
  ROLES_PATH,
  TYPESGOODS_PATH,
  USERS_PATH,
  VENDORS_PATH,
  ZONES_PATH
} from '@/router/routerPaths'
import SmallMainMenuItem from './SmallMainMenuItem'

export default function SmallMainMenu() {
  const { t: translate } = useTranslation()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}>
        <DehazeIcon sx={{ color: 'black' }} />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}>
        <SmallMainMenuItem
          title={translate('mainMenu.users')}
          Icon={PeopleAltOutlinedIcon}
          link={USERS_PATH}
        />

        <SmallMainMenuItem
          title={translate('mainMenu.zones')}
          Icon={AccountTreeOutlinedIcon}
          link={ZONES_PATH}
        />

        <SmallMainMenuItem
          title={translate('mainMenu.vendors')}
          Icon={LocalShippingOutlinedIcon}
          link={VENDORS_PATH}
        />

        <SmallMainMenuItem
          title={translate('mainMenu.roles')}
          Icon={ManageAccountsOutlinedIcon}
          link={ROLES_PATH}
        />
        <SmallMainMenuItem
          title={translate('mainMenu.typesGoods')}
          Icon={Inventory2OutlinedIcon}
          link={TYPESGOODS_PATH}
        />
        <SmallMainMenuItem
          title={translate('mainMenu.typesDifference')}
          Icon={DifferenceOutlinedIcon}
          link={TYPESDIFFERENCE_PATH}
        />
      </Menu>
    </div>
  )
}
