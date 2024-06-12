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

interface FormDialogProps<T extends FieldValues> {
  open: boolean
  title: string
  steps?: string[]
  activeStep?: number
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
  steps,
  activeStep = 0,
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

  const handleClose = () => {
    reset()
    onCloseDialog()
  }

  console.log(Object.keys(formState.errors))

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title" sx={{ textAlign: 'center' }}>
        {title}
      </DialogTitle>

      <Box sx={{ margin: '2em' }}>
        {steps && <HorizontalStepper steps={steps} activeStep={activeStep} />}
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2em',
            ...(isSmallScreen
              ? {}
              : {
                  '& .MuiTextField-root': { minWidth: '450px' }
                })
          }}>
          {renderForm({ control, handleSubmit, formState, reset } as UseFormReturn<T>)}

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: '1em' }}>
            <Button
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={activeStep === 0 ? handleClose : handleBack}>
              {activeStep === 0 ? translate('newDelivery.labels.exit') : discardText}
            </Button>

            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={Object.keys(formState.errors).length > 0}>
              {confirmText}
            </Button>
          </Box>
        </Box>
      </Box>
    </Dialog>
  )
}

// import Button from '@mui/material/Button'
// import Dialog from '@mui/material/Dialog'
// import DialogTitle from '@mui/material/DialogTitle'
// import Box from '@mui/material/Box'
// import { useForm, SubmitHandler, UseFormReturn, FieldValues } from 'react-hook-form'
// import { yupResolver } from '@hookform/resolvers/yup'
// import * as React from 'react'
// import * as yup from 'yup'
// import HorizontalStepper from '../features/Stepper'
// import { useIsSmallScreen } from '@/hooks/useIsSmallScreen'
// import { useTranslation } from 'react-i18next'

// interface FormDialogProps<T extends FieldValues> {
//   open: boolean
//   title: string
//   steps?: string[]
//   activeStep?: number
//   discardText: string
//   confirmText: string
//   onCloseDialog: () => void
//   schema: yup.ObjectSchema<any> | undefined
//   onSubmit: SubmitHandler<T>
//   renderForm: (methods: UseFormReturn<T>) => React.ReactNode
// }

// export default function FormDialog<T extends FieldValues>({
//   open,
//   title,
//   steps,
//   activeStep = 0,
//   discardText,
//   confirmText,
//   onCloseDialog,
//   schema,
//   onSubmit,
//   renderForm
// }: FormDialogProps<T>) {
//   const isSmallScreen = useIsSmallScreen()
//   const { t: translate } = useTranslation()
//   const { control, handleSubmit, formState, reset } = useForm<T>({
//     resolver: schema ? yupResolver(schema) : undefined
//   })

//   const handleClose = () => {
//     reset()
//     onCloseDialog()
//   }

//   console.log(Object.keys(formState.errors))

//   return (
//     <Dialog
//       open={open}
//       onClose={handleClose}
//       aria-labelledby="alert-dialog-title"
//       aria-describedby="alert-dialog-description">
//       <DialogTitle id="alert-dialog-title" sx={{ textAlign: 'center' }}>
//         {title}
//       </DialogTitle>

//       <Box sx={{ margin: '2em' }}>
//         {steps && <HorizontalStepper steps={steps} activeStep={activeStep} />}
//         <Box
//           component="form"
//           onSubmit={handleSubmit(onSubmit)}
//           sx={{
//             display: 'flex',
//             flexDirection: 'column',
//             gap: '2em',
//             ...(isSmallScreen
//               ? {}
//               : {
//                   '& .MuiTextField-root': { minWidth: '450px' }
//                 })
//           }}>
//           {renderForm({ control, handleSubmit, formState, reset } as UseFormReturn<T>)}

//           <Box sx={{ display: 'flex', justifyContent: 'center', gap: '1em' }}>
//             <Button variant="contained" sx={{ mt: 3, mb: 2 }} onClick={handleClose}>
//               {activeStep === 0 ? translate('newDelivery.labels.exit') : discardText}
//             </Button>

//             <Button
//               type="submit"
//               variant="contained"
//               sx={{ mt: 3, mb: 2 }}
//               disabled={Object.keys(formState.errors).length > 0}>
//               {confirmText}
//             </Button>
//           </Box>
//         </Box>
//       </Box>
//     </Dialog>
//   )
// }
