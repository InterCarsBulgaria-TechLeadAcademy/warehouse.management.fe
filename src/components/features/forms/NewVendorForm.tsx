import { NewVendorFormData } from '@/schemas/newVendorSchema'
import { FormControl, InputLabel, ListItemText, MenuItem, Select, TextField } from '@mui/material'
import { Controller, UseFormReturn } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

export default function NewVendorForm({
  control,
  formState: { errors }
}: UseFormReturn<NewVendorFormData>) {
  const { t: translate } = useTranslation()

  const markers = ['Масло', 'Гуми', 'Чистачки', "Накладки"]
  
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
            type='number'
            required
            fullWidth
            autoFocus
            error={!!errors.vendorNumber}
            helperText={errors.vendorNumber?.message ? translate(errors.vendorNumber.message) : ''}
          />
        )}
      />

      <Controller
        name="markers"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth>
          <InputLabel id="demo-multiple-markers-label">
            {translate('newVendor.labels.markers')}
          </InputLabel>
          <Select
            {...field}
            label={translate('newVendor.labels.markers')}
            labelId="demo-multiple-markers-label"
            id="demo-multiple-markers"
            multiple
            value={field.value || []}
            onChange={(e) => field.onChange(e.target.value)}
            renderValue={(selected) => (selected as string[]).join(', ')}>
            {markers.map((marker) => (
              <MenuItem key={marker} value={marker}>
                <ListItemText primary={marker} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        )}
      />
    </>
  )
}
