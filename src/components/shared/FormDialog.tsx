import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import Box from '@mui/material/Box'
import { useForm, SubmitHandler, UseFormReturn, FieldValues } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

interface FormDialogProps<T extends FieldValues> {
  open: boolean
  title: string
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

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '2em',
          padding: '2em',
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
    </Dialog>
  )
}

// import * as React from 'react'
// import Button from '@mui/material/Button'
// import Dialog from '@mui/material/Dialog'
// import DialogTitle from '@mui/material/DialogTitle'
// import Box from '@mui/material/Box'
// import TextField from '@mui/material/TextField'
// import { useForm, Controller, SubmitHandler } from 'react-hook-form'
// import { yupResolver } from '@hookform/resolvers/yup'
// import * as yup from 'yup'
// import { Checkbox, FormControlLabel } from '@mui/material'

// const schema = yup
//   .object({
//     zoneName: yup
//       .string()
//       .required('Полето за име e задължително')
//       .max(50, 'Името трябва да e до 50 символа'),
//     vendorNumber: yup
//       .string()
//       .required('Полето за доставчик № e задължително')
//       .max(25, 'Доставчик № трябва да e до 25 символа')
//   })
//   .required()

// interface NewZoneSchema extends yup.InferType<typeof schema> {
//   zoneName: string
// }

// interface FormDialogProps {
//   open: boolean
//   title: string
//   discardText: string
//   confirmText: string
//   onCloseDialog: () => void
// }

// export default function FormDialog({
//   open,
//   title,
//   discardText,
//   confirmText,
//   onCloseDialog
// }: FormDialogProps) {
//   const [isFinal, setIsFinal] = React.useState<boolean>(false)

//   const {
//     control,
//     handleSubmit,
//     formState: { errors },
//     reset
//   } = useForm<NewZoneSchema>({
//     resolver: yupResolver(schema)
//   })

//   const onSubmit: SubmitHandler<NewZoneSchema> = (data) => {
//     const formData = {
//       ...data,
//       isFinal
//     }
//     console.log(formData)
//     onCloseDialog()
//   }

//   const handleChangeIsFinal = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setIsFinal(event.target.checked)
//   }

//   const handleClose = () => {
//     reset()
//     onCloseDialog()
//   }

//   return (
//     <React.Fragment>
//       <Dialog
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="alert-dialog-title"
//         aria-describedby="alert-dialog-description">
//         <DialogTitle id="alert-dialog-title" sx={{ textAlign: 'center' }}>
//           {title}
//         </DialogTitle>

//         <Box
//           component="form"
//           onSubmit={handleSubmit(onSubmit)}
//           sx={{
//             display: 'flex',
//             flexDirection: 'column',
//             gap: '2em',
//             padding: '2em',
//             '& .MuiTextField-root': { width: '450px' }
//           }}>
//           <Controller
//             name="zoneName"
//             control={control}
//             defaultValue=""
//             render={({ field }) => (
//               <TextField
//                 {...field}
//                 label="Име"
//                 id="zoneName"
//                 name="zoneName"
//                 required
//                 fullWidth
//                 autoFocus
//                 error={!!errors.zoneName}
//                 helperText={errors.zoneName ? errors.zoneName.message : ''}
//               />
//             )}
//           />

//           <Controller
//             name="vendorNumber"
//             control={control}
//             defaultValue=""
//             render={({ field }) => (
//               <TextField
//                 {...field}
//                 label="Доставчик №"
//                 id="vendorNumber"
//                 name="vendorNumber"
//                 required
//                 fullWidth
//                 autoFocus
//                 error={!!errors.vendorNumber}
//                 helperText={errors.vendorNumber ? errors.vendorNumber.message : ''}
//               />
//             )}
//           />

//           <FormControlLabel
//             control={<Checkbox checked={isFinal} onChange={handleChangeIsFinal} />}
//             label="isFinal"
//           />

//           <Box
//             sx={{
//               display: 'flex',
//               justifyContent: 'center',
//               gap: '1em'
//             }}>
//             <Button
//               type="submit"
//               variant="contained"
//               sx={{ mt: 3, mb: 2 }}
//               disabled={Object.keys(errors).length > 0}>
//               {confirmText}
//             </Button>

//             <Button variant="contained" sx={{ mt: 3, mb: 2 }} onClick={handleClose}>
//               {discardText}
//             </Button>
//           </Box>
//         </Box>
//       </Dialog>
//     </React.Fragment>
//   )
// }
