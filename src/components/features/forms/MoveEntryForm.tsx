import { useState } from 'react'
import {
  Box,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  TextField,
  FormHelperText,
  Button
} from '@mui/material'
import EastIcon from '@mui/icons-material/East'
import { Controller, useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useTranslation } from 'react-i18next'
import { MoveEntryFormData, createMoveEntrySchema } from '@/schemas/moveEntrySchema'
import { useMoveEntryDialog } from '@/hooks/dialogs/zonesContent/useMoveEntryDialog'
import { useMoveEntry } from '@/hooks/services/entries/useMoveEntry.ts'
import useGetZones from '@/hooks/services/zones/useGetZones.ts'

interface FormMoveEntryProps {
  quantity: number
  entryId: number
  handleCloseForm: () => void
}

export default function MoveEntryForm({ quantity, handleCloseForm, entryId }: FormMoveEntryProps) {
  const [currentQuantity, setCurrentQuantity] = useState(quantity)
  const schema = createMoveEntrySchema(quantity)
  const entryMove = useMoveEntry()
  const zones = useGetZones()

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<MoveEntryFormData>({
    resolver: yupResolver(schema),
    defaultValues: { quantity, zone: '' }
  })

  const { t: translate } = useTranslation()

  const { onCloseMoveEntryDialog } = useMoveEntryDialog()

  const handleFormSubmit: SubmitHandler<MoveEntryFormData> = (data) => {
    entryMove.mutate({ id: entryId, newZoneId: Number(data.zone) })
    handleCloseForm()
    onCloseMoveEntryDialog()
  }

  return (
    <Box component="form" onSubmit={handleSubmit(handleFormSubmit)}>
      <Box sx={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <Controller
          name="quantity"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={translate('zonesContent.table.actions.moveEntryForm.quantity')}
              id="quantity"
              type="number"
              value={currentQuantity}
              onChange={(e) => {
                const value = Number(e.target.value)
                setCurrentQuantity(value)
                field.onChange(value)
              }}
              inputProps={{
                readOnly: true
              }}
              required
              fullWidth
              autoFocus
              error={!!errors.quantity}
              helperText={
                errors.quantity?.message ? translate(errors.quantity.message as string) : ''
              }
            />
          )}
        />

        <EastIcon />

        <Controller
          name="zone"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth error={!!errors.zone}>
              <InputLabel id="move-entry-select-label">
                {translate('zonesContent.table.actions.moveEntryForm.zone')}
              </InputLabel>
              <Select
                {...field}
                labelId="move-entry-select-label"
                id="move-entry-select"
                label={translate('zonesContent.table.actions.moveEntryForm.zone')}
                value={field.value || ''}
                onChange={(e) => field.onChange(e.target.value)}>
                {zones.map((zone) => (
                  <MenuItem key={zone.id!} value={zone.id!}>
                    <ListItemText primary={zone.name!} />
                  </MenuItem>
                ))}
              </Select>
              {errors.zone?.message && (
                <FormHelperText>{translate(errors.zone.message as string)}</FormHelperText>
              )}
            </FormControl>
          )}
        />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'right', gap: '1em' }}>
        <Button type="submit" variant="contained" sx={{ mt: 5 }}>
          {translate('zonesContent.table.actions.moveEntryForm.confirm')}
        </Button>
      </Box>
    </Box>
  )
}
