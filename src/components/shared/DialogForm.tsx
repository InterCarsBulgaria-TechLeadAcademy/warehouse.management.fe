import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import Box from '@mui/material/Box'
import * as React from 'react'

interface DialogFormProps {
  open: boolean
  title: string
  children: React.ReactNode
}

export default function DialogForm({
  open,
  title,
  children,
}: DialogFormProps) {

  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title" sx={{ textAlign: 'center' }}>
        {title}
      </DialogTitle>

      <Box
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '2em',
          padding: '2em',
          '& .MuiTextField-root': { width: '450px' }
        }}
      >
        {children}
      </Box>
    </Dialog>
  )
}
