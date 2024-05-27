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

interface SmallMainMenuItem {
  title: string
  icon: React.ElementType
  link: string
}

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

  const smallMainMenuItems: SmallMainMenuItem[] = [
    {
      title: translate('mainMenu.users'),
      icon: PeopleAltOutlinedIcon,
      link: USERS_PATH
    },
    {
      title: translate('mainMenu.zones'),
      icon: AccountTreeOutlinedIcon,
      link: ZONES_PATH
    },
    {
      title: translate('mainMenu.vendors'),
      icon: LocalShippingOutlinedIcon,
      link: VENDORS_PATH
    },
    {
      title: translate('mainMenu.roles'),
      icon: ManageAccountsOutlinedIcon,
      link: ROLES_PATH
    },
    {
      title: translate('mainMenu.typesGoods'),
      icon: Inventory2OutlinedIcon,
      link: TYPESGOODS_PATH
    },
    {
      title: translate('mainMenu.typesDifference'),
      icon: DifferenceOutlinedIcon,
      link: TYPESDIFFERENCE_PATH
    }
  ]

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
        {smallMainMenuItems.map((smallMainMenuItem, index) => (
          <SmallMainMenuItem
            key={index}
            title={smallMainMenuItem.title}
            Icon={smallMainMenuItem.icon}
            link={smallMainMenuItem.link}
          />
        ))}
      </Menu>
    </div>
  )
}
