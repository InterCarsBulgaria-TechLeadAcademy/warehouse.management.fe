import { Controller, UseFormReturn } from 'react-hook-form'
import { Checkbox, FormControlLabel, TextField } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { NewMarkerFormData } from '@/schemas/newMarkerSchema'

interface NewMarkerFormProps extends UseFormReturn<NewMarkerFormData> {
  isFinal: boolean
  setIsFinal: React.Dispatch<React.SetStateAction<boolean>>
}

export default function NewMarkerForm({
  control,
  formState: { errors },
  isFinal,
  setIsFinal
}: NewMarkerFormProps) {
  const { t: translate } = useTranslation()
  return (
    <>
      <Controller
        name="markerName"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label={translate('newMarker.labels.name')}
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
      <FormControlLabel
        control={<Checkbox checked={isFinal} onChange={() => setIsFinal(!isFinal)} />}
        label={translate('newMarker.labels.isFinal')}
      />
    </>
  )
}
