import { Controller, UseFormReturn } from 'react-hook-form'
import { TextField } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { NewMarkerFormData } from '@/schemas/newMarkerSchema'

interface NewMarkerFormProps extends UseFormReturn<NewMarkerFormData> {
  defaultValue?: string
}

export default function NewMarkerForm({
  control,
  formState: { errors },
  defaultValue
}: NewMarkerFormProps) {
  const { t: translate } = useTranslation()

  return (
    <Controller
      name="markerName"
      control={control}
      defaultValue={defaultValue || ''}
      render={({ field }) => (
        <TextField
          {...field}
          label={translate('markers.newMarker.labels.name')}
          id="markerName"
          name="markerName"
          required
          fullWidth
          autoFocus
          error={!!errors.markerName}
          helperText={errors.markerName?.message ? translate(errors.markerName.message) : ''}
        />
      )}
    />
  )
}
