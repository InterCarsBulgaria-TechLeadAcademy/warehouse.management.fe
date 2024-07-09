import { NewZoneFormData } from '@/schemas/newZoneSchema'
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField
} from '@mui/material'
import { Controller, UseFormReturn } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

const markers = ['Масло', 'Гуми', 'Чистачки']

export default function NewZoneContentForm({
  control,
  formState: { errors }
}: UseFormReturn<NewZoneFormData>) {
  const { t: translate } = useTranslation()
  return (
    <>
      <Controller
        name="zoneName"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label={translate('newZone.labels.name')}
            id="zoneName"
            name="zoneName"
            required
            fullWidth
            autoFocus
            error={!!errors.zoneName}
            helperText={errors.zoneName?.message ? translate(errors.zoneName.message) : ''}
          />
        )}
      />

      <Controller
        name="markers"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth>
            <InputLabel id="demo-multiple-checkbox-label">
              {translate('newZone.labels.markers')}
            </InputLabel>
            <Select
              {...field}
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={field.value || []}
              label={translate('newZone.labels.markers')}
              onChange={(e) => field.onChange(e.target.value)}
              renderValue={(selected) => (selected as string[]).join(', ')}>
              {markers.map((marker) => (
                <MenuItem key={marker} value={marker}>
                  <Checkbox checked={field.value?.includes(marker)} />{' '}
                  <ListItemText primary={marker} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      />

      <Controller
        name="isFinal"
        control={control}
        render={({ field }) => (
          <FormControlLabel
            control={<Checkbox {...field} checked={field.value} />}
            label={translate('newZone.labels.isFinal')}
          />
        )}
      />
    </>
  )
}
