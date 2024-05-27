import { Box, ListItemIcon, ListItemText, MenuItem } from '@mui/material'
import { Link } from 'react-router-dom'

interface SmallMainMenuItemProps {
  title: string
  Icon: React.ElementType
  link: string
}

export default function SmallMainMenuItem({ title, Icon, link }: SmallMainMenuItemProps) {
  return (
    <MenuItem
      // onClick={handleClose}
      sx={{
        display: 'flex'
      }}>
      <Box
        component={Link}
        to={link}
        color="secondary.main"
        sx={{
          display: 'flex',
          width: '100%',
          //   color: 'black',
          textDecoration: 'none'
        }}>
        <ListItemIcon sx={{ color: 'secondary.main' }}>
          <Icon />
        </ListItemIcon>
        <ListItemText>{title}</ListItemText>
      </Box>
    </MenuItem>
  )
}
