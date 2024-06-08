import { useState } from 'react'
import { Controller, SubmitHandler, UseFormReturn } from 'react-hook-form'

import SkeletonPage from '@/components/features/SkeletonPage'
import { useTranslation } from 'react-i18next'
import MarkersTable from '@/components/features/MarkersTable'
import { NewMarkerFormData, newMarkerSchema } from '@/schemas/newMarkerSchema'
import { Checkbox, FormControlLabel, TextField } from '@mui/material'
import FormDialog from '@/components/shared/FormDialog'

export default function Markers() {
  const { t: translate } = useTranslation()
  const [openDialog, setOpenDialog] = useState(false)
  const [isFinal, setIsFinal] = useState(false)

  const handleClickOpen = () => {
    setOpenDialog(true)
  }

  const onCloseDialog = () => {
    setOpenDialog(false)
  }

  const handleSubmit: SubmitHandler<NewMarkerFormData> = (data) => {
    const formData = {
      ...data,
      isFinal
    }
    console.log(formData)
    onCloseDialog()
  }

  function CreateVendorForm({ control, formState: { errors } }: UseFormReturn<NewMarkerFormData>) {
    return (
      <>
        <Controller
          name="markerName"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={translate('newMarker.labels.name')}
              id="vendorName"
              name="vendorName"
              required
              fullWidth
              autoFocus
              error={!!errors.markerName}
              helperText={errors.markerName?.message ? translate(errors.markerName.message) : ''}
            />
          )}
        />
        <FormControlLabel
          control={<Checkbox checked={isFinal} onChange={() => setIsFinal(!isFinal)} />}
          label={translate('newMarker.labels.isFinal')}
        />
      </>
    )
  }

  return (
    <>
      <SkeletonPage
        header={translate('markers.title')}
        description={translate('markers.description')}
        buttonText={translate('markers.labels.newMarker')}
        buttonClickHandler={handleClickOpen}
        table={<MarkersTable />}
      />

      <FormDialog<NewMarkerFormData>
        open={openDialog}
        title={translate('newMarker.title')}
        discardText={translate('newMarker.labels.exit')}
        confirmText={translate('newMarker.labels.create')}
        onCloseDialog={onCloseDialog}
        schema={newMarkerSchema}
        onSubmit={handleSubmit}
        renderForm={CreateVendorForm}
      />
    </>
  )
}
