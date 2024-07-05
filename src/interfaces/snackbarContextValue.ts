import { SnackbarOrigin } from '@mui/material'

export interface SnackbarContextValue {
  showSnackbar: (
    message: string,
    type: 'success' | 'error' | 'warning' | 'info',
    position?: SnackbarOrigin
  ) => void
}
