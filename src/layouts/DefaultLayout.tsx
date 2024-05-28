import { Box } from '@mui/material'
import { ReactNode } from 'react'
import MenuDrawer from '@/components/features/MenuDrawer'
import Toolbar from '@/components/features/Toolbar'
import { isSmallScreenUtils } from '@/utils/isSmallScreenUtils'

interface ChildrenComponent {
  children: ReactNode
}

export default function DefaultLayout({ children }: ChildrenComponent) {
  const isSmallScreen: boolean = isSmallScreenUtils()

  return (
    <>
      <Box component="section" sx={{ display: 'flex' }}>
        <MenuDrawer />
        <Box
          component="article"
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column'
          }}>
          <Toolbar />
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
