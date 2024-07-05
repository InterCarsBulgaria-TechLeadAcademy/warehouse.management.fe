import * as React from 'react'
import Button from '@mui/material/Button'
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'

interface State extends SnackbarOrigin {
  open: boolean
}

export default function AlertsSnackbar() {
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
      <Button onClick={handleClick({ vertical: 'top', horizontal: 'right' })}>Open Snackbar</Button>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" variant="filled" sx={{ width: '100%' }}>
          This is a success Alert inside a Snackbar!
        </Alert>
      </Snackbar>
    </div>
  )
}
