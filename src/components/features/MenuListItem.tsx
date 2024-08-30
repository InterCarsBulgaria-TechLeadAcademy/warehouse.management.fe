import { ListItemIcon, ListItemText, MenuItem } from '@mui/material'
import { NavLink } from 'react-router-dom'
import { useTheme } from '@mui/material/styles'
import { ExtendedTheme } from '@/plugins/muiTheme'

interface MenuItemProps {
  title: string
  Icon: React.ElementType
  link: string
  handleClose?: () => void
}

export default function MenuListItem({ title, Icon, link, handleClose }: MenuItemProps) {
  const theme: ExtendedTheme = useTheme()
  return (
    <MenuItem
      onClick={handleClose}
      sx={{
        display: 'flex',
        padding: '0',
        '&:hover': {
          backgroundColor: 'primary.100',
          color: 'primary.main'
        }
      }}>
      <NavLink
        to={link}
        style={({ isActive }) => ({
          flex: 1,
          display: 'flex',
          width: '100%',
          padding: '0.7em 1.5em 0.7em 1.5em',
          gap: '1em',
          textDecoration: 'none',
          backgroundColor: isActive ? theme.palette.primary['100'] : 'inherit',
          color: isActive ? theme.palette.primary.main : 'inherit'
        })}>
        <ListItemIcon sx={{ color: 'inherit' }}>
          <Icon />
        </ListItemIcon>
        <ListItemText>{title}</ListItemText>
      </NavLink>
    </MenuItem>
  )
}
