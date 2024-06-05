import { Box } from '@mui/material'
import MenuDrawer from '@/components/features/MenuDrawer'
import Toolbar from '@/components/features/Toolbar'
import { ReactNode } from 'react'
import { useThemeContext } from '@/contexts/Theme'

interface ChildrenComponent {
  children: ReactNode
}

export default function DefaultLayout({ children }: ChildrenComponent) {
  const { mode }: any = useThemeContext()
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
              backgroundColor: mode === 'light' ? '#e6e6e6' : '#606060'
            }}>
            {children}
          </Box>
        </Box>
      </Box>
    </>
  )
}
