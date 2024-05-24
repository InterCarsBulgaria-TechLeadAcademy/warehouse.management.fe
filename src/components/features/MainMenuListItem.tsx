import {
  Box,
  ListItemIcon,
  ListItemText,
  MenuItem,
  ThemeProvider,
  createTheme
} from '@mui/material'
import { NavLink } from 'react-router-dom'

interface MainMenuListItemProps {
  title: string
  Icon: React.ElementType
  link: string
}

const theme = createTheme({
  palette: {
    primary: {
      // червено
      main: '#C9022D',
      light: '#BB002133'
    },
    // черно
    secondary: {
      main: '#000000'
    }
  }
})

export default function MainMenuListItem({ title, Icon, link }: MainMenuListItemProps) {
  return (
    <ThemeProvider theme={theme}>
      <MenuItem
        sx={{
          padding: 0,
          '&:hover': {
            background: theme.palette.primary.light,
            color: theme.palette.primary.main,
            '& .MuiSvgIcon-root, & .MuiSvgIcon-fontSizeMedium, & .css-wg28wd-MuiSvgIcon-root & MuiTypography-root, & .MuiTypography-body1, & .MuiListItemText-primary, & .css-10hburv-MuiTypography-root':
              {
                color: theme.palette.primary.main
              }
          }
        }}>
        <Box
          component={NavLink}
          to={link}
          style={({ isActive }) => {
            return {
              background: isActive ? theme.palette.primary.light : 'none',
              color: isActive ? theme.palette.primary.main : theme.palette.secondary.main
            }
          }}
          sx={{
            display: 'flex',
            width: '100%',
            padding: '0.7em 0 0.7em 1.5em',
            gap: '1em',
            color: theme.palette.secondary.main,
            textDecoration: 'none'
          }}>
          <ListItemIcon sx={{ color: 'inherit' }}>
            <Icon />
          </ListItemIcon>
          <ListItemText>{title}</ListItemText>
        </Box>
      </MenuItem>
    </ThemeProvider>
  )
}
