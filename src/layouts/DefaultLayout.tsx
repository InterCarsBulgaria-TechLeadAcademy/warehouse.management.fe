import { Box } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'
import { ReactNode } from 'react'
import MenuDrawer from '@/components/features/MenuDrawer'
import Toolbar from '@/components/features/Toolbar'

interface ChildrenComponent {
  children: ReactNode
}

export default function DefaultLayout({ children }: ChildrenComponent) {
  const isSmallScreen = useMediaQuery('(max-width: 800px)')

  return (
    <>
      <Box component="section" sx={{ display: 'flex' }}>
        <MenuDrawer isSmallScreen={isSmallScreen} />
        <Box
          component="article"
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column'
          }}>
          <Toolbar isSmallScreen={isSmallScreen} />
          <Box
            component="div"
            sx={{
              flexGrow: 1,
              height: isSmallScreen ? '100vh' : 'auto',
              background: '#e6e6e6'
            }}>
            {children}
          </Box>
        </Box>
      </Box>
    </>
  )
}
