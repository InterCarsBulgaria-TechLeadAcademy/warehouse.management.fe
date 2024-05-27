import MainMenu from '@/components/features/MainMenu'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { Box } from '@mui/system'
import { useState } from 'react'

interface MenuDrawerProps {
  isSmallScreen: boolean
}

export default function MenuDrawer({ isSmallScreen }: MenuDrawerProps) {
  const [isHideMenu, setIsHideMenu] = useState(false)

  function hideMenuHandler() {
    setIsHideMenu(true)
  }

  function showMenuHandler() {
    setIsHideMenu(false)
  }
  return (
    <>
      {isSmallScreen ? null : (
        <Box component="article" sx={{ display: 'flex' }}>
          {isHideMenu ? (
            <ArrowForwardIosIcon
              onClick={showMenuHandler}
              sx={{
                alignSelf: 'center',
                height: '100vh'
              }}
            />
          ) : (
            <>
              <MainMenu />
              <ArrowBackIosNewIcon onClick={hideMenuHandler} sx={{ alignSelf: 'center' }} />
            </>
          )}
        </Box>
      )}
    </>
  )
}
