import { Box } from '@mui/material'
import ProfileMenu from '@/components/features/ProfileMenu'
import SmallMainMenu from '@/components/features/SmallMainMenu'
import LanguageSwitcher from '@/components/features/LanguageSwitcher'
import { isSmallScreenUtils } from '@/utils/isSmallScreenUtils'

export default function Toolbar() {
  const isSmallScreen: boolean = isSmallScreenUtils()
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
