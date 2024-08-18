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
import { markerIsSelected } from '@/utils/markerIsSelected.ts'
import ComboBox from '../ComboBox'

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
        defaultValue={formsData.systemNumber || []}
        render={({ field: { value, onChange } }) => (
          <ComboBox
            value={value}
            onChange={onChange}
            errors={errors.systemNumber}
            label={translate('deliveries.newDelivery.labels.step1.systemNumber')}
          />
        )}
      />

      <Controller
        name="receptionNumber"
        control={control}
        defaultValue={formsData.receptionNumber || []}
        render={({ field: { value, onChange } }) => (
          <ComboBox
            value={value}
            onChange={onChange}
            errors={errors.systemNumber}
            label={translate('deliveries.newDelivery.labels.step1.receptionNumber')}
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
            label={translate('deliveries.newDelivery.labels.step1.cmrNumber')}
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
          <FormControl>
            <InputLabel id="markers-label">
              {translate('deliveries.newDelivery.labels.step1.markers')}
            </InputLabel>
            <Select
              {...field}
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={field.value || []}
              onChange={(e) => field.onChange(e.target.value)}
              input={
                <OutlinedInput label={translate('deliveries.newDelivery.labels.step1.markers')} />
              }
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
                  <Checkbox checked={markerIsSelected(field.value!, marker.id!)} />
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
