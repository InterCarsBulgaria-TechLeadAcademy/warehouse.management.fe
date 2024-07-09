import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import Box from '@mui/material/Box'
import * as React from 'react'

interface DialogFormProps {
  open: boolean
  onCloseDialog: () => void
  title: string
  renderForm: (handleCloseForm: () => void) => React.ReactNode
}

export default function BaseFormDialog({ open, onCloseDialog, title, renderForm }: DialogFormProps) {
  const handleClose = () => {
    onCloseDialog()
  }

  const handleCloseForm = () => {
    onCloseDialog()
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title" sx={{ textAlign: 'center' }}>
        {title}
      </DialogTitle>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '2em',
          padding: '2em',
          '& .MuiTextField-root': { width: '450px' }
        }}>
        {renderForm(handleCloseForm)}
      </Box>
    </Dialog>
  )
}