import useGetMarkers from '@/hooks/services/markers/useGetMarkers'
import { useNewDeliveryContext } from '@/hooks/useNewDeliveryContext'
import { NewDeliveryStep1FormData } from '@/schemas/newDeliverySchemas'
import { MarkerDto } from '@/services/model'
import {
  Checkbox,
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

export default function NewDeliveryStep1Form({
  control,
  formState: { errors }
}: UseFormReturn<NewDeliveryStep1FormData>) {
  const { t: translate } = useTranslation()
  const { formsData } = useNewDeliveryContext()
  const markers = useGetMarkers()

  return (
    <>
      <Controller
        name="systemNumber"
        control={control}
        defaultValue={formsData.systemNumber || ''}
        render={({ field }) => (
          <TextField
            {...field}
            label={translate('newDelivery.labels.step1.systemNumber')}
            id="systemNumber"
            name="systemNumber"
            required
            error={!!errors.systemNumber}
            helperText={errors.systemNumber?.message ? translate(errors.systemNumber.message) : ''}
          />
        )}
      />
      <Controller
        name="receptionNumber"
        control={control}
        defaultValue={formsData.receptionNumber || ''}
        render={({ field }) => (
          <TextField
            {...field}
            label={translate('newDelivery.labels.step1.receptionNumber')}
            id="receptionNumber"
            name="receptionNumber"
            required
            error={!!errors.receptionNumber}
            helperText={
              errors.receptionNumber?.message ? translate(errors.receptionNumber.message) : ''
            }
          />
        )}
      />

      <Controller
        name="cmr"
        control={control}
        defaultValue={formsData.cmr || ''}
        render={({ field }) => (
          <TextField
            {...field}
            label={translate('newDelivery.labels.step1.cmr')}
            id="cmr"
            name="cmr"
            required
            error={!!errors.cmr}
            helperText={errors.cmr?.message ? translate(errors.cmr.message) : ''}
          />
        )}
      />

      <Controller
        name="markers"
        control={control}
        defaultValue={formsData.markers || []}
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
                <MenuItem key={marker.id} value={marker.id!.toString()}>
                  <Checkbox checked={field.value?.includes(marker.id!.toString())} />
                  <ListItemText primary={marker.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      />
    </>
  )
}
