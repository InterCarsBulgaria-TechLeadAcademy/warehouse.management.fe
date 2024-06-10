import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import Box from '@mui/material/Box'
import { useForm, SubmitHandler, UseFormReturn, FieldValues } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as React from 'react'
import * as yup from 'yup'
import HorizontalStepper from '../features/Stepper'

interface FormDialogProps<T extends FieldValues> {
  open: boolean
  title: string
  // hasStepper: boolean
  discardText: string
  confirmText: string
  onCloseDialog: () => void
  schema: yup.ObjectSchema<T>
  onSubmit: SubmitHandler<T>
  renderForm: (methods: UseFormReturn<T>) => React.ReactNode
}

export default function FormDialog<T extends FieldValues>({
  open,
  title,
  // hasStepper,
  discardText,
  confirmText,
  onCloseDialog,
  schema,
  onSubmit,
  renderForm
}: FormDialogProps<T>) {
  const { control, handleSubmit, formState, reset } = useForm<T>({
    resolver: yupResolver(schema)
  })

  const handleClose = () => {
    reset()
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

      <Box sx={{ padding: '2em' }}>
        {/* {hasStepper &&  */}
        <HorizontalStepper />
        {/* } */}
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2em',
            // padding: '2em',
            '& .MuiTextField-root': { width: '450px' }
          }}>
          {renderForm({ control, handleSubmit, formState, reset } as UseFormReturn<T>)}

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: '1em' }}>
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={Object.keys(formState.errors).length > 0}>
              {confirmText}
            </Button>

            <Button variant="contained" sx={{ mt: 3, mb: 2 }} onClick={handleClose}>
              {discardText}
            </Button>
          </Box>
        </Box>
      </Box>
    </Dialog>
  )
}
