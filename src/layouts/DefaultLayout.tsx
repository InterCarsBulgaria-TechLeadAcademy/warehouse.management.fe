import { Box } from '@mui/material'
import MenuDrawer from '@/components/features/MenuDrawer'
import Toolbar from '@/components/features/Toolbar'
import { Outlet } from 'react-router-dom'
import { ReactNode } from 'react'
import { useTheme } from '@mui/material/styles'

interface ChildrenComponent {
  children?: ReactNode
}

export default function DefaultLayout({ children }: ChildrenComponent) {
  const theme = useTheme()
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
              backgroundColor:
                theme.palette.mode === 'light'
                  ? theme.palette.grey['300']
                  : theme.palette.grey['800']
            }}>
            {children}
            <Outlet />
          </Box>
        </Box>
      </Box>
    </>
  )
}
