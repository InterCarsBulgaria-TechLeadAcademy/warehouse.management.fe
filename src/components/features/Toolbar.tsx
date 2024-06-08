import { Box, IconButton } from '@mui/material'
import ProfileMenu from '@/components/features/ProfileMenu'
import SmallMainMenu from '@/components/features/SmallMainMenu'
import LanguageSwitcher from '@/components/features/LanguageSwitcher'
import { useTheme } from '@mui/material/styles'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import { useIsSmallScreen } from '@/hooks/useIsSmallScreen'
import { useThemeContext } from '@/hooks/useThemeContext'

export default function Toolbar() {
  const isSmallScreen: boolean = useIsSmallScreen()
  const theme = useTheme()
  const { toggleColorMode } = useThemeContext()

  return (
    <Box
      component="nav"
      sx={{
        display: 'flex',
        justifyContent: isSmallScreen ? 'space-between' : 'flex-end',
        alignItems: 'center',
        padding: '0.8em 0 0.8em 0',
        boxShadow: '5px 5px 10px darkgray;',
        zIndex: 1
      }}>
      {isSmallScreen ? (
        <Box component="div">
          <SmallMainMenu />
        </Box>
      ) : null}

      <Box
        component="div"
        sx={{
          display: 'flex',
          alignItems: 'center'
        }}>
        <Box>
          {theme.palette.mode} mode
          <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color="inherit">
            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Box>
        <LanguageSwitcher />

        <Box
          component="div"
          sx={{
            display: 'flex',
            alignItems: 'center'
          }}>
          <ProfileMenu />
        </Box>
      </Box>
    </Box>
  )
}
