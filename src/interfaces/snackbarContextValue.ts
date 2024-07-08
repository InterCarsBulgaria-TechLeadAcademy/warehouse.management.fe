export interface ShowSnackBarProps {
  message: string
  type: 'success' | 'error' | 'warning' | 'info'
  timeOut?: number
}

export interface SnackbarContextValue {
  showSnackbar: (data: ShowSnackBarProps) => void
}
