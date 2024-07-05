import { createContext, ReactNode, useState } from 'react'
import { Alert, Snackbar, SnackbarOrigin } from '@mui/material'
import { SnackbarContextValue } from '@/interfaces/snackbarContextValue'

export const SnackbarContext = createContext<SnackbarContextValue | undefined>(undefined)

export default function SnackbarProvider({ children }: { children: ReactNode }) {
  const [snackbar, setSnackbar] = useState<{
    message: string
    type: 'success' | 'error' | 'warning' | 'info'
    open: boolean
    position?: SnackbarOrigin
  }>({ message: '', type: 'info', open: false })

  function showSnackbar(
    message: string,
    type: 'success' | 'error' | 'warning' | 'info',
    position?: SnackbarOrigin
  ) {
    setSnackbar({ message, type, open: true, position })
  }

  const handleClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }))
  }

  const snackbarContextValue: SnackbarContextValue = {
    showSnackbar
  }

  return (
    <SnackbarContext.Provider value={snackbarContextValue}>
      {children}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={snackbar.position || { vertical: 'top', horizontal: 'right' }}>
        <Alert
          onClose={handleClose}
          severity={snackbar.type}
          variant="filled"
          sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  )
}
