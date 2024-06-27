import { Checkbox, FormControl, FormControlLabel, InputLabel, ListItemText, MenuItem, Select, TextField } from '@mui/material'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import { Controller, UseFormReturn } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { MoveEntryFormData } from '@/schemas/moveEntrySchema'

interface MoveEntryFormProps {
  methods: UseFormReturn<MoveEntryFormData>
  quantity: number
}

export default function MoveEntryForm({ methods, quantity }: MoveEntryFormProps) {
  const {
    control,
    formState: { errors }
  } = methods
  const { t: translate } = useTranslation()

  const zones = ['Първа', 'Втора', 'Трета']

  return (
    <>
      <Controller
        name="quantity"
        control={control}
        defaultValue={quantity}
        render={({ field }) => (
          <TextField
            {...field}
            label={translate('zones.moveEntry.quantity')}
            id="quantity"
            name="quantity"
            value={quantity}
            required
            fullWidth
            autoFocus
            error={!!errors.quantity}
            helperText={errors.quantity?.message ? translate(errors.quantity.message) : ''}
          />
        )}
      />

      <ArrowDownwardIcon />

      <Controller
        name="zone"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth>
            <InputLabel id="move-entry-select-label">
              {translate('zones.moveEntry.zone')}
            </InputLabel>
            <Select
              {...field}
              labelId="move-entry-select-label"
              id="move-entry-select"
              label={translate('zones.moveEntry.zone')}
              value={field.value || ''}
              onChange={(e) => field.onChange(e.target.value)}>
              {zones.map((zone) => (
                <MenuItem key={zone} value={zone}>
                  <ListItemText primary={zone} />
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
