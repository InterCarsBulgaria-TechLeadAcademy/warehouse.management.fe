import Paper from '@mui/material/Paper'
import MenuList from '@mui/material/MenuList'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import logo_bg from '../../assets/logo_bg.png'
import MenuItems from './MenuItems'

export default function MainMenu() {
  return (
    <Paper
      sx={{
        width: '304px',
        maxWidth: '100%',
        height: '100vh',
        borderRadius: 0
      }}>
      <List sx={{ width: '100%', maxWidth: 360 }}>
        <ListItem sx={{ display: 'flex' }}>
          <ListItemAvatar>
            <Avatar alt="intercars-logo-bg" src={logo_bg} />
          </ListItemAvatar>

          <ListItemText
            primary={
              <Typography component="h2" sx={{ fontSize: '1.5em', fontWeight: 'bold' }}>
                Intercars Bulgaria
              </Typography>
            }
          />
        </ListItem>
      </List>

      <MenuList>
        <MenuItems />
      </MenuList>
    </Paper>
  )
}
