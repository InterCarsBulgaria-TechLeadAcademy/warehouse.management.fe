import {
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField
} from '@mui/material'
import { Controller, UseFormReturn } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { MoveEntryFormData } from '@/schemas/moveEntrySchema'

export default function MoveEntryForm({ control, formState: { errors } }: UseFormReturn<MoveEntryFormData>) {
  const { t: translate } = useTranslation()
  const zones = ['Първа', 'Втора', 'Трета']
  return (
    <>
      <Controller
        name="quantity"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label={translate('zones.moveEntry.quantity')}
            id="quantity"
            name="quantity"
            required
            fullWidth
            autoFocus
            error={!!errors.quantity}
            helperText={errors.quantity?.message ? translate(errors.quantity.message) : ''}
          />
        )}
      />
        
      <Controller
        name="zone"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth>
            <InputLabel id="move-entry-checkbox-label">
              {translate('zones.moveEntry.zone')}
            </InputLabel>
            <Select
              {...field}
              labelId="move-entry-checkbox-label"
              id="move-entry-checkbox"
              value={field.value || ''}
              onChange={(e) => field.onChange(e.target.value)}
              input={<OutlinedInput />}>
              {zones.map((zone) => (
                <MenuItem key={zone} value={zone}>
                  <ListItemText primary={zone} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      />
    </>
  )
}