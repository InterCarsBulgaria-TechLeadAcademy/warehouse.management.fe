import SkeletonPage from '@/components/features/SkeletonPage'
// import FormDialog from '@/components/shared/FormDialog'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TextField, Checkbox, FormControlLabel } from '@mui/material'
import { Controller, UseFormReturn, SubmitHandler } from 'react-hook-form'
import { NewVendorFormData, newVendorSchema } from '@/schemas/newVendorSchema'
import ZonesTable from '@/components/features/ZonesTable'

export default function Zones() {
  const { t: translate } = useTranslation()
  const [openDialog, setOpenDialog] = useState(false)
  const [isFinal, setIsFinal] = useState(false)

  const handleClickOpen = () => {
    setOpenDialog(true)
  }

  const onCloseDialog = () => {
    setOpenDialog(false)
  }

  const handleSubmit: SubmitHandler<NewVendorFormData> = (data) => {
    const formData = {
      ...data,
      isFinal
    }
    console.log(formData)
    onCloseDialog()
  }

  function CreateZoneForm({ control, formState: { errors } }: UseFormReturn<NewVendorFormData>) {
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
        header={translate('zones.title')}
        description={translate('zones.description')}
        buttonText={translate('zones.labels.newZone')}
        buttonClickHandler={handleClickOpen}
        table={<ZonesTable />}
      />

      {/* <FormDialog<NewVendorFormData>
        open={openDialog}
        title={translate('newZone.title')}
        discardText={translate('newVendor.labels.exit')}
        confirmText={translate('newVendor.labels.create')}
        onCloseDialog={onCloseDialog}
        schema={newVendorSchema}
        onSubmit={handleSubmit}
        renderForm={CreateVendorForm}
      /> */}
    </>
  )
}
