import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined'
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined'
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined'
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined'
import DifferenceOutlinedIcon from '@mui/icons-material/DifferenceOutlined'
import AlignHorizontalRightIcon from '@mui/icons-material/AlignHorizontalRight'
import DifferenceIcon from '@mui/icons-material/Difference'
import MenuListItem from './MenuListItem'
import { useTranslation } from 'react-i18next'
import {
  ROLES_PATH,
  USERS_PATH,
  VENDORS_PATH,
  ZONES_PATH,
  MARKERS_PATH,
  DELIVERIES_PATH,
  ZONES_CONTENT_PATH,
  DIFFERENCETYPE_PATH,
  DIFFERENCES_PATH
} from '@/router/routerPaths'

interface MenuItem {
  title: string
  icon: React.ElementType
  link: string
}

interface MenuItemsProps {
  onClose: () => void
}

export default function MenuItems({ onClose }: MenuItemsProps) {
  const { t: translate } = useTranslation()

  const adminMenuItems: MenuItem[] = [
    {
      title: translate('menu.menuItems.users'),
      icon: PeopleAltOutlinedIcon,
      link: USERS_PATH
    },
    {
      title: translate('menu.menuItems.zones'),
      icon: AccountTreeOutlinedIcon,
      link: ZONES_PATH
    },
    {
      title: translate('menu.menuItems.vendors'),
      icon: LocalShippingOutlinedIcon,
      link: VENDORS_PATH
    },
    {
      title: translate('menu.menuItems.roles'),
      icon: ManageAccountsOutlinedIcon,
      link: ROLES_PATH
    },
    {
      title: translate('menu.menuItems.typesDifference'),
      icon: DifferenceOutlinedIcon,
      link: DIFFERENCETYPE_PATH
    },
    {
      title: translate('menu.menuItems.markers'),
      icon: AlignHorizontalRightIcon,
      link: MARKERS_PATH
    }
  ]

  const mainMenuItems: MenuItem[] = [
    {
      title: translate('menu.menuItems.zonesContent'),
      icon: AccountTreeOutlinedIcon,
      link: ZONES_CONTENT_PATH
    },
    {
      title: translate('menu.menuItems.deliveries'),
      icon: LocalShippingOutlinedIcon,
      link: DELIVERIES_PATH
    },
    {
      title: translate('menu.menuItems.differences'),
      icon: DifferenceIcon,
      link: DIFFERENCES_PATH
    }
  ]

  return [...adminMenuItems, ...mainMenuItems].map((menuItem, index) => (
    <MenuListItem
      key={index}
      title={menuItem.title}
      Icon={menuItem.icon}
      link={menuItem.link}
      onClose={onClose}
    />
  ))
}
