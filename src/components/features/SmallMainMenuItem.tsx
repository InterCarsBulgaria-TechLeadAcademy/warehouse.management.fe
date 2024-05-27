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
