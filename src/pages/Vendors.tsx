import SkeletonPage from '@/components/features/SkeletonPage'
import FormDialog from '@/components/shared/FormDialog'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TextField, Checkbox, FormControlLabel } from '@mui/material'
import { Controller, UseFormReturn, SubmitHandler } from 'react-hook-form'
import { VendorFormData, vendorSchema } from '@/schemas/vendorSchema'
import VendorsTable from '@/tables/VendorsTable'

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

  function CreateVendorForm({ control, formState: { errors } }: UseFormReturn<VendorFormData>) {
    return (
      <>
        <Controller
          name="vendorName"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={translate('newVendor.labels.name')}
              id="vendorName"
              name="vendorName"
              required
              fullWidth
              autoFocus
              error={!!errors.vendorName}
              helperText={errors.vendorName?.message ? translate(errors.vendorName.message) : ''}
            />
          )}
        />
        <Controller
          name="vendorNumber"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={translate('newVendor.labels.vendorNumber')}
              id="vendorNumber"
              name="vendorNumber"
              required
              fullWidth
              autoFocus
              error={!!errors.vendorNumber}
              helperText={
                errors.vendorNumber?.message ? translate(errors.vendorNumber.message) : ''
              }
            />
          )}
        />
        <FormControlLabel
          control={<Checkbox checked={isFinal} onChange={() => setIsFinal(!isFinal)} />}
          label={translate('newVendor.labels.isFinal')}
        />
      </>
    )
  }

  return (
    <>
      <SkeletonPage
        header={translate('vendors.title')}
        description={translate('vendors.description')}
        buttonText={translate('vendors.labels.newVendor')}
        buttonClickHandler={handleClickOpen}
        table={<VendorsTable />}
      />

      <FormDialog<VendorFormData>
        open={openDialog}
        title={translate('newVendor.title')}
        discardText={translate('newVendor.labels.exit')}
        confirmText={translate('newVendor.labels.create')}
        onCloseDialog={onCloseDialog}
        schema={vendorSchema}
        onSubmit={handleSubmit}
        renderForm={CreateVendorForm}
      />
    </>
  )
}
