import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import Box from '@mui/material/Box'
import { useForm, SubmitHandler, UseFormReturn, FieldValues } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as React from 'react'
import * as yup from 'yup'
import HorizontalStepper from '../features/Stepper'
import { useIsSmallScreen } from '@/hooks/useIsSmallScreen'
import { useTranslation } from 'react-i18next'
import { useNewDeliveryContext } from '@/hooks/useNewDeliveryContext'
import useNewDeliverySteps from '@/hooks/useNewDeliverySteps'

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
  renderForm
}: FormDialogProps<T>) {
  const isSmallScreen = useIsSmallScreen()
  const { t: translate } = useTranslation()
  const { control, handleSubmit, formState, reset } = useForm<T>({
    resolver: schema ? yupResolver(schema) : undefined
  })
  const steps = useNewDeliverySteps()
  const { currentStep, isCompletedMove } = useNewDeliveryContext()

  const handleClose = () => {
    reset()
    onCloseDialog()
  }

  //За страниците, различни от newDelivery да не се вижда степера

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
          margin: '2em',
          '& .css-1qxadfk-MuiPaper-root-MuiDialog-paper': { maxWidth: 'auto' }
        }}>
        {steps && <HorizontalStepper steps={steps} currentStep={currentStep} />}
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2em',
            ...(isSmallScreen
              ? {}
              : // : {
                //     // '& .MuiTypography-root': { minWidth: '400px' }
                //   }
                {
                  // minWidth: '400px'
                })
          }}>
          {renderForm({ control, handleSubmit, formState, reset } as UseFormReturn<T>)}

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: '1em' }}>
            <Button
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={currentStep === 1 ? handleClose : handleBack}>
              {currentStep === 1 ? translate('newDelivery.labels.exit') : discardText}
            </Button>

            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={
                currentStep === 4 ? !isCompletedMove : Object.keys(formState.errors).length > 0
              }>
              {confirmText}
            </Button>
          </Box>
        </Box>
      </Box>
    </Dialog>
  )
}
