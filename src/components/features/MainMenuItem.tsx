import { Box, ListItemIcon, ListItemText, MenuItem } from '@mui/material'
import { NavLink } from 'react-router-dom'

interface MainMenuItemProps {
  title: string
  Icon: React.ElementType
  link: string
}

export default function MainListItem({ title, Icon, link }: MainMenuItemProps) {
  return (
    <MenuItem
      sx={{
        padding: 0,
        '&:hover': {
          backgroundColor: 'primary.100',
          color: 'primary.main'
        }
      }}>
      <Box
        component={NavLink}
        to={link}
        style={({ isActive }) => {
          return {
            backgroundColor: isActive ? 'primary.100' : 'none',
            color: 'inherit'
          }
        }}
        sx={{
          display: 'flex',
          width: '100%',
          padding: '0.7em 0 0.7em 1.5em',
          gap: '1em',
          color: 'secondary.main',
          textDecoration: 'none'
        }}>
        <ListItemIcon sx={{ color: 'inherit' }}>
          <Icon />
        </ListItemIcon>
        <ListItemText>{title}</ListItemText>
      </Box>
    </MenuItem>
  )
}
