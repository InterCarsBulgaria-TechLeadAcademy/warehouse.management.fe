import { createContext, ReactNode, useState } from 'react'
import { Alert, Snackbar } from '@mui/material'
import { ShowSnackBarProps, SnackbarContextValue } from '@/interfaces/SnackbarContextValue'

export const SnackbarContext = createContext<SnackbarContextValue | undefined>(undefined)

export default function SnackbarProvider({ children }: { children: ReactNode }) {
  const [snackbar, setSnackbar] = useState<{
    message: string
    type: 'success' | 'error' | 'warning' | 'info'
    timeOut: number
    open: boolean
  }>({ message: '', type: 'info', timeOut: 0, open: false })

  function showSnackbar(data: ShowSnackBarProps) {
    setSnackbar({
      message: data.message,
      type: data.type,
      timeOut: data?.timeOut || 5000,
      open: true
    })
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
        autoHideDuration={snackbar.timeOut}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
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
