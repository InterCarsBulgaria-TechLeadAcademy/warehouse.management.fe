import { Box, ListItemIcon, ListItemText, MenuItem } from '@mui/material'
import { NavLink } from 'react-router-dom'

interface MainMenuListItemProps {
  title: string
  Icon: React.ElementType
  link: string
}

export default function MainMenuListItem({ title, Icon, link }: MainMenuListItemProps) {
  return (
    <MenuItem
      sx={{
        padding: 0,
        '&:hover': {
          backgroundColor: 'primary.100',
          color: 'primary.main',
          '& .MuiSvgIcon-root, & .MuiSvgIcon-fontSizeMedium, & .css-wg28wd-MuiSvgIcon-root & MuiTypography-root, & .MuiTypography-body1, & .MuiListItemText-primary, & .css-10hburv-MuiTypography-root':
            {
              color: 'primary.main'
            }
        }
      }}>
      <Box
        component={NavLink}
        to={link}
        style={({ isActive }) => {
          return {
            backgroundColor: isActive ? 'primary.100' : 'none',
            color: isActive ? 'primary.main' : 'secondary.main'
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
