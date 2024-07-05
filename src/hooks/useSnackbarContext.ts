import * as React from 'react'
import { SnackbarContext } from '@/contexts/Snackbar'
import { SnackbarContextValue } from '@/interfaces/snackbarContextValue'

export const useSnackbarContext = (): SnackbarContextValue => {
  const context = React.useContext(SnackbarContext)
  if (!context) {
    throw new Error('useSnackbarContext must be used within a SnackbarProvider')
  }
  return context
}
