import { NewVendorFormData } from '@/schemas/newVendorSchema'
import { Checkbox, FormControlLabel, TextField } from '@mui/material'
import { Controller, UseFormReturn } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

export default function NewVendorForm({
  control,
  formState: { errors }
}: UseFormReturn<NewVendorFormData>) {
  const { t: translate } = useTranslation()
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
            helperText={errors.vendorNumber?.message ? translate(errors.vendorNumber.message) : ''}
          />
        )}
      />

      <Controller
        name="isFinal"
        control={control}
        render={({ field }) => (
          <FormControlLabel
            control={<Checkbox {...field} checked={field.value} />}
            label={translate('newVendor.labels.isFinal')}
          />
        )}
      />
    </>
  )
}
