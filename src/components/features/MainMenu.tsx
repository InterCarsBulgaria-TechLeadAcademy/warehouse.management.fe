import Paper from '@mui/material/Paper'
import MenuList from '@mui/material/MenuList'
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined'
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined'
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined'
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined'
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined'
import DifferenceOutlinedIcon from '@mui/icons-material/DifferenceOutlined'
import MainMenuListItem from './MainMenuItem'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'
import logo_bg from '../../assets/logo_bg.png'

import {
  TYPESDIFFERENCE_PATH,
  ROLES_PATH,
  TYPESGOODS_PATH,
  USERS_PATH,
  VENDORS_PATH,
  ZONES_PATH
} from '@/router/routerPaths'

interface MainMenuItem {
  title: string
  icon: React.ElementType
  link: string
}

export default function MainMenu() {
  const { t: translate } = useTranslation()

  const mainMenuItems: MainMenuItem[] = [
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
    <Paper
      sx={{
        width: '304px',
        maxWidth: '100%',
        height: '100vh',
        borderRadius: 0
      }}>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        <ListItem
          sx={{
            display: 'flex'
          }}>
          <ListItemAvatar>
            <Avatar alt="intercars-logo-bg" src={logo_bg} />
          </ListItemAvatar>

          <ListItemText
            primary={
              <Typography
                component="h2"
                sx={{
                  fontSize: '1.5em',
                  fontWeight: 'bold'
                }}>
                Intercars Bulgaria
              </Typography>
            }
          />
        </ListItem>
      </List>

      <MenuList>
        {mainMenuItems.map((mainMenuItem, index) => (
          <MainMenuListItem
            key={index}
            title={mainMenuItem.title}
            Icon={mainMenuItem.icon}
            link={mainMenuItem.link}
          />
        ))}
      </MenuList>
    </Paper>
  )
}
