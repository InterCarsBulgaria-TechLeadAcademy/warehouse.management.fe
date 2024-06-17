import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined'
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined'
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined'
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined'
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined'
import DifferenceOutlinedIcon from '@mui/icons-material/DifferenceOutlined'
import AlignHorizontalRightIcon from '@mui/icons-material/AlignHorizontalRight'
import MenuListItem from './MenuListItem'
import { useTranslation } from 'react-i18next'
import {
  TYPESDIFFERENCE_PATH,
  ROLES_PATH,
  TYPESGOODS_PATH,
  USERS_PATH,
  VENDORS_PATH,
  ZONES_PATH,
  MARKERS_PATH,
  DELIVERIES_PATH,
  ZONES_CONTENT_PATH
} from '@/router/routerPaths'

interface MenuItem {
  title: string
  icon: React.ElementType
  link: string
}

export default function MenuItems() {
  const { t: translate } = useTranslation()

  const adminMenuItems: MenuItem[] = [
    {
      title: translate('menuItems.users'),
      icon: PeopleAltOutlinedIcon,
      link: USERS_PATH
    },
    {
      title: translate('menuItems.zones'),
      icon: AccountTreeOutlinedIcon,
      link: ZONES_PATH
    },
    {
      title: translate('menuItems.vendors'),
      icon: LocalShippingOutlinedIcon,
      link: VENDORS_PATH
    },
    {
      title: translate('menuItems.roles'),
      icon: ManageAccountsOutlinedIcon,
      link: ROLES_PATH
    },
    {
      title: translate('menuItems.typesGoods'),
      icon: Inventory2OutlinedIcon,
      link: TYPESGOODS_PATH
    },
    {
      title: translate('menuItems.typesDifference'),
      icon: DifferenceOutlinedIcon,
      link: TYPESDIFFERENCE_PATH
    },
    {
      title: translate('menuItems.markers'),
      icon: AlignHorizontalRightIcon,
      link: MARKERS_PATH
    }
  ]

  const mainMenuItems: MenuItem[] = [
    {
      title: translate('menuItems.zonesContent'),
      icon: AccountTreeOutlinedIcon,
      link: ZONES_CONTENT_PATH
    },
    {
      title: translate('menuItems.deliveries'),
      icon: LocalShippingOutlinedIcon,
      link: DELIVERIES_PATH
    }
  ]

  // Return for admin paths
  // return adminMenuItems.map((adminMenuItem, index) => (
  //   <MenuListItem
  //     key={index}
  //     title={adminMenuItem.title}
  //     Icon={adminMenuItem.icon}
  //     link={adminMenuItem.link}
  //   />
  // ))

  // Return main paths
  return mainMenuItems.map((mainMenuItem, index) => (
    <MenuListItem
      key={index}
      title={mainMenuItem.title}
      Icon={mainMenuItem.icon}
      link={mainMenuItem.link}
    />
  ))
}

// import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined'
// import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined'
// import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined'
// import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined'
// import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined'
// import DifferenceOutlinedIcon from '@mui/icons-material/DifferenceOutlined'
// import AlignHorizontalRightIcon from '@mui/icons-material/AlignHorizontalRight'
// import MenuListItem from './MenuListItem'
// import { useTranslation } from 'react-i18next'
// import {
//   TYPESDIFFERENCE_PATH,
//   ROLES_PATH,
//   TYPESGOODS_PATH,
//   USERS_PATH,
//   VENDORS_PATH,
//   ZONES_PATH,
//   MARKERS_PATH,
//   DELIVERIES_PATH,
//   ZONES_CONTENT_PATH
// } from '@/router/routerPaths'

// interface MenuItem {
//   title: string
//   icon: React.ElementType
//   link: string
// }

// export default function MenuItems() {
//   const { t: translate } = useTranslation()

//   const MenuItems: MenuItem[] = [
//     {
//       title: translate('menuItems.users'),
//       icon: PeopleAltOutlinedIcon,
//       link: `/admin/${USERS_PATH}`
//     },
//     {
//       title: translate('menuItems.zones'),
//       icon: AccountTreeOutlinedIcon,
//       link: `/admin/${ZONES_PATH}`
//     },
//     {
//       title: translate('menuItems.zonesContent'),
//       icon: AccountTreeOutlinedIcon,
//       link: `/main/${ZONES_CONTENT_PATH}`
//     },
//     {
//       title: translate('menuItems.vendors'),
//       icon: LocalShippingOutlinedIcon,
//       link: `/admin/${VENDORS_PATH}`
//     },
//     {
//       title: translate('menuItems.roles'),
//       icon: ManageAccountsOutlinedIcon,
//       link: `/admin/${ROLES_PATH}`
//     },
//     {
//       title: translate('menuItems.typesGoods'),
//       icon: Inventory2OutlinedIcon,
//       link: `/admin/${TYPESGOODS_PATH}`
//     },
//     {
//       title: translate('menuItems.typesDifference'),
//       icon: DifferenceOutlinedIcon,
//       link: `/admin/${TYPESDIFFERENCE_PATH}`
//     },
//     {
//       title: translate('menuItems.markers'),
//       icon: AlignHorizontalRightIcon,
//       link: `/admin/${MARKERS_PATH}`
//     },
//     {
//       title: translate('menuItems.deliveries'),
//       icon: LocalShippingOutlinedIcon,
//       link: `/main/${DELIVERIES_PATH}`
//     }
//   ]
//   return MenuItems.map((menuItem, index) => (
//     <MenuListItem key={index} title={menuItem.title} Icon={menuItem.icon} link={menuItem.link} />
//   ))
// }
