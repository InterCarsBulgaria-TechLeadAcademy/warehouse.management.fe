import { Box } from '@mui/material'
import { ReactNode } from 'react'
import MenuDrawer from '@/components/features/MenuDrawer'
import Toolbar from '@/components/features/Toolbar'

interface ChildrenComponent {
  children: ReactNode
}

export default function DefaultLayout({ children }: ChildrenComponent) {
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
              backgroundColor: '#e6e6e6'
            }}>
            {children}
          </Box>
        </Box>
      </Box>
    </>
  )
}
