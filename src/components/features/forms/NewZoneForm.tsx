import { NewZoneFormData } from '@/schemas/newZoneSchema'
import { getWarehouseManagementApi } from '@/services/generated-api'
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
import { useSuspenseQuery } from '@tanstack/react-query'
import { Controller, UseFormReturn } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

interface NewZoneFormProps extends UseFormReturn<NewZoneFormData> {
  defaultValues?: {
    name?: string
    markersIds?: any //трябва да е [] | string[], но така гърми ZoneTableActionsMenu и не знам как
    isFinal?: boolean
  }
}

export default function NewZoneForm({
  control,
  formState: { errors },
  defaultValues = { name: '', markersIds: [], isFinal: false } //set defaultValues when is undefined
}: NewZoneFormProps) {
  const { t: translate } = useTranslation()

  //TODO: След като се merged, ще имам достъп до useGetMarkers хук и ще преправя логиката.
  const { data } = useSuspenseQuery({
    queryKey: ['markers'],
    queryFn: () => {
      return getWarehouseManagementApi().getApiMarkerAll()
    }
  })

  return (
    <>
      <Controller
        name="zoneName"
        control={control}
        defaultValue={defaultValues.name}
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
        defaultValue={defaultValues.markersIds}
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
              onChange={(e) => field.onChange(e.target.value)}
              input={<OutlinedInput />}
              renderValue={(selected) => {
                const selectedMarkerNames = selected
                  .map((id) => {
                    const isMarker = data.find((marker) => marker.id === Number(id))
                    if (isMarker) {
                      return isMarker.name
                    }
                  })
                  .join(', ')

                return selectedMarkerNames
              }}>
              {data.map((marker: MarkerDto) => (
                <MenuItem key={marker.id!} value={marker.id!}>
                  <Checkbox checked={field.value?.includes(marker.name!)} />{' '}
                  <ListItemText primary={marker.name!} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      />

      <Controller
        name="isFinal"
        control={control}
        defaultValue={defaultValues.isFinal}
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
