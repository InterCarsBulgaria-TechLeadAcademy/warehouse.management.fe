import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined'
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined'
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined'
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined'
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined'
import DifferenceOutlinedIcon from '@mui/icons-material/DifferenceOutlined'
import MenuListItem from './MenuItem'
import { useTranslation } from 'react-i18next'
import {
  TYPESDIFFERENCE_PATH,
  ROLES_PATH,
  TYPESGOODS_PATH,
  USERS_PATH,
  VENDORS_PATH,
  ZONES_PATH
} from '@/router/routerPaths'

interface MenuItem {
  title: string
  icon: React.ElementType
  link: string
}

export default function MenuItems() {
  const { t: translate } = useTranslation()

  const MenuItems: MenuItem[] = [
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
  return MenuItems.map((menuItem, index) => (
    <MenuListItem key={index} title={menuItem.title} Icon={menuItem.icon} link={menuItem.link} />
  ))
}
