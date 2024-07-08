import * as React from 'react'
import { SnackbarContext } from '@/contexts/Snackbar'
import { SnackbarContextValue } from '@/interfaces/SnackbarContextValue'

export const useSnackbar = (): SnackbarContextValue => {
  const context = React.useContext(SnackbarContext)
  if (!context) {
    throw new Error('useSnackbar must be used within a SnackbarProvider')
  }
  return context
}
