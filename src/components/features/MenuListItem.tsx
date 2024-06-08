import { useIsSmallScreen } from '@/hooks/useIsSmallScreen'
import { Box, ListItemIcon, ListItemText, MenuItem } from '@mui/material'
import { NavLink } from 'react-router-dom'
import { useTheme } from '@mui/material/styles'
import { ExtendedTheme } from '@/plugins/muiTheme'

interface MenuItemProps {
  title: string
  Icon: React.ElementType
  link: string
}

export default function MenuListItem({ title, Icon, link }: MenuItemProps) {
  const isSmallScreen: boolean = useIsSmallScreen()
  const theme: ExtendedTheme = useTheme()
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
            backgroundColor: isActive ? theme.palette.primary['100'] : 'inherit',
            color: isActive ? theme.palette.primary.main : 'inherit'
          }
        }}
        sx={{
          display: 'flex',
          width: '100%',
          padding: isSmallScreen ? '0em 0.7em' : '0.7em 0 0.7em 1.5em',
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
