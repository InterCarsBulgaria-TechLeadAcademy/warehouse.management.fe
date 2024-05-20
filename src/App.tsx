import { QueryErrorResetBoundary } from '@tanstack/react-query'
import { ErrorBoundary } from 'react-error-boundary'
import { Box, Button } from '@mui/material'
import { Suspense } from 'react'
import Router from '@/router/router.tsx'
import { FullPageLoader } from '@/components/common/FullPageLoader.tsx'
import CssBaseline from '@mui/material/CssBaseline'
import '@/assets/index.css'

function App() {
  return (
    <>
      <CssBaseline />

      <QueryErrorResetBoundary>
        {({ reset }) => (
          // TODO Make a better error page
          <ErrorBoundary
            fallbackRender={({ error, resetErrorBoundary }) => (
              <div>
                There was an error! <Button onClick={() => resetErrorBoundary()}>Try again</Button>
                <pre style={{ whiteSpace: 'normal' }}>{error.message}</pre>
              </div>
            )}
            onReset={reset}
          >
            <Box height="100%">
              <Suspense fallback={<FullPageLoader />}>
                <Router />
              </Suspense>
            </Box>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </>
  )
}

export default App
