import Paper from '@mui/material/Paper'
import MenuList from '@mui/material/MenuList'
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined'
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined'
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined'
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined'
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined'
import DifferenceOutlinedIcon from '@mui/icons-material/DifferenceOutlined'
import MainMenuListItem from './MainMenuListItem'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import logo_bg from '../../assets/logo_bg.png'

export default function MainMenu() {
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
        <MainMenuListItem title="Потребители" Icon={PeopleAltOutlinedIcon} link="users" />
        <MainMenuListItem title="Зони" Icon={AccountTreeOutlinedIcon} link="zones" />
        <MainMenuListItem title="Доставчици" Icon={LocalShippingOutlinedIcon} link="vendors" />
        <MainMenuListItem title="Роли" Icon={ManageAccountsOutlinedIcon} link="roles" />
        <MainMenuListItem title="Видове Стока" Icon={Inventory2OutlinedIcon} link="typesGoods" />
        <MainMenuListItem
          title="Тип Разлика"
          Icon={DifferenceOutlinedIcon}
          link="typesDifference"
        />
      </MenuList>
    </Paper>
  )
}
