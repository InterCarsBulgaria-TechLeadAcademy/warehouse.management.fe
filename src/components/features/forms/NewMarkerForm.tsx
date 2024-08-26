import { Controller, UseFormReturn } from 'react-hook-form'
import { TextField } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { NewMarkerFormData } from '@/schemas/newMarkerSchema'
import useGetMarker from '@/hooks/services/markers/useGetMarker'

interface NewMarkerFormProps extends UseFormReturn<NewMarkerFormData> {
  markerId?: number
}

export default function NewMarkerForm({
  control,
  formState: { errors },
  markerId
}: NewMarkerFormProps) {
  const { t: translate } = useTranslation()

  const marker = useGetMarker(markerId)

  return (
    <Controller
      name="markerName"
      control={control}
      defaultValue={marker?.name || ''}
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
