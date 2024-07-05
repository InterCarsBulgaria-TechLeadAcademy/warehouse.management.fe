import * as React from 'react'
import Button from '@mui/material/Button'
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar'
import Alert, { AlertColor } from '@mui/material/Alert'

interface State extends SnackbarOrigin {
  open: boolean
}

interface AlertSnackbarProps {
  title: string | React.ReactNode
  type: AlertColor
  message: string
}

export default function AlertSnackbar({ title, type, message }: AlertSnackbarProps) {
  const [state, setState] = React.useState<State>({
    open: false,
    vertical: 'top',
    horizontal: 'right'
  })
  const { vertical, horizontal, open } = state

  const handleClick = (newState: SnackbarOrigin) => () => {
    setState({ ...newState, open: true })
  }

  const handleClose = () => {
    setState({ ...state, open: false })
  }

  return (
    <div>
      <Button onClick={handleClick({ vertical: 'top', horizontal: 'right' })}>{title}</Button>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}>
        <Alert onClose={handleClose} severity={type} variant="filled" sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  )
}
