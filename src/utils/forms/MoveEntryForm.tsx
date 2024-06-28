import { Box, FormControl, InputLabel, ListItemText, MenuItem, Select, TextField } from '@mui/material'
import EastIcon from '@mui/icons-material/East';
import { Controller, UseFormReturn } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { MoveEntryFormData } from '@/schemas/moveEntrySchema'
import { useState } from 'react';

interface MoveEntryFormProps {
  methods: UseFormReturn<MoveEntryFormData>
  quantity: number
}

export default function MoveEntryForm({ methods, quantity }: MoveEntryFormProps) {
  const [first, setFirst] = useState(quantity)
  
  const {
    control,
    formState: { errors }
  } = methods
  const { t: translate } = useTranslation()

  const zones = ['Първа', 'Втора', 'Трета']

  return (
    <>
      <Box sx={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
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
              type='number'
              value={first}
              onChange={((e) => (setFirst(e.target.value)))}
              required
              fullWidth
              autoFocus
              error={!!errors.quantity}
              helperText={errors.quantity?.message ? translate(errors.quantity.message) : ''}
            />
          )}
        />

        <EastIcon />

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
                onChange={(e) => field.onChange(e.target.value)}
              >
                {zones.map((zone) => (
                  <MenuItem key={zone} value={zone}>
                    <ListItemText primary={zone} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />
      </Box>
    </>
  )
}
