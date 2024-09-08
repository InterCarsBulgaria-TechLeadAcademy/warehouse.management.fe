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
import { UserPermissionsWrapper } from '@/wrappers/UserPermissionsWrapper.tsx'
import {
  Delivery,
  Difference,
  Entry,
  Marker,
  Role,
  User,
  Vendor,
  Zone
} from '@/types/Permissions.ts'

interface MenuItem {
  title: string
  icon: React.ElementType
  link: string
  permissions?: string[]
}

interface MenuItemsProps {
  handleClose?: () => void
}

export default function MenuItems({ handleClose }: MenuItemsProps) {
  const { t: translate } = useTranslation()

  const adminMenuItems: MenuItem[] = [
    {
      title: translate('menu.menuItems.users'),
      icon: PeopleAltOutlinedIcon,
      link: USERS_PATH,
      permissions: [User.All]
    },
    {
      title: translate('menu.menuItems.zones'),
      icon: AccountTreeOutlinedIcon,
      link: ZONES_PATH,
      permissions: [Zone.GetAll]
    },
    {
      title: translate('menu.menuItems.vendors'),
      icon: LocalShippingOutlinedIcon,
      link: VENDORS_PATH,
      permissions: [Vendor.All]
    },
    {
      title: translate('menu.menuItems.roles'),
      icon: ManageAccountsOutlinedIcon,
      link: ROLES_PATH,
      permissions: [Role.All]
    },
    {
      title: translate('menu.menuItems.typesDifference'),
      icon: DifferenceOutlinedIcon,
      link: DIFFERENCETYPE_PATH,
      permissions: [Difference.All]
    },
    {
      title: translate('menu.menuItems.markers'),
      icon: AlignHorizontalRightIcon,
      link: MARKERS_PATH,
      permissions: [Marker.GetAll]
    }
  ]

  const mainMenuItems: MenuItem[] = [
    {
      title: translate('menu.menuItems.zonesContent'),
      icon: AccountTreeOutlinedIcon,
      link: ZONES_CONTENT_PATH,
      permissions: [Entry.All]
    },
    {
      title: translate('menu.menuItems.deliveries'),
      icon: LocalShippingOutlinedIcon,
      link: DELIVERIES_PATH,
      permissions: [Delivery.GetDeliveries]
    },
    {
      title: translate('menu.menuItems.differences'),
      icon: DifferenceIcon,
      link: DIFFERENCES_PATH,
      permissions: [Difference.All]
    }
  ]

  return [...adminMenuItems, ...mainMenuItems].map((menuItem, index) => (
    <UserPermissionsWrapper permissions={menuItem.permissions || []} key={index}>
      <MenuListItem
        key={index}
        title={menuItem.title}
        Icon={menuItem.icon}
        link={menuItem.link}
        handleClose={handleClose}
      />
    </UserPermissionsWrapper>
  ))
}
