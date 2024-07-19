import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import Box from '@mui/material/Box'
import { useForm, SubmitHandler, UseFormReturn, FieldValues } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as React from 'react'
import * as yup from 'yup'
import HorizontalStepper from '../features/Stepper'
import { useTranslation } from 'react-i18next'

interface FormDialogProps<T extends FieldValues> {
  open: boolean
  title: string
  discardText: string
  confirmText: string
  onCloseDialog: () => void
  handleBack?: () => void
  schema: yup.ObjectSchema<any> | undefined
  onSubmit: SubmitHandler<T>
  renderForm: (methods: UseFormReturn<T>) => React.ReactNode
  steps?: string[]
  currentStep?: number
  isCompletedMove?: boolean
}

export default function FormDialog<T extends FieldValues>({
  open,
  title,
  discardText,
  confirmText,
  onCloseDialog,
  handleBack,
  schema,
  onSubmit,
  renderForm,
  steps,
  currentStep,
  isCompletedMove
}: FormDialogProps<T>) {
  const { t: translate } = useTranslation()
  const { control, handleSubmit, formState, reset } = useForm<T>({
    resolver: schema ? yupResolver(schema) : undefined
  })

  const handleClose = () => {
    reset()
    onCloseDialog()
  }

  const handleFormSubmit: SubmitHandler<T> = (data, event) => {
    onSubmit(data, event)
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

      <Box sx={{ margin: '2em', minWidth: '450px' }}>
        {steps && currentStep && <HorizontalStepper currentStep={currentStep} steps={steps} />}
        <Box
          component="form"
          onSubmit={currentStep ? handleSubmit(onSubmit) : handleSubmit(handleFormSubmit)}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2em'
          }}>
          {renderForm({ control, handleSubmit, formState, reset } as UseFormReturn<T>)}

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: '1em' }}>
            <Button
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={currentStep ? (currentStep === 1 ? handleClose : handleBack) : handleClose}>
              {currentStep === 1 ? translate('deliveries.newDelivery.labels.exit') : discardText}
            </Button>

            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={
                currentStep === 4 ? !isCompletedMove : Object.keys(formState.errors).length > 0
              }>
              {currentStep && currentStep === steps?.length
                ? translate('deliveries.newDelivery.labels.step5.createNewDelivery')
                : confirmText}
            </Button>
          </Box>
        </Box>
      </Box>
    </Dialog>
  )
}
