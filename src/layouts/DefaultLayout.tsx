import { Box, Button } from '@mui/material'
import MenuDrawer from '@/components/features/MenuDrawer'
import Toolbar from '@/components/features/Toolbar'
import { Outlet } from 'react-router-dom'
import { Suspense } from 'react'
import { useTheme } from '@mui/material/styles'
import { ErrorBoundary } from 'react-error-boundary'
import { FullPageLoader } from '@/components/common/FullPageLoader.tsx'
import { QueryErrorResetBoundary } from '@tanstack/react-query'

export default function DefaultLayout() {
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
            <QueryErrorResetBoundary>
              {({ reset }) => (
                // TODO Make a better error page
                <ErrorBoundary
                  fallbackRender={({ error, resetErrorBoundary }) => (
                    <div>
                      There was an error!{' '}
                      <Button onClick={() => resetErrorBoundary()}>Try again</Button>
                      <pre style={{ whiteSpace: 'normal' }}>{error.message}</pre>
                    </div>
                  )}
                  onReset={reset}>
                  <Box height="100%">
                    <Suspense fallback={<FullPageLoader />}>
                      <Outlet />
                    </Suspense>
                  </Box>
                </ErrorBoundary>
              )}
            </QueryErrorResetBoundary>
          </Box>
        </Box>
      </Box>
    </>
  )
}
