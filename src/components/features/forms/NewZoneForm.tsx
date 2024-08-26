import useGetMarkers from '@/hooks/services/markers/useGetMarkers'
import { NewZoneFormData } from '@/schemas/newZoneSchema'
import { MarkerDto } from '@/services/model'
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
import { markerIsSelected } from '@/utils/markerIsSelected.ts'
import useGetZone from '@/hooks/services/zones/useGetZone'

interface NewZoneFormProps extends UseFormReturn<NewZoneFormData> {
  zoneId?: number
}

export default function NewZoneForm({ control, formState: { errors }, zoneId }: NewZoneFormProps) {
  const { t: translate } = useTranslation()
  const markers = useGetMarkers()
  const zone = useGetZone(zoneId)

  return (
    <>
      <Controller
        name="zoneName"
        control={control}
        defaultValue={zone?.name || ''}
        render={({ field }) => (
          <TextField
            {...field}
            label={translate('zones.newZone.labels.name')}
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
        defaultValue={zone ? zone.markers?.map((marker) => marker.markerId!.toString()) : []}
        render={({ field }) => (
          <FormControl fullWidth>
            <InputLabel id="demo-multiple-checkbox-label">
              {translate('zones.newZone.labels.markers')}
            </InputLabel>
            <Select
              {...field}
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={field.value || []}
              onChange={(e) => field.onChange(e.target.value)}
              input={<OutlinedInput label={translate('newZone.labels.markers')} />}
              renderValue={(selected) => {
                const selectedMarkerNames = selected
                  .map((id) => {
                    const marker = markers.find((marker) => marker.id === Number(id))
                    return marker ? marker.name : ''
                  })
                  .join(', ')

                return selectedMarkerNames
              }}>
              {markers.map((marker: MarkerDto) => (
                <MenuItem key={marker.id} value={marker.id?.toString()}>
                  <Checkbox checked={markerIsSelected(field.value, marker.id!)} />
                  <ListItemText primary={marker.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      />

      <Controller
        name="isFinal"
        control={control}
        defaultValue={zone?.isFinal || false}
        render={({ field }) => (
          <FormControlLabel
            control={<Checkbox {...field} checked={field.value} />}
            label={translate('zones.newZone.labels.isFinal')}
          />
        )}
      />
    </>
  )
}
