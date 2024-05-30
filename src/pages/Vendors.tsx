import ActionsMenu from '@/components/features/ActionsMenu'
import SkeletonPage from '@/components/features/SkeletonPage'
import DataTable from '@/components/shared/DataTable'
import FormDialog from '@/components/shared/FormDialog'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TextField, Checkbox, FormControlLabel } from '@mui/material'
import { Controller, UseFormReturn, SubmitHandler } from 'react-hook-form'
// import { SubmitHandler } from 'react-hook-form'

import { VendorFormData, vendorSchema } from '@/schemas/vendorSchema'

export default function Vendors() {
  const { t: translate } = useTranslation()
  const [openDialog, setOpenDialog] = useState(false)
  const [isFinal, setIsFinal] = useState(false)

  const handleClickOpen = () => {
    setOpenDialog(true)
  }

  const onCloseDialog = () => {
    setOpenDialog(false)
  }

  const handleSubmit: SubmitHandler<VendorFormData> = (data) => {
    const formData = {
      ...data,
      isFinal
    }
    console.log(formData)
    onCloseDialog()
  }

  const renderForm = ({ control, formState: { errors } }: UseFormReturn<VendorFormData>) => (
    <>
      <Controller
        name="vendorName"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Име"
            id="vendorName"
            name="vendorName"
            required
            fullWidth
            autoFocus
            error={!!errors.vendorName}
            helperText={errors.vendorName ? errors.vendorName.message : ''}
          />
        )}
      />
      <Controller
        name="vendorNumber"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Доставчик №"
            id="vendorNumber"
            name="vendorNumber"
            required
            fullWidth
            autoFocus
            error={!!errors.vendorNumber}
            helperText={errors.vendorNumber ? errors.vendorNumber.message : ''}
          />
        )}
      />
      <FormControlLabel
        control={<Checkbox checked={isFinal} onChange={() => setIsFinal(!isFinal)} />}
        label="isFinal"
      />
    </>
  )

  const table = () => {
    return (
      <DataTable
        searchInput={true}
        isSortTextField={true}
        sortLabel={'Роля'}
        sortOptionsData={['Proba1', 'Proba2']}
        columnsData={[
          { id: 'name', label: 'Име' },
          { id: 'vendorNumber', label: 'Доставчик №' },
          { id: 'markers', label: 'Маркери' },
          { id: 'actions', label: 'Действия', minWidth: 50, align: 'right' }
        ]}
        rowData={[
          { name: 'Bosch', vendorNumber: 1, markers: 'Масло', actions: <ActionsMenu /> },
          { name: 'Valeo', vendorNumber: 2, markers: 'Чистачки', actions: <ActionsMenu /> }
        ]}
      />
    )
  }

  return (
    <>
      <SkeletonPage
        header={translate('vendors.title')}
        description={translate('vendors.description')}
        buttonText={translate('vendors.labels.newVendor')}
        buttonClickHandler={handleClickOpen}
        table={table()}
      />

      <FormDialog<VendorFormData>
        open={openDialog}
        title={'Създаване на нов доставчик'}
        discardText={'Изход'}
        confirmText={'Създай'}
        onCloseDialog={onCloseDialog}
        schema={vendorSchema}
        onSubmit={handleSubmit}
        renderForm={renderForm}
      />
    </>
  )
}

// import ActionsMenu from '@/components/features/ActionsMenu'
// import SkeletonPage from '@/components/features/SkeletonPage'
// import DataTable from '@/components/shared/DataTable'
// import FormDialog from '@/components/shared/FormDialog'
// import { useState } from 'react'
// import { useTranslation } from 'react-i18next'
// import * as yup from 'yup'
// import { TextField, Checkbox, FormControlLabel } from '@mui/material'
// import { Controller, UseFormReturn, SubmitHandler } from 'react-hook-form'

// const vendorSchema = yup
//   .object({
//     vendorName: yup
//       .string()
//       .required('Полето за име e задължително')
//       .max(50, 'Името трябва да e до 50 символа'),
//     vendorNumber: yup
//       .string()
//       .required('Полето за доставчик № e задължително')
//       .max(25, 'Доставчик № трябва да e до 25 символа')
//   })
//   .required()

// type VendorFormData = yup.InferType<typeof vendorSchema>

// export default function Vendors() {
//   const { t: translate } = useTranslation()
//   const [openDialog, setOpenDialog] = useState(false)
//   const [isFinal, setIsFinal] = useState(false)

//   const handleClickOpen = () => {
//     setOpenDialog(true)
//   }

//   const onCloseDialog = () => {
//     setOpenDialog(false)
//   }

//   const handleSubmit: SubmitHandler<VendorFormData> = (data) => {
//     const formData = {
//       ...data,
//       isFinal
//     }
//     console.log(formData)
//     onCloseDialog()
//   }

//   const renderForm = ({ control, formState: { errors } }: UseFormReturn<VendorFormData>) => (
//     <>
//       <Controller
//         name="vendorName"
//         control={control}
//         render={({ field }) => (
//           <TextField
//             {...field}
//             label="Име"
//             id="vendorName"
//             name="vendorName"
//             required
//             fullWidth
//             autoFocus
//             error={!!errors.vendorName}
//             helperText={errors.vendorName ? errors.vendorName.message : ''}
//           />
//         )}
//       />
//       <Controller
//         name="vendorNumber"
//         control={control}
//         render={({ field }) => (
//           <TextField
//             {...field}
//             label="Доставчик №"
//             id="vendorNumber"
//             name="vendorNumber"
//             required
//             fullWidth
//             autoFocus
//             error={!!errors.vendorNumber}
//             helperText={errors.vendorNumber ? errors.vendorNumber.message : ''}
//           />
//         )}
//       />
//       <FormControlLabel
//         control={<Checkbox checked={isFinal} onChange={() => setIsFinal(!isFinal)} />}
//         label="isFinal"
//       />
//     </>
//   )

//   const table = () => {
//     return (
//       <DataTable
//         searchInput={true}
//         isSortTextField={true}
//         sortLabel={'Роля'}
//         sortOptionsData={['Proba1', 'Proba2']}
//         columnsData={[
//           { id: 'name', label: 'Име' },
//           { id: 'vendorNumber', label: 'Доставчик №' },
//           { id: 'markers', label: 'Маркери' },
//           { id: 'actions', label: 'Действия', minWidth: 50, align: 'right' }
//         ]}
//         rowData={[
//           { name: 'Bosch', vendorNumber: 1, markers: 'Масло', actions: <ActionsMenu /> },
//           { name: 'Valeo', vendorNumber: 2, markers: 'Чистачки', actions: <ActionsMenu /> }
//         ]}
//       />
//     )
//   }

//   return (
//     <>
//       <SkeletonPage
//         header={translate('vendors.title')}
//         description={translate('vendors.description')}
//         buttonText={translate('vendors.labels.newVendor')}
//         buttonClickHandler={handleClickOpen}
//         table={table()}
//       />

//       <FormDialog<VendorFormData>
//         open={openDialog}
//         title={'Създаване на нов доставчик'}
//         discardText={'Изход'}
//         confirmText={'Създай'}
//         onCloseDialog={onCloseDialog}
//         schema={vendorSchema}
//         onSubmit={handleSubmit}
//         renderForm={renderForm}
//       />
//     </>
//   )
// }
